# Vault Maison: Comprehensive System Architecture & Design

## 1. Executive Summary

This document outlines the comprehensive system architecture for the Vault Maison luxury e-commerce platform. It details the high-level design, data flows, infrastructure components, and database schema required to support the recommended hybrid architecture (Next.js App Router + Medusa.js). 

The architecture is designed to achieve three primary objectives:
1. **Frontend Flexibility**: Support 10 distinct, highly interactive visual concepts without backend constraints.
2. **Enterprise Scalability**: Handle high-traffic drops and complex product variant permutations.
3. **Uncompromising Security**: Protect high-value transactions and sensitive customer data through strict decoupling and edge protection.

---

## 2. High-Level Architecture Diagram

The system follows a decoupled, API-first microservices pattern, utilizing a Backend-for-Frontend (BFF) to mediate between the client and the core commerce engine.

```text
+-----------------------------------------------------------------------------------+
|                                 CLIENT TIER                                       |
|  +----------------+  +----------------+  +----------------+  +----------------+   |
|  | Web Browser    |  | Mobile Safari  |  | iOS App (Fut.) |  | POS Kiosk      |   |
|  | (Next.js SSR)  |  | (Next.js SSR)  |  | (React Native) |  | (In-Store)     |   |
|  +-------+--------+  +-------+--------+  +-------+--------+  +-------+--------+   |
+----------|-------------------|-------------------|-------------------|------------+
           |                   |                   |                   |
           v                   v                   v                   v
+-----------------------------------------------------------------------------------+
|                              EDGE & DELIVERY TIER                                 |
|  +----------------------------------------------------------------------------+   |
|  | Vercel Edge Network (CDN, WAF, DDoS Protection, Edge Caching)              |   |
|  +----------------------------------------------------------------------------+   |
+--------------------------------------+--------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------------+
|                              APPLICATION TIER (BFF)                               |
|  +----------------------------------------------------------------------------+   |
|  | Next.js App Router (Hosted on Vercel)                                      |   |
|  | - React Server Components (RSC) for SEO & Performance                      |   |
|  | - Route Handlers (/api/*) acting as the Backend-for-Frontend (BFF)         |   |
|  | - Zustand (Client State: Cart, Wishlist)                                   |   |
|  +----------------------------------------------------------------------------+   |
+--------------------------------------+--------------------------------------------+
                                       | (Internal API Calls - Authenticated)
                                       v
+-----------------------------------------------------------------------------------+
|                              COMMERCE & SERVICES TIER                             |
|  +------------------------+  +------------------------+  +--------------------+   |
|  | Medusa.js Core Engine  |  | Search Service         |  | CMS (Contentful)   |   |
|  | (Node.js / Express)    |  | (Meilisearch/Algolia)  |  | (Editorial/Pages)  |   |
|  | - Cart & Checkout      |  | - Typo Tolerance       |  | - Concept Configs  |   |
|  | - Product Catalog      |  | - Faceted Filtering    |  | - Journal Posts    |   |
|  | - Order Management     |  | - Synonyms             |  | - Hero Banners     |   |
|  +-----------+------------+  +-----------+------------+  +---------+----------+   |
|              |                           |                         |              |
|  +-----------v------------+  +-----------v------------+            |              |
|  | Custom Microservices   |  | GemHub Integration     |            |              |
|  | - Dynamic Pricing      |  | - 360 Video Sync       |            |              |
|  | - Fraud Scoring        |  | - AR Try-On Links      |            |              |
|  +------------------------+  +------------------------+            |              |
+-----------------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------------+
|                                 DATA TIER                                         |
|  +------------------------+  +------------------------+  +--------------------+   |
|  | PostgreSQL (Supabase)  |  | Redis (Upstash)        |  | Vercel Blob / S3   |   |
|  | - Primary System of    |  | - Session Store        |  | - Static Assets    |   |
|  |   Record (ACID)        |  | - Rate Limiting        |  | - User Uploads     |   |
|  | - Orders, Users, SKUs  |  | - API Response Cache   |  | - Invoices (PDF)   |   |
|  +------------------------+  +------------------------+  +--------------------+   |
+-----------------------------------------------------------------------------------+
```

---

## 3. Component Deep Dive

### 3.1 Presentation Layer (Next.js App Router)

The frontend is built using Next.js 14+ App Router, leveraging React Server Components (RSC) to minimize client-side JavaScript bundles.

- **Concept Architecture**: The 10 visual concepts (Minimal, Vault, Gallery, etc.) are implemented as distinct route groups or layout wrappers within the `src/app` directory. They share underlying business logic components (e.g., `AddToCartButton`) but apply concept-specific CSS modules and Tailwind configurations.
- **State Management**: Zustand is used for ephemeral client state (Cart UI toggles, Wishlist items before login). Server state (actual cart contents, pricing) is managed via React Query or SWR, fetching from the BFF.
- **Image Optimization**: `next/image` is utilized extensively, integrating with Vercel's Image Optimization API to serve WebP/AVIF formats based on device capabilities, crucial for high-resolution jewelry photography.

### 3.2 Backend-for-Frontend (BFF) Layer

The BFF pattern is implemented using Next.js Route Handlers (`src/app/api/*`). This layer is critical for security and performance.

- **Security Abstraction**: The frontend never communicates directly with Medusa.js, Stripe, or GemHub. The BFF holds all private API keys (stored in Vercel Environment Variables) and proxies requests.
- **Payload Transformation**: The BFF aggregates data. For a product page, it fetches base product data from Medusa, editorial content from the CMS, and 360-media links from GemHub, returning a single, optimized JSON payload to the client.
- **Rate Limiting**: Vercel Edge Middleware applies rate limiting (e.g., max 5 login attempts per minute per IP) before requests even hit the Node.js runtime.

### 3.3 Core Commerce Engine (Medusa.js)

Medusa.js serves as the headless commerce backend, handling all transactional logic.

- **Deployment**: Deployed as a Docker container on a scalable PaaS (e.g., Render, AWS App Runner, or Railway).
- **Extensibility**: Medusa's plugin architecture is used to integrate Stripe (payments), SendGrid (transactional emails), and Meilisearch (search).
- **Custom Services**: We will build custom Medusa Services to handle jewelry-specific logic, such as calculating dynamic insurance costs based on the cart subtotal and shipping destination.

### 3.4 Data Persistence Layer

- **PostgreSQL**: The primary relational database, hosted on a managed service like Supabase or Neon. It ensures ACID compliance for all financial transactions and order records.
- **Redis**: Hosted on Upstash, Redis is used for caching Medusa API responses (e.g., the product catalog, which changes infrequently) and managing user session states to reduce database load during traffic spikes.

---

## 4. Core Data Flows

### 4.1 Product Browsing & Search Flow (Read Path)

This flow is optimized for extreme speed, utilizing edge caching and dedicated search infrastructure.

1. **Client Request**: User navigates to `/concept-02/category/rings`.
2. **Edge Cache Check**: Vercel Edge Network checks for a cached HTML response (stale-while-revalidate). If valid, it returns immediately (<50ms).
3. **BFF Invocation**: If a cache miss occurs, the Next.js Server Component invokes the BFF internal API.
4. **Search Engine Query**: For category listings, the BFF queries Meilisearch (not PostgreSQL) for faceted results (e.g., "Metal: 18k Gold", "Price: >$5000").
5. **Data Aggregation**: The BFF retrieves the search results and fetches associated CMS marketing banners.
6. **Response & Render**: The Server Component renders the HTML and streams it to the client.

### 4.2 Secure Checkout & Payment Flow (Write Path)

This flow prioritizes security, ACID compliance, and fraud prevention.

1. **Cart Initialization**: User adds an item. The BFF calls Medusa to create a Cart ID in PostgreSQL.
2. **Checkout Entry**: User enters shipping details. Medusa calculates taxes (via TaxJar plugin) and shipping rates (via custom carrier plugin).
3. **Payment Intent**: The BFF requests a Stripe `PaymentIntent` via Medusa. Stripe returns a client secret.
4. **Client Rendering**: The frontend renders Stripe Elements using the client secret. The user inputs card details directly into the Stripe iframe (PCI SAQ A compliance).
5. **Tokenization & Authorization**: Stripe tokenizes the card and attempts authorization.
6. **Webhook Confirmation**: Stripe sends a secure webhook to the Medusa backend confirming the payment status.
7. **Order Creation**: Medusa verifies the webhook signature, transitions the Cart to an Order in PostgreSQL, and decrements inventory.
8. **Post-Processing**: Medusa triggers asynchronous events: sending the confirmation email (SendGrid) and pushing the order to the ERP/Fulfillment system.

---

## 5. Database Schema Design (PostgreSQL)

The database schema must support the complex, multi-dimensional variant structures inherent in fine jewelry. Below is the detailed Entity-Relationship (ER) model for the core product and order domains.

### 5.1 Product & Variant Domain

Jewelry requires a highly flexible variant system. A single ring design might have permutations for Metal Type, Ring Size, and Diamond Clarity.

```sql
-- Base Product Definition
CREATE TABLE product (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    handle VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    collection_id VARCHAR(50) REFERENCES collection(id),
    type_id VARCHAR(50) REFERENCES product_type(id),
    status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Defines the axes of variation (e.g., "Metal", "Size")
CREATE TABLE product_option (
    id VARCHAR(50) PRIMARY KEY,
    product_id VARCHAR(50) REFERENCES product(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL, -- e.g., "Ring Size"
    metadata JSONB -- For UI rendering hints (e.g., { "display": "dropdown" })
);

-- Defines the specific values for an option (e.g., "Size 6", "18k Gold")
CREATE TABLE product_option_value (
    id VARCHAR(50) PRIMARY KEY,
    option_id VARCHAR(50) REFERENCES product_option(id) ON DELETE CASCADE,
    value VARCHAR(100) NOT NULL,
    metadata JSONB -- e.g., { "hex_color": "#FFD700" } for metal swatches
);

-- The specific, purchasable SKU
CREATE TABLE product_variant (
    id VARCHAR(50) PRIMARY KEY,
    product_id VARCHAR(50) REFERENCES product(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    sku VARCHAR(100) UNIQUE,
    barcode VARCHAR(100),
    inventory_quantity INTEGER DEFAULT 0,
    allow_backorder BOOLEAN DEFAULT FALSE,
    manage_inventory BOOLEAN DEFAULT TRUE,
    weight_grams DECIMAL(10, 2), -- Crucial for shipping and dynamic pricing
    metadata JSONB, -- Stores jewelry specifics: { "carat_weight": 1.5, "clarity": "VS1", "color": "G" }
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Maps the variant to its specific option values
CREATE TABLE product_variant_option (
    variant_id VARCHAR(50) REFERENCES product_variant(id) ON DELETE CASCADE,
    option_value_id VARCHAR(50) REFERENCES product_option_value(id) ON DELETE CASCADE,
    PRIMARY KEY (variant_id, option_value_id)
);

-- Pricing (Supports multiple currencies)
CREATE TABLE money_amount (
    id VARCHAR(50) PRIMARY KEY,
    variant_id VARCHAR(50) REFERENCES product_variant(id) ON DELETE CASCADE,
    currency_code VARCHAR(3) NOT NULL, -- e.g., 'usd', 'eur'
    amount INTEGER NOT NULL, -- Stored in cents (e.g., 500000 = $5,000.00)
    region_id VARCHAR(50) REFERENCES region(id)
);
```

### 5.2 Order & Fulfillment Domain

```sql
CREATE TABLE "order" (
    id VARCHAR(50) PRIMARY KEY,
    display_id SERIAL,
    customer_id VARCHAR(50) REFERENCES customer(id),
    email VARCHAR(255) NOT NULL,
    billing_address_id VARCHAR(50) REFERENCES address(id),
    shipping_address_id VARCHAR(50) REFERENCES address(id),
    region_id VARCHAR(50) REFERENCES region(id),
    currency_code VARCHAR(3) NOT NULL,
    tax_rate DECIMAL(5, 4),
    status VARCHAR(20) DEFAULT 'pending', -- pending, completed, archived, canceled
    fulfillment_status VARCHAR(20) DEFAULT 'not_fulfilled', -- fulfilled, partially_fulfilled, shipped
    payment_status VARCHAR(20) DEFAULT 'awaiting', -- captured, partially_refunded, refunded
    metadata JSONB, -- e.g., { "fraud_score": 0.02, "gift_message": "Happy Anniversary" }
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE line_item (
    id VARCHAR(50) PRIMARY KEY,
    order_id VARCHAR(50) REFERENCES "order"(id) ON DELETE CASCADE,
    variant_id VARCHAR(50) REFERENCES product_variant(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    thumbnail VARCHAR(255),
    quantity INTEGER NOT NULL,
    unit_price INTEGER NOT NULL, -- Price at time of purchase (in cents)
    metadata JSONB -- e.g., { "engraving_text": "Forever" }
);
```

### 5.3 Indexing Strategy

To ensure sub-100ms query performance, the following indexes are critical:
- `CREATE INDEX idx_variant_sku ON product_variant(sku);`
- `CREATE INDEX idx_order_customer ON "order"(customer_id);`
- `CREATE INDEX idx_order_email ON "order"(email);`
- `CREATE INDEX idx_money_amount_variant_currency ON money_amount(variant_id, currency_code);`
- GIN indexes on `metadata` columns to allow fast querying of JSONB data (e.g., finding all variants where `metadata->>'clarity' = 'VVS1'`).

---

## 6. Scalability & Resilience

- **Stateless Architecture**: The Next.js BFF and Medusa.js Node servers are entirely stateless. Session data is stored in Redis, and persistent data in PostgreSQL. This allows horizontal scaling (adding more container instances) during traffic spikes (e.g., a new collection drop).
- **Database Connection Pooling**: PgBouncer (or Supabase's built-in pooler) will be used to manage database connections, preventing connection exhaustion when the Node.js servers scale horizontally.
- **Asynchronous Processing**: Heavy tasks (e.g., generating PDF invoices, syncing inventory with the ERP, processing GemHub webhooks) are offloaded to Redis-backed worker queues (BullMQ) rather than blocking the main HTTP request thread.

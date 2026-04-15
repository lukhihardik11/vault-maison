# Vault Maison: System Architecture & Design

This document outlines the comprehensive system architecture for the Vault Maison luxury e-commerce platform. It details the high-level design, data flows, and database schema required to support the recommended hybrid architecture (Next.js + Medusa.js).

## 1. High-Level Architecture

The Vault Maison architecture is designed for maximum frontend flexibility, uncompromising security, and global performance. It employs a decoupled, API-first approach.

### 1.1. Presentation Layer (Frontend)

The presentation layer is responsible for delivering the 10 distinct visual concepts of Vault Maison.

*   **Framework:** Next.js App Router (React).
*   **State Management:** Zustand (for client-side state like Cart and Wishlist).
*   **Styling:** Tailwind CSS with concept-specific design tokens.
*   **Deployment:** Vercel Edge Network for global CDN caching and optimal Core Web Vitals.
*   **Responsibilities:** Routing, UI rendering, client-side validation, and interacting with the API Gateway.

### 1.2. API Gateway & BFF (Backend-for-Frontend)

To simplify frontend development and aggregate data from multiple backend services, a Backend-for-Frontend (BFF) pattern is utilized.

*   **Implementation:** Next.js API Routes (`/api/*`).
*   **Responsibilities:**
    *   Request routing and payload transformation.
    *   Authentication token validation (verifying JWTs before passing requests to core services).
    *   Rate limiting and basic DDoS mitigation (leveraging Vercel Edge Middleware).
    *   Aggregating data (e.g., fetching product details from Medusa.js and associated media from the GemHub integration service in a single request).

### 1.3. Core Commerce Engine (Backend)

The core commerce engine handles all transactional business logic.

*   **Platform:** Medusa.js (Node.js/TypeScript).
*   **Deployment:** Containerized deployment on AWS ECS, Google Cloud Run, or Railway.
*   **Responsibilities:**
    *   Product catalog management (variants, pricing, inventory).
    *   Cart and checkout state management.
    *   Order processing and fulfillment workflows.
    *   Customer profile and address management.
    *   Promotion and discount logic.

### 1.4. Data Persistence Layer

The data layer ensures ACID compliance and secure storage of all platform data.

*   **Primary Database:** PostgreSQL (Managed service like AWS RDS or Supabase).
*   **Caching Layer:** Redis (Managed service like Upstash or AWS ElastiCache) for caching frequent queries (e.g., product catalog, session state) to reduce database load.
*   **Search Engine:** Meilisearch or Algolia for high-performance, typo-tolerant product search and filtering.

### 1.5. External Integrations & Microservices

The architecture integrates with specialized third-party services and custom microservices.

*   **Payment Gateway:** Stripe (via Stripe Elements for PCI SAQ A compliance).
*   **Media & Asset Management:** GemHub (via custom integration service for syncing media and AR try-on links).
*   **Transactional Email:** Resend or SendGrid for order confirmations and shipping updates.
*   **Fraud Detection:** Signifyd or Stripe Radar.

## 2. Core Data Flows

Understanding the flow of data is critical for maintaining security and performance.

### 2.1. Product Browsing & Search Flow

1.  The user navigates to a category page on the Next.js frontend.
2.  The frontend requests product data from the Next.js API Route (BFF).
3.  The BFF checks the Redis cache. If a cache hit occurs, data is returned immediately.
4.  If a cache miss occurs, the BFF queries the Medusa.js backend (or the Search Engine if filtering/searching).
5.  Medusa.js retrieves the data from PostgreSQL, returns it to the BFF, which caches it in Redis and sends it to the frontend.

### 2.2. Secure Checkout Flow

1.  The user initiates checkout. The frontend creates a cart session via the BFF to Medusa.js.
2.  The user enters shipping details. Medusa.js calculates taxes and shipping rates.
3.  The user proceeds to payment. The frontend loads Stripe Elements directly from Stripe's servers.
4.  The user enters credit card details into the secure Stripe iframe.
5.  Stripe tokenizes the card and returns a secure PaymentIntent ID to the frontend.
6.  The frontend submits the order payload (including the PaymentIntent ID) to the BFF.
7.  The BFF forwards the payload to Medusa.js.
8.  Medusa.js communicates server-to-server with Stripe to capture the funds using the PaymentIntent ID.
9.  Upon successful capture, Medusa.js creates the order in PostgreSQL and triggers the order confirmation email via the transactional email service.

## 3. Database Schema Design (PostgreSQL)

The database schema must support the complex variant structures inherent in fine jewelry. Below is a simplified Entity-Relationship (ER) model focusing on the core product structure.

### 3.1. Core Entities

*   **Product:** Represents the base jewelry design (e.g., "The Solitaire Ring").
    *   Attributes: `id`, `title`, `description`, `base_price`, `collection_id`, `created_at`.
*   **ProductVariant:** Represents a specific, purchasable configuration of a product (e.g., "The Solitaire Ring, 18k Yellow Gold, Size 6").
    *   Attributes: `id`, `product_id`, `sku`, `price`, `inventory_quantity`.
*   **ProductOption:** Defines the types of variations available for a product (e.g., "Metal", "Size").
    *   Attributes: `id`, `product_id`, `title`.
*   **ProductOptionValue:** Defines the specific values for an option (e.g., "18k Yellow Gold", "Platinum", "Size 6", "Size 7").
    *   Attributes: `id`, `option_id`, `value`.
*   **VariantOptionMapping:** A junction table linking a `ProductVariant` to its specific `ProductOptionValue`s.
    *   Attributes: `variant_id`, `option_value_id`.

### 3.2. Jewelry-Specific Considerations

To handle dynamic pricing based on metal weight or diamond characteristics, the schema must be extended:

*   **MaterialCost:** A table tracking the daily market price of precious metals (Gold, Platinum) per gram.
*   **VariantSpecifications:** A JSONB column on the `ProductVariant` table to store unstructured data like exact metal weight (in grams), diamond carat weight, color, and clarity grades.

This structure allows the pricing engine to calculate the final price of a variant dynamically: `(Metal Weight * Current Material Cost) + (Diamond Value) + Markup`.

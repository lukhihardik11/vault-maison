# Vault Maison: Comprehensive Security Architecture

## 1. Executive Summary

Vault Maison operates in the high-risk, high-value luxury jewelry sector. Transactions frequently exceed $10,000, making the platform a prime target for sophisticated fraud rings, account takeover (ATO) attacks, and data breaches. A single security incident could result in devastating financial losses and irreparable brand damage.

This document outlines the comprehensive security architecture for Vault Maison, covering five critical domains: Payment Security & PCI Compliance, Data Protection & Privacy, Application Security (OWASP Top 10), Infrastructure Security, and Jewelry-Specific Fraud Prevention. This architecture is designed to meet the stringent requirements of luxury e-commerce while maintaining a frictionless user experience for legitimate high-net-worth clients.

---

## 2. Payment Security & PCI DSS Compliance

Handling high-value transactions requires absolute adherence to the Payment Card Industry Data Security Standard (PCI DSS). Vault Maison's architecture is designed to minimize the PCI compliance scope by ensuring that raw Primary Account Number (PAN) data never touches our servers.

### 2.1 PCI DSS SAQ A Compliance Strategy

Vault Maison will achieve PCI DSS compliance via **Self-Assessment Questionnaire A (SAQ A)**. This is the lowest level of compliance burden, applicable only to merchants who have fully outsourced all cardholder data functions to PCI DSS validated third-party service providers, with no electronic storage, processing, or transmission of any cardholder data on the merchant's systems or premises [1].

**Implementation Details:**
- **Stripe Elements**: All credit card input fields on the checkout page will be rendered using Stripe Elements (specifically the Payment Element). These fields are securely hosted by Stripe and injected into the Vault Maison DOM via iframes.
- **Tokenization**: When a customer submits their payment information, Stripe securely tokenizes the card data and returns a `PaymentMethod` ID to the Vault Maison frontend.
- **Backend Processing**: The Next.js BFF (Backend-for-Frontend) and Medusa.js commerce engine only ever handle the `PaymentMethod` ID, never the raw PAN or CVV.
- **No Local Storage**: The PostgreSQL database will only store the last 4 digits of the card, the expiration date, and the card brand for display purposes.

### 2.2 3D Secure 2.0 (3DS2) Implementation

Given the high average order value (AOV), 3D Secure 2.0 is mandatory for all transactions to shift liability for fraudulent chargebacks from Vault Maison to the card issuer.

**Implementation Details:**
- **Dynamic Triggering**: Stripe will be configured to dynamically request 3DS2 authentication based on risk scoring and regulatory requirements (e.g., Strong Customer Authentication (SCA) in Europe).
- **Frictionless Flow**: 3DS2 supports "frictionless flow," where the issuer can authenticate the transaction in the background using rich data (device fingerprinting, shipping address history) without requiring active user input (like an SMS code). This is critical for maintaining a luxury checkout experience.
- **Challenge Flow Handling**: If the issuer requires a challenge, the Stripe Payment Element will automatically handle the modal overlay, keeping the user on the Vault Maison checkout page.

### 2.3 Stripe Radar for Fraud Teams

Vault Maison will utilize **Stripe Radar for Fraud Teams** ($0.07 per screened transaction) to provide advanced, machine-learning-driven fraud detection [2].

**Custom Rules Engine Configuration:**
- **Velocity Checks**: Block IP addresses or email addresses attempting more than 3 transactions within a 24-hour period.
- **AVS/CVC Mismatches**: Automatically block transactions where the Address Verification System (AVS) or Card Verification Code (CVC) fails.
- **High-Risk Countries**: Route transactions originating from high-risk IP addresses (or where the shipping address is in a high-risk country) to a manual review queue.
- **Mismatched Geolocation**: Flag transactions where the IP geolocation distance from the billing address exceeds 500 miles.

---

## 3. Data Protection & Privacy (GDPR & CCPA)

Vault Maison must comply with global data protection regulations, specifically the General Data Protection Regulation (GDPR) in Europe and the California Consumer Privacy Act (CCPA) in the United States.

### 3.1 Consent Management

- **Cookie Consent Banner**: A granular cookie consent banner (implemented via the `CookieConsent` shared component) will allow users to opt-in or opt-out of specific tracking categories (Strictly Necessary, Analytics, Marketing).
- **Consent Logging**: User consent preferences will be logged with a timestamp and IP address to demonstrate compliance during an audit.
- **Default State**: All non-essential cookies and tracking scripts (e.g., Google Analytics, Meta Pixel) will be blocked by default until explicit consent is granted.

### 3.2 Data Minimization & Retention

- **Guest Checkout**: Vault Maison will offer a robust guest checkout option, allowing users to purchase without creating a persistent account.
- **Data Retention Policy**: 
  - Incomplete cart data will be purged after 30 days.
  - Guest checkout PII (Personally Identifiable Information) will be anonymized after 12 months, retaining only the transactional data required for tax and accounting purposes.
  - Registered user accounts inactive for 36 months will trigger an automated deletion warning email, followed by account anonymization.

### 3.3 Data Subject Access Requests (DSAR)

- **Right to Access**: Users will have the ability to request an export of all their personal data via the Account Dashboard. The system will generate a machine-readable JSON file within 72 hours.
- **Right to be Forgotten**: Users can request account deletion. This process will soft-delete the user record in the Medusa.js database, anonymizing PII while preserving the integrity of historical order records for financial compliance.

### 3.4 Encryption Standards

- **Data in Transit**: All communication between the client browser, the Next.js BFF, the Medusa.js engine, and third-party APIs will be encrypted using TLS 1.3.
- **Data at Rest**: The PostgreSQL database (hosted on Supabase or Neon) will utilize AES-256 encryption for all data at rest.
- **Field-Level Encryption**: Highly sensitive data (e.g., user passwords) will be hashed using bcrypt with a strong work factor.

---

## 4. Application Security (OWASP Top 10 2025 Mitigation)

The Vault Maison architecture is designed to mitigate the vulnerabilities outlined in the OWASP Top 10 2025 list [3].

### 4.1 A01: Broken Access Control

**Risk**: Attackers accessing unauthorized data (e.g., viewing another user's order history) or performing unauthorized actions (e.g., modifying product prices).

**Mitigation**:
- **Strict Route Protection**: Next.js Middleware will enforce authentication checks on all `/account/*` and `/checkout/*` routes.
- **Resource-Level Authorization**: The Medusa.js backend will verify that the authenticated user ID matches the `customer_id` associated with the requested resource (e.g., an order or saved address) before returning data.
- **Admin Isolation**: The Medusa admin dashboard will be hosted on a separate, VPN-restricted subdomain, completely isolated from the public storefront.

### 4.2 A02: Cryptographic Failures

**Risk**: Exposure of sensitive data due to weak encryption or improper key management.

**Mitigation**:
- **Secret Management**: All API keys (Stripe, GemHub, SendGrid) and database credentials will be stored securely in Vercel Environment Variables and AWS Secrets Manager. They will never be hardcoded in the repository.
- **HSTS Enforcement**: HTTP Strict Transport Security (HSTS) headers will be enforced via Next.js configuration to prevent downgrade attacks.

### 4.3 A03: Injection

**Risk**: Attackers injecting malicious SQL, NoSQL, or OS commands into input fields.

**Mitigation**:
- **ORM Usage**: All database interactions will be handled via the Medusa.js ORM (TypeORM) or Prisma, which automatically parameterize queries, neutralizing SQL injection risks.
- **Input Validation**: All user input (search queries, checkout forms, contact forms) will be strictly validated against expected schemas using Zod before processing.

### 4.4 A04: Insecure Design

**Risk**: Flaws in the architectural design that allow for business logic abuse (e.g., manipulating cart totals).

**Mitigation**:
- **Server-Side Source of Truth**: The frontend cart state is purely presentational. All price calculations, discount applications, and final order totals are computed securely on the Medusa.js backend. The frontend cannot dictate the price of an item.
- **Rate Limiting**: Vercel Edge rate limiting will be applied to critical endpoints (e.g., login, password reset, add-to-cart) to prevent brute-force and inventory-hoarding attacks.

### 4.5 A07: Identification and Authentication Failures

**Risk**: Attackers compromising user accounts via credential stuffing or session hijacking.

**Mitigation**:
- **Session Management**: JWTs (JSON Web Tokens) will be used for session management, stored in secure, `HttpOnly`, `SameSite=Lax` cookies to prevent XSS extraction.
- **Token Expiration**: Access tokens will have a short lifespan (e.g., 15 minutes), with secure refresh token rotation.
- **Password Policies**: Enforcement of strong password complexity rules (minimum 12 characters, mixed case, symbols) and integration with the HaveIBeenPwned API to reject known compromised passwords.

---

## 5. Jewelry-Specific Fraud Prevention

The luxury jewelry sector faces unique fraud challenges, including high-value chargebacks, sophisticated reshipping schemes, and "friendly fraud" (where a legitimate customer falsely claims an item was not received) [4].

### 5.1 Manual Review Queue

Any transaction flagged by Stripe Radar as "Elevated Risk" (but not automatically blocked) will be routed to a manual review queue in the Medusa.js admin dashboard. Fulfillment will be paused until a Vault Maison staff member approves the order.

**Review Triggers:**
- Order value exceeds $10,000.
- Shipping address is a known freight forwarder or reshipping facility.
- Billing and shipping addresses are in different countries.
- Multiple failed payment attempts prior to success.

### 5.2 Shipping & Fulfillment Security

- **Mandatory Signature**: All orders will require a direct adult signature upon delivery. This is non-negotiable and will be clearly communicated during checkout.
- **Insured Carriers**: High-value items will be shipped exclusively via specialized, insured carriers (e.g., Parcel Pro, Malca-Amit) rather than standard FedEx/UPS services.
- **Address Modification Lock**: Once an order is placed, the shipping address cannot be modified by the customer via the frontend portal. Any address changes must be requested via customer service and will trigger a re-evaluation of the fraud risk score.

### 5.3 "Friendly Fraud" Mitigation

To combat claims of "empty boxes" or "wrong item received":
- **Video Documentation**: The fulfillment center will implement a video recording system. Every high-value order will be recorded during the packing process, clearly showing the specific item (and its unique serial/GIA number) being placed into the shipping box and the box being sealed with tamper-evident tape.
- **Unboxing Instructions**: Customers will receive explicit instructions advising them to inspect the tamper-evident tape before signing for the package.

---

## 6. Infrastructure Security & Monitoring

### 6.1 DDoS Protection & WAF

- **Vercel Edge Network**: The Next.js frontend will be protected by Vercel's global edge network, which provides automatic DDoS mitigation.
- **Web Application Firewall (WAF)**: Vercel's WAF will be configured with the OWASP Core Ruleset to block common attack vectors (SQLi, XSS) before they reach the application logic.

### 6.2 Error Tracking & Incident Response

- **Sentry Integration**: Sentry will be integrated into both the Next.js frontend and the Medusa.js backend for real-time error tracking and performance monitoring.
- **Alerting**: Critical errors (e.g., payment gateway failures, database connection drops) will trigger immediate alerts to the engineering team via Slack and PagerDuty.
- **Audit Logging**: All administrative actions within the Medusa.js dashboard (e.g., issuing refunds, modifying product prices, changing user roles) will be immutably logged with a timestamp and user ID.

---

### References
[1] Stripe Guide to PCI Compliance. https://stripe.com/guides/pci-compliance
[2] Stripe Radar Pricing. https://stripe.com/radar/pricing
[3] OWASP Top 10 2025. https://owasp.org/Top10/2025/
[4] Chargeback Gurus: Luxury Goods Fraud. https://www.chargebackgurus.com/blog/luxury-goods-fraud-chargebacks

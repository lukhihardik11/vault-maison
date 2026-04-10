---
title: "Concept 05: The Salon"
category: "design-system"
subcategory: "ui-concepts"
version: "2.0"
date: "2026-04-10"
author: ["Manus AI", "Principal Digital Experience Architect"]
status: "draft"
---

# Concept 05: The Salon

### A) IDENTITY
- **Name:** The Salon
- **Tagline:** Conversation precedes acquisition.
- **Design DNA:** Intimate, Conversational, Warm
- **Inspiration Source:** Private banking lounges, appointment-only showrooms, members' clubs.

### THE USER JOURNEY (NARRATIVE)

I arrive at the homepage, and it doesn't look like a store at all. It looks like a private messaging interface. The background is a warm, textured #FDF5E6 (Cream), and the typography is entirely set in the elegant, sweeping curves of Lora at 18px. The screen is split: Section 1 (100vh) features a subtle, looping video of a concierge arranging a velvet tray on the left (60vw), while the right side (40vw) is a chat interface. The tagline, "Conversation precedes acquisition," sits quietly above the chat box.

I don't browse a catalog; I type a message: "I'm looking for a matched pair of 1.5ct emerald cuts for earrings." The response is immediate, powered by a hybrid AI/human concierge system. The AI acknowledges my request, and within seconds, a human concierge takes over.

The concierge sends me a "Curated Selection." This is the Product List Page (PLP), but it's presented as a personalized dossier within the chat thread. It's a horizontal scrolling list of just three options. Each card is 320px wide and 480px tall, featuring a static GemLightBox image. There are no filters, no sorting—the concierge has already done that work. The images load instantly, pre-fetched by the chat application.

I tap on the second option, and the Product Detail Page (PDP) slides up as a modal overlay (90vh). The layout is a clean, single-column flow. The top half is the GemLightBox 360° viewer, powered by the WebRotate 360 library. The background of the viewer is a soft #E8DCC4 (Warm Grey) to match the Salon aesthetic. It doesn't autoplay; instead, a subtle pulsing dot prompts me to drag and rotate the stone.

Below the viewer, the information is presented not as a list of specs, but as a narrative paragraph written by the concierge, explaining *why* they selected this specific pair for me. The price is listed discreetly at the bottom. The CTA button isn't "Buy Now"; it's a soft, rounded rectangle (200px wide, 48px high) with a #4A5D23 (Hunter Green) background and #FDF5E6 text that reads "Schedule Private Viewing." When I hover, the button simply transforms slightly with a soft drop shadow, using a `cubic-bezier(0.4, 0, 0.2, 1)` transition over 300ms.

On mobile, the experience is even more intimate. The navigation pattern is entirely gesture-based within the chat interface—swiping right on a message replies to it, swiping left dismisses the curated selection. The unique gesture here is a "shake to clear" that instantly connects me to a live video call with the concierge.

The checkout flow is a invisible, 2-step process handled entirely within the chat interface: 1) Confirm Details (a summary card sent by the concierge), and 2) Secure Payment (a secure Stripe payment link embedded directly in the chat).

This entire experience is built on React Native Web to ensure the chat interface feels exactly like a native iOS messaging app. The CMS is a custom headless solution built on Node.js to handle the real-time websocket connections for the chat. The e-commerce engine is a custom integration with Stripe, bypassing traditional shopping carts entirely. The animation engine is Remix and Popmotion, providing fluid, value-driven transitions for the chat bubbles and modals. Everything is hosted on AWS with a thorough websocket infrastructure.

Why does this make me buy? The psychological trigger is the Reciprocity Principle. By investing time and personalized attention into curating a selection specifically for me, the concierge creates a sense of obligation and trust. The expected conversion impact is a massive increase in high-ticket sales, as the friction of a traditional e-commerce checkout is replaced by the warmth of a personal relationship.

At 50 products, this works perfectly. At 500 products, it works because the AI assists the concierge. At 5000 products, it breaks; the volume of requests would overwhelm the human concierge team.

**Reference Site:** https://www.net-a-porter.com/en-us/content/eip — Net-a-Porter's EIP (Extremely Important Person) program demonstrates the power of personalized, concierge-driven luxury retail. The Salon takes this concept and makes it the *default* experience for every visitor, not just the top 2% of spenders.

**The Hybrid AI/Human Concierge System:**

The concierge operates in three tiers: AI Triage (0-30s, GPT-4.1-mini acknowledges and matches inventory), Human Handoff (30s-2min, concierge takes over via Slack), and Deep Engagement (2+ min, full consultation with browsing history access).

### J) LUXURY PROOF
- **Decision: Lora Typography** → Why it prevents mid-market perception: It is a warm, contemporary serif that feels like a handwritten letter, not a corporate brochure.
- **Decision: #4A5D23 (Hunter Green) Accent Color** → Why it prevents mid-market perception: It evokes the heritage of private members' clubs and traditional luxury, avoiding the starkness of pure black and white.
- **Decision: "Schedule Private Viewing" CTA** → Why it prevents mid-market perception: It emphasizes the service aspect of the transaction, elevating it above a simple online purchase.
- **Decision: Chat-Based Interface** → Why it prevents mid-market perception: It completely abandons the commoditized "grid of products" in favor of a personalized, 1-on-1 relationship.
- **Decision: 2-Step In-Chat Checkout** → Why it prevents mid-market perception: It removes the clinical, transactional feel of a standard shopping cart, making the payment feel like a discreet arrangement between friends.

### K) IMPLEMENTATION
| Effort | Team Size | MVP Timeline | Full Build | Est. Cost |
| :--- | :--- | :--- | :--- | :--- |
| Mid-Build | 5 (1 UX, 2 FE, 2 BE) | 10 weeks | 16 weeks | $180,000 |

### L) UNIQUENESS PROOF
1. **Color:** #4A5D23 (Hunter Green accent).
2. **Interaction:** "Shake to clear" gesture to initiate a live video call.
3. **Layout:** Split screen (60/40) homepage with a persistent chat interface.
4. **Technology:** React Native Web with Remix and Popmotion animations.
5. **Visual Metaphor:** The Private Messaging App / Concierge Desk.
6. **Competitor Critique:** Harry Winston's "Contact an Expert" is a generic web form hidden in the footer; The Salon makes the expert the entire interface, ensuring every interaction is personalized.

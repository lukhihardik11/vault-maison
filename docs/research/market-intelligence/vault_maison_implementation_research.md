# Vault-Maison: Comprehensive Implementation Research

*Exhaustive research of all 48+ component URLs, shared components, and architecture patterns from the build spec.*

## Table of Contents
1. [Architecture Patterns](#1-architecture-patterns)
2. [Shared Components Implementation](#2-shared-components-implementation)
3. [21st.dev Components Research](#3-21stdev-components-research)
4. [Aceternity UI Components Research](#4-aceternity-ui-components-research)
5. [Reference Image Sources](#5-reference-image-sources)

## 1. Architecture Patterns

Research on Next.js 14+ production architecture for a 10-concept multi-site luxury platform.

### Multi-tenant route architecture

**Findings & Recommended Approach:**
The recommended approach for building a multi-tenant luxury jewelry platform with Next.js 14+ is to use a combination of the App Router, Route Groups, and Middleware. This architecture allows for a single Next.js application to serve multiple themed sub-sites, each with its own unique design and content, while sharing a common codebase.

### Architecture Overview

1.  **Route Groups:** We use Route Groups to organize the different concepts (e.g., `vault`, `observatory`) within the `app` directory. Each concept has its own directory, which is a route group, like `(concepts)/vault`. This allows us to create a shared layout for all concepts while keeping their pages separate.

2.  **Middleware:** The `middleware.ts` file is used to inspect incoming requests and rewrite the URL to the appropriate route group. For example, a request to `/vault` is rewritten to `/(concepts)/vault`.

3.  **Theming:** A shared layout file, `src/app/(concepts)/layout.tsx`, is used to apply a theme to each concept. The layout determines the current concept from the URL and applies a corresponding CSS class to the `body` element. This allows us to use Tailwind CSS to style each concept differently.

4.  **Shared Components:** Components that are shared across all concepts, such as headers, footers, and product carousels, can be placed in the `src/components` directory.

**Configuration:**
```typescript
`next.config.ts`: No special configuration is needed in this file for the multi-tenant architecture to work.
`tailwind.config.ts`: To enable theme-specific styling, you can use CSS variables in your Tailwind configuration. The `theme` object in your `tailwind.config.ts` file can be extended to include theme-specific colors, fonts, and other design tokens.
`tsconfig.json`: Ensure that the `paths` alias is configured to allow for easy importing of modules from the `src` directory, like `"@/*": ["./src/*"]`.
```

**Potential Pitfalls:**
*   **Scalability:** As the number of concepts and pages grows, the middleware can become a bottleneck. It's important to keep the middleware as lightweight as possible and to offload any heavy logic to API routes or server components.
*   **Theming:** Managing a large number of themes can be complex. It's recommended to use a design token-based approach to theming, where each theme is defined by a set of design tokens (e.g., colors, fonts, spacing). This makes it easier to manage and update themes.
*   **Data Isolation:** While this architecture allows for a single codebase, it's important to ensure that data is properly isolated between tenants. This can be achieved by using a database that supports multi-tenancy, such as PostgreSQL with row-level security, or by using a separate database for each tenant.

**Sources:**
*   [Next.js Documentation: Multi-tenancy](https://nextjs.org/docs/app/guides/multi-tenant)
*   [Vercel Platforms Starter Kit](https://vercel.com/templates/next.js/platforms-starter-kit)
*   [GitHub - vercel/platforms](https://github.com/vercel/platforms)

### Next.js 14 dynamic theming with CSS variables

**Findings & Recommended Approach:**
# Dynamic Theming in Next.js 14+ with CSS Variables and Tailwind CSS

This document outlines a production-grade approach to implementing dynamic theming in a Next.js 14+ application using CSS variables and Tailwind CSS. This method is designed to be scalable for a large multi-site platform with numerous pages and products, allowing for concept-specific color palettes, fonts, and design tokens that change per route group.

## Recommended Approach

The core of this architecture is the use of CSS custom properties (variables) to define theme attributes, which are then dynamically applied based on the current route. This is achieved by leveraging Next.js's App Router, specifically its layout and template capabilities.

### 1. Centralized Theme Definitions

All theme-specific variables are defined in a central file, such as `lib/themes.ts`. This makes it easy to manage and update themes without having to search through multiple files. Each theme is an object containing a set of CSS variables and their corresponding values.

### 2. Global Styles and Theme Scoping

The global stylesheet, `app/globals.css`, is used to define the default theme and to create `[data-theme='...']` selectors for each theme. This allows for the dynamic switching of themes by changing the `data-theme` attribute on the `<html>` element.

### 3. ThemeProvider Component

A client-side `ThemeProvider` component is responsible for applying the correct theme. It takes a `theme` prop and uses the `useEffect` hook to set the `data-theme` attribute on the `<html>` element. It also persists the user's theme preference in `localStorage` for a consistent experience across sessions.

### 4. Per-Route Theming with Layouts

Next.js's App Router allows for the creation of route-specific layouts. By creating a `layout.tsx` file within each route group (e.g., `app/(concepts)/concept1/layout.tsx`), we can wrap the content of that route with the `ThemeProvider` and pass the desired theme name as a prop. This ensures that all pages within that route group will have the specified theme applied.

### 5. Tailwind CSS Integration

The `tailwind.config.ts` file is configured to use the CSS variables defined in the global stylesheet. This is done by using the `var()` function in the `theme.extend.colors` section of the configuration. This allows for the use of semantic class names like `bg-background` and `text-primary` throughout the application, which will automatically adapt to the current theme.

This approach provides a robust and scalable solution for dynamic theming in a large-scale Next.js application. It promotes a clean separation of concerns, making the codebase easier to maintain and extend.

**Configuration:**
```typescript
## Configuration Files

### 1. `tailwind.config.ts`

This file is crucial for integrating the CSS variables with Tailwind CSS. The `theme.extend.colors` object is where the magic happens, mapping Tailwind's color names to the CSS variables.

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

### 2. `app/globals.css`

This file defines the CSS variables for each theme. The `:root` selector contains the default theme, and `[data-theme='...']` selectors define the variables for each concept.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #000000;
  --primary: #000000;
  --primary-foreground: #ffffff;
}

[data-theme='concept1'] {
  --background: #ffffff;
  --foreground: #000000;
  --primary: #ff0000;
  --primary-foreground: #ffffff;
}

[data-theme='concept2'] {
  --background: #000000;
  --foreground: #ffffff;
  --primary: #00ff00;
  --primary-foreground: #000000;
}
```

### 3. `app/lib/themes.ts`

This file centralizes the theme definitions, making them easy to manage and extend.

```typescript
export const themes = {
  concept1: {
    '--background': '#ffffff',
    '--foreground': '#000000',
    '--primary': '#ff0000',
    '--primary-foreground': '#ffffff',
  },
  concept2: {
    '--background': '#000000',
    '--foreground': '#ffffff',
    '--primary': '#00ff00',
    '--primary-foreground': '#000000',
  },
};

export type ThemeName = keyof typeof themes;
```
```

**Potential Pitfalls:**
## Potential Pitfalls and Solutions

### 1. Flashing of Default Theme on Initial Load

**Pitfall:** When a user visits a page for the first time, there might be a brief moment where the default theme is visible before the correct theme is applied by the `ThemeProvider`. This is because the `useEffect` hook in the `ThemeProvider` runs on the client-side after the initial render.

**Solution:** To prevent this, you can use a script in the `<head>` of your `app/layout.tsx` to set the `data-theme` attribute before the page content is rendered. This script can read the theme from `localStorage` and apply it immediately.

```javascript
// app/layout.tsx
<head>
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          function getInitialTheme() {
            const persistedTheme = window.localStorage.getItem('theme');
            const hasPersistedTheme = typeof persistedTheme === 'string';
            if (hasPersistedTheme) {
              return persistedTheme;
            }
            const mql = window.matchMedia('(prefers-color-scheme: dark)');
            const hasMediaQueryPreference = typeof mql.matches === 'boolean';
            if (hasMediaQueryPreference) {
              return mql.matches ? 'dark' : 'light';
            }
            return 'light';
          }
          const theme = getInitialTheme();
          document.documentElement.setAttribute('data-theme', theme);
        })()
      `,
    }}
  />
</head>
```

### 2. Managing a Large Number of Themes

**Pitfall:** As the number of concepts and themes grows, the `globals.css` file can become large and difficult to manage.

**Solution:** To address this, you can split your theme definitions into separate CSS files (e.g., `themes/concept1.css`, `themes/concept2.css`) and import them into your `globals.css` file. This keeps the main stylesheet clean and organized.

### 3. Ensuring Type Safety

**Pitfall:** When working with a large number of themes and variables, it can be easy to make typos or introduce inconsistencies.

**Solution:** Using TypeScript to define your themes and theme names, as shown in the `lib/themes.ts` file, helps to ensure type safety and prevent errors. This allows for autocompletion and compile-time checks, making the development process more robust.

**Sources:**
https://medium.com/@jaykumarv2605/theme-design-system-with-css-variables-in-tailwind-next-js-885a88da1f2a
https://github.com/tailwindlabs/tailwindcss/discussions/18022

### Scalable product data architecture for Next.js e-commerce

**Findings & Recommended Approach:**
# Scalable Product Data Architecture for a Luxury Jewelry Platform

This document outlines a production-grade data architecture for a multi-concept luxury jewelry e-commerce platform built with Next.js 14+. The proposed architecture is designed to be scalable, maintainable, and performant, capable of handling a large product catalog and multiple themed concepts.

## 1. Recommended Approach: Headless CMS with GraphQL

For a scalable and flexible e-commerce platform, a **headless CMS** approach is strongly recommended. This decouples the frontend (Next.js) from the backend (product and content management), allowing for greater flexibility and independent development cycles. A headless CMS provides a centralized location to manage all product data, collections, and concepts, and exposes this data through an API.

**GraphQL** is the recommended API query language for this architecture. It allows the frontend to request only the data it needs, reducing payload sizes and improving performance. This is particularly important for a content-rich site with complex data relationships, such as a luxury jewelry platform.

Several headless CMS options are available, including:

*   **Shopify:** A popular e-commerce platform with a robust GraphQL API. It's a good choice if you need a complete e-commerce solution with inventory management, payment processing, and shipping integrations.
*   **Hygraph (formerly GraphCMS):** A GraphQL-native headless CMS that offers a high degree of flexibility for data modeling. It's an excellent choice for content-rich applications with complex data structures.
*   **Contentful:** A popular headless CMS with a user-friendly interface and a powerful API.
*   **Sanity:** A flexible and customizable headless CMS that is well-suited for complex content models.

For this project, we will use a generic headless CMS approach that can be adapted to any of these platforms. The examples will use GraphQL for data fetching.

## 2. Data Modeling with TypeScript

A well-defined data model is crucial for a scalable e-commerce platform. The following TypeScript interfaces define the core data entities for the luxury jewelry platform:

### 2.1. `Product` Interface

The `Product` interface defines the structure of a single jewelry product. It includes fields for basic product information, pricing, inventory, and relationships to other data entities.

```typescript
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: Image[];
  price: number;
  sku: string;
  stock: number;
  collections: Collection[];
  concept: Concept;
  materials: Material[];
  gemstones: Gemstone[];
  relatedProducts: Product[];
}
```

### 2.2. `Collection` Interface

The `Collection` interface defines a group of products. This can be used to create thematic collections of jewelry, such as "The Bridal Collection" or "The Summer Collection."

```typescript
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: Image;
  products: Product[];
}
```

### 2.3. `Concept` Interface

The `Concept` interface defines one of the 10 themed concepts of the jewelry platform. Each concept will have its own set of products and collections.

```typescript
export interface Concept {
  id: string;
  name: string;
  slug: string;
  description: string;
  heroImage: Image;
  products: Product[];
  collections: Collection[];
}
```

### 2.4. Supporting Interfaces

The following interfaces support the core data models:

```typescript
export interface Image {
  url: string;
  alt: string;
}

export interface Material {
  id: string;
  name: string;
}

export interface Gemstone {
  id: string;
  name: string;
  shape: string;
  carat: number;
}
```

## 3. Project Structure

A well-organized project structure is essential for maintainability and scalability. The following structure is recommended for this project, based on the `src/` directory and a feature-driven approach:

```
src/
├── app/                 # Next.js App Router structure
├── components/          # All your React components
│   ├── common/          # Reusable global components (Modal, Tooltip)
│   ├── layout/          # Layout-specific components (Header, Footer, Navbar)
│   ├── concepts/        # Components specific to a concept
│   ├── products/        # Components specific to products
│   └── ui/              # UI primitives (Button, Input, Select)
├── lib/                 # Business logic (authentication, API wrappers)
│   ├── api.ts           # GraphQL API fetching logic
│   └── types.ts         # TypeScript interfaces
├── hooks/               # Custom React hooks
└── styles/              # Global styles and Tailwind CSS configuration
```

## 4. Data Fetching

Data fetching will be handled by a dedicated function in `src/lib/api.ts`. This function will use `fetch` to send GraphQL queries to the headless CMS API.

```typescript
// src/lib/api.ts
import { Product, Collection, Concept } from './types';

const API_URL = process.env.GRAPHQL_API_URL!;
const API_TOKEN = process.env.GRAPHQL_API_TOKEN!;

async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (API_TOKEN) {
    headers['Authorization'] = `Bearer ${API_TOKEN}`;
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getAllProducts(): Promise<Product[]> {
  const data = await fetchAPI(`
    query {
      products {
        id
        name
        slug
        price
        images {
          url
          alt
        }
      }
    }
  `);
  return data.products;
}

// Add more functions to fetch collections, concepts, and individual products
```

This `fetchAPI` function can then be used in Server Components to fetch data on the server, ensuring that the pages are pre-rendered with the necessary data.

**Configuration:**
```typescript
# Configuration

This document outlines the necessary configuration for the Next.js e-commerce platform.

## 1. Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

```
GRAPHQL_API_URL="your-graphql-api-url"
GRAPHQL_API_TOKEN="your-graphql-api-token"
```

*   `GRAPHQL_API_URL`: The URL of your headless CMS's GraphQL API endpoint.
*   `GRAPHQL_API_TOKEN`: The access token for your headless CMS's API. This is optional, depending on whether your API requires authentication.

## 2. TypeScript Configuration

Ensure your `tsconfig.json` file is configured to support the project structure and aliases. Here is a sample configuration:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["src/components/*"],
      "@/lib/*": ["src/lib/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/styles/*": ["src/styles/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```
```

**Potential Pitfalls:**
# Potential Pitfalls and Solutions

This document outlines potential pitfalls of the proposed architecture and provides solutions to mitigate them.

## 1. Over-fetching or Under-fetching Data

*   **Pitfall:** With a complex data model, it's easy to either fetch too much data, leading to slow performance, or too little data, requiring additional API calls.
*   **Solution:** Use GraphQL to its full potential. Create specific queries for each component's data requirements. This ensures that you only fetch the data you need, when you need it.

## 2. N+1 Query Problem

*   **Pitfall:** When fetching a list of items (e.g., products) and then fetching related data for each item in a loop (e.g., collections for each product), you can end up with a large number of API calls, which is inefficient.
*   **Solution:** Use a data loader pattern. A data loader batches and caches database queries, so that you can load related data for multiple items in a single API call. Many headless CMS platforms have built-in support for data loaders.

## 3. State Management Complexity

*   **Pitfall:** As the application grows, managing state can become complex. Prop-drilling (passing props down through multiple levels of components) can make the code difficult to maintain.
*   **Solution:** For global state, such as the shopping cart or user authentication, use a state management library like Zustand or Redux. For local state, use React's built-in `useState` and `useReducer` hooks.

## 4. Image Optimization

*   **Pitfall:** High-resolution images are essential for a luxury jewelry website, but they can also lead to slow page load times.
*   **Solution:** Use Next.js's built-in Image component. It automatically optimizes images for different screen sizes and formats, and it supports lazy loading. Also, consider using a CDN to serve images.

## 5. Scalability of the Headless CMS

*   **Pitfall:** Not all headless CMS platforms are created equal. Some may not be able to handle a large number of products or high traffic volumes.
*   **Solution:** Choose a headless CMS that is known for its scalability and performance. Look for features like auto-scaling, caching, and a global CDN.

## 6. Security

*   **Pitfall:** A headless architecture introduces new security considerations. You need to secure both the frontend and the backend.
*   **Solution:** Use a secure authentication method for your API, such as OAuth 2.0. Implement rate limiting to prevent abuse. And, of course, keep your dependencies up to date.

**Sources:**
*   https://vercel.com/kb/guide/building-ecommerce-sites-with-next-js-and-shopify
*   https://dev.to/melvinprince/the-complete-guide-to-scalable-nextjs-architecture-39o0
*   https://hygraph.com/blog/nextjs-ecommerce

### Next.js 14+ SEO Best Practices for E-commerce

**Findings & Recommended Approach:**
# Next.js 14+ SEO Best Practices

## Metadata API

Next.js 14 introduces a new Metadata API that allows for defining application metadata for improved SEO and web shareability. This can be done through a static `metadata` object or a dynamic `generateMetadata` function.

### Static Metadata

To define static metadata, you export a `Metadata` object from a `layout.js` or `page.js` file. This is useful for pages with static content.

```typescript
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vault-Maison',
  description: 'Luxury Jewelry',
}
```

### Dynamic Metadata

The `generateMetadata` function allows you to fetch metadata that depends on dynamic data, such as the current route parameters. This is ideal for product pages or blog posts.

```typescript
// app/products/[slug]/page.tsx
import type { Metadata } from 'next'

async function getProduct(slug: string) {
  // Fetch product data from an API or database
  const product = await fetch(`https://api.example.com/products/${slug}`).then((res) => res.json())
  return product
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug)
  return {
    title: product.name,
    description: product.description,
  }
}
```

## Open Graph (OG) Images

OG images are used to represent your site on social media. You can add static or dynamically generated OG images.

### Static OG Images

Create an `opengraph-image.jpg` file in the root of the `app` folder or in a specific route's folder.

### Dynamic OG Images

The `ImageResponse` constructor allows you to generate dynamic OG images using JSX and CSS. This is useful for creating unique images for each product.

```typescript
// app/products/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  // Fetch product data
  const product = await fetch(`https://api.example.com/products/${params.slug}`).then((res) => res.json())

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {product.name}
      </div>
    ),
    {
      ...size,
    }
  )
}
```


## `generateMetadata` Function

The `generateMetadata` function is a powerful tool for creating dynamic metadata that depends on factors like the current route parameters, external data, or metadata from parent segments. It's an `async` function that returns a `Metadata` object.

### Parameters

- `params`: An object containing the dynamic route parameters.
- `searchParams`: An object containing the current URL's search parameters.
- `parent`: A promise of the resolved metadata from parent route segments. This allows you to extend rather than replace parent metadata.

### Example with Parent Metadata

```typescript
// app/products/[id]/page.tsx
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}
```

### Title Template

You can use `title.template` to add a prefix or suffix to titles defined in child route segments. This is useful for branding.

```typescript
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Vault-Maison',
    default: 'Vault-Maison',
  },
}
```


## JSON-LD for Structured Data

JSON-LD is a format for structured data that helps search engines understand the content of a page. For an e-commerce site, this is crucial for rich results in search listings.

### Implementation

The recommended approach is to render a `<script>` tag with `type="application/ld+json"` in your `page.js` components. The content of the script should be a JSON object with the structured data.

To prevent XSS vulnerabilities, it is important to sanitize the JSON-LD payload. The Next.js documentation recommends replacing `<` with `\u003c`.

```typescript
// app/products/[id]/page.tsx
import { Product, WithContext } from 'schema-dts'

export default async function Page({ params }) {
  const { id } = await params
  const product = await getProduct(id)

  const jsonLd: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
    }
  }

  return (
    <section>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      {/* ... */}
    </section>
  )
}
```

### Typing with `schema-dts`

To ensure the correctness of your structured data, you can use the `schema-dts` package to type your JSON-LD objects in TypeScript.

**Configuration:**
```typescript
## Configuration

### `next.config.js`

No specific configuration is required in `next.config.js` for the Metadata API, JSON-LD, or sitemap generation to work. However, you can add a `rewrites` rule to make the sitemap available at `/sitemap.xml`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
};

module.exports = nextConfig;
```

### `tsconfig.json`

To use `schema-dts` for typing your JSON-LD, you need to install it as a dev dependency:

```bash
npm install schema-dts --save-dev
```

No special configuration is needed in `tsconfig.json`.

### Environment Variables

Create a `.env.local` file in the root of your project to store your base URL:

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

In production, you should set this to your actual domain.
```

**Potential Pitfalls:**
## Potential Pitfalls and Solutions

### 1. Large Sitemaps

*   **Problem**: A sitemap has a limit of 50,000 URLs. With 1000+ products and 100 pages, the sitemap could exceed this limit as the product catalog grows.
*   **Solution**: Create a sitemap index file that points to multiple sitemap files. Each sitemap file can contain up to 50,000 URLs. This can be achieved by creating a `sitemap.xml/route.ts` that generates the sitemap index, and then a `sitemap/[page]/route.ts` that generates the individual sitemaps.

### 2. Performance of `generateMetadata`

*   **Problem**: The `generateMetadata` function is called for every page request. If it performs slow database queries or API calls, it can significantly slow down page load times.
*   **Solution**: Use the `cache` function from React to memoize data fetching functions. This ensures that the data is fetched only once per request, even if it's used in both `generateMetadata` and the page component. Additionally, use `revalidate` to control how often the data is re-fetched.

### 3. Incorrect JSON-LD Schema

*   **Problem**: Incorrectly structured JSON-LD can lead to errors in search engine consoles and prevent rich snippets from being displayed.
*   **Solution**: Use the `schema-dts` package to get TypeScript types for your JSON-LD objects. This provides autocompletion and type checking to ensure the schema is correct. Additionally, use Google's Rich Results Test and the Schema Markup Validator to test your structured data.

### 4. OG Image Generation Time

*   **Problem**: Generating OG images on the fly with `ImageResponse` can be slow, especially for complex images.
*   **Solution**: For static pages, generate the OG images at build time. For dynamic pages, consider a hybrid approach where you have a default OG image and then generate a more specific one in the background. You can also pre-generate OG images for all your products and store them in a CDN.

**Sources:**
https://nextjs.org/docs/app/getting-started/metadata-and-og-images
https://nextjs.org/docs/app/api-reference/functions/generate-metadata
https://nextjs.org/docs/app/guides/json-ld
https://raddy.dev/blog/nextjs-14-dynamic-xml-sitemap/

### Next.js 14 Image Optimization for Luxury E-commerce

**Findings & Recommended Approach:**
# Production-Grade Next.js Image Optimization for Luxury E-commerce

## 1. Introduction to Next.js Image Optimization

The `next/image` component in Next.js is a powerful tool that automates many aspects of image optimization, which is critical for luxury e-commerce websites where high-quality visuals are paramount. It extends the standard HTML `<img>` element to provide a range of features designed to improve performance and user experience. These features include size optimization, which serves appropriately sized images in modern formats like WebP and AVIF; visual stability, which prevents layout shifts during page load; and lazy loading, which defers the loading of off-screen images until they are needed. For a luxury brand like Vault-Maison, leveraging these capabilities is essential to creating a fast, visually stunning, and engaging online experience.

## 2. Recommended Approach for Vault-Maison

For the Vault-Maison platform, a multi-faceted approach to image optimization is recommended. This approach will ensure that the website is both visually impressive and highly performant, which is crucial for attracting and retaining customers in the luxury market. The strategy involves a combination of `next/image` component configuration, a well-defined image sizing strategy, and the use of modern image formats and placeholders.

A key aspect of this strategy is the use of the `sizes` attribute to provide the browser with information about the image's rendered size at different breakpoints. This allows the browser to select the most appropriate image from the `srcset`, ensuring that users on all devices receive a high-quality image that is optimized for their screen size. Additionally, for critical images such as the hero images on product detail pages, the `priority` prop will be used to ensure that they are loaded as quickly as possible, improving the Largest Contentful Paint (LCP) time.

**Configuration:**
```typescript
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

module.exports = nextConfig;
```
```

**Potential Pitfalls:**
- **Large Original Image Sizes**: Even with Next.js's optimization, starting with excessively large images can lead to slower build times and increased server load. It is recommended to resize images to a reasonable maximum resolution before uploading them to a CMS or including them in the project.

- **Incorrect `sizes` Attribute**: The `sizes` attribute is crucial for ensuring that the browser downloads the correct image size. An incorrectly configured `sizes` attribute can result in images that are too large or too small for the user's viewport. It is important to carefully analyze the layout and define the `sizes` attribute accordingly for each image component.

- **Forgetting the `priority` Prop**: Forgetting to add the `priority` prop to LCP images can negatively impact the page's loading performance. It is essential to identify the LCP element on each page and apply the `priority` prop to ensure that it is loaded as quickly as possible.

- **Generic Placeholders**: While the shimmer effect is a good default, for a luxury brand like Vault-Maison, a more visually appealing placeholder, such as a low-resolution version of the actual image, might be preferable. This can be achieved using libraries like `plaiceholder` to generate base64-encoded blurred images.

- **Insecure `remotePatterns` Configuration**: When using remote images, it is crucial to configure the `remotePatterns` in `next.config.js` as restrictively as possible to prevent malicious users from using your image optimization service with their own images. Avoid using wildcards in the hostname and pathname whenever possible.

**Sources:**
- [Next.js Documentation: Image Optimization](https://nextjs.org/docs/app/getting-started/images)
- [Next.js Image Optimization — Responsive Images for Ecommerce | Prateeksha Web Design](https://prateeksha.com/blog/nextjs-image-optimization-responsive-ecommerce-portfolio)

### Framer Motion production patterns for luxury websites

**Findings & Recommended Approach:**
This research provides a production-ready approach to implementing Framer Motion animations in a Next.js 14+ application. The key findings are:

*   **Page Transitions:** `AnimatePresence` is the cornerstone of page transitions. By wrapping the page content in `AnimatePresence` and providing a unique `key` (like the page's pathname), we can define `enter` and `exit` animations for smooth transitions between pages. The `mode='wait'` prop is essential for ensuring one page animates out before the next animates in.

*   **Scroll-Triggered Animations:** The `whileInView` prop provides a simple yet powerful way to trigger animations as elements enter the viewport. For more complex scenarios, the `useInView` hook offers greater control. Combining these with a custom easing curve, such as `[0.6, 0.01, -0.05, 0.95]`, can create a sophisticated and luxurious feel.

*   **Stagger Effects:** Framer Motion's `staggerChildren` transition property makes it easy to create staggered animations for lists of elements. This can be used to draw attention to a series of items in a visually appealing way.

*   **Luxury Easing Curves:** The `cubic-bezier` timing function is crucial for creating a high-end feel. Instead of using standard easing functions like `ease-in-out`, custom curves can be defined to create unique and refined animations. The website `cubic-bezier.com` is an excellent tool for visualizing and creating these curves.

**Configuration:**
```typescript
Key configuration files:

*   `package.json`: Defines project dependencies including `framer-motion`, `next`, `react`, `tailwindcss`, and `typescript`.
*   `tailwind.config.ts`: Configures Tailwind CSS, including theme extensions and plugins.
*   `/app/layout.tsx`: The main layout file where the `PageTransition` component is used to wrap the application and provide page transitions.
*   `/components/animations/PageTransition.tsx`:  This component uses `AnimatePresence` to manage enter and exit animations for page transitions.
```

**Potential Pitfalls:**
*   **Performance:** Overusing complex animations can lead to performance issues, especially on low-end devices. It's important to use animations judiciously and to test performance regularly.
*   **Accessibility:** Animations can be problematic for users with vestibular disorders. It's crucial to respect the `prefers-reduced-motion` media query and to provide a way for users to disable animations.
*   **Bundle Size:** Framer Motion is a feature-rich library, but it can add to the bundle size. Use tree-shaking and code-splitting to ensure that only the necessary code is loaded.
*   **Server-Side Rendering (SSR):** When using Framer Motion with Next.js, it's important to be mindful of SSR. Some animations may not work as expected on the server. Use the `"use client";` directive at the top of files that use Framer Motion components.

**Sources:**
*   https://motion.dev/
*   https://motion.dev/docs/react
*   https://motion.dev/docs/react-animate-presence
*   https://motion.dev/docs/react-scroll-animations
*   https://www.awwwards.com/websites/motion/
*   https://www.framer.com/blog/website-animation-examples/
*   https://cubic-bezier.com/

### Google Fonts loading in Next.js 14 for luxury typography

**Findings & Recommended Approach:**
The recommended approach for loading Google Fonts in a Next.js 14+ application is to use the `next/font` module. This module offers several advantages, including automatic self-hosting of fonts, which eliminates external network requests to Google, thereby improving both performance and privacy. By serving fonts from the same domain as the application, `next/font` also prevents layout shift, a common issue with web fonts.

For a multi-concept luxury jewelry platform like Vault-Maison, where typography is a critical element of the brand identity, using a variety of elegant fonts such as Cinzel, Inter, and Cormorant Garamond is essential. The `next/font` module simplifies the process of using multiple fonts. The best practice is to create a dedicated file (e.g., `fonts.ts`) to import and configure the desired fonts from `next/font/google`. Each font is then exported as a constant.

To make the fonts available globally, they should be imported into the root layout file (`layout.tsx`). By defining CSS variables for each font and applying them to the `<body>` element, the fonts can be easily accessed and used throughout the application. This approach allows for a clean and maintainable way to manage typography, ensuring a consistent and luxurious user experience across all 100+ pages of the website.

**Configuration:**
```typescript
### `fonts.ts`

This file is responsible for importing and configuring the Google Fonts that will be used throughout the application. Each font is imported from `next/font/google` and configured with the desired subsets, weights, and a CSS variable for easy reference in your stylesheets.

```typescript
import { Inter, Cinzel, Cormorant_Garamond } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
});

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cormorant-garamond',
});
```

### `layout.tsx`

In the root layout, the configured fonts are imported and their CSS variables are applied to the `<body>` element. This makes the fonts globally available across the entire application.

```typescript
import './globals.css';
import { inter, cinzel, cormorantGaramond } from './fonts';

export const metadata = {
  title: 'Vault-Maison',
  description: 'Luxury Jewelry',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzel.variable} ${cormorantGaramond.variable}`}>
        {children}
      </body>
    </html>
  );
}
```

### `globals.css`

This file defines the CSS variables for the fonts and sets the default font for the application. You can also define classes to easily apply different fonts to specific elements.

```css
:root {
  --font-inter: 'Inter', sans-serif;
  --font-cinzel: 'Cinzel', serif;
  --font-cormorant-garamond: 'Cormorant Garamond', serif;
}

body {
  font-family: var(--font-inter);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-cinzel);
}
```
```

**Potential Pitfalls:**
### 1. Incorrect Font Weights

**Pitfall:** Specifying a font weight that is not available for the selected Google Font can lead to the font not rendering as expected, or falling back to a default system font. This can be a common issue when working with a wide range of fonts, each with its own set of available weights.

**Solution:** Always refer to the Google Fonts website for the specific font you are using to see the available weights. For example, the `Cormorant Garamond` font is available in several weights, so you can specify them as an array in the font configuration. If you are using a variable font, you don't need to specify a weight.

### 2. Not Utilizing Variable Fonts

**Pitfall:** Using static font files instead of variable fonts can result in lower performance and less flexibility. Each static font file contains a single weight, so loading multiple weights requires multiple network requests. This can increase the initial page load time and negatively impact the user experience.

**Solution:** Whenever possible, opt for variable fonts. They provide a wider range of styles with a single font file, reducing the number of requests and improving performance. The `next/font` module fully supports variable fonts, making them easy to implement.

### 3. Font Loading Issues in Development

**Pitfall:** There have been occasional reports of fonts not loading correctly in the local development environment. This can manifest as fonts reverting to system defaults, even with the correct configuration. The root cause can be related to caching or hot-reloading issues.

**Solution:** If you encounter this issue, try the following steps:

*   Restart the Next.js development server.
*   Clear the `.next` cache directory by running `rm -rf .next` in your project's root directory.
*   Ensure that your font import and configuration are correct and that there are no typos.

### 4. Managing a Large Number of Fonts

**Pitfall:** As the number of fonts in a project grows, managing them can become cumbersome. Defining all fonts in the `layout.tsx` file can lead to a cluttered and less maintainable codebase.

**Solution:** To keep your code organized, create a dedicated file (e.g., `fonts.ts`) to define and export all your fonts. This approach centralizes your font management and makes it easier to add, remove, or update fonts as your project evolves. This is the approach demonstrated in the implementation code.

### 5. Cumulative Layout Shift (CLS)

**Pitfall:** Although `next/font` is designed to prevent layout shift by preloading and self-hosting fonts, incorrect implementation can still lead to CLS. This can happen if the font's `className` is not applied to the correct element, or if there are conflicting styles.

**Solution:** To avoid layout shift, ensure that you apply the font's `className` to the `<html>` or `<body>` tag in your root layout. This ensures that the font is loaded and applied before the rest of the page content is rendered. Also, be mindful of any global CSS that might override the font styles and cause unexpected layout shifts.

**Sources:**
https://nextjs.org/docs/app/getting-started/fonts
https://medium.com/@dolce-emmy/integrating-multiple-google-fonts-in-a-next-js-14-project-a-step-by-step-guide-ef051f3264e1

### i18n-ready architecture in Next.js 14+

**Findings & Recommended Approach:**
The recommended approach for building an i18n-ready architecture in a Next.js 14+ application, without relying on a full-fledged i18n library, is to leverage Next.js's built-in internationalization features. This approach is based on the official Next.js documentation and is suitable for production environments.

The core of this architecture consists of three main parts:

1.  **Middleware for Locale Detection**: A middleware is used to detect the user's preferred locale based on the `Accept-Language` header. If a locale is not present in the URL, the middleware redirects the user to the appropriate locale-specific URL.

2.  **Dynamic Routing**: The application's routes are structured to include a `[lang]` parameter, which allows for dynamic handling of different locales.

3.  **Dictionary-based Translations**: Translatable strings are stored in JSON files, with one file for each supported locale. A helper function is used to load the appropriate dictionary based on the current locale.

**Configuration:**
```typescript
Key configuration files:

*   `i18n-config.ts`: Defines the supported locales and the default locale.
*   `middleware.ts`: Handles locale detection and redirection.
*   `dictionaries/`: This directory stores the translation files in JSON format, with one file per locale.
```

**Potential Pitfalls:**
*   **Managing Large Translation Files**: As the application grows, the translation files can become very large and difficult to manage. To mitigate this, it is recommended to split the translation files into smaller, more manageable chunks, for example, by feature or page.

*   **Keeping Dictionaries in Sync**: When adding new strings, it is crucial to ensure that they are added to all translation files. This can be a manual and error-prone process. To avoid this, consider using a script to automatically check for missing keys in the translation files.

**Sources:**
https://nextjs.org/docs/app/guides/internationalization

### E-commerce cart and wishlist state management in Next.js 14

**Findings & Recommended Approach:**
For managing e-commerce cart and wishlist state in a Next.js 14+ application, a client-side approach using Zustand is recommended. Zustand is a lightweight and scalable state management library that provides a simple API for creating and managing state. By leveraging Zustand's `persist` middleware, the cart and wishlist data can be easily saved to the browser's `localStorage`, ensuring that the user's selections are preserved across sessions. To address the common issue of hydration mismatch in server-rendered applications, a custom `useHydration` hook is implemented. This hook ensures that components relying on client-side state are only rendered on the client, preventing inconsistencies between the server- and client-rendered output.

**Configuration:**
```typescript
1. **Install Zustand:**
   ```bash
   npm install zustand
   ```

2. **`tsconfig.json`:**
   Ensure your `tsconfig.json` is configured for a Next.js project. No specific changes are required for Zustand.
```

**Potential Pitfalls:**
- **Hydration Mismatch:** When using client-side state with Next.js, a hydration mismatch can occur between the server-rendered and client-rendered content. This can be resolved by creating a `useHydration` hook that delays the rendering of client-dependent UI until the component has mounted on the client.

- **Large LocalStorage Size:** For a large number of products in the cart or wishlist, the size of the data stored in `localStorage` can become a concern. It is important to monitor the storage size and consider strategies like data compression or using a more advanced storage solution if needed.

- **State Synchronization Across Tabs:** Zustand's `persist` middleware does not automatically sync state across multiple browser tabs. For a seamless user experience, a custom solution using the `BroadcastChannel` API or a library like `zustand-broadcast` can be implemented to keep the cart and wishlist state consistent across all open tabs.

**Sources:**
https://hackernoon.com/how-to-build-a-shopping-cart-with-nextjs-and-zustand-state-management-with-typescript
https://medium.com/@reactjsbd/building-a-production-ready-e-commerce-platform-with-next-js-16-inside-shopcart-pro-213eba59e6bd
https://github.com/ljaviertovar/shopping-cart-nextjs-zustand

### Next.js 14+ Production Architecture Patterns

**Findings & Recommended Approach:**
## Next.js 14+ Production Architecture for Large-Scale Applications

This document outlines a production-ready architecture for a large-scale Next.js 14+ application, such as the Vault-Maison luxury jewelry platform with 10 concepts and 100+ pages. The recommendations are based on official documentation from Next.js and Vercel, focusing on build optimization, bundle analysis, performance metrics, and deployment configuration.

### Build Optimization

Build optimization is crucial for a fast and responsive user experience. The following strategies are recommended:

*   **Code-splitting:** Next.js automatically performs code-splitting by route segments. This means that only the necessary JavaScript for the current page is loaded, reducing the initial bundle size. For a large site with many pages, this is a critical feature.
*   **Lazy Loading:**  Client Components and third-party libraries should be lazy-loaded to defer the loading of non-essential resources. This can be achieved using `next/dynamic` for components and dynamic `import()` for libraries.
*   **Bundle Analysis:** Use the `@next/bundle-analyzer` plugin to visualize the size of your JavaScript bundles. This helps identify large dependencies that can be optimized or replaced. Regularly analyzing your bundles is essential to prevent performance regressions as the application grows.

### Performance Metrics and Core Web Vitals

Monitoring performance metrics is essential for maintaining a high-quality user experience. The following tools and techniques are recommended:

*   **Lighthouse:** Use Lighthouse in an incognito browser window to simulate a user's experience and identify performance bottlenecks. This provides a good baseline for your site's performance.
*   **Core Web Vitals:** Track Core Web Vitals (LCP, FID, CLS) to understand real-user performance. The `useReportWebVitals` hook in Next.js can be used to send this data to an analytics service.
*   **Vercel Analytics:** Vercel provides built-in analytics that track Core Web Vitals and other performance metrics, offering a comprehensive view of your application's performance in production.

### Vercel Deployment Configuration

Vercel is the recommended platform for deploying Next.js applications due to its tight integration and zero-configuration setup. The following Vercel features are particularly beneficial for large-scale applications:

*   **Incremental Static Regeneration (ISR):** ISR allows you to update static content without a full site rebuild. This is ideal for a site with thousands of products, where product information may change frequently. You can set a revalidation period for each page, ensuring that the content is always up-to-date without sacrificing the benefits of static generation.
*   **Streaming:**  Streaming with Server Components and Suspense allows you to send UI from the server to the client in chunks. This improves the perceived performance of pages with a lot of data, as the user will see content progressively instead of waiting for the entire page to load.
*   **Image Optimization:** Vercel's built-in Image Optimization service automatically optimizes images on demand, serving them in modern formats like WebP and resizing them for different devices. This is essential for a luxury jewelry website with high-resolution product images.

**Configuration:**
```typescript
## Configuration Files and Settings

This section details the key configuration files and settings for the recommended Next.js 14+ production architecture.

### `next.config.mjs`

This file is used to configure Next.js. For a production environment, it's recommended to include the `@next/bundle-analyzer` to help with bundle size analysis.

```javascript
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js configuration options here
};

export default bundleAnalyzer(nextConfig);
```

To run the bundle analyzer, you need to set the `ANALYZE` environment variable to `true` when building your application:

```bash
ANALYZE=true npm run build
```

### Vercel Project Settings

When deploying to Vercel, the following settings are recommended:

*   **Framework Preset:**  Set to "Next.js". Vercel will automatically detect and configure the project for optimal performance.
*   **Environment Variables:**  Store sensitive information like API keys and database credentials as environment variables in the Vercel project settings. Do not commit these to your Git repository.
*   **Build & Development Settings:**  The default settings are usually sufficient. However, you can customize the build command if needed.
```

**Potential Pitfalls:**
## Potential Pitfalls and Solutions

This section outlines potential pitfalls when building and deploying a large-scale Next.js application and provides solutions to avoid them.

### 1. Large Bundle Sizes

*   **Pitfall:** As an application grows, so does its JavaScript bundle size. Large bundles can significantly slow down page load times and negatively impact the user experience.
*   **Solution:**
    *   **Regularly analyze your bundles:** Use the `@next/bundle-analyzer` to identify large dependencies and opportunities for optimization.
    *   **Code-split aggressively:** Use dynamic imports (`next/dynamic`) to lazy-load components and libraries that are not needed for the initial page load.
    *   **Choose lightweight alternatives:** When possible, choose smaller, more focused libraries over large, feature-rich ones.

### 2. Performance Regressions

*   **Pitfall:** It's easy for performance to degrade over time as new features are added and codebases grow.
*   **Solution:**
    *   **Implement performance monitoring:** Use Vercel Analytics or a third-party service to continuously monitor your application's Core Web Vitals and other performance metrics.
    *   **Set performance budgets:** Establish performance budgets for your application and integrate them into your CI/CD pipeline to prevent merging code that exceeds these budgets.
    *   **Conduct regular performance audits:** Use tools like Lighthouse to proactively identify and fix performance issues.

### 3. Inefficient Data Fetching

*   **Pitfall:** Inefficient data fetching can lead to slow page loads and a poor user experience. Common issues include request waterfalls and fetching too much data.
*   **Solution:**
    *   **Fetch data in parallel:** Avoid request waterfalls by fetching data in parallel whenever possible.
    *   **Use GraphQL or similar technologies:** For complex applications, consider using GraphQL to allow the client to request only the data it needs.
    *   **Implement proper caching:** Use Next.js's built-in caching mechanisms and Incremental Static Regeneration (ISR) to reduce the number of requests to your backend.

### 4. Vendor Lock-in with Vercel

*   **Pitfall:** While Vercel provides a best-in-class experience for deploying Next.js applications, relying too heavily on its proprietary features can lead to vendor lock-in.
*   **Solution:**
    *   **Use open standards:** Prioritize using Next.js features that are part of the open-source framework rather than Vercel-specific enhancements.
    *   **Abstract Vercel-specific code:** If you do use Vercel-specific features, abstract them into separate modules so that they can be easily replaced if you ever need to migrate to a different platform.
    *   **Consider self-hosting:** For maximum flexibility, you can self-host your Next.js application. However, this comes with the added complexity of managing your own infrastructure.

**Sources:**
https://nextjs.org/docs/app/guides/production-checklist
https://vercel.com/docs/frameworks/full-stack/nextjs

## 2. Shared Components Implementation

Production-ready implementation patterns for the 14 shared components.

### luxury-nav.tsx

**Props Interface:**
```typescript
```typescript
export type Concept = 'concept1' | 'concept2' | 'concept3' | 'concept4' | 'concept5' | 'concept6' | 'concept7' | 'concept8' | 'concept9' | 'concept10';

export interface NavLink {
  href: string;
  label: string;
}

export interface LuxuryNavProps {
  concept: Concept;
  logo: React.ReactNode;
  links: NavLink[];
}
```
```

**Dependencies:** `framer-motion, lucide-react`

**Theming Approach:**
The component's theming is managed through a `concept` prop, which accepts one of ten predefined concept values. Each concept corresponds to a unique visual theme defined in the `themes` object. This object maps each concept to a specific `ConceptTheme`, which includes properties for background color, text color, highlight color, and backdrop blur effect. When a `concept` is selected, the component dynamically applies the associated styles, allowing for seamless adaptation to different visual identities. This approach ensures a consistent and on-brand experience across all concept variations while centralizing theme management for easy maintenance and scalability.

**Best Practices:**
The luxury navigation component is designed with a focus on creating a high-end user experience. This is achieved by adhering to several best practices identified during the research phase. The design prioritizes a clean, minimalist aesthetic, with generous spacing and a lightweight font to create a sense of elegance and sophistication. Animations are intentionally subtle and smooth, with durations between 600ms and 1200ms and a custom easing curve to provide a feeling of luxury and refinement. The component also implements a sticky header with a blurred background, a common pattern in modern luxury websites that enhances the user experience by keeping the navigation accessible without obstructing the content.

**Accessibility:**
The luxury navigation component is designed with accessibility in mind, ensuring a positive experience for all users. It incorporates ARIA attributes such as `aria-label` for the main navigation, and `aria-controls` and `aria-expanded` for the mobile menu button, providing clear context for screen reader users. The component is fully navigable using a keyboard, allowing users to tab through the links and interact with the mobile menu. Furthermore, the use of semantic HTML and the `sr-only` class for the hamburger menu icon ensures that the component is easily understood and operated by users relying on screen readers.

### product-grid.tsx

**Props Interface:**
```typescript
```typescript
// Define the concept themes
type Concept = 'classic' | 'modern' | 'minimalist' | 'avant-garde' | 'art-deco' | 'bohemian' | 'industrial' | 'coastal' | 'vintage' | 'tech';

// Define the product data structure
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

// Define the component props
interface ProductGridProps {
  concept: Concept;
  products: Product[];
  layout: '3-col' | 'masonry' | 'table' | 'single';
  itemsPerPage?: number;
  isLoading?: boolean;
}
```
```

**Dependencies:** `framer-motion, react`

**Theming Approach:**
Theming is handled through a `concept` prop, which accepts one of ten predefined theme names (e.g., 'classic', 'modern', 'minimalist'). A utility function `getThemeClasses(concept)` maps each concept to a set of specific Tailwind CSS classes that control the component's color palette (background and text colors). This approach allows for easy extension by adding new cases to the `switch` statement within the function. The returned class string is applied to the main container, allowing theme styles to cascade to child elements. For simplicity in this implementation, only a few concepts are mapped, but the structure is in place to define styles for all ten.

**Best Practices:**
The research identified several best practices for implementing a luxury product grid. A key finding was the preference for custom-built components over generic UI libraries to achieve a unique and high-end aesthetic. For layouts, CSS-based masonry using Tailwind's `columns` feature provides a simple and effective solution for creating visually engaging, Pinterest-style grids. For a more precise 'true masonry' layout, a custom React hook that calculates item positions with JavaScript is recommended, as demonstrated by Cruip. Luxury e-commerce sites consistently prioritize large, high-quality imagery, minimalist UI, and fluid animations. Therefore, the implementation uses Framer Motion for subtle, sophisticated animations on hover and layout changes, adhering to luxury design principles like generous spacing (`py-[10vh]`) and refined typography (`font-weight-300`, `tracking-[0.15em]`).

**Accessibility:**
The component incorporates several accessibility features:
- **ARIA Roles**: The main section has `role="section"`, the controls have `role="toolbar"`, and the pagination has `role="navigation"`. Product cards are marked with `role="group"`.
- **Live Regions**: `aria-live="polite"` is used on the grid container to announce changes (e.g., when filtering or sorting) to screen readers in a non-disruptive manner. A dedicated `sr-only` element also provides textual updates on the grid's state.
- **Labels and Descriptions**: All interactive elements like select dropdowns and buttons have associated `<label>` elements or `aria-label` attributes for clear descriptions.
- **Keyboard Navigation**: All interactive controls (filters, sorting, pagination) are fully navigable and operable using a keyboard.
- **Focus Management**: The `aria-current="page"` attribute is used on the active pagination button to indicate the current page to assistive technologies.

### product-card.tsx

**Props Interface:**
```typescript
import { MotionProps } from 'framer-motion';

export type JewelryConcept = 
  | "ethereal-garden"
  | "midnight-bloom"
  | "celestial-dream"
  | "regal-romance"
  | "avant-garde"
  | "sacred-geometry"
  | "opulent-oasis"
  | "art-deco-revival"
  | "celestial-symphony"
  | "mythical-creatures";

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  images: {
    default: string;
    hover: string;
  };
  quickViewVideo?: string;
}

export interface ProductCardProps extends MotionProps {
  product: Product;
  concept: JewelryConcept;
  className?: string;
}
```

**Dependencies:** `framer-motion, lucide-react`

**Theming Approach:**
The component uses a theming approach based on CSS variables. A `themes` object maps each `JewelryConcept` to a set of CSS variables that define the color palette for that theme. These variables are applied to the component's root element using an inline style tag. Within the component's JSX, Tailwind CSS classes reference these CSS variables using the `theme()` function. This allows for a dynamic and easily extensible theming system.

**Best Practices:**
The implementation follows several best practices for modern web development. It uses a declarative approach to UI with React, and leverages the power of Framer Motion for performant and complex animations. The use of Tailwind CSS allows for a utility-first styling workflow, which is highly maintainable and scalable. The theming approach with CSS variables is a best practice for creating themeable components, as it allows for dynamic theme switching without re-rendering the component.

**Accessibility:**
The component includes ARIA attributes for screen readers, such as `aria-label` for the main container and buttons, and `aria-pressed` for the wishlist toggle button to indicate its state. Keyboard navigation is supported, allowing users to tab through interactive elements. Focus states are handled by default by the browser, but can be enhanced with custom styles.

### product-detail.tsx

**Props Interface:**
```typescript
```typescript
import { MotionProps } from 'framer-motion';

export type JewelryConcept = 'concept1' | 'concept2' | 'concept3' | 'concept4' | 'concept5' | 'concept6' | 'concept7' | 'concept8' | 'concept9' | 'concept10';

export interface Product {
  name: string;
  description: string;
  price: number;
  images: string[];
  specifications: {
    shape: string;
    carat: number;
    color: string;
    clarity: string;
    cut: string;
    origin: string;
    certification: string;
  };
}

export interface Review {
  author: string;
  rating: number;
  text: string;
}

export interface ProductDetailProps {
  concept: JewelryConcept;
  product: Product;
  reviews?: Review[];
  relatedProducts?: Product[];
  motionProps?: MotionProps;
}
```
```

**Dependencies:** `framer-motion, lucide-react`

**Theming Approach:**
The component uses a flexible theming approach based on the `concept` prop. This prop determines the visual theme by mapping to a set of CSS variables for colors, fonts, and other properties. This allows for easy customization and adaptation to different brand concepts while maintaining a consistent and luxurious feel. The use of Tailwind CSS ensures that the component is fully responsive and adheres to the specified design rules.

**Best Practices:**
The implementation follows best practices for luxury product detail pages, including a modular structure with reusable sub-components for maintainability. It adheres to a well-defined information hierarchy, presenting the most critical information first. The component emphasizes high-quality visuals with an image gallery that supports multiple images and zoom functionality. It also includes sections for social proof (reviews) and cross-selling to build trust and increase average order value. The design is mobile-first and fully responsive, using Tailwind CSS for styling and Framer Motion for elegant animations.

**Accessibility:**
The component is designed with accessibility in mind, following WCAG guidelines. It uses semantic HTML elements like `h1`, `h2`, `table`, and `button` to ensure a clear and logical structure for screen readers. All images have descriptive `alt` tags. Interactive elements like image gallery thumbnails and buttons are focusable and can be operated using a keyboard. ARIA attributes can be added to enhance the experience for assistive technologies, for example, `aria-label` for buttons and controls.

### image-viewer.tsx

**Props Interface:**
```typescript
import { MotionProps } from 'framer-motion';

export type Concept = 'concept-1' | 'concept-2' | 'concept-3' | 'concept-4' | 'concept-5' | 'concept-6' | 'concept-7' | 'concept-8' | 'concept-9' | 'concept-10';

export interface Image {
  src: string;
  thumb: string;
  alt: string;
  subHtml?: string;
}

export interface ImageViewerProps {
  images: Image[];
  concept: Concept;
  showThumbnails?: boolean;
  showZoom?: boolean;
  showFullscreen?: boolean;
  allow360?: boolean;
  initialIndex?: number;
  motionProps?: MotionProps;
}
```

**Dependencies:** `lightgallery, lg-thumbnail, lg-zoom, lg-fullscreen, framer-motion, react, react-dom, @types/react, @types/react-dom, tailwindcss`

**Theming Approach:**
Theming is handled through a combination of CSS variables and Tailwind CSS. A `concept` prop is passed to the component, which determines the visual theme. This prop is used to apply a corresponding CSS class to the main container (e.g., `concept-1`, `concept-2`). A separate CSS file (`image-viewer.css`) defines a set of CSS variables for each concept, which control colors, fonts, and other visual aspects of the component. This approach allows for easy customization and extension of themes without modifying the component's logic. The luxury design rules (font weights, letter spacing, padding) are also applied in this CSS file.

**Best Practices:**
The implementation follows several best practices for a production-grade image viewer. It uses a well-established and feature-rich library (`lightGallery.js`) as a foundation, which provides core functionality like zoom, fullscreen, and thumbnail navigation. The component is designed to be highly customizable through props, allowing for easy integration into different parts of the application. The theming approach using CSS variables and a `concept` prop allows for consistent and easily maintainable styling across the website. The use of Framer Motion for animations adds a touch of luxury and polish to the user experience. The code is written in TypeScript for type safety and maintainability.

**Accessibility:**
The component leverages the accessibility features of `lightGallery.js`, including keyboard navigation (arrow keys to navigate, Esc to close), ARIA attributes for roles and states, and focus management to trap focus within the viewer when open and return it on close. The `alt` attribute for images is passed through to the gallery for screen readers.

### checkout-flow.tsx

**Props Interface:**
```typescript
import { ZodType } from 'zod';
import { LucideIcon } from 'lucide-react';

export type Concept = "concept1" | "concept2" | "concept3" | "concept4" | "concept5" | "concept6" | "concept7" | "concept8" | "concept9" | "concept10";

export interface CheckoutStep {
  title: string;
  validationSchema: ZodType<unknown>;
  component: React.ReactElement;
  icon: LucideIcon;
  fields: string[];
}

export interface CheckoutFlowProps {
  concept: Concept;
  steps: CheckoutStep[];
  onSubmit: (data: any) => void;
}
```

**Dependencies:** `react, react-hook-form, @hookform/resolvers, zod, framer-motion, lucide-react, tailwindcss`

**Theming Approach:**
Theming is handled through a `getTheme` function that returns a theme object based on the `concept` prop. This object contains Tailwind CSS classes for background, text, and accent colors. This approach allows for easy customization of the component's appearance for each of the 10 concepts without altering the component's logic. In a production application, this could be further enhanced by using CSS variables or a more sophisticated theming solution like Styled Components or Emotion.

**Best Practices:**
Based on industry research and established UX principles, the following best practices have been incorporated into the design and implementation of the `checkout-flow.tsx` component.

### User Experience (UX)

*   **Guest Checkout:** The checkout flow should always provide a prominent and easily accessible guest checkout option. Forcing users to create an account is a major cause of cart abandonment. The Baymard Institute notes that 19% of users will abandon a cart if forced to create an account [1].

*   **Clear Progress Indication:** A multi-step checkout must have a clear and persistent progress indicator. This helps users understand where they are in the process, how many steps are remaining, and reduces anxiety. The progress bar in this component uses icons and titles to clearly label each step.

*   **Minimize Distractions:** The checkout process should be focused and free of distractions. Remove any unnecessary navigation, promotional banners, or other elements that could divert the user's attention from completing the purchase.

*   **Logical Flow and Grouping:** Group related form fields into logical steps. For example, shipping information, payment details, and order review should be in separate, clearly defined sections. This makes the process feel less overwhelming.

### Form Design

*   **Top-Aligned Labels:** Form field labels should be placed directly above the input fields. This is the most common and effective placement, as it reduces cognitive load and makes the form easier to scan, especially on mobile devices.

*   **Real-time Validation:** Provide real-time validation feedback as the user fills out the form. This allows users to correct errors immediately, rather than waiting until they submit the form. The use of `react-hook-form` and `zod` allows for instant feedback on a per-field basis.

*   **Clear and Actionable Error Messages:** When validation errors occur, display clear and concise error messages that explain what is wrong and how to fix it. Error messages should be displayed inline, next to the problematic field.

### Technical Implementation

*   **State Management:** Utilize a robust form state management library like `react-hook-form`. This simplifies the handling of form state, validation, and submission, while also improving performance by avoiding unnecessary re-renders.

*   **Schema-Based Validation:** Employ a schema-based validation library such as `zod`. This allows for the definition of a single source of truth for data shapes and validation rules, which can be shared between the frontend and backend.

*   **Component-Based Architecture:** Structure the checkout flow as a collection of reusable components. A parent `CheckoutFlow` component manages the overall state and step transitions, while individual step components are responsible for their own layout and fields. This promotes modularity and maintainability.

*   **Data Persistence:** To prevent data loss in case of an accidental page refresh or navigation, persist the form state to `localStorage`. The `use-local-storage` hook from `@mantine/hooks` is a good option for this.

**Accessibility:**
The component will be designed with accessibility in mind from the start. This includes:

*   **ARIA Attributes:** Appropriate ARIA roles and attributes will be used to define the structure of the stepper and the state of each step (e.g., `aria-current` for the active step).
*   **Keyboard Navigation:** The checkout flow will be fully navigable using the keyboard. Users will be able to move between form fields, and trigger the "Next" and "Previous" buttons using the Tab and Enter keys.
*   **Screen Reader Support:** The component will be tested with screen readers to ensure that all content and interactions are properly announced. This includes labels for form fields, the current step in the process, and any validation errors.

### filter-sidebar.tsx

**Props Interface:**
```typescript
export type Concept = 'concept1' | 'concept2' | 'concept3' | 'concept4' | 'concept5' | 'concept6' | 'concept7' | 'concept8' | 'concept9' | 'concept10';

export interface FilterOption {
  value: string;
  label: string;
}

export interface Filter {
  id: string;
  name: string;
  type: 'checkbox' | 'range' | 'color';
  options?: FilterOption[];
  defaultValue?: any;
}

export interface FilterSidebarProps {
  concept: Concept;
  filters: Filter[];
  onFilterChange: (filters: Record<string, any>) => void;
  loading?: boolean;
}
```

**Dependencies:** `framer-motion, lucide-react`

**Theming Approach:**
The component accepts a `concept` prop that determines the visual theme. The `conceptThemes` object maps each concept to a set of Tailwind CSS classes for background color, text color, and accent color. This allows for easy customization and extension of themes.

**Best Practices:**
The filter sidebar component follows several best practices for e-commerce filtering UX:

*   **Multi-select for checkboxes:** Allows users to select multiple options for a given filter type.
*   **Range sliders for numerical values:** Provides an intuitive way to filter by price or other numerical ranges.
*   **Collapsible sections:** Keeps the filter interface clean and organized, allowing users to focus on relevant filter categories.
*   **Mobile-first design:** The component is fully responsive and uses a drawer on mobile devices to save screen space.
*   **Applied filters overview:** (Future enhancement) A dedicated area to show the currently applied filters.
*   **Visual filters:** Color options are displayed as swatches for a better visual experience.

**Accessibility:**
The component includes several accessibility features:

*   **ARIA attributes:** `role="region"`, `aria-labelledby`, `aria-controls`, and `aria-expanded` are used to provide semantic information to screen readers.
*   **Keyboard navigation:** The filter sections are focusable and can be toggled using the keyboard.
*   **Screen reader support:** The component is designed to be fully accessible to screen reader users.
*   **Loading state:** The `fieldset` is disabled when the `loading` prop is true, preventing user interaction while data is being fetched.

### search-bar.tsx

**Props Interface:**
```typescript
export type Concept = 
  | "classic"
  | "modern"
  | "minimalist"
  | "vintage"
  | "edgy"
  | "bohemian"
  | "art-deco"
  | "industrial"
  | "scandinavian"
  | "coastal";

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

export interface SearchBarProps {
  concept: Concept;
}
```

**Dependencies:** `framer-motion, lucide-react`

**Theming Approach:**
The component uses a `concept` prop to apply different themes. The `themes` object contains a set of predefined styles for each concept. The styles include background color, text color, border color, highlight color, and accent color. This approach allows for easy customization and extension of the component's visual appearance.

**Best Practices:**
The search bar component was developed following these best practices:

*   **Debounced Search:** The component uses a custom `useDebounce` hook to delay the search query, reducing the number of API requests and improving performance.
*   **Instant Search with Product Previews:** Search results are displayed instantly as the user types, with product thumbnails, names, and prices to provide a rich user experience.
*   **Keyboard Navigation:** Users can navigate the search results using the arrow keys and select a product by pressing Enter.
*   **Minimalist and Clean Design:** The component features a minimalist design that is consistent with luxury brand aesthetics. The layout is clean and uncluttered, with a focus on the search functionality.
*   **Theming:** The component is designed to be easily themable using a `concept` prop, which allows for different visual styles to be applied.

**Accessibility:**
The component includes the following accessibility features:

*   **ARIA Attributes:** The search input has `aria-label`, `aria-autocomplete`, `aria-expanded`, and `aria-controls` attributes to provide semantic information to screen readers.
*   **Keyboard Navigation:** Users can navigate the search results using the up and down arrow keys. The active result is highlighted, and the `aria-selected` attribute is updated accordingly.
*   **Focus Management:** The search input remains focused while the user is interacting with the search results.

### cart-drawer.tsx

**Props Interface:**
```typescript
```typescript
interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  concept: "concept1" | "concept2" | "concept3" | "concept4" | "concept5" | "concept6" | "concept7" | "concept8" | "concept9" | "concept10";
}
```
```

**Dependencies:** `framer-motion, lucide-react, focus-trap-react`

**Theming Approach:**
The component uses a prop-based theming approach. The `concept` prop, which accepts one of ten predefined values (`concept1` to `concept10`), determines the visual theme of the cart drawer. A `themes` object maps each concept to a set of Tailwind CSS classes for various elements of the component, such as background color, text color, and button styles. This allows for easy and centralized customization of the component's appearance to match the overall design of the website.

**Best Practices:**
Based on the research, the following best practices have been incorporated into the component:

*   **Slide-Out Animation:** The cart drawer slides in from the side, providing a smooth and non-disruptive user experience. This is a common and effective pattern for e-commerce sites.
*   **Overlay:** A semi-transparent overlay is used to dim the background content, drawing the user's attention to the cart drawer and preventing interaction with the underlying page.
*   **State Management:** The component's visibility is controlled by a parent component through the `isOpen` prop. This allows for flexible integration into different application structures.
*   **Component-Based Architecture:** The cart drawer is broken down into smaller, reusable components (`CartItemComponent`), which improves code organization and maintainability.
*   **Theming:** The component uses a theming approach based on a `concept` prop, allowing for easy customization of its appearance to match different brand identities.

**Accessibility:**
The component incorporates several accessibility features to ensure it is usable by everyone:

*   **Focus Trapping:** When the cart drawer is open, focus is trapped within it, preventing users from accidentally interacting with the underlying page content. This is achieved using the `focus-trap-react` library.
*   **Keyboard Navigation:** The drawer can be closed by pressing the `Escape` key. All interactive elements within the drawer (close button, quantity adjustments, remove item button, checkout button) are focusable and can be operated using the keyboard.
*   **ARIA Attributes:** Appropriate ARIA attributes are used to describe the role and state of the component:
    *   `role="dialog"` and `aria-modal="true"` are used on the drawer container to indicate that it is a modal dialog.
    *   `aria-labelledby` is used to associate the drawer with its heading.
    *   `aria-label` is used on the close, increase, decrease and remove buttons to provide a clear description of their function.
    *   `aria-hidden="true"` is used on the overlay to hide it from screen readers.
    *   `aria-live="polite"` is used on the subtotal to announce changes to screen readers.

### footer.tsx

**Props Interface:**
```typescript
interface LuxuryFooterProps {
  concept: 'vault' | 'observatory' | 'gallery' | 'atelier' | 'salon' | 'archive' | 'minimal' | 'theater' | 'marketplace' | 'maison';
  linkSections: {
    title: string;
    links: {
      label: string;
      href: string;
    }[];
  }[];
  socialLinks: {
    platform: 'twitter' | 'instagram' | 'facebook' | 'linkedin';
    href: string;
  }[];
  showNewsletter?: boolean;
  newsletterTitle?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
}
```

**Dependencies:** `framer-motion, lucide-react, clsx`

**Theming Approach:**
Theming is driven by the `concept` prop. A theme configuration object maps each concept to a set of Tailwind CSS classes for different elements of the footer. This approach allows for easy extension and modification of themes without altering the component's structure. The `clsx` utility is used to conditionally apply classes based on the selected theme.

**Best Practices:**
Based on the research of luxury and premium website footers, the following best practices have been identified and incorporated into the `footer.tsx` component:

- **Responsive Design:** The component is built with a mobile-first approach, ensuring a seamless experience across all devices. The multi-column layout adapts to different screen sizes, stacking vertically on smaller screens and expanding to a four-column grid on larger screens.

- **Clear Information Hierarchy:** Links are organized into logical sections with clear headings. This helps users quickly find the information they need, whether it's contact details, company information, or customer service links.

- **Minimalism and Elegance:** The design follows luxury principles by using ample white space (`py-[10vh]`), light font weights (`font-light`), and a clean, uncluttered layout. This creates a sense of sophistication and refinement.

- **Consistent Branding:** The theming approach ensures that the footer's design is always in harmony with the selected brand concept. Colors, fonts, and other visual elements are adapted to match the overall brand identity.

- **Subtle Animations:** Framer Motion is used to add subtle, elegant animations to the footer. The fade-in and slide-up effects are timed to create a smooth and luxurious user experience, with durations between 600ms and 1200ms and a custom easing curve.

- **Accessibility:** The component is designed to be accessible to all users. This includes using semantic HTML, providing ARIA labels for interactive elements, and ensuring that the entire footer is navigable using a keyboard.

**Accessibility:**
The footer component is designed with accessibility in mind, ensuring it is usable by everyone. Semantic HTML5 elements like `<footer>`, `<h4>`, `<ul>`, and `<a>` are used to structure the content, which helps screen readers understand the layout. All interactive elements, such as links and the newsletter form, are keyboard-navigable. The newsletter input field includes an `aria-label` to provide a clear description for screen reader users. The color contrast of the different themes has been considered to ensure readability.

### breadcrumb.tsx

**Props Interface:**
```typescript
```typescript
interface BreadcrumbProps {
  concept: 'concept-1' | 'concept-2' | 'concept-3' | 'concept-4' | 'concept-5' | 'concept-6' | 'concept-7' | 'concept-8' | 'concept-9' | 'concept-10';
}
```
```

**Dependencies:** `framer-motion, lucide-react`

**Theming Approach:**
The component uses a concept-based theming approach. A `themes` object maps each `concept` to a set of Tailwind CSS utility classes for `textColor`, `separatorColor`, and `hoverTextColor`. The `concept` prop, passed to the component, determines which theme is applied. This allows for centralized and easily extensible styling, ensuring that the breadcrumb's appearance can be adapted to match the visual identity of different sections of the website.

**Best Practices:**
The implementation follows best practices for creating dynamic breadcrumbs in Next.js applications. It utilizes the `usePathname` hook from `next/navigation` to get the current route and dynamically generates the breadcrumb trail. This approach is efficient for client-rendered components. For more complex scenarios with server-side data requirements, such as fetching product names for dynamic routes, a more advanced pattern using Next.js Parallel Routes would be recommended. This would involve creating a separate, parallel route for the breadcrumb component that can fetch data independently of the main page content.

**Accessibility:**
The breadcrumb component is wrapped in a `<nav>` element with `aria-label="Breadcrumb"` to provide a clear landmark for screen readers. The last item in the breadcrumb trail, which represents the current page, has the `aria-current="page"` attribute set. This helps users with assistive technologies understand their current location in the site hierarchy. All navigation items are standard links, ensuring they are keyboard-navigable and accessible by default.

### trust-badges.tsx

**Props Interface:**
```typescript
/**
 * Defines the possible visual themes for the TrustBadges component.
 * Each concept corresponds to a different set of styles (colors, fonts, etc.).
 */
export type Concept = 
  | 'classic'
  | 'modern'
  | 'vintage'
  | 'art-deco'
  | 'minimalist'
  | 'avant-garde'
  | 'bohemian'
  | 'celestial'
  | 'geometric'
  | 'floral';

/**
 * Props for the TrustBadges component.
 */
export interface TrustBadgeProps {
  /**
   * The visual theme to apply to the component.
   * Defaults to 'classic'.
   */
  concept: Concept;
}

```

**Dependencies:** `framer-motion, lucide-react`

**Theming Approach:**
The component's theming is driven by the `concept` prop, which accepts one of ten predefined values (e.g., 'classic', 'modern', 'vintage'). A `themes` object maps each concept to a specific color palette for the icons and text. This approach allows for easy customization of the component's appearance to match the aesthetic of different sections of the website. The default theme is 'classic'. The implementation uses Tailwind CSS classes, making it straightforward to extend the theming to include other properties like font families or sizes if needed in the future.

**Best Practices:**
The research on trust badges in e-commerce, particularly for luxury brands, revealed several best practices that were incorporated into the component's design. Key findings include the strategic placement of badges to build trust at critical points in the user journey, such as the homepage, product pages, and checkout. The use of clear, recognizable icons and concise text is crucial for quick comprehension. Third-party endorsements and security seals (like SSL) are highly effective, but well-designed 'DIY' badges for guarantees and shipping policies also build significant trust. To avoid 'badge clutter,' the design is clean and minimalist, using a limited number of high-impact badges. The component is designed to be a flexible and reusable element that can be placed in various sections of the website, such as the footer or on product detail pages, to maximize its impact.

**Accessibility:**
The component incorporates several accessibility best practices. The main container has an `aria-label` to describe its purpose to screen readers. Each individual badge is a `role='group'` with its own `aria-label` to announce the specific guarantee (e.g., 'GIA Certified'). The icons within each badge have `aria-hidden='true'` to prevent redundant announcements by screen readers, as the text description provides the necessary information. The component is keyboard navigable, and the focus is managed logically as the user tabs through the elements.

### newsletter.tsx

**Props Interface:**
```typescript
```typescript
interface NewsletterProps {
  concept: keyof typeof themes;
}
```
```

**Dependencies:** `framer-motion, react`

**Theming Approach:**
The component's theming is managed through a `concept` prop, which selects a theme from a predefined `themes` object. Each theme in this object specifies a set of Tailwind CSS classes for various elements of the component, such as `bgColor`, `textColor`, `buttonColor`, and `inputBorderColor`. This approach allows for dynamic styling based on the provided `concept`, enabling the component to seamlessly integrate with the 10 different design concepts of the Vault-Maison website. This method centralizes the theme definitions, making it straightforward to maintain and extend with new concepts in the future.

**Best Practices:**
The implementation of the newsletter component is guided by several best practices for luxury web design and development:
- **Minimalism and Elegance:** The design is intentionally minimal, with a strong focus on typography, generous spacing (`py-[10vh]`), and a clean layout. This reflects the sophistication of a luxury brand.
- **Performant Animations:** Framer Motion is used for subtle, performant animations that enhance the user experience without being distracting. The easing functions and durations (600-1200ms) are chosen to create a sense of luxury and refinement.
- **State Management:** The component effectively manages its state (initial, loading, success, error) to provide clear feedback to the user at every stage of the interaction.
- **Theming for Brand Consistency:** The `concept` prop allows for easy theming, ensuring the component can be adapted to different visual styles while maintaining brand consistency across the website.
- **Mobile-First Responsive Design:** The component is built with a mobile-first approach, ensuring a seamless experience on all devices. The use of Tailwind CSS's responsive modifiers makes it easy to adapt the layout for different screen sizes.

**Accessibility:**
The component includes several accessibility features to ensure it is usable by everyone:
- **ARIA Attributes:** `aria-label` is used to provide an accessible name for the email input field. `aria-invalid` and `aria-describedby` are used to programmatically associate the input field with its error message, making validation errors clear to screen reader users.
- **Keyboard Navigation:** The component is fully navigable using a keyboard. Users can tab to the input field, type their email, tab to the subscribe button, and press Enter to submit the form.
- **Focus Management:** The input field has a clear focus state, indicated by a ring around it, which helps users with visual impairments understand where they are on the page. The `focus:outline-none` and `focus:ring-1` classes ensure a custom, on-brand focus indicator.
- **Disabled State:** The input field and button are disabled during the loading state to prevent multiple submissions and provide clear feedback to the user.

### concept-switcher.tsx

**Props Interface:**
```typescript
```typescript
type Concept = 'concept1' | 'concept2' | 'concept3' | 'concept4' | 'concept5' | 'concept6' | 'concept7' | 'concept8' | 'concept9' | 'concept10';

interface ConceptSwitcherProps {
  concept: Concept;
  setConcept: (concept: Concept) => void;
}
```
```

**Dependencies:** `framer-motion, lucide-react`

**Theming Approach:**
The theming approach is based on the `concept` prop passed to the component. This prop determines which concept is currently active. The active concept is highlighted with a visual indicator, and the main content of the page can be updated to reflect the selected concept. The concept-specific styling would be handled by a parent component or a global state management solution, which would apply the appropriate CSS classes to the application's main container based on the current `concept`.

**Best Practices:**
The component is built using a mobile-first approach, ensuring it is responsive and looks good on all screen sizes. It uses Tailwind CSS for styling, which allows for rapid UI development and easy customization. Framer Motion is used for animations, providing smooth and luxurious transitions. The component also follows the luxury design rules specified in the prompt, such as font weights and letter spacing. A loading state is included to provide feedback to the user while the component is initializing.

**Accessibility:**
The component includes ARIA attributes for accessibility. The buttons have `aria-label` attributes to describe their function to screen readers. The currently active concept button has the `aria-current` attribute set to 'page', which indicates the current page within a set of pages. The component is also navigable using the keyboard, allowing users to tab through the concept buttons and activate them with the Enter or Space key.

## 3. 21st.dev Components Research

Deep research of the 30 unique 21st.dev components specified in the build spec.

### Hero
- **URL:** https://21st.dev/r/Codehagen/hero
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/Codehagen/hero`
- **Dependencies:** `framer-motion, @radix-ui/react-slot, class-variance-authority`
- **Concept Mapping:** 01-vault, 10-maison

**Description:**
The Hero component is a full-screen component that displays a title, a description, and two action buttons. It can also display a pill-shaped badge and a preview component. The component is animated with framer-motion, creating a smooth and elegant user experience.

**Props API:**
```typescript
interface HeroContentProps {
  title: string;
  titleHighlight?: string;
  description: string;
  primaryAction?: {
    href: string;
    text: string;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    href: string;
    text: string;
    icon?: React.ReactNode;
  };
}

interface HeroProps {
  pill?: {
    href?: string;
    text: string;
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
  };
  content: HeroContentProps;
  preview?: React.ReactNode;
}
```

**Animations & Interactions:**
The title, description, and action buttons fade in and slide up from the bottom of the screen on load. The animations are staggered, with the title appearing first, followed by the description, and then the buttons. The animation uses a custom cubic bezier curve for a smooth and elegant feel. The pill badge has a subtle hover animation where the icon rotates slightly.

**Customization Notes:**
To customize this component for a luxury jewelry theme, you can change the primary color in your tailwind.config.js file to a gold or silver hue. The font can be changed by updating the font-family in your global CSS file. Spacing can be adjusted by modifying the padding and margin values in the component's className props.

**Usage Example:**
```tsx
import { Hero } from '@/components/blocks/hero';

export default function WebPage() {
  return (
    <Hero
      pill={{ text: 'New Collection', href: '#' }}
      content={{
        title: 'Exquisite Jewellery',
        titleHighlight: 'For Every Occasion',
        description: 'Discover our stunning collection of handcrafted jewellery, designed to make every moment special. From timeless classics to modern designs, we have something for everyone.',
        primaryAction: {
          href: '#',
          text: 'Shop Now',
        },
        secondaryAction: {
          href: '#',
          text: 'Learn More',
        },
      }}
      preview={<div>Preview</div>}
    />
  );
}
```

### Hover Zoom
- **URL:** https://21st.dev/r/JurreHoutkamp/hover-zoom
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/JurreHoutkamp/hover-zoom`
- **Dependencies:** `framer-motion`
- **Concept Mapping:** 03-gallery

**Description:**
A React component that displays an image and smoothly zooms in on it when the user hovers with their mouse. The zoom effect follows the cursor's position, providing a magnified view of the image details. It is highly customizable through props.

**Props API:**
```typescript
interface ZoomImageUIProps {
  image?: {
    src: string;
    alt: string;
  };
  zoomScale?: number;
  transition?: {
    duration: number;
    ease: string;
  };
  backgroundColor?: string;
  borderRadius?: number;
  style?: React.CSSProperties;
}
```

**Animations & Interactions:**
On hover, the image smoothly zooms in to a scale defined by the `zoomScale` prop. The zoom's transform origin follows the mouse cursor's position within the component, creating a dynamic and interactive magnification effect. The animation is powered by Framer Motion, with customizable duration and easing.

**Customization Notes:**
For a luxury jewelry theme, consider the following customizations:
- **Colors:** Change the `backgroundColor` to a dark, elegant color like charcoal or navy to make the jewelry stand out.
- **Zoom Scale:** Reduce the `zoomScale` to a more subtle value like 1.5 or 2 for a less dramatic, more refined effect.
- **Transition:** Adjust the `transition` prop to have a slightly longer duration (e.g., 0.3s) for a smoother, more graceful zoom animation.
- **Border:** Use the `borderRadius` prop to match the border radius of other elements on the website for a consistent look and feel.

**Usage Example:**
```tsx
import { ZoomImageUI } from '@/components/ui/hover-zoom';

export default function MyPage() {
  return (
    <div style={{ width: '500px', height: '500px' }}>
      <ZoomImageUI 
        image={{ src: 'path/to/your/jewelry.jpg', alt: 'Diamond Ring' }} 
        zoomScale={2} 
        backgroundColor='#1a1a1a' 
        borderRadius={12} 
      />
    </div>
  );
}
```

### Breadrcrumb
- **URL:** https://21st.dev/r/ShadcnStudio/breadrcrumb
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/ShadcnStudio/breadrcrumb`
- **Dependencies:** `breadcrumb, badge, dropdown-menu`
- **Concept Mapping:** 01-vault, 03-gallery, 10-maison

**Description:**
This is a breadcrumb component that displays a hierarchical navigation trail. It shows the user their current location within the site structure, with links to parent pages.

**Props API:**
```typescript
The component itself does not accept any props. The props are passed to the underlying `Breadcrumb`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbList`, `BreadcrumbPage`, and `BreadcrumbSeparator` components from `@/components/ui/breadcrumb`.
```

**Animations & Interactions:**
The component has no animations. The 'Home' and 'Documents' links are standard anchor tags and will navigate to the specified href on click. The 'Add Document' text is not interactive.

**Customization Notes:**
For a luxury jewelry theme, the component can be customized by changing the color of the links and the separator to match a premium color palette (e.g., gold, silver). The font can be updated to a more elegant, serif font. The spacing between the breadcrumb items can be increased to create a more open and luxurious feel. The default separator can be replaced with a custom icon, such as a small diamond or a decorative slash.

**Usage Example:**
```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'\n\nconst BreadcrumbDemo = () => {\n  return (\n    <Breadcrumb>\n      <BreadcrumbList>\n        <BreadcrumbItem>\n          <BreadcrumbLink href='#'>Home</BreadcrumbLink>\n        </BreadcrumbItem>\n        <BreadcrumbSeparator />\n        <BreadcrumbItem>\n          <BreadcrumbLink href='#'>Documents</BreadcrumbLink>\n        </BreadcrumbItem>\n        <BreadcrumbSeparator />\n        <BreadcrumbItem>\n          <BreadcrumbPage>Add Document</BreadcrumbPage>\n        </BreadcrumbItem>\n      </BreadcrumbList>\n    </Breadcrumb>\n  )\n}\n\nexport default BreadcrumbDemo
```

### 3d Wrapper
- **URL:** https://21st.dev/r/badtzx0/3d-wrapper
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/badtzx0/3d-wrapper`
- **Dependencies:** `motion, https://21st.dev/r/shadcn/button, https://21st.dev/r/shadcn/input, https://21st.dev/r/shadcn/label, https://21st.dev/r/shadcn/select, https://21st.dev/r/shadcn/card`
- **Concept Mapping:** 01-vault, 03-gallery

**Description:**
A 3d-wrapper component.

**Props API:**
```typescript
interface Wrapper3DProps {
  children: ReactNode
  damping?: number
  swiftness?: number
  mass?: number
  maxRotation?: number
  translateZ?: number
  perspective?: boolean
  className?: string
}
```

**Animations & Interactions:**
The component utilizes framer-motion to create a 3D parallax effect. On mouse move over the component, it calculates the mouse position relative to the component's dimensions and applies a rotation in the X and Y axes, creating a tilting effect. The rotation is smoothed using `useSpring` for a fluid animation. When the mouse leaves the component, the rotation is reset to its initial state (0, 0). The component also has an initial animation where it fades in and scales up on load.

**Customization Notes:**
For a luxury jewelry theme, consider the following customizations:
- **Colors:** Adjust the background and text colors to match the brand's palette. Since the component is a wrapper, the content's color will be the primary focus.
- **Fonts:** The font of the wrapped content can be customized to a more elegant, serif font.
- **Spacing:** The `translateZ` prop can be adjusted to control the depth of the 3D effect. A smaller value will make the effect more subtle and sophisticated.

**Usage Example:**
```tsx
import { Wrapper3D } from "@/components/ui/3d-wrapper";

export default function MyComponent() {
  return (
    <Wrapper3D>
      <div>Your 3D content here</div>
    </Wrapper3D>
  );
}
```

### Basic Chat
- **URL:** https://21st.dev/r/beratberkayg/basic-chat
- **Status:** live
- **Install Command:** `npx shadcn@latest add basic-chat`
- **Dependencies:** `lucide-react, card, button, input`
- **Concept Mapping:** 08-concierge

**Description:**
A basic-chat component.

**Props API:**
```typescript
userName: string;
userAvatar?: string;
userOnline?: boolean;
```

**Animations & Interactions:**
- Messages scroll smoothly to the bottom when a new message is added.
- Message input fields have a smooth transition on focus.
- Send button has a hover effect.
- Individual messages have a hover effect (scale-105).

**Customization Notes:**
- Colors: The primary color (blue-500) can be changed to a luxury color like gold or silver. The background colors (gray-50, gray-900) can be adjusted to match the website theme.
- Fonts: The font can be changed to a more elegant font to match the luxury theme.
- Spacing: The spacing between messages and other elements can be adjusted to create a more spacious and luxurious feel.

**Usage Example:**
```tsx
import ChatScreen from "@/components/ui/basic-chat";

const MyChat = () => {
  return <ChatScreen userName="John Doe" userOnline={true} />;
};
```

### Product Card 1
- **URL:** https://21st.dev/r/beratberkayg/product-card-1
- **Status:** live
- **Install Command:** `npx shadcn-ui@latest add product-card-1`
- **Dependencies:** `framer-motion, lucide-react, @/components/ui/card, @/components/ui/button, @/components/ui/badge`
- **Concept Mapping:** 03-gallery

**Description:**
A modern, interactive product card component that showcases a product with multiple images, color and size options, pricing, and ratings. It includes interactive elements like an image carousel, wishlist button, and an add-to-cart button with loading and success states.

**Props API:**
```typescript
export interface ProductCardProps {
  name?: string;
  price?: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  discount?: number;
  freeShipping?: boolean;
}
```

**Animations & Interactions:**
The card has a hover effect that increases its shadow. The product image is a carousel with fade-in/fade-out transitions between images, navigable by previous/next buttons that appear on hover. The wishlist button fills with color when clicked. The 'Add to Cart' button shows a loading spinner and then a checkmark upon successful addition.

**Customization Notes:**
For a luxury jewelry theme, consider replacing the default blue, amber, and rose badge colors with more subtle, metallic tones like gold, silver, or platinum. The font can be updated to a more elegant serif font. Spacing can be increased to give a more open and luxurious feel. The color swatches can be customized to reflect the different metals or gemstones of the jewelry.

**Usage Example:**
```tsx
import { ProductCard } from '@/components/ui/product-card-1';

const MyProductPage = () => (
  <ProductCard 
    name='Diamond Solitaire Ring'
    price={2499.99}
    originalPrice={2999.99}
    rating={4.9}
    reviewCount={78}
    images={['/ring-image-1.jpg', '/ring-image-2.jpg']}
    colors={['#FFD700', '#C0C0C0', '#E5E4E2']}
    sizes={['5', '6', '7', '8']}
  />
);
```

### Spotlight Card
- **URL:** https://21st.dev/r/berkcangumusisik/spotlight-card
- **Status:** live
- **Install Command:** `npx shadcn@latest add spotlight-card`
- **Dependencies:** `react`
- **Concept Mapping:** 03-gallery, 07-product

**Description:**
A card component that reveals a spotlight effect on hover. The spotlight follows the mouse cursor, creating a visually engaging effect. The card itself has a subtle border and background color transition on hover.

**Props API:**
```typescript
interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
}
```

**Animations & Interactions:**
On mouse enter, a radial gradient spotlight appears and follows the cursor's position within the card. The spotlight fades in and out smoothly. On mouse leave, the spotlight fades out. The card's border color also transitions on hover.

**Customization Notes:**
To adapt for a luxury jewelry theme, consider the following:
*   **Colors**: Change `spotlightColor` to a soft gold or silver hue (e.g., `rgba(212, 175, 55, 0.1)`). Modify the `border-neutral-800`, `bg-neutral-900`, and `text-neutral-200` classes to use a palette of deep charcoals, rich creams, and metallic tones.
*   **Fonts**: Use a sophisticated serif font for the text inside the card.
*   **Spacing**: Increase the padding within the card to give the content more breathing room and a more premium feel.

**Usage Example:**
```tsx
import { SpotlightCard } from "@/components/ui/spotlight-card";

export default function Page() {
  return (
    <SpotlightCard>
      <div className="p-8">
        <h2 className="text-2xl font-bold">Spotlight Card</h2>
        <p className="mt-2 text-neutral-400">
          This is a card with a spotlight effect.
        </p>
      </div>
    </SpotlightCard>
  );
}
```

### View Magnifier
- **URL:** https://21st.dev/r/bucharitesh/view-magnifier
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/bucharitesh/view-magnifier`
- **Dependencies:** `framer-motion`
- **Concept Mapping:** 03-gallery, 05-product

**Description:**
A view-magnifier component that allows users to zoom in on content, such as an image, using a draggable slider. The component provides a smooth, animated zoom experience with a blurred backdrop that fades in as the content is magnified. It is ideal for showcasing product details or high-resolution imagery.

**Props API:**
```typescript
interface ViewMagnifierProps {
  children: React.ReactNode;
  className?: string;
  maxScale?: number;
  onScaleChange?: (isActive: boolean) => void;
  onMaxScaleReached?: (isAtMax: boolean) => void;
}
```

**Animations & Interactions:**
The component utilizes `framer-motion` for smooth animations. The primary interaction is a draggable slider that controls the zoom level of the content. As the user drags the slider, the content scales up or down with a spring-like animation. A backdrop with a blur effect fades in as the zoom level increases. The cursor changes from 'grab' to 'grabbing' during the drag interaction, providing clear visual feedback. The slider also has a hover effect, changing its background color.

**Customization Notes:**
For a luxury jewelry theme, consider the following customizations:

*   **Colors:** Change the slider's background color from gray to a more luxurious color like gold or a deep charcoal. The hover and focus states should also be updated to match the new color scheme. The backdrop blur color can be tinted to match the overall theme.
*   **Fonts:** While this component doesn't directly use text, if you were to add zoom level indicators or other text elements, ensure they use the brand's primary font.
*   **Spacing:** The spacing of the component is generally good, but you could adjust the distance of the slider from the content to create a more spacious and premium feel.

**Usage Example:**
```tsx
import { Component as ViewMagnifier } from "@/components/ui/view-magnifier";

export default function Page() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ViewMagnifier>
        <img src="/placeholder.svg" alt="Placeholder" className="w-full h-full object-cover" />
      </ViewMagnifier>
    </div>
  );
}
```

### gallery
- **URL:** https://21st.dev/r/designali-in/gallery
- **Status:** live
- **Install Command:** `npx shadcn@latest add gallery`
- **Dependencies:** `framer-motion, @radix-ui/react-slot, class-variance-authority`
- **Concept Mapping:** 03-gallery

**Description:**
A photo gallery component that displays a collection of images in a visually appealing layout. It features animations and interactions to enhance the user experience.

**Props API:**
```typescript
animationDelay?: number;
src: string;
alt: string;
className?: string;
direction?: "left" | "right";
width: number;
height: number;
```

**Animations & Interactions:**
The component uses framer-motion for animations. The photos animate into position with a spring-like effect. On hover, the photos scale up and rotate slightly. The gallery container fades in when it becomes visible.

**Customization Notes:**
To customize the component for a luxury jewelry theme, you can change the color palette to use gold, silver, and other metallic colors. You can also adjust the fonts to use more elegant and sophisticated typefaces. The spacing and layout can be modified to create a more spacious and luxurious feel.

**Usage Example:**
```tsx
import { Gallery } from "@/components/ui/gallery";

export default function Page() {
  return (
    <div className="container mx-auto py-10">
      <Gallery />
    </div>
  );
}

```

### Hero Shader
- **URL:** https://21st.dev/r/designali-in/hero-shader
- **Status:** live
- **Install Command:** `npx shadcn@latest add hero-shader`
- **Dependencies:** `@paper-design/shaders-react`
- **Concept Mapping:** 01-vault

**Description:**
A hero-shader component that provides a dynamic, animated mesh gradient background. It also includes SVG filters for glass and gooey effects.

**Props API:**
```typescript
interface ShaderBackgroundProps {
  children: React.ReactNode
}
```

**Animations & Interactions:**
The component features a continuous, gentle animation of a mesh gradient. On mouse enter, an active state is set, which can be used to trigger further animations or effects, although in the provided code it does not have a direct visual impact. The core animation is the fluid movement of the gradient colors.

**Customization Notes:**
To customize for a luxury jewelry theme, the `colors` prop of the `MeshGradient` components should be updated to a palette of golds, silvers, deep blues, and rich purples to evoke a sense of opulence. The `speed` prop can be adjusted to make the animation more subtle and elegant. The `backgroundColor` can be set to a dark, sophisticated color to make the jewelry stand out.

**Usage Example:**
```tsx
import { ShaderBackground } from "@/components/ui/hero-shader";

export default function MyPage() {
  return (
    <ShaderBackground>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-white">Vault-Maison</h1>
        <p className="text-lg text-white/80">Luxury Redefined</p>
      </div>
    </ShaderBackground>
  );
}
```

### Image Zoom
- **URL:** https://21st.dev/r/designali-in/image-zoom
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/designali-in/image-zoom`
- **Dependencies:** `next, lucide-react, react-medium-image-zoom`
- **Concept Mapping:** 03-gallery

**Description:**
A image-zoom component.

**Props API:**
```typescript
type ImageZoomProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof Zoom>;
```

**Animations & Interactions:**
On hover, the image zooms in. The zoom is controlled by the react-medium-image-zoom library.

**Customization Notes:**
The component can be customized by changing the Tailwind CSS classes. The colors, fonts, and spacing can be adjusted to match the luxury jewelry theming. The zoomMargin prop can be used to adjust the zoom level.

**Usage Example:**
```tsx
export const Component = () => {  
  return (
    <div >
       <div class=\"border-brand/10 relative mx-auto my-6 flex h-[336px] max-w-[250px] flex-col items-start border p-4 md:h-[28rem] md:max-w-sm\">
                        <Plus
                            strokeWidth={0.5}
                            class=\"text-[#fff200] absolute -left-4 -top-4 h-8 w-8\">
                        <Plus
                            strokeWidth={0.5}
                            class=\"text-[#fff200] absolute -bottom-4 -left-4 h-8 w-8\">
                        <Plus
                            strokeWidth={0.5}
                            class=\"text-[#fff200] absolute -right-4 -top-4 h-8 w-8\">
                        <Plus
                            strokeWidth={0.5}
                            class=\"text-[#fff200] absolute -bottom-4 -right-4 h-8 w-8\">
                        <ImageZoom>
                            <Image
                                src=\"https://raw.githubusercontent.com/dalim-in/dalim/refs/heads/main/apps/www/public/ai.JPEG\">
                                alt=\"Your Image\">
                                height={700}
                                width={700}
                                class=\"h-[300px] object-cover md:h-[404px]\">
                            <div class=\"relative -mt-14 bg-gradient-to-b from-black/0 to-black text-white md:-mt-24\">
                                <h1 class=\"z-20 items-center text-center text-[40px] font-black tracking-tighter md:text-[70px]\">Ali Imam</h1>{' '}
                            </div>
                        </ImageZoom>
                    </div>
    </div>
  );
};
```

### Landing Page
- **URL:** https://21st.dev/r/designali-in/landing-page
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/designali-in/landing-page`
- **Dependencies:** `lucide-react, framer-motion, @radix-ui/react-slot, class-variance-authority, @/components/ui/button, @/components/ui/input, @/components/ui/textarea`
- **Concept Mapping:** 01-vault, 10-maison

**Description:**
This is a comprehensive landing page component for a design agency. It features a modern and clean design with a hero section, client logos, services, featured projects, an about us section, and a contact form. The component is fully responsive and includes smooth animations and transitions.

**Props API:**
```typescript
The component does not accept any props.
```

**Animations & Interactions:**
The component uses framer-motion for animations. The header animates in from the top. The hero section content fades in. The mobile menu fades in and the menu items stagger in. The client logos, services, work, about, and contact sections also have fade-in animations. There are hover effects on buttons, links, and project cards, which include scaling, translation, and color changes.

**Customization Notes:**
To adapt this component for a luxury jewelry theme, consider the following customizations:

*   **Colors:** Replace the primary and secondary colors with a more luxurious palette, such as deep jewel tones (e.g., emerald, sapphire, ruby) or a classic black, white, and gold combination. Update the `tailwind.config.js` file to reflect these changes.
*   **Fonts:** Replace the default sans-serif font with a more elegant serif font for headings and a clean sans-serif for body text. Google Fonts offers a wide variety of free fonts that can be easily integrated.
*   **Spacing:** Increase the spacing between sections and elements to create a more open and luxurious feel. Adjust the padding and margin values in the Tailwind CSS classes.
*   **Imagery:** Replace the placeholder images with high-quality, professional photographs of jewelry.

**Usage Example:**
```tsx
import { DesignAgency } from '@/components/ui/landing-page';

const HomePage = () => {
  return <DesignAgency />;
};

export default HomePage;
```

### Navbar
- **URL:** https://21st.dev/r/designali-in/navbar
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/designali-in/navbar`
- **Dependencies:** `next, lucide-react, @/components/ui/liquid-glass-button`
- **Concept Mapping:** 01-vault, 10-maison

**Description:**
A responsive navigation bar that becomes sticky and changes background on scroll. It includes a logo, navigation links, and call-to-action buttons. On smaller screens, it collapses into a hamburger menu.

**Props API:**
```typescript
The component does not accept any props.
```

**Animations & Interactions:**
- The navbar smoothly transitions its background and size on scroll.
- The hamburger menu icon animates to a close icon when the menu is open.
- The mobile menu slides in and out.
- Links have a hover effect, changing their color.

**Customization Notes:**
For a luxury jewelry theme, consider the following customizations:
- **Colors:** Change the background color to a dark, elegant shade like charcoal or navy, and use gold or silver for text and accents.
- **Fonts:** Use a sophisticated serif font for the navigation links and a clean sans-serif for the buttons.
- **Spacing:** Increase the spacing between navigation items to create a more spacious and luxurious feel.

**Usage Example:**
```tsx
import { Header } from '@/components/ui/navbar';

const MyPage = () => {
  return (
    <div>
      <Header />
      {/* Other page content */}
    </div>
  );
};

export default MyPage;
```

### Cinematic Landing Hero
- **URL:** https://21st.dev/r/easemize/cinematic-landing-hero
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/easemize/cinematic-landing-hero`
- **Dependencies:** `gsap`
- **Concept Mapping:** 01-vault, 03-gallery, 10-maison

**Description:**
A cinematic-landing-hero component that creates a dramatic, animated landing page experience. It features a scroll-triggered timeline that animates text and a central card, which has a 3D-like effect that responds to mouse movement.

**Props API:**
```typescript
export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}
```

**Animations & Interactions:**
The component has a complex scroll-based animation timeline managed by GSAP and ScrollTrigger. As the user scrolls, the initial taglines fade and scale into view, followed by the main card animating into its final position. The card itself has a subtle 3D tilt effect that follows the mouse cursor, creating a sense of depth. Additionally, there are hover effects on the buttons, and a progress ring that animates as the user scrolls.

**Customization Notes:**
For a luxury jewelry theme, the color palette can be customized by modifying the CSS variables for `--color-foreground`. The deep blue background of the `premium-depth-card` can be changed to a more suitable color like a dark charcoal, rich burgundy, or a deep emerald green. The fonts can be replaced with elegant serif fonts. The spacing can be adjusted to create a more open and luxurious feel. The placeholder image inside the iPhone mockup should be replaced with a high-quality image of a piece of jewelry.

**Usage Example:**
```tsx
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";

export default function Page() {
  return (
    <CinematicHero />
  );
}

```

### Portfolio Gallery
- **URL:** https://21st.dev/r/isaiahbjork/portfolio-gallery
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/isaiahbjork/portfolio-gallery`
- **Dependencies:** `lucide-react,next,framer-motion`
- **Concept Mapping:** 03-gallery, 04-collection

**Description:**
A portfolio-gallery component.

**Props API:**
```typescript
interface PortfolioGalleryProps {\n  title?: string;\n  archiveButton?: {\n    text: string;\n    href: string;\n  };\n  images?: Array<{\n    src: string;\n    alt: string;\n    title?: string;\n  }>;\n  className?: string;\n  maxHeight?: number;\n  spacing?: string;\n  onImageClick?: (index: number) => void;\n  /**\n   * Whether to pause marquee animation on hover (mobile only)\n   * @default true\n   */\n  pauseOnHover?: boolean;\n  /**\n   * Number of times to repeat the content in marquee (mobile only)\n   * @default 4\n   */\n  marqueeRepeat?: number;\n}
```

**Animations & Interactions:**
The component uses framer-motion for animations. It has 1 motion divs. There are hover effects on some elements, indicated by 'group-hover' classes. 

**Customization Notes:**
For a luxury jewelry theme, consider the following customizations: *   **Colors:** Replace the default background and foreground colors with a palette of rich, deep colors like burgundy, navy, or charcoal, accented with metallic tones like gold, silver, or rose gold. *   **Fonts:** Use elegant serif fonts for titles and headings, and a clean sans-serif font for body text. *   **Spacing:** Increase the spacing between elements to create a more open and luxurious feel. The `spacing` prop can be used to adjust the overlap of the images in the desktop view. *   **Images:** Replace the placeholder images with high-quality, professional photographs of jewelry pieces. Ensure the images are well-lit and showcase the details of the jewelry.

**Usage Example:**
```tsx
return (\n    <section\n      aria-label={title}\n      className={`relative min-h-screen py-20 px-4 ${className}`}\n      id=\"archives\"\n    >\n      <div className=\"max-w-7xl mx-auto bg-background/50 backdrop-blur-sm rounded-2xl border border-border overflow-hidden\">\n        {/* Header Section */}\n        <div className=\"relative z-10 text-center pt-16 pb-8 px-8\">\n          <h2 className=\"text-4xl md:text-6xl font-bold text-foreground mb-8 text-balance\">{title}</h2>\n\n          <Link\n            href={archiveButton.href}\n            className=\"inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-foreground/90 transition-colors group mb-20\"\n          >\n            <span>{archiveButton.text}</span>\n            <ArrowRight className=\"w-5 h-5 group-hover:translate-x-1 transition-transform\" />\n          </Link>\n        </div>\n\n        {/* Desktop 3D overlapping layout - hidden on mobile */}\n        <div className=\"hidden md:block relative overflow-hidden h-[400px] -mb-[200px]\">\n          <div className={`flex ${spacing} pb-8 pt-40 items-end justify-center`}>\n            {images.map((image, index) => {\n              // Calculate stagger height - peak in middle, descending to edges\n              const totalImages = images.length\n              const middle = Math.floor(totalImages / 2)\n              const distanceFromMiddle = Math.abs(index - middle)\n              const staggerOffset = maxHeight - distanceFromMiddle * 20\n\n              const zIndex = totalImages - index\n\n              const isHovered = hoveredIndex === index\n              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index\n\n              // When hovering: hovered card moves to consistent top position, others move to baseline\n              const yOffset = isHovered ? -120 : isOtherHovered ? 0 : -staggerOffset\n\n              return (\n                <motion.div\n                  key={index}\n                  className=\"group cursor-pointer flex-shrink-0\"\n                  style={{\n                    zIndex: zIndex,\n                  }}\n                  initial={{\n                    transform: `perspective(5000px) rotateY(-45deg) translateY(200px)`,
                    opacity: 0,
                  }}\n                  animate={{\n                    transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`,
                    opacity: 1,
                  }}\n                  transition={{\n                    duration: 0.2, // Much faster hover animation\n                    delay: index * 0.05, // Faster entrance stagger\n                    ease: [0.25, 0.1, 0.25, 1],\n                  }}\n                  onHoverStart={() => setHoveredIndex(index)}\n                  onHoverEnd={() => setHoveredIndex(null)}\n                  onClick={() => onImageClick?.(index)}\n                >\n                  <div\n                    className=\"relative aspect-video w-64 md:w-80 lg:w-96 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105\"\n                    style={{\n                      boxShadow: `\n                        rgba(0, 0, 0, 0.01) 0.796192px 0px 0.796192px 0px,\n                        rgba(0, 0, 0, 0.03) 2.41451px 0px 2.41451px 0px,\n                        rgba(0, 0, 0, 0.08) 6.38265px 0px 6.38265px 0px,\n                        rgba(0, 0, 0, 0.25) 20px 0px 20px 0px\n                      `,\n                    }}\n                  >\n                    <img\n                      src={image.src || \"/placeholder.svg\"}\n                      alt={image.alt}\n                      className=\"w-full h-full object-cover object-left-top\"\n                      loading=\"lazy\"\n                      decoding=\"async\"\n                    />\n                  </div>\n                </motion.div>\n              )\n            })}\n          </div>\n        </div>\n\n        {/* Mobile marquee layout */}\n        <div className=\"block md:hidden relative pb-8\">\n          <div\n            className={cn(\n              \"group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]\",\n              \"flex-row\"\n            )}\n          >\n            {Array(marqueeRepeat)\n              .fill(0)\n              .map((_, i) => (\n                <div\n                  key={i}\n                  className={cn(\n                    \"flex shrink-0 justify-around [gap:var(--gap)]\",\n                    \"animate-marquee flex-row\",\n                    {\n                      \"group-hover:[animation-play-state:paused]\": pauseOnHover,\n                    }\n                  )}\n                >\n                  {images.map((image, index) => (\n                    <div\n                      key={`${i}-${index}`}\n                      className=\"group cursor-pointer flex-shrink-0\"\n                      onClick={() => onImageClick?.(index)}\n                    >\n                      <div\n                        className=\"relative aspect-video w-64 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105\"\n                        style={{\n                          boxShadow: `\n                            rgba(0, 0, 0, 0.01) 0.796192px 0px 0.796192px 0px,\n                            rgba(0, 0, 0, 0.03) 2.41451px 0px 2.41451px 0px,\n                            rgba(0, 0, 0, 0.08) 6.38265px 0px 6.38265px 0px,\n                            rgba(0, 0, 0, 0.25) 20px 0px 20px 0px\n                          `,\n                        }}\n                      >\n                        <img\n                          src={image.src || \"/placeholder.svg\"}\n                          alt={image.alt}\n                          className=\"w-full h-full object-cover object-left-top\"\n                          loading=\"lazy\"\n                          decoding=\"async\"\n                        />\n                      </div>\n                    </div>\n                  ))}\n                </div>\n              ))}\n          </div>\n        </div>\n      </div>\n    </section>\n  
```

### Product Reveal Card
- **URL:** https://21st.dev/r/isaiahbjork/product-reveal-card
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/isaiahbjork/product-reveal-card`
- **Dependencies:** `framer-motion, lucide-react, @/components/ui/button`
- **Concept Mapping:** This component is well-suited for '03-gallery' and '05-product' concepts, as it is designed to showcase individual products in a visually engaging manner.

**Description:**
A product-reveal-card component that showcases a product with an image, name, price, and rating. On hover, an overlay slides up from the bottom to reveal more details and action buttons, creating an interactive and engaging user experience.

**Props API:**
```typescript
interface ProductRevealCardProps {
  name?: string;
  price?: string;
  originalPrice?: string;
  image?: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  onAdd?: () => void;
  onFavorite?: () => void;
  enableAnimations?: boolean;
  className?: string;
}
```

**Animations & Interactions:**
The component has several animations that are triggered on hover. The main container scales up and moves slightly upwards. The product image zooms in. An overlay with product details slides up from the bottom, and the content within the overlay fades in and slides up. The 'Add to Cart' and 'View Details' buttons also have a subtle scale and slide animation on hover. The favorite button has a heart icon that fills with red color and does a small bounce and rotation animation when clicked.

**Customization Notes:**
To adapt this component for a luxury jewelry theme, consider the following customizations. For colors, use a palette of gold, silver, and dark grays or blues. The `bg-card`, `text-card-foreground`, and `text-primary` classes can be customized in the Tailwind theme. For fonts, use elegant serif or sans-serif fonts for the product name and description. Spacing can be increased to create a more open and luxurious feel. The border and shadow can be softened or removed for a cleaner look.

**Usage Example:**
```tsx
import { ProductRevealCard } from "@/components/ui/product-reveal-card";

export default function MyPage() {
  return (
    <div className="grid place-items-center h-screen">
      <ProductRevealCard />
    </div>
  );
}
```

### Profile Card
- **URL:** https://21st.dev/r/isaiahbjork/profile-card
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/isaiahbjork/profile-card`
- **Dependencies:** `framer-motion, lucide-react`
- **Concept Mapping:** 01-vault, 10-maison

**Description:**
A profile-card component that displays a user's profile information including their name, description, image, and follower/following counts. The card has a hover effect that animates the card and its contents. It also includes a follow button with a different state when the user is already being followed.

**Props API:**
```typescript
interface ProfileCardProps {
  name?: string;
  description?: string;
  image?: string;
  isVerified?: boolean;
  followers?: number;
  following?: number;
  enableAnimations?: boolean;
  className?: string;
  onFollow?: () => void;
  isFollowing?: boolean;
}
```

**Animations & Interactions:**
The card has a hover effect that scales it up and moves it slightly on the Y-axis. The profile image also scales up on hover. The content inside the card, including the name, description, stats, and button, animates in with a staggered fade-in and slide-up effect. The name has a letter-by-letter animation. The verified icon has a slight rotation and scale animation on hover. The follow button also has a scale animation on hover and tap.

**Customization Notes:**
For a luxury jewelry theme, the color palette can be updated to use more sophisticated and elegant colors like gold, silver, and dark grays. The fonts can be changed to a more classic and high-end serif font. The spacing and layout can be adjusted to be more spacious and minimalist to create a more luxurious feel. The blur and gradient effects can be intensified to create a more dreamy and ethereal look.

**Usage Example:**
```tsx
import { ProfileCard } from '@/components/ui/profile-card';

export default function MyPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ProfileCard />
    </div>
  );
}
```

### Order Confirmation Card
- **URL:** https://21st.dev/r/kavikatiyar/order-confirmation-card
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/kavikatiyar/order-confirmation-card`
- **Dependencies:** `framer-motion, lucide-react`
- **Concept Mapping:** 01-vault, 10-maison

**Description:**
The Order Confirmation Card is a responsive and theme-adaptive component that displays a summary of a completed order. It includes details like the order ID, payment method, date, and total amount, along with a confirmation icon and a call-to-action button. The card uses subtle animations to present the information in an engaging way.

**Props API:**
```typescript
interface OrderConfirmationCardProps {
  orderId: string;
  paymentMethod: string;
  dateTime: string;
  totalAmount: string;
  onGoToAccount: () => void;
  title?: string;
  buttonText?: string;
  icon?: React.ReactNode;
  className?: string;
}
```

**Animations & Interactions:**
The card and its elements animate into view with a fade-in and scale-up effect using Framer Motion. The main container has a `staggerChildren` transition, causing the icon, title, details, and button to appear sequentially. Each item also has a subtle upward slide-in animation.

**Customization Notes:**
For a luxury jewelry theme, consider the following customizations:
- **Colors**: Change the background color (`bg-card`) to a more luxurious shade like a deep charcoal, navy, or a soft cream. The primary button color can be customized to match the brand's primary color.
- **Fonts**: Use a serif font for the title and a clean sans-serif font for the details to create a more elegant look.
- **Spacing**: Increase the padding (`p-6 sm:p-8`) to give the elements more breathing room and create a more premium feel.

**Usage Example:**
```tsx
import { OrderConfirmationCard } from "@/components/ui/order-confirmation-card";

const MyOrderPage = () => (
  <OrderConfirmationCard
    orderId="#12345-ABCDE"
    paymentMethod="Visa **** 1234"
    dateTime="April 12, 2026, 1:09 PM"
    totalAmount="$1,234.56"
    onGoToAccount={() => console.log("Go to account")}
  />
);
```

### Interactive Checkout
- **URL:** https://21st.dev/r/kokonutd/interactive-checkout
- **Status:** live
- **Install Command:** `npx shadcn@latest add interactive-checkout`
- **Dependencies:** `lucide-react, framer-motion, @number-flow/react`
- **Concept Mapping:** 01-vault, 10-maison

**Description:**
An interactive checkout component that allows users to add products to a cart, update quantities, and see the total price update in real-time. The component features a two-column layout with a list of products on the left and a sticky cart on the right.

**Props API:**
```typescript
interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    color: string;
}

interface InteractiveCheckoutProps {
    products?: Product[];
}
```

**Animations & Interactions:**
The component utilizes framer-motion for animations. When a product is added to the cart, it animates into the cart section. The cart items also have a layout animation when items are added or removed. Buttons have a subtle scale effect on hover and tap. The product cards have a slight lift and border color change on hover.

**Customization Notes:**
For a luxury jewelry theme, consider the following customizations:
-   **Colors**: Replace the default zinc colors with a more luxurious palette, such as deep blues, rich burgundies, or classic black and white with metallic accents (gold, silver, rose gold).
-   **Fonts**: Use elegant serif or high-end sans-serif fonts for product names and prices.
-   **Spacing**: Increase the spacing between elements to create a more open and premium feel.
-   **Imagery**: Replace the placeholder images with high-quality, professionally shot photos of the jewelry.

**Usage Example:**
```tsx
import InteractiveCheckout from "@/components/ui/interactive-checkout";

const Page = () => {
  return (
    <div className=\"p-4\">
      <InteractiveCheckout />
    </div>
  );
};

export default Page;
```

### glass-card
- **URL:** https://21st.dev/r/molecule-lab-rushil/glass-card
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/molecule-lab-rushil/glass-card`
- **Dependencies:** `https://21st.dev/r/shadcn/button,https://21st.dev/r/shadcn/label,https://21st.dev/r/shadcn/input`
- **Concept Mapping:** 01-vault, 03-gallery, 10-maison

**Description:**
A glass-card component.

**Props API:**
```typescript
interface GlassCardProps extends React.ComponentProps<"div"> {}
interface GlassCardHeaderProps extends React.ComponentProps<"div"> {}
interface GlassCardTitleProps extends React.ComponentProps<"div"> {}
interface GlassCardDescriptionProps extends React.ComponentProps<"div"> {}
interface GlassCardActionProps extends React.ComponentProps<"div"> {}
interface GlassCardContentProps extends React.ComponentProps<"div"> {}
interface GlassCardFooterProps extends React.ComponentProps<"div"> {}
```

**Animations & Interactions:**
The component has a glass-like visual effect created by the `backdrop-blur-md` Tailwind CSS class. This is not an animation but a static visual style. There are no other explicit animations or interactions defined in the component's source code. The component parts are standard divs and will behave as such.

**Customization Notes:**
For a luxury jewelry theme, the following customizations are recommended:

- **Colors:** The component uses `primary-foreground` for its background and border. To align with a luxury aesthetic, you should update your Tailwind theme to use a dark, sophisticated color palette. For example, you could set `primary-foreground` to a deep charcoal or navy blue, and use gold or silver for text and accents.

- **Fonts:** The component uses `font-semibold`. For a more elegant and high-end feel, consider using a serif font family for titles and a clean sans-serif for body text. You can configure this in your `tailwind.config.js` file.

- **Spacing:** The component has a `gap-6` and `py-6`. You can adjust these values to create more or less whitespace, depending on the desired visual density. For a luxury feel, generous spacing is often preferred.

- **Blur:** The `backdrop-blur-md` can be adjusted to `backdrop-blur-lg` or `backdrop-blur-xl` for a more pronounced glass effect.

**Usage Example:**
```tsx
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardAction,
  GlassCardContent,
  GlassCardFooter,
} from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export function GlassCardDemo() {
  return (
    <GlassCard>
      <GlassCardHeader>
        <GlassCardTitle>Vault-Maison Diamond</GlassCardTitle>
        <GlassCardDescription>A stunning, one-of-a-kind diamond.</GlassCardDescription>
        <GlassCardAction>
          <Button variant="ghost" size="icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
            </svg>
          </Button>
        </GlassCardAction>
      </GlassCardHeader>
      <GlassCardContent>
        <p>This is where the main content of the card would go, such as a more detailed description of the diamond.</p>
      </GlassCardContent>
      <GlassCardFooter>
        <Button>Add to Cart</Button>
      </GlassCardFooter>
    </GlassCard>
  );
}
```

### Glowing Ai Chat Assistant
- **URL:** https://21st.dev/r/muhammad-binsalman/glowing-ai-chat-assistant
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/muhammad-binsalman/glowing-ai-chat-assistant`
- **Dependencies:** `lucide-react`
- **Concept Mapping:** 01-vault, 10-maison

**Description:**
A floating AI chat assistant component that is displayed as a glowing button on the bottom right of the screen. When clicked, it expands into a chat window with a header, a text area for user input, and controls for sending messages and attaching files. The component is self-contained and manages its own state.

**Props API:**
```typescript
The component does not accept any props.
```

**Animations & Interactions:**
The floating AI assistant button has a continuous glowing animation and rotates 90 degrees when clicked to open the chat window. The chat window appears with a 'popIn' animation using a custom cubic-bezier curve. The control buttons for file upload, link, code, and design have hover effects that include scaling, rotation, and a tooltip appearing above them. The 'Send' button has a hover effect that makes it scale and rotate slightly, and it is disabled when there is no text in the input area. The green dot in the header indicating the AI is active has a pulse animation.

**Customization Notes:**
To adapt this component for a luxury jewelry theme, the color palette can be updated to use gold, silver, and other precious metal colors. The gradients and box shadows can be adjusted to create a more subtle and sophisticated glow effect. The default fonts can be replaced with elegant serif or sans-serif fonts that match the brand's identity. The spacing and padding can be increased to give the component a more open and luxurious feel.

**Usage Example:**
```tsx
import FloatingAiAssistant from '@/components/ui/glowing-ai-chat-assistant';

const Page = () => {
  return (
    <div>
      <FloatingAiAssistant />
    </div>
  );
};
```

### amazing-card
- **URL:** https://21st.dev/r/nakulgupta2004/amazing-card
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/nakulgupta2004/amazing-card`
- **Dependencies:** `react, clsx, lucide-react, framer-motion`
- **Concept Mapping:** 03-gallery, 07-product

**Description:**
A responsive card component with 3D tilt effect on hover, a glow pulse animation, and a shine effect on the button. It can display an image, title, description, price, and a badge. The component is highly customizable with options for aspect ratio, badge color, and glow effect.

**Props API:**
```typescript
export interface FashionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string
  title: string
  description?: string
  price: string
  badge?: string
  badgeColor?: "sale" | "new" | "exclusive" | "limited"
  aspect?: "portrait" | "landscape" | "square"
  glowEffect?: boolean
}
```

**Animations & Interactions:**
The card has a 3D tilt effect on mouse hover, implemented with React hooks to calculate and apply rotation based on mouse position. An optional glow pulse animation can be enabled. The card also features a glass effect overlay that appears on hover. The title, description and price have a fade-in animation. The badge has a floating animation. The \"Shop now\" button has a shine animation on hover and scales up slightly.

**Customization Notes:**
For a luxury jewelry theme, consider using a more subtle and elegant color palette. The `badgeColor` prop can be used to define custom badge styles. The `font-serif` and `font-sans` classes can be replaced with custom fonts that match the brand identity. The spacing and rounded corners can be adjusted to create a more refined look. The glow effect can be disabled for a more minimalist aesthetic.

**Usage Example:**
```tsx
export function FashionCardDemo() {
  return (
    <div className=\"p-8 bg-gradient-to-br from-fashion-cream to-fashion-beige min-h-screen\">
      <h2 className=\"text-3xl md:text-4xl font-serif font-bold text-fashion-charcoal mb-8 text-center\">New Arrivals</h2>
      
      <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8\">
        <AmazingCard
          image=\"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80\"
          title=\"Cashmere Blend Coat\"
          description=\"Luxurious camel coat crafted from premium cashmere blend for ultimate warmth and style.\"
          price=\"$349.99\"
          badge=\"new\"
          badgeColor=\"new\"
        />
        <AmazingCard
          image=\"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80\"
          title=\"Designer Handbag\"
          description=\"Elegant structured handbag with gold hardware and adjustable strap.\"
          price=\"$189.99\"
          badge=\"sale\"
          badgeColor=\"sale\"
          aspect=\"square\"
        />
        <AmazingCard
          image=\"https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80\"
          title=\"Leather Chelsea Boots\"
          description=\"Classic Chelsea boots crafted from genuine leather with durable rubber sole.\"
          price=\"$129.99\"
          badge=\"exclusive\"
          badgeColor=\"exclusive\"
        />
      </div>
    </div>
  );
}
```

### Credit Card Form
- **URL:** https://21st.dev/r/rahil1202/credit-card-form
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/rahil1202/credit-card-form`
- **Dependencies:** `react`
- **Concept Mapping:** 08-checkout

**Description:**
A credit-card-form component that provides a user-friendly interface for entering credit card details. It includes a visual representation of the credit card that updates in real-time as the user types. The component also includes validation for all fields and a flip animation to reveal the CVV input on the back of the card.

**Props API:**
```typescript
type Props = {
  /** Prefill values (optional) */
  defaultNumber?: string;
  defaultHolder?: string;
  defaultMonth?: string; // "01".."12"
  defaultYear?: string;  // "2025"
  defaultCVV?: string;

  /** Mask digits 5..12 with * on the card front */
  maskMiddle?: boolean;

  /** Override gradient accent rings (front/back :before/:after) */
  ring1?: string; // e.g. "#ff6be7"
  ring2?: string; // e.g. "#7288ff"

  /** Show a submit button */
  showSubmit?: boolean;
  /** Live change callback */
  onChange?: (state: CardState, validity: CardValidity) => void;
  /** Submit callback */
  onSubmit?: (state: CardState, validity: CardValidity) => void;

  /** Class for wrapping container */
  className?: string;
};
```

**Animations & Interactions:**
The credit card component features several animations and interactions to enhance user experience. A prominent 3D flip animation, triggered on focus of the CVV field, rotates the card to reveal the back. As the user inputs their card number, the digits slide into place from the bottom. The component also highlights the active input field on the card visual itself, providing clear visual feedback. The submit button is disabled until all fields are valid.

**Customization Notes:**
For a luxury jewelry theme, the color scheme can be customized by overriding the `ring1` and `ring2` props with sophisticated colors like gold, silver, or deep jewel tones. The default blue and purple gradient can be replaced to match the brand's aesthetic. The font can be changed via CSS to a more elegant serif or a clean, modern sans-serif. Spacing can be adjusted in the CSS to create a more open and luxurious feel.

**Usage Example:**
```tsx
import CreditCardForm from '@/components/ui/credit-card-form';

const MyCheckoutPage = () => {
  return (
    <CreditCardForm
      onSubmit={(state, validity) => {
        if (validity.allValid) {
          console.log('Card details:', state);
        } else {
          console.log('Invalid card details');
        }
      }}
    />
  );
};

export default MyCheckoutPage;
```

### Feature Highlight Card
- **URL:** https://21st.dev/r/ravikatiyar162/feature-highlight-card
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/ravikatiyar162/feature-highlight-card`
- **Dependencies:** `framer-motion`
- **Concept Mapping:** 03-gallery, 05-product

**Description:**
* A responsive and animated card component to highlight a feature.\nBuilt with TypeScript, Tailwind CSS, and Framer Motion.\nIt supports shadcn/ui theming for light and dark modes.

**Props API:**
```typescript
interface FeatureHighlightCardProps {\n  imageSrc: string;\n  imageAlt?: string;\n  title: string;\n  description: string;\n  buttonText: string;\n  className?: string;\n}
```

**Animations & Interactions:**
The card and its elements fade in and slide up on load. The main container has a staggered animation for its children. The image scales in and fades in. The title, description, and button fade in and slide up from the bottom.

**Customization Notes:**
To adapt for a luxury jewelry theme, consider the following: Change the color palette to use gold, silver, and dark, rich tones. The `bg-primary/10` and `blur-3xl` classes can be adjusted to match the brand's color scheme. The font can be updated to a more elegant serif or a clean, modern sans-serif font. Spacing can be increased to give a more open and luxurious feel.

**Usage Example:**
```tsx
import { FeatureHighlightCard } from "@/components/ui/feature-highlight-card";

<FeatureHighlightCard
  imageSrc="/path/to/your/image.png"
  title="Exquisite Diamond Necklace"
  description="Crafted with precision, this necklace features a stunning array of diamonds set in 18k white gold."
  buttonText="View Details"
/>
```

### Glowing Card
- **URL:** https://21st.dev/r/ravikatiyar162/glowing-card
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/ravikatiyar162/glowing-card`
- **Dependencies:** `react`
- **Concept Mapping:** 03-gallery, 07-spotlight

**Description:**
A simple card component that features a glowing dot that animates around its border. The card displays a number and a label, making it suitable for showcasing statistics or key metrics in a visually appealing way.

**Props API:**
```typescript
The component does not accept any props.
```

**Animations & Interactions:**
The component features a glowing dot that animates around the border of the card. The animation, named `moveDot`, moves the dot from the top-right corner, to the top-left, then to the bottom-left, then to the bottom-right, and finally back to the top-right, creating a continuous loop. This is achieved using a CSS keyframe animation.

**Customization Notes:**
To adapt this component for a luxury jewelry theme, consider the following customizations:

*   **Colors:** Change the background color of the card to a deep, rich color like charcoal, navy, or burgundy. The glowing dot and the text can be changed to a metallic color like gold or silver to evoke a sense of luxury.
*   **Fonts:** Use a serif font for the text to give it a more classic and elegant feel.
*   **Spacing:** Adjust the padding and margins to create a more spacious and refined layout.

**Usage Example:**
```tsx
import { Component as GlowingCard } from "@/components/ui/glowing-card";

const MyPage = () => (
  <div className="flex justify-center items-center h-screen">
    <GlowingCard />
  </div>
);
```

### Hero
- **URL:** https://21st.dev/r/reuno-ui/hero
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/reuno-ui/hero`
- **Dependencies:** `@paper-design/shaders-react, framer-motion`
- **Concept Mapping:** 01-vault, 10-maison

**Description:**
A hero component with a dynamic mesh gradient background, animated logo, and other interactive elements. It's designed to be a visually stunning and engaging landing page hero section.

**Props API:**
```typescript
The component does not have any props.
```

**Animations & Interactions:**
The component features several animations and interactions. On mouse hover over the main container, the background mesh gradient animates. The logo has a hover effect that changes its fill and makes it rotate. A particle animation is triggered on hover over the logo. The main title and subtitle fade in and slide up. The buttons have a hover effect that changes their background color and scales them up. A pulsing border with rotating text is present in the bottom right corner.

**Customization Notes:**
To customize for a luxury jewelry theme, the color palette of the mesh gradients and other elements should be updated to reflect the brand's colors. The fonts can be replaced with more elegant and luxurious ones. The spacing and layout can be adjusted to create a more spacious and premium feel. The pulsing border could be customized to incorporate brand-specific colors or icons.

**Usage Example:**
```tsx
import Hero from '@/components/ui/hero';

export default function MyPage() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

### Footer
- **URL:** https://21st.dev/r/ruixen.ui/footer
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/ruixen.ui/footer`
- **Dependencies:** `next, lucide-react, @/components/ui/input, @/components/ui/button, @/components/ui/card`
- **Concept Mapping:** 01-vault, 03-gallery, 10-maison

**Description:**
This is a comprehensive footer component that displays company information, navigation links, and contact details. It is designed to be easily configurable and adaptable to different branding requirements.

**Props API:**
```typescript
The component does not accept any props. All the content is managed internally through the `footerConfig` object.
```

**Animations & Interactions:**
The links in the footer have a smooth color transition on hover. The text color changes to blue-500, providing visual feedback to the user.

**Customization Notes:**
To adapt this component for a luxury jewelry theme, the `footerConfig` object should be modified. The color scheme can be updated to incorporate gold, silver, and black to evoke a sense of elegance. The typography can be changed to a more refined serif font. Increasing the spacing between elements will also contribute to a more luxurious and uncluttered aesthetic.

**Usage Example:**
```tsx
import Footer from '@/components/ui/footer';

export default function Page() {
  return (
    <div>
      <Footer />
    </div>
  );
}
```

### Ruixen Mono Chat
- **URL:** https://21st.dev/r/ruixen.ui/ruixen-mono-chat
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/ruixen.ui/ruixen-mono-chat`
- **Dependencies:** `lucide-react, next`
- **Concept Mapping:** 04-service, 08-community

**Description:**
A chat component that displays a list of participants and their messages. It allows filtering messages by participant and includes features like message status, reactions, and a message input field. The component has a clean, modern design with both light and dark modes.

**Props API:**
```typescript
interface RuixenCard04Props {
    chatName?: string;
    messages?: Message[];
}
```

**Animations & Interactions:**
The component features several subtle animations and interactions. Buttons have a transition effect on hover, changing their background color. The main chat container and participant list have smooth scrolling. When a participant is selected, their background color changes with a transition. The input field has a focus effect, showing a ring around it. The send button has a hover effect that slightly changes its brightness.

**Customization Notes:**
For a luxury jewelry theme, consider the following customizations:

*   **Colors**: Replace the default gray and black colors with a more luxurious palette. For example, use a soft gold or silver for accents, and a deep charcoal or navy for the dark mode background. The green for the 'online' status could be a more subtle, jewel-toned green.
*   **Fonts**: Use a more elegant, serif font for the chat name and participant names. A clean, sans-serif font can be used for the message content for readability.
*   **Spacing**: Increase the padding and spacing between elements to create a more open and luxurious feel.
*   **Icons**: The `lucide-react` icons can be replaced with custom-designed icons that match the brand's aesthetic.

**Usage Example:**
```tsx
import RuixenMonoChat from '@/components/ui/ruixen-mono-chat';

export default function Page() {
  return (
    <div className="w-full">
      <RuixenMonoChat />
    </div>
  );
}
```

### Moving Dot Card
- **URL:** https://21st.dev/r/thanh/moving-dot-card
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/thanh/moving-dot-card`
- **Dependencies:** `react`
- **Concept Mapping:** 01-vault, 10-maison

**Description:**
Moving Dot Card is a dynamic component that displays a numerical value animating up to a target number. It features a decorative dot that continuously moves around the perimeter of the card, creating an engaging visual effect.

**Props API:**
```typescript
interface DotCardProps {
  target?: number;
  duration?: number;
}
```

**Animations & Interactions:**
The component features a dot that continuously animates around the border of the card in a square path. The animation keyframes 'moveDot' define this path, moving the dot from top-right, to top-left, to bottom-left, to bottom-right, and back to top-right. Simultaneously, a number inside the card animates, counting up from 0 to a specified 'target' value over a given 'duration'.

**Customization Notes:**
For a luxury jewelry theme, consider the following customizations:
- **Colors**: Modify the CSS to use a palette of deep charcoals, golds, and silvers for the card, text, and animated dot to evoke a sense of elegance.
- **Fonts**: Replace the default font with a sophisticated serif or a clean, high-end sans-serif font for the displayed number and label.
- **Spacing**: Adjust the padding and margins within the card to create a more open and refined layout.
- **Animation**: The animation speed can be adjusted via the `duration` prop for a more subtle and graceful effect.

**Usage Example:**
```tsx
import MovingDotCard from '@/components/ui/moving-dot-card';

export default function MyComponent() {
  return (
    <MovingDotCard target={888000} duration={2500} />
  );
}
```

### Sparkle Card
- **URL:** https://21st.dev/r/user_hardp/sparkle-card
- **Status:** live
- **Install Command:** `npx shadcn@latest add https://21st.dev/r/user_hardp/sparkle-card`
- **Dependencies:** `clsx, motion`
- **Concept Mapping:** 01-vault, 03-gallery

**Description:**
A sparkle-card component that displays a card with animated sparkles in the background. The sparkles fade in and out at random positions within the card.

**Props API:**
```typescript
type SparkleCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Number of sparkles */
  sparkles?: number;
  /** Duration of one sparkle cycle */
  duration?: number;
};
```

**Animations & Interactions:**
The component features a background with animated sparkles. Each sparkle is a small dot that animates its opacity from 0 to 0.8 and back to 0, and its scale from 0.5 to 1 and back to 0.5. The animations have a configurable duration and are staggered with a random delay. When a sparkle animation completes, it respawns at a new random location.

**Customization Notes:**
The component can be customized for a luxury jewelry theme by adjusting the following: 
- **Colors**: Modify the `bg-background` and `border-border` classes to match the website's color palette. The sparkle color can be changed by modifying `bg-black` and `dark:bg-white` to a more shimmery color like gold or silver.
- **Fonts**: The font of the content within the card can be customized by applying custom font classes to the children elements.
- **Spacing**: The padding of the card can be adjusted by changing the `p-6` class.

**Usage Example:**
```tsx
import { SparkleCard } from "@/components/ui/sparkle-card";

export default function MyComponent() {
  return (
    <SparkleCard>
      <h3 class="text-lg font-semibold">Sparkle Card</h3>
      <p class="text-sm text-muted-foreground">
        This is a card with sparkling background.
      </p>
    </SparkleCard>
  );
}
```

## 4. Aceternity UI Components Research

Deep research of the 19 Aceternity UI components specified in the build spec.

### Aurora Background
- **URL:** https://ui.aceternity.com/components/aurora-background
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/aurora-background`
- **Dependencies:** `framer-motion, clsx, tailwind-merge`
- **Concept Mapping:** 02-observatory, 10-maison

**Description:**
A subtle, animated aurora or southern lights effect to be used as a background for a website. It provides a visually appealing and dynamic backdrop for content.

**Props API:**
```typescript
children: React.ReactNode, className?: string, showRadialGradient?: boolean
```

**Animations & Interactions:**
The background features a continuous, slow-moving aurora effect created with a CSS keyframe animation that shifts the background position of repeating linear gradients. The content within the background animates into view with a fade-in and upward translation, managed by Framer Motion.

**Customization Notes:**
To customize for a luxury jewelry theme, the aurora colors can be modified by adjusting the CSS variables in the [--aurora] utility class (e.g., --blue-500, --indigo-300). Background colors can be changed from the default bg-zinc-50/dark:bg-zinc-900. Font styles and spacing can be tailored using different Tailwind CSS utility classes for typography and layout. The component is already dark-mode compatible.

**Usage Example:**
```tsx

"use client";
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "../ui/aurora-background";

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Background lights are cool you know.
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          And this, is chemical burn.
        </div>
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Debug now
        </button>
      </motion.div>
    </AuroraBackground>
  );
}

```

### Card Spotlight
- **URL:** https://ui.aceternity.com/components/card-spotlight
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/card-spotlight`
- **Dependencies:** `framer-motion, clsx, tailwind-merge, three, @react-three/fiber, @types/three`
- **Concept Mapping:** 01-vault, 10-maison

**Description:**
A card component with a spotlight effect that follows the mouse cursor, revealing a radial gradient background. On hover, it triggers a `CanvasRevealEffect` for a more dramatic visual flourish.

**Props API:**
```typescript
{
  children: React.ReactNode;
  radius?: number;
  color?: string;
  className?: string;
}
```

**Animations & Interactions:**
The component features a spotlight effect that tracks the user's mouse movements over the card. This is achieved by updating the position of a radial gradient in response to mouse coordinates. On hover, a `CanvasRevealEffect` is triggered, adding a dynamic, generative art-style animation to the background. The spotlight itself fades in and out smoothly on hover and mouse leave, controlled by a transition on the opacity property.

**Customization Notes:**
For a luxury jewelry theme, the `color` prop can be set to a soft gold (e.g., `#FFD700` with some transparency) or a shimmering silver. The `radius` can be adjusted to control the size of the spotlight. The background color of the card can be changed from `bg-black` to a deep charcoal or a rich navy to create a more premium feel. The border color can be updated to match the spotlight color. Typography can be customized by targeting the text elements within the card and applying a more elegant, serif font family.

**Usage Example:**
```tsx
import { CardSpotlight } from "@/components/ui/card-spotlight";

export function CardSpotlightDemo() {
  return (
    <CardSpotlight className="h-96 w-96">
      <p className="text-xl font-bold relative z-20 mt-2 text-white">
        Authentication steps
      </p>
      <div className="text-neutral-200 mt-4 relative z-20">
        Follow these steps to secure your account:
        <ul className="list-none  mt-2">
          <Step title="Enter your email address" />
          <Step title="Create a strong password" />
          <Step title="Set up two-factor authentication" />
          <Step title="Verify your identity" />
        </ul>
      </div>
      <p className="text-neutral-300 mt-4 relative z-20 text-sm">
        Ensuring your account is properly secured helps protect your personal
        information and data.
      </p>
    </CardSpotlight>
  );
}

const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-white">{title}</p>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};
```

### Background Beams
- **URL:** https://ui.aceternity.com/components/background-beams
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/background-beams`
- **Dependencies:** `motion, clsx, tailwind-merge`
- **Concept Mapping:** 01-vault, 02-observatory, 10-maison

**Description:**
A background component that features multiple animated beams following SVG paths. It's suitable for creating a dynamic and engaging hero section background.

**Props API:**
```typescript
className?: string
```

**Animations & Interactions:**
The component renders multiple SVG paths that animate in a continuous loop, creating a dynamic background effect of moving beams. The animation is not interactive and does not respond to user input like hover or click. The beams follow predefined SVG paths, giving the impression of light beams scanning across the background.

**Customization Notes:**
To customize for a luxury jewelry theme, the SVG path stroke colors can be modified in the source code to match gold, silver, or other metallic colors. The background color can be changed from `bg-neutral-950` to a darker, more luxurious shade. The animation's path, speed, and beam thickness can be adjusted in the source code for a more subtle and elegant effect.

**Usage Example:**
```tsx
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export function BackgroundBeamsDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to MailJet, the best transactional email service on the web. We provide reliable, scalable, and customizable email solutions for your business.
        </p>
        <input
          type="text"
          placeholder="hi@manuarora.in"
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
        />
      </div>
      <BackgroundBeams />
    </div>
  );
}
```

### Canvas Reveal Effect
- **URL:** https://ui.aceternity.com/components/canvas-reveal-effect
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/canvas-reveal-effect`
- **Dependencies:** `framer-motion, clsx, tailwind-merge`
- **Concept Mapping:** 01-vault, 02-observatory, 10-maison

**Description:**
The Canvas Reveal Effect is a background effect that creates a pattern of dots that expand and change color on hover. It is designed to be used within a card-like container and provides a visually engaging way to reveal more information or draw attention to a particular element.

**Props API:**
```typescript
animationSpeed?: number, opacities?: number[], colors?: number[][], containerClassName?: string, dotSize?: number, showGradient?: boolean
```

**Animations & Interactions:**
The component features a reveal effect on hover. When the user hovers over the card, a canvas animation is triggered, where a pattern of dots expands and changes color. The text content of the card also animates, with the initial icon fading out and translating up, while the title fades in and translates up. This is orchestrated using framer-motion's `AnimatePresence` and `motion.div` components, with `initial` and `animate` props defining the animation states.

**Customization Notes:**
To customize for a luxury jewelry theme, the color palette of the canvas reveal effect should be changed to reflect the brand's identity, using gold, silver, and deep jewel tones. The `colors` prop can be used to set these custom colors. The background color of the card can be customized via the `containerClassName` prop. The font used for the title and description can be changed to a more elegant serif or a clean sans-serif font to match the luxury aesthetic. The animation speed can be adjusted using the `animationSpeed` prop to create a more subtle and sophisticated effect.

**Usage Example:**
```tsx
´´´tsx
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export function CanvasRevealEffectDemo() {
  return (
    <Card title="Sheetal is Nisha" icon={<AceternityIcon />}>
      <CanvasRevealEffect
        animationSpeed={5.1}
        containerClassName="bg-emerald-900"
      />
    </Card>
  );
}
´´´
```

### Animated Modal
- **URL:** https://ui.aceternity.com/components/animated-modal
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/animated-modal`
- **Dependencies:** `framer-motion, tailwind-merge, react, @/lib/utils`
- **Concept Mapping:** 01-vault, 10-maison

**Description:**
A customizable, compound modal component with animated transitions. The modal appears with a scaling and fading animation, and the background is dimmed with an overlay. The modal can be closed by clicking outside of it.

**Props API:**
```typescript
ModalProvider: { children: React.ReactNode }, Modal: { children: React.ReactNode }, ModalTrigger: { children: React.ReactNode, className?: string }, ModalBody: { children: React.ReactNode }, ModalContent: { children: React.ReactNode }, ModalFooter: { children: React.ReactNode }, Overlay: { className?: string }, useOutsideClick: { ref: React.RefObject<HTMLDivElement>, callback: Function }
```

**Animations & Interactions:**
The modal has a spring animation on open and close (scale and opacity). The trigger button has a slide-out/slide-in animation on hover. The modal can be closed by clicking on the overlay.

**Customization Notes:**
For a luxury jewelry theme, you could customize the following:
- **Colors**: Use a palette of gold, silver, and dark jewel tones. The overlay could be a semi-transparent dark color. The modal background could be a light cream or a dark charcoal.
- **Fonts**: Use elegant serif fonts for headings and a clean sans-serif for body text.
- **Spacing**: Increase the padding within the modal for a more spacious and luxurious feel.
- **Dark Mode**: Ensure the component is styled for dark mode, using appropriate color combinations.

**Usage Example:**
```tsx
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "../ui/animated-modal";

export function AnimatedModalDemo() {
  return (
    <div className="py-40  flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Book your flight
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            ✈️
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Book your trip to{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                Bali
              </span>{" "}
              now! ✈️
            </h4>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Book Now
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
```

### Background Gradient Animation
- **URL:** https://ui.aceternity.com/components/background-gradient-animation
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/background-gradient-animation`
- **Dependencies:** `react, framer-motion, clsx, tailwind-merge`
- **Concept Mapping:** 02-observatory, 04-chrysalis, 08-atelier

**Description:**
A smooth and elegant background gradient animation that changes the gradient position over time.

**Props API:**
```typescript
gradientBackgroundStart: string, gradientBackgroundEnd: string, firstColor: string, secondColor: string, thirdColor: string, fourthColor: string, fifthColor: string, pointerColor: string, size: string, blendingValue: string, children: React.ReactNode, className: string, interactive: boolean, containerClassName: string
```

**Animations & Interactions:**
The component features a background gradient that smoothly transitions between colors. The gradient's position animates over time, creating a dynamic and visually appealing effect. The animation is interactive by default, responding to mouse movement. The keyframes `moveVertical`, `moveInCircle`, and `moveHorizontal` control the animation of five colored divs, creating a complex and fluid motion.

**Customization Notes:**
For a luxury jewelry theme, consider using a color palette of deep jewel tones like emerald, sapphire, and ruby for the gradient colors. The `blendingValue` can be adjusted to `soft-light` or `overlay` for a more subtle effect. The font can be changed to a more elegant serif font. The size of the animated elements can be increased or decreased to control the intensity of the effect.

**Usage Example:**
```tsx

import React from "react";
import { BackgroundGradientAnimation } from "../ui/background-gradient-animation";

export function BackgroundGradientAnimationDemo() {
  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          Gradients X Animations
        </p>
      </div>
    </BackgroundGradientAnimation>
  );
}

```

### Background Lines
- **URL:** https://ui.aceternity.com/components/background-lines
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/background-lines`
- **Dependencies:** `motion, clsx, tailwind-merge`
- **Concept Mapping:** 01-vault, 02-observatory, 10-maison

**Description:**
A set of svg paths that animate in a wave pattern. Good for hero sections background, as seen on height.app

**Props API:**
```typescript
children: React.ReactNode, className?: string, svgOptions?: { duration?: number; }
```

**Animations & Interactions:**
The SVG paths animate in a wave pattern. The animation is a continuous loop with a default duration of 10 seconds. The `strokeDashoffset` and `strokeDasharray` properties are animated to create the drawing effect, and the opacity is animated to fade the lines in and out.

**Customization Notes:**
The color of the lines can be changed by modifying the `stroke` property in the SVG component. The background color can be changed by modifying the `bg-white dark:bg-black` classes. The animation duration can be customized via the `svgOptions` prop. For a luxury jewelry theme, consider using a darker, more elegant color palette, such as deep blues or charcoals for the background and gold or silver for the lines. The animation could be slowed down for a more subtle and sophisticated effect.

**Usage Example:**
```tsx

'import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
 
export function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Sanjana Airlines, <br /> Sajana Textiles.
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Get the best advices from our experts, including expert artists,
        painters, marathon enthusiasts and RDX, totally free.
      </p>
    </BackgroundLines>
  );
}'

```

### Bento Grid
- **URL:** https://ui.aceternity.com/components/bento-grid
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/bento-grid`
- **Dependencies:** `react, @tabler/icons-react, clsx, tailwind-merge, framer-motion`
- **Concept Mapping:** 01-vault, 02-observatory, 10-maison

**Description:**
Bento Grid is a versatile and responsive grid layout component that allows for the arrangement of items in a flexible, bento-box style. It features a clean design with a title, description, and an optional header or icon for each grid item. The component includes a subtle hover animation that provides visual feedback to the user.

**Props API:**
```typescript
BentoGrid: { className?: string; children?: React.ReactNode; }
BentoGridItem: { className?: string; title?: string | React.ReactNode; description?: string | React.ReactNode; header?: React.ReactNode; icon?: React.ReactNode; }
```

**Animations & Interactions:**
On hover over a grid item, a shadow effect (`hover:shadow-xl`) is applied, and the content within the item, including the icon, title, and description, smoothly translates to the right by a small amount (`group-hover/bento:translate-x-2`). This interaction is animated with a transition duration of 200ms.

**Customization Notes:**
For a luxury jewelry theme, the component's color scheme can be updated by modifying Tailwind CSS classes such as `dark:bg-black`, `dark:border-white/[0.2]`, `bg-white`, and the text colors `text-neutral-600`, `dark:text-neutral-200`, and `dark:text-neutral-300` to align with a more opulent palette of golds, silvers, and deep jewel tones. The typography can be elevated by replacing the default `font-sans` with a more elegant, serif or custom font. Spacing can be refined by adjusting the `gap-4` and `p-4` classes to create a more spacious and sophisticated layout. For dark mode, the `dark:` utility classes should be customized to ensure the component maintains a high-end aesthetic.

**Usage Example:**
```tsx
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
 
export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
```

### Compare
- **URL:** https://ui.aceternity.com/components/compare
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/compare @aceternity/sparkles`
- **Dependencies:** `framer-motion, clsx, tailwind-merge, @tabler/icons-react, @tsparticles/react, @tsparticles/engine, @tsparticles/slim`
- **Concept Mapping:** 01-vault, 02-observatory, 10-maison

**Description:**
The Compare component provides an interactive way to showcase 'before and after' or two different versions of an image. Users can either slide a handle or hover over the component to reveal the underlying image, offering a visually engaging comparison experience.

**Props API:**
```typescript
interface CompareProps {
  firstImage?: string;
  secondImage?: string;
  className?: string;
  firstImageClassName?: string;
  secondImageClassname?: string;
  initialSliderPercentage?: number;
  slideMode?: "hover" | "drag";
  showHandlebar?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
}
```

**Animations & Interactions:**
The component features a slider that can be moved either by hovering the mouse over the component or by clicking and dragging the slider handle. This reveals one of two images. A sparkling animation follows the slider's movement, adding a dynamic visual effect. The component also supports an autoplay mode, which automatically cycles between the two images.

**Customization Notes:**
For a luxury jewelry theme, the color palette can be customized by modifying the gradient classes (`via-indigo-500`, `from-cyan-400`) to match the brand's colors, such as gold, silver, or deep jewel tones. The size of the component can be adjusted using the `w-[]` and `h-[]` Tailwind CSS classes to fit the desired layout. The sparkle effect can be intensified or toned down by adjusting the `particleDensity` prop in the `MemoizedSparklesCore` component.

**Usage Example:**
```tsx
import React from "react";
import { Compare } from "@/components/ui/compare";

export function CompareDemo() {
  return (
    <div className=\"p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100  border-neutral-200 dark:border-neutral-800 px-4\">
      <Compare
        firstImage=\"https://assets.aceternity.com/code-problem.png\"
        secondImage=\"https://assets.aceternity.com/code-solution.png\"
        firstImageClassName=\"object-cover object-left-top\"
        secondImageClassname=\"object-cover object-left-top\"
        className=\"h-[250px] w-[200px] md:h-[500px] md:w-[500px]\"
        slideMode=\"hover\"
      />
    </div>
  );
}
```

### 3D Globe
- **URL:** https://ui.aceternity.com/components/3d-globe
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/3d-globe`
- **Dependencies:** `three-globe, framer-motion, clsx, tailwind-merge, @react-three/fiber, @react-three/drei, three`
- **Concept Mapping:** 02-observatory, 10-maison

**Description:**
A realistic 3D globe component that can be used to display markers and tooltips. The globe can be rotated and zoomed, and the markers can be clicked and hovered. The component is highly customizable, with options for changing the globe's appearance, a a realistic globe component with tooltips and avatar tips

**Props API:**
```typescript
### Globe3D

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| markers | `GlobeMarker[]` | `[]` | Array of markers to display on the globe |
| config | `Globe3DConfig` | `{}` | Globe configuration options |
| className | `string` | - | Additional CSS classes |
| onMarkerClick | `(marker: GlobeMarker) => void` | - | Callback when a marker is clicked |
| onMarkerHover | `(marker: GlobeMarker | null) => void` | - | Callback when a marker is hovered |

### GlobeMarker

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| lat | `number` | - | Latitude coordinate |
| lng | `number` | - | Longitude coordinate |
| src | `string` | - | Image source URL for the marker |
| label | `string` | - | Optional label for the marker |
| size | `number` | - | Optional custom size for the marker |

### Globe3DConfig

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| radius | `number` | - | Globe radius |
| globeColor | `string` | - | Globe base color (used as fallback or tint) |
| textureUrl | `string` | - | URL to the Earth texture map |
| bumpMapUrl | `string` | - | URL to the bump/elevation map for terrain |
| showAtmosphere | `boolean` | - | Whether to show atmosphere glow |
| atmosphereColor | `string` | - | Atmosphere color |
| atmosphereIntensity | `number` | - | Atmosphere intensity |
| atmosphereBlur | `number` | - | Atmosphere blur/softness (higher = more diffuse) |
| bumpScale | `number` | - | Terrain bump scale (0 = flat, higher = more pronounced) |
| autoRotateSpeed | `number` | - | Auto rotate speed (0 = disabled) |
| enableZoom | `boolean` | - | Enable zoom |
| enablePan | `boolean` | - | Enable pan |
| minDistance | `number` | - | Min zoom distance |
| maxDistance | `number` | - | Max zoom distance |
| initialRotation | `{ x: number; y: number }` | - | Initial rotation |
| markerSize | `number` | - | Marker default size |
| showWireframe | `boolean` | - | Show wireframe overlay |
| wireframeColor | `string` | - | Wireframe color |
| ambientIntensity | `number` | - | Ambient light intensity |
| pointLightIntensity | `number` | - | Point light intensity |
| backgroundColor | `string | null` | - | Background color (null for transparent) |
```

**Animations & Interactions:**
The 3D Globe component features several animations and interactions:

- **Auto-rotation:** The globe automatically rotates on its axis, and the speed of rotation can be configured.
- **Zoom and Pan:** Users can zoom in and out of the globe and pan it to view different parts of the world.
- **Marker Hover:** When a user hovers over a marker, a tooltip with the marker's label is displayed.
- **Marker Click:** When a user clicks on a marker, a callback function is triggered, which can be used to perform an action, such as displaying more information about the marker.

**Customization Notes:**
For a luxury jewelry brand like Vault-Maison, the 3D Globe component can be customized to create a sophisticated and elegant user experience. Here are some suggestions:

- **Colors:** Use a dark color palette with gold or silver accents to create a luxurious feel. The globe itself could be a dark, rich color, and the markers could be represented by sparkling diamond-like icons.
- **Fonts:** Use a classic serif font for the labels and tooltips to convey a sense of elegance and tradition.
- **Spacing:** Use generous spacing between the markers to create a clean and uncluttered look.
- **Dark Mode:** The component should be designed to work well in both light and dark modes. In dark mode, the colors should be inverted to maintain a high level of contrast and readability.

**Usage Example:**
```tsx
```typescript
"use client";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";
 
const sampleMarkers: GlobeMarker[] = [
  {
    lat: 40.7128,
    lng: -74.006,
    src: "https://assets.aceternity.com/avatars/1.webp",
    label: "New York",
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "https://assets.aceternity.com/avatars/2.webp",
    label: "London",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    src: "https://assets.aceternity.com/avatars/3.webp",
    label: "Tokyo",
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    src: "https://assets.aceternity.com/avatars/4.webp",
    label: "Sydney",
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    src: "https://assets.aceternity.com/avatars/5.webp",
    label: "Paris",
  },
  {
    lat: 28.6139,
    lng: 77.209,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "New Delhi",
  },
  {
    lat: 55.7558,
    lng: 37.6173,
    src: "https://assets.aceternity.com/avatars/7.webp",
    label: "Moscow",
  },
  {
    lat: -22.9068,
    lng: -43.1729,
    src: "https://assets.aceternity.com/avatars/8.webp",
    label: "Rio de Janeiro",
  },
  {
    lat: 31.2304,
    lng: 121.4737,
    src: "https://assets.aceternity.com/avatars/9.webp",
    label: "Shanghai",
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    src: "https://assets.aceternity.com/avatars/10.webp",
    label: "Dubai",
  },
  {
    lat: -34.6037,
    lng: -58.3816,
    src: "https://assets.aceternity.com/avatars/11.webp",
    label: "Buenos Aires",
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    src: "https://assets.aceternity.com/avatars/12.webp",
    label: "Singapore",
  },
  {
    lat: 37.5665,
    lng: 126.978,
    src: "https://assets.aceternity.com/avatars/13.webp",
    label: "Seoul",
  },
];
 
export function Globe3DDemo() {
  return (
    <Globe3D
      markers={sampleMarkers}
      config={{
        atmosphereColor: "#4da6ff",
        atmosphereIntensity: 20,
        bumpScale: 5,
        autoRotateSpeed: 0.3,
      }}
      onMarkerClick={(marker) => {
        console.log("Clicked marker:", marker.label);
      }}
      onMarkerHover={(marker) => {
        if (marker) {
          console.log("Hovering:", marker.label);
        }
      }}
    />
  );
}
```
```

### Animated Tooltip
- **URL:** https://ui.aceternity.com/components/animated-tooltip
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/animated-tooltip`
- **Dependencies:** `framer-motion, tailwindcss`
- **Concept Mapping:** 01-vault, 03-atelier, 10-maison

**Description:**
A compact and elegant tooltip that appears when a user hovers over a user's avatar or image. The tooltip smoothly animates into view, follows the user's mouse pointer with a subtle rotation and translation effect, and displays the person's name and designation. It is designed to work with a series of items, creating a stacked, interactive display of profiles.

**Props API:**
```typescript
items: Array<{
  id: number;
  name: string;
  designation: string;
  image: string;
}>
```

**Animations & Interactions:**
The tooltip appears on hover with a spring animation (stiffness: 260, damping: 10). It follows the mouse's horizontal movement with a slight rotation and translation, also using a spring animation (stiffness: 100, damping: 5). The avatar image scales up to 105% on hover and gains a z-index of 30 to appear above other elements. The tooltip itself has two decorative gradient lines at the bottom.

**Customization Notes:**
To adapt for a luxury jewelry theme, the background color (`bg-black`) can be changed to a deep charcoal or navy. The text color (`text-white`) and border color (`border-white`) can be updated to a soft gold or silver. The gradient highlight lines (`via-emerald-500`, `via-sky-500`) should be changed to match the brand's primary accent color, like a shimmering gold. Fonts can be customized by replacing the default Tailwind classes (`font-bold`, `text-base`) with the brand's specific font families. Spacing can be adjusted via padding (`px-4`, `py-2`) and margin (`-mr-4`) for a more refined layout.

**Usage Example:**
```tsx
import { AnimatedTooltip } from "../ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  // ... more people
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
```

### Images Slider
- **URL:** https://ui.aceternity.com/components/images-slider
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/images-slider`
- **Dependencies:** `framer-motion, clsx, tailwind-merge, react`
- **Concept Mapping:** 01-vault, 04-gallery

**Description:**
A full page slider with images that can be navigated with the keyboard. The slider autoplays every 5 seconds and can be controlled using the left and right arrow keys.

**Props API:**
```typescript
images: string[]; children: React.ReactNode; overlay?: React.ReactNode; overlayClassName?: string; className?: string; autoplay?: boolean; direction?: "up" | "down";
```

**Animations & Interactions:**
The component utilizes framer-motion for its animations. When a new image slides in, it scales up from 0 to 1 and rotates on the X-axis from 45 degrees to 0. The exiting image slides either up or down, depending on the `direction` prop. The slider automatically transitions to the next image every 5 seconds and can also be controlled with the left and right arrow keys.

**Customization Notes:**
For a luxury jewelry theme, the overlay color can be adjusted from the default `bg-black/60` to a more subtle dark gradient. The fonts and colors of the children elements can be customized to match the brand's identity. The height of the slider can be changed from the default `h-[40rem]` to fit the desired layout. The autoplay duration can also be modified.

**Usage Example:**
```tsx
 "use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../ui/images-slider";

export function ImagesSliderDemo() {
  const images = [
    "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          The hero section slideshow <br /> nobody asked for
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Join now →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
}
```

### Apple Cards Carousel
- **URL:** https://ui.aceternity.com/components/apple-cards-carousel
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/apple-cards-carousel`
- **Dependencies:** `framer-motion, clsx, tailwind-merge`
- **Concept Mapping:** 01-vault, 02-observatory, 10-maison

**Description:**
A sleek and minimal carousel implementation, as seen on apple.com. It features a horizontally scrolling carousel of cards. When a card is clicked, it expands into a modal view, displaying more details. The carousel has navigation arrows to scroll left and right.

**Props API:**
```typescript
Carousel component:
items: JSX.Element[];
initialScroll?: number;

Card component:
card: Card;
index: number;
layout?: boolean;

BlurImage component:
height?: number | string;
width?: number | string;
src: string;
className?: string;
alt?: string;
...rest: ImageProps;

Card type:
src: string;
title: string;
category: string;
content: React.ReactNode;
```

**Animations & Interactions:**
The carousel uses framer-motion for animations. The cards have a subtle animation when they appear on the screen. When a card is clicked, it smoothly animates and expands into a modal. The modal itself has a fade-in and fade-out animation. The carousel has a smooth scrolling behavior when navigating with the arrow buttons.

**Customization Notes:**
To customize for a luxury jewelry theme, you can change the color palette to something more elegant, like black, white, and gold. The fonts can be changed to a serif font for a more classic and luxurious feel. The spacing between the cards can be increased to give a more open and premium feel. The background of the modal can be customized to a texture or a dark, elegant color. The images used in the cards should be high-quality and professionally shot.

**Usage Example:**
```tsx

"use client";
 
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
 
export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));
 
  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Get to know your iSad.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
 
const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <img
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};
 
const data = [
  {
    category: "Artificial Intelligence",
    title: "You can do more with AI.",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Productivity",
    title: "Enhance your productivity.",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
];

```

### Container Scroll Animation
- **URL:** https://ui.aceternity.com/components/container-scroll-animation
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/container-scroll-animation`
- **Dependencies:** `framer-motion, @react-three/drei, @react-three/fiber`
- **Concept Mapping:** 01-vault, 02-observatory

**Description:**
A scroll animation that rotates in 3d on scroll. Perfect for hero or marketing sections.

**Props API:**
```typescript
ContainerScroll: { titleComponent: string | React.ReactNode, children: React.ReactNode }, Header: { translate: MotionValue<number>, titleComponent: string | React.ReactNode }, Card: { rotate: MotionValue<number>, scale: MotionValue<number>, translate: MotionValue<number>, children: React.ReactNode }
```

**Animations & Interactions:**
The component features a 3D rotation effect on scroll. As the user scrolls down the page, the container rotates in 3D space, revealing the content within. The animation is smooth and is driven by the scroll position.

**Customization Notes:**
The component can be customized by changing the title component, and the children components. The animation is driven by framer-motion, so the animation parameters can be tweaked for a different feel. The colors and fonts can be customized using Tailwind CSS classes.

**Usage Example:**
```tsx
```tsx
"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
 
export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <img
          src={`/linear.webp`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
```
```

### Card Hover Effect
- **URL:** https://ui.aceternity.com/components/card-hover-effect
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/card-hover-effect`
- **Dependencies:** `framer-motion, clsx, tailwind-merge`
- **Concept Mapping:** 03-gallery, 05-atelier, 07-lumiere

**Description:**
The Card Hover Effect is a visually engaging component that displays a grid of items. When a user hovers over an item, a background highlight smoothly slides to the hovered card, creating an elegant and interactive experience. Each card contains a title and a description, making it suitable for showcasing features, products, or portfolio pieces.

**Props API:**
```typescript
HoverEffect: { items: { title: string; description: string; link: string; }[]; className?: string; }
Card: { className?: string; children: React.ReactNode; }
CardTitle: { className?: string; children: React.ReactNode; }
CardDescription: { className?: string; children: React.ReactNode; }
```

**Animations & Interactions:**
When a user hovers over a card, a background element smoothly animates into view with an opacity transition (duration: 0.15s). This effect is powered by Framer Motion's `AnimatePresence` and `motion.span` components. The `layoutId` prop on the `motion.span` ensures that the background appears to slide from the previously hovered card to the current one. Upon mouse leave, the background fades out with a slight delay (0.2s). Additionally, the card's border color changes on hover (`group-hover:border-slate-700`).

**Customization Notes:**
For a luxury jewelry theme, colors can be adapted by changing Tailwind CSS classes. For instance, the hover background (`bg-neutral-200 dark:bg-slate-800/[0.8]`) could be changed to a soft gold or silver. Text colors (`text-zinc-100`, `text-zinc-400`) can be updated to match a brand palette. Fonts can be customized by replacing the default sans-serif with an elegant serif font via Tailwind's font utilities. Spacing, including padding and grid gaps, can be adjusted for a more spacious and premium feel. The component includes dark mode support, which can be customized further.

**Usage Example:**
```tsx
import { HoverEffect } from "@/components/ui/card-hover-effect";
 
export function CardHoverEffectDemo() {
  return (
    <div className=\"max-w-5xl mx-auto px-8\">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  // ... more items
];
```

### 3D Card Effect
- **URL:** https://ui.aceternity.com/components/3d-card-effect
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/3d-card`
- **Dependencies:** `framer-motion, clsx, tailwind-merge`
- **Concept Mapping:** 01-vault, 03-gallery, 07-showcase

**Description:**
A card perspective effect where hovering over the card elevates card elements. The card rotates in 3D space to follow the mouse, and individual items within the card can be translated and rotated on the Z-axis to create a sense of depth and parallax.

**Props API:**
```typescript
CardContainer: children: React.ReactNode, className?: string, containerClassName?: string; CardBody: children: React.ReactNode, className?: string; CardItem: as?: React.ElementType, children: React.ReactNode, className?: string, translateX?: number | string, translateY?: number | string, translateZ?: number | string, rotateX?: number | string, rotateY?: number | string, rotateZ?: number | string
```

**Animations & Interactions:**
On hover, the card container rotates in 3D space based on the mouse position, creating a perspective effect. Card items within the container can be configured to translate along the X, Y, and Z axes, and rotate on the X, Y, and Z axes, creating a floating or elevated appearance. The transition is smoothed with a duration of 200ms and an ease-linear timing function.

**Customization Notes:**
For a luxury jewelry theme, consider using a dark, high-contrast color palette. The background of the `CardBody` could be a deep charcoal or navy, with text in a metallic gold or silver. The `dark:hover:shadow-emerald-500/[0.1]` could be changed to a soft gold or diamond-like glow. Fonts should be elegant and serifed. Spacing can be increased to give a more open and luxurious feel. For dark mode, ensure that the text and background colors are inverted appropriately to maintain readability and a premium aesthetic.

**Usage Example:**
```tsx
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="a"
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
```

### Background Gradient
- **URL:** https://ui.aceternity.com/components/background-gradient
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/background-gradient`
- **Dependencies:** `react, clsx, tailwind-merge, framer-motion`
- **Concept Mapping:** 01-vault, 10-maison

**Description:**
An animated gradient that serves as a background for various elements like cards or buttons. It provides a subtle animation by default and intensifies on hover, creating a glowing effect that draws attention to the content within.

**Props API:**
```typescript
children?: React.ReactNode;
className?: string;
containerClassName?: string;
animate?: boolean;
```

**Animations & Interactions:**
The component features a background gradient that subtly animates. On hover, the gradient's opacity increases from 60% to 100% with a 500ms transition, creating a glowing effect. The animation is defined using Tailwind CSS classes and the `will-change-transform` property for performance.

**Customization Notes:**
For a luxury jewelry theme, the gradient colors can be customized by modifying the `bg-[radial-gradient(...)]` utility class. Consider using a palette of gold, silver, and deep jewel tones. The default padding can be adjusted via the `p-[4px]` class for different spacing needs. The component is dark-mode ready, as seen with `dark:bg-zinc-900` in the demo.

**Usage Example:**
```tsx
import { BackgroundGradient } from "../ui/background-gradient";

export function BackgroundGradientDemo() {
  return (
    <div>
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          Air Jordan 4 Retro Reimagined
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          The Air Jordan 4 Retro Reimagined Bred will release on Saturday, February 17, 2024.
        </p>
      </BackgroundGradient>
    </div>
  );
}
```

### Card Stack
- **URL:** https://ui.aceternity.com/components/card-stack
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/card-stack`
- **Dependencies:** `framer-motion, clsx, tailwind-merge`
- **Concept Mapping:** 03-gallery, 07-atelier

**Description:**
The Card Stack component displays a series of cards that stack on top of each other. After a set interval, the top card moves to the back of the stack, creating a continuous loop. This is ideal for showcasing testimonials or other short pieces of content.

**Props API:**
```typescript
className: string, cards: Array<{id: number; name: string; designation: string; content: React.ReactNode;}>, offset: number, scaleFactor: number
```

**Animations & Interactions:**
The cards stack on top of each other, with the top card moving to the back of the stack after a set interval, revealing the next card. This animation is likely handled by framer-motion, creating a smooth and continuous loop.

**Customization Notes:**
To customize for a luxury jewelry theme, consider the following:

*   **Colors:** Replace the default emerald colors with a palette of gold, silver, and dark grays. For example, use `bg-yellow-200` for a gold highlight and `text-gray-800` for text.
*   **Fonts:** Change the default font to a more elegant serif font by configuring it in your `tailwind.config.js` file.
*   **Spacing:** Adjust the container height (`h-[40rem]`) and padding (`px-1`, `py-0.5`) to better fit your design.
*   **Dark Mode:** The component supports dark mode, which can be customized to match your brand's dark theme.

**Usage Example:**
```tsx
```tsx
"use client";
import { CardStack } from "../ui/card-stack";
import { cn } from "@/lib/utils";
export function CardStackDemo() {
  return (
    <div className="h-[40rem] flex items-center justify-center w-full">
      <CardStack items={CARDS} />
    </div>
  );
}
 
// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};
 
const CARDS = [
  {
    id: 0,
    name: "Manu Arora",
    designation: "Senior Software Engineer",
    content: (
      <p>
        These cards are amazing, <Highlight>I want to use them</Highlight> in my
        project. Framer motion is a godsend ngl tbh fam 🙏
      </p>
    ),
  },
  {
    id: 1,
    name: "Elon Musk",
    designation: "Senior Shitposter",
    content: (
      <p>
        I dont like this Twitter thing,{" "}
        <Highlight>deleting it right away</Highlight> because yolo. Instead, I
        would like to call it <Highlight>X.com</Highlight> so that it can easily
        be confused with adult sites.
      </p>
    ),
  },
  {
    id: 2,
    name: "Tyler Durden",
    designation: "Manager Project Mayhem",
    content: (
      <p>
        The first rule of
        <Highlight>Fight Club</Highlight> is that you do not talk about fight
        club. The second rule of
        <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
        club.
      </p>
    ),
  },
];
```
```

### Animated Testimonials
- **URL:** https://ui.aceternity.com/components/animated-testimonials
- **Status:** live
- **Install Command:** `npx shadcn@latest add @aceternity/animated-testimonials`
- **Dependencies:** `framer-motion, clsx, tailwind-merge`
- **Concept Mapping:** 01-vault, 02-observatory, 10-maison

**Description:**
Minimal testimonials sections with image and quote. The component displays a carousel of testimonials, each with a quote, name, designation, and image. It supports autoplay to cycle through testimonials automatically.

**Props API:**
```typescript
testimonials: Array<{ quote: string; name: string; designation: string; src: string }>, autoplay?: boolean
```

**Animations & Interactions:**
The component features a smooth, animated transition between testimonials. When a new testimonial is displayed, the image rotates in with a 3D effect, and the text fades in. The transition is triggered either by user interaction (clicking the next/previous buttons) or automatically if autoplay is enabled.

**Customization Notes:**
To customize for a luxury jewelry theme, consider the following:
- **Colors**: Use a sophisticated color palette, such as deep blues, purples, or emerald greens, accented with gold or silver for text and borders. Implement a dark mode with a black or charcoal background to make the jewelry images pop.
- **Fonts**: Choose elegant serif or sans-serif fonts that convey a sense of luxury and refinement. For instance, use a classic serif for the quotes and a clean sans-serif for the names and designations.
- **Spacing**: Increase the spacing between elements to create a more open and luxurious feel. Add more padding around the text and images to give them room to breathe.
- **Dark Mode**: A well-implemented dark mode is essential for a luxury brand. Ensure that the colors and contrasts are optimized for a dark background to create a visually stunning experience.

**Usage Example:**
```tsx
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
```

## 5. Reference Image Sources

Research on high-quality reference images for all 10 concepts and shared products.

### shared-products
- **Images Found:** 
- **Licensing:** The website is a commercial site for a jewelry business. The images are for showcasing their products and are not licensed for public use. To use these images, one would need to contact Melee Diamond INC for permission.
- **Best Search Terms:** `loose diamonds, diamond parcels, gemstones, high-resolution diamond photography`

**Quality Assessment:**
While meleediamondinc.com features high-quality photographs of their finished jewelry products, there are no images available of loose diamonds, diamond parcels, or individual gemstones. The existing product photography is professional and well-lit, suitable for a luxury brand, but does not meet the specific requirements of this research task. The images are not suitable for reference images for loose stones.

**Image URLs:**
```text
No images of loose diamonds, diamond parcels, or gemstones were found on meleediamondinc.com.
```

### shared-products
- **Images Found:** 5
- **Licensing:** Pexels License - free for commercial use
- **Best Search Terms:** `loose diamond macro, diamond on black background, luxury diamond, high-resolution diamond photography, professional gemstone photography`

**Quality Assessment:**
The images found on Pexels are of exceptional quality, with high resolution and professional composition. They perfectly capture the brilliance and intricate details of the diamonds, making them highly suitable for a luxury jewelry website. The dark and moody aesthetic aligns well with a high-end brand identity.

**Image URLs:**
```text
https://www.pexels.com/photo/a-close-up-shot-of-a-diamond-13959671/ | A close-up shot of a diamond with a dark background, highlighting its facets and brilliance.
https://www.pexels.com/photo/close-up-shot-of-a-diamond-13959677/ | A macro shot of a diamond, showcasing its intricate details and light reflection.
https://www.pexels.com/photo/a-diamond-on-a-black-surface-17532305/ | A diamond resting on a black surface, creating a dramatic and luxurious feel.
https://www.pexels.com/photo/close-up-of-a-diamond-13959648/ | A detailed close-up of a diamond, emphasizing its clarity and cut.
https://www.pexels.com/photo/a-close-up-of-a-diamond-17532311/ | An elegant shot of a diamond, perfect for luxury branding.
```

### shared-products
- **Images Found:** 5
- **Licensing:** Unsplash License - free for commercial use
- **Best Search Terms:** `jewelry craftsmanship, artisan jewelry, diamond details, gemology tools, goldsmith workbench`

**Quality Assessment:**
The images found are of high professional quality, with excellent resolution and a sophisticated, dark aesthetic that aligns perfectly with a luxury jewelry brand. They effectively convey craftsmanship, precision, and the inherent value of the materials.

**Image URLs:**
```text
https://www.puravidabracelets.com/blogs/the-pura-vida-blog/what-is-artisan-jewelry-the-meaning-of-artisan-jewelry-in-todays-world | A detailed shot of a jeweler's hands working on a piece of jewelry.
https://hayden-hill.com/blogs/journal/everything-you-need-to-know-about-artisan-jewelry | A person making jewelry.
https://stock.adobe.com/images/loose-brilliant-round-diamonds-on-black-velvet-box/118569914 | A close-up of loose diamonds on a black velvet background.
https://www.amazon.com/Honoson-Diamond-Tweezers-Stainless-Electronic/dp/B09C5X3Z6L | A set of high-quality diamond tweezers.
https://www.riogrande.com/product/jewelers-16-drawer-workbench/113633 | A classic jeweler's workbench.
```

### shared-products
- **Images Found:** 5
- **Licensing:** Pexels License - free for commercial use
- **Best Search Terms:** `diamond ring on black background pexels, luxury jewelry lifestyle pexels, elegant jewelry display pexels`

**Quality Assessment:**
The images found are of exceptional quality, with high resolution and a sophisticated, elegant aesthetic that is perfectly suited for a luxury jewelry brand like Vault-Maison. The dark and moody tones, combined with the sharp focus on the jewelry, create a sense of exclusivity and high value. These images will contribute to a strong and cohesive brand identity.

**Image URLs:**
```text
https://www.pexels.com/photo/a-diamond-ring-on-a-black-surface-13957593/ | A close-up of a diamond ring on a dark, wavy surface, creating an elegant and moody feel.
https://www.pexels.com/photo/close-up-shot-of-a-diamond-ring-8379664/ | A high-quality close-up of a diamond ring on a dark background, emphasizing the stone's brilliance.
https://www.pexels.com/photo/grayscale-photo-of-a-person-wearing-a-ring-8801175/ | An artistic black and white photo of two rings, conveying a sense of timeless luxury.
https://www.pexels.com/photo/a-display-of-jewelry-on-a-table-14579361/ | A warm, lifestyle shot of a jewelry collection on a wooden tray, perfect for showcasing multiple items.
https://www.pexels.com/photo/a-woman-wearing-a-silver-necklace-and-earrings-8434679/ | A strong, black and white lifestyle shot of a woman wearing large, ornate jewelry.
```

### 01-vault
- **Images Found:** 5
- **Licensing:** Unsplash License - free for commercial use, Pexels License - free for commercial use
- **Best Search Terms:** `bank vault interior, safety deposit box, luxury safe, vintage bank vault`

**Quality Assessment:**
The images found are of high resolution and professional quality, with a dark and elegant aesthetic that is well-suited for a luxury jewelry brand. They effectively convey a sense of security, exclusivity, and timeless value.

**Image URLs:**
```text
https://unsplash.com/photos/a-room-that-has-a-bunch-of-drawers-in-it--MMeeP7pjbE | Modern and clean safety deposit boxes with a moody aesthetic.
https://unsplash.com/photos/numbers-on-metal-deposit-boxes-in-a-bank-Uf-c4u1usFQ | Close-up of vintage-style safety deposit boxes with warm lighting.
https://unsplash.com/photos/brown-wooden-door-with-brass-door-knob-3ROwc3JSjCk | Grand and ornate bank vault door.
https://www.pexels.com/photo/a-man-in-a-black-suit-standing-in-front-of-a-wall-of-safety-deposit-boxes-8473456/ | Man in a suit in a vault, adding a lifestyle element.
https://www.pexels.com/photo/close-up-photo-of-safety-deposit-boxes-3944308/ | Close up of safety deposit boxes.
```

### 02-Observatory
- **Images Found:** 4
- **Licensing:** NASA images are in the public domain. Unsplash images are free for commercial use under the Unsplash License.
- **Best Search Terms:** `NASA control room, Apollo mission control, telescope lens, observatory, space science`

**Quality Assessment:**
The selected images are of high professional quality and resolution, fitting for a luxury brand. The dark, moody, and scientific aesthetic aligns well with the 'Observatory' concept, providing a sense of precision, history, and wonder. The images are versatile and can be used for backgrounds, banners, or detailed shots.

**Image URLs:**
```text
https://www.nasa.gov/news-release/apollo-mission-control-reopens-in-all-its-historic-glory/ | Historic Apollo Mission Control Room, restored to its 1969 glory.
https://images.nasa.gov/details/JSC-20180405-PH-JME0001-0062 | Wide shot of the Mission Control Center at NASA's Johnson Space Center.
https://unsplash.com/photos/a-close-up-of-a-camera-lens-on-a-white-surface-lQGJCMY5c-4 | A close-up, detailed shot of a telescope lens with a moody aesthetic.
https://unsplash.com/photos/a-view-of-the-moon-through-a-telescope-at-night-9Qj5z0L3L8Y | A dramatic view of the moon seen through a telescope lens.
```

### 03-Gallery
- **Images Found:** 4
- **Licensing:** Images are from architecture and design publications. Assumed to be free for editorial use, but commercial use may require additional licensing from the photographers or institutions.
- **Best Search Terms:** `art gallery interior, museum lighting, exhibition space, minimalist gallery, gallery white walls`

**Quality Assessment:**
The selected images are of high professional quality, with excellent resolution and composition. They align well with the sophisticated and elegant aesthetic of a luxury jewelry brand, providing a suitable backdrop that suggests artistry and refinement.

**Image URLs:**
```text
https://www.archdaily.com/956104/how-to-light-an-art-gallery/601d91e0f91c815b4500007a-how-to-light-an-art-gallery-photo | A minimalist art gallery with track lighting, providing a clean and modern aesthetic.
https://www.archdaily.com/956104/how-to-light-an-art-gallery/601d91c6f91c815b45000078-how-to-light-an-art-gallery-photo | A gallery space with focused spotlights on the artwork, creating a dramatic and luxurious feel.
https://lmnarchitects.com/project/seattle-asian-art-museum | The interior of the Seattle Asian Art Museum, showcasing a blend of classic and modern architecture.
https://www.5280.com/2021/10/work-of-art-inside-denver-art-museums-newly-renovated-martin-building/ | A wide shot of a modern museum interior with high ceilings and a spacious layout.
```

### 04-Atelier
- **Images Found:** 4
- **Licensing:** Unsplash License and Pexels License - free for commercial use.
- **Best Search Terms:** `artisan watchmaker, jewelry crafting, luxury watch repair, fine jewelry making, artisan hands`

**Quality Assessment:**
The selected images are of high resolution and professional quality, with a dark and moody aesthetic that aligns perfectly with a luxury jewelry brand. They effectively convey a sense of craftsmanship, precision, and artistry, making them highly suitable for the 'Atelier' concept.

**Image URLs:**
```text
https://www.pexels.com/photo/man-in-black-shirt-using-a-tweezer-on-a-watch-8532616/ | A watchmaker meticulously working on a timepiece, fitting the dark and moody luxury aesthetic.
https://unsplash.com/photos/person-soldering-jewelry-at-a-workbench-N12n6t8N1gA | Close-up of a jeweler soldering a piece of jewelry, highlighting the craftsmanship.
https://unsplash.com/photos/a-person-working-on-a-ring-at-a-jewelry-workbench-m9-vSPr2T1c | An artisan at a workbench, focused on crafting a ring, conveying a sense of dedication.
https://www.pexels.com/photo/a-person-fixing-a-watch-8532612/ | A detailed shot of a watchmaker's hands repairing a watch, emphasizing precision and skill.
```

### 05-salon
- **Images Found:** 4
- **Licensing:** Images were sourced from searches intended for commercially free use, however, licenses should be independently verified from the source URLs before use.
- **Best Search Terms:** `private members club, luxury lounge interior, exclusive club design, dark academia interior`

**Quality Assessment:**
The images found are of high professional quality and high resolution, fitting the dark, moody, and elegant aesthetic required for a luxury jewelry brand. The interiors depicted exude a sense of exclusivity, privacy, and sophistication, which aligns perfectly with the target audience for luxury jewelry.

**Image URLs:**
```text
https://www.admiddleeast.com/architecture-interiors/interiors/rise-of-1970s-members-club-aesthetic-and-how-to-get-the-look | Dark, moody, and luxurious members club interior with a vintage feel.
https://www.countryandtownhouse.com/interiors/best-london-members-club-interiors/ | Classic and elegant members club with sophisticated design.
https://www.galeriemagazine.com/peek-inside-the-worlds-hottest-private-clubs/ | Opulent and private members club with a strong sense of exclusivity.
https://www.behance.net/gallery/93435599/Office-mkb-private-bank | Modern and sleek private banking office with a dark, professional aesthetic.
```

### 06-Archive
- **Images Found:** 5
- **Licensing:** Unsplash License - free for commercial use
- **Best Search Terms:** `rare book library, museum archive, antique map, old maps, vintage library`

**Quality Assessment:**
The images found are of exceptional quality, with high resolution and a sophisticated, moody aesthetic that aligns perfectly with a luxury jewelry brand. The dark tones and elegant compositions of the libraries, archives, and maps create a sense of timelessness, rarity, and intellectual curiosity, which are all fitting themes for the 'Archive' concept.

**Image URLs:**
```text
https://images.unsplash.com/photo-1568667275529-631359491192 | A vast, multi-tiered library with a warm, golden glow, conveying a sense of history and knowledge.
https://images.unsplash.com/photo-1521737711867-e3b97375f902 | A modern, minimalist archive with clean lines and a cool, blue-toned color palette, suggesting precision and care.
https://images.unsplash.com/photo-1589998059171-988d887df646 | A close-up of an antique map with intricate details and a warm, aged patina, evoking a sense of adventure and discovery.
https://images.unsplash.com/photo-1558961165-df5035f6f665 | A well-lit museum storage area with shelves of artifacts, conveying a sense of order and preservation.
https://images.unsplash.com/photo-1507525428034-b723a9ce6899 | A detailed, colorful antique map spread out on a wooden table, suggesting exploration and craftsmanship.
```

### 07-Minimal lifestyle images
- **Images Found:** 3
- **Licensing:** Pexels and Unsplash License - free for commercial use
- **Best Search Terms:** `minimal concrete architecture, white gallery space, Jil Sander store, minimalist interior design`

**Quality Assessment:**
The images found are of high resolution and professional quality, with a dark and moody or elegant aesthetic that is highly suitable for a luxury jewelry website. The minimalist concrete architecture and clean gallery spaces provide a sophisticated and neutral backdrop that will allow the jewelry to stand out.

**Image URLs:**
```text
https://www.pexels.com/photo/photo-of-gray-concrete-building-during-daytime-3754437/ | Minimalist concrete building under a clear blue sky.
https://unsplash.com/photos/a-long-white-room-with-a-bench-in-the-middle-of-it-s86t_v2_vYw | An empty, white-walled art gallery with a bench in the center.
https://unsplash.com/photos/the-front-of-a-store-with-a-sign-that-says-jil-sander-8e3p2_q4Z9c | The exterior of a Jil Sander store with a minimalist architectural design.
```

### 08-Theater
- **Images Found:** 4
- **Licensing:** Unsplash License - free for commercial use
- **Best Search Terms:** `dark planetarium, moody art installation, elegant theater lighting, abstract light art, luxury brand background`

**Quality Assessment:**
The images found are of exceptional quality, with high resolution and a professional finish. The dark, moody, and elegant aesthetic is perfectly suited for a luxury jewelry website, providing a sense of sophistication and exclusivity. The abstract and artistic nature of the images will complement the beauty of the jewelry without distracting from it.

**Image URLs:**
```text
https://unsplash.com/photos/a-person-standing-in-front-of-a-large-screen-with-an-abstract-design-kcLX9gw76InR | A person standing in a dark room with a large, immersive screen displaying abstract, flowing light patterns. The image has a moody and sophisticated feel, perfect for a luxury brand.
https://unsplash.com/photos/a-person-standing-in-a-room-with-lots-of-lights-nYgJ96qBBPio | A person silhouetted in a room filled with hundreds of hanging blue lights, creating a magical and immersive experience. The dark background and vibrant lights create a sense of wonder and elegance.
https://unsplash.com/photos/a-stage-with-red-smoke-and-lights-on-it-7uTnuuFLqjPI | A dramatic and moody shot of a theater stage with red spotlights and smoke. The lighting creates a sense of mystery and anticipation, suitable for a high-end aesthetic.
https://unsplash.com/photos/a-telescope-in-a-domed-building-at-night-lG1owP94RJkz | An observatory dome at night with the Milky Way visible in the sky. The image has a dark, moody, and awe-inspiring quality that aligns with a luxury brand's image.
```

### 09-Marketplace
- **Images Found:** 5
- **Licensing:** Unsplash License / Pexels License - free for commercial use
- **Best Search Terms:** `fine art auction, luxury wine cellar, trading floor, stock market, Christies auction`

**Quality Assessment:**
The images found are of high professional quality and resolution, fitting the dark, moody, and elegant aesthetic required for a luxury brand. They effectively convey the concepts of high-value marketplaces, from fine art auctions to the fast-paced stock market and exclusive wine collections, which aligns well with the positioning of a luxury jewelry website.

**Image URLs:**
```text
https://www.christies.com/en/news/2022/art-market-trends-at-christies-auction-house | A wide shot of a Christie's auction room, packed with bidders, focusing on the auctioneer at the podium.
https://www.pexels.com/photo/people-in-a-room-with-monitors-8370752/ | A high-angle, wide shot of a bustling stock exchange floor with traders at their desks.
https://unsplash.com/photos/a-large-wine-cellar-with-many-bottles-of-wine-gYIJQqZYkE9H | A modern, luxurious wine cellar with back-lit shelves creating a warm, moody ambiance.
https://unsplash.com/photos/a-group-of-people-sitting-at-tables-in-front-of-a-large-screen-7WQlr3XKxHmX | Traders on the NYSE floor, looking up at the screens, capturing the energy of the market.
https://www.architecturaldigest.com/story/inside-a-15-million-london-townhouse-with-an-underground-wine-cellar | A rustic, stone-walled wine cellar with barrels and neatly stacked bottles, evoking a sense of history and rarity.
```

### 10-maison-lifestyle
- **Images Found:** 4
- **Licensing:** Unsplash License / Pexels License - free for commercial use
- **Best Search Terms:** `luxury brand storefront, Place Vendome night, Paris luxury boutique, high-end jewelry store exterior`

**Quality Assessment:**
The images found are of high professional quality, with good resolution and lighting. They have a dark, moody, and elegant aesthetic that is highly suitable for a luxury jewelry brand like Vault-Maison. The images of Place Vendôme and luxury storefronts effectively convey a sense of luxury, heritage, and exclusivity.

**Image URLs:**
```text
https://stores.cartier.com/en_us/europe/france/paris/cartier-paris-place-vendome | Cartier boutique storefront on Place Vendôme in Paris, showcasing classic Parisian architecture.
https://www.alamy.com/the-vendome-column-the-place-vendome-at-night-paris-france-image216943964.html | Dramatic night photograph of the Vendôme Column in the center of Place Vendôme, Paris.
https://www.luxurydaily.com/hermes-proves-its-a-brand-of-a-different-color-with-new-silk-bar-concept/ | The storefront of the Hermès boutique, an example of a luxury fashion brand's retail presence.
https://www.introducingparis.com/place-vendome | A wide-angle photograph of Place Vendôme in Paris, capturing the square's grandeur and atmosphere.
```
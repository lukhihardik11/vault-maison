# Vault Maison API Contract

## Overview

This document defines the API contract for the Vault Maison e-commerce platform. The frontend is designed with a clean abstraction layer (`lib/api.ts`) that currently resolves all data from local TypeScript files. When a backend is implemented, only the API layer needs to change while all UI components remain untouched.

The API follows RESTful conventions with JSON request and response bodies. All endpoints return a standardized `ApiResponse<T>` wrapper.

## Standard Response Format

Every API response follows this structure:

```json
{
  "data": <T>,
  "success": true,
  "message": "Optional human-readable message",
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 156,
    "totalPages": 8
  }
}
```

Error responses use the same wrapper with `success: false` and an error object:

```json
{
  "data": null,
  "success": false,
  "message": "Product not found",
  "error": {
    "code": "NOT_FOUND",
    "message": "The requested product does not exist",
    "details": {}
  }
}
```

## Endpoints

### Products

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/api/products` | List all products | `category`, `material`, `minPrice`, `maxPrice`, `inStock`, `sortBy`, `page`, `pageSize` |
| GET | `/api/products/:slug` | Get product by slug | — |
| GET | `/api/products/:id/related` | Get related products | `limit` (default: 4) |
| GET | `/api/products/:id/reviews` | Get product reviews | `page`, `pageSize`, `sortBy` |
| POST | `/api/products/:id/reviews` | Submit a review | — |

### Search

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/api/search` | Full-text product search | `q`, `category`, `minPrice`, `maxPrice`, `material`, `sortBy` |
| GET | `/api/search/suggestions` | Autocomplete suggestions | `q` |

### Orders

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/orders` | Place a new order | Yes |
| GET | `/api/orders` | List user's orders | Yes |
| GET | `/api/orders/:id` | Get order details | Yes |

### User

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/user/profile` | Get current user profile | Yes |
| PUT | `/api/user/profile` | Update profile | Yes |
| GET | `/api/user/addresses` | List saved addresses | Yes |
| POST | `/api/user/addresses` | Add new address | Yes |
| PUT | `/api/user/addresses/:id` | Update address | Yes |
| DELETE | `/api/user/addresses/:id` | Delete address | Yes |

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Base URL for the backend API | No (uses mock data if empty) |
| `NEXT_PUBLIC_GEMHUB_ENABLED` | Enable GemHub integration | No |
| `NEXT_PUBLIC_GEMHUB_URL` | GemHub base URL | No |
| `NEXT_PUBLIC_GEMHUB_DOMAIN` | Custom domain for GemHub | No |

## Implementation Notes

The current frontend uses the `lib/api.ts` module as the single point of contact for all data operations. This module checks for the `NEXT_PUBLIC_API_URL` environment variable. If it is not set, all methods resolve against the local `data/products.ts` file and mock data. When a backend is deployed, setting this variable will automatically switch all API calls to the remote server.

This architecture ensures that the frontend can be developed, tested, and demonstrated independently of any backend infrastructure, while remaining fully compatible with a production API when one is available.

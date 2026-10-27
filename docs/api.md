# FundiLink API Documentation

## Base URL

- **Development**: `http://localhost:8000/api/v1`
- **Production**: `https://api.fundilink.com/api/v1`

## Authentication

All authenticated endpoints require a valid authentication token in the header:

```
Authorization: Bearer <token>
```

Or session cookie for session-based authentication.

## Response Format

### Success Response
```json
{
  "data": { ... },
  "message": "Success message",
  "timestamp": "2025-01-27T10:30:00Z"
}
```

### Error Response
```json
{
  "error": "Error message",
  "details": { ... },
  "code": "ERROR_CODE",
  "timestamp": "2025-01-27T10:30:00Z"
}
```

## Endpoints

### Authentication

#### Register
```http
POST /api/v1/auth/register/
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "password_confirm": "SecurePass123!",
  "role": "customer",
  "phone": "+256700000000",
  "full_name": "John Doe"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "customer",
    "created_at": "2025-01-27T10:30:00Z"
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### Login
```http
POST /api/v1/auth/login/
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:** `200 OK`

#### Logout
```http
POST /api/v1/auth/logout/
```

**Response:** `204 No Content`

---

### Providers

#### List Providers
```http
GET /api/v1/providers/?category=plumbing&district=kampala&verified=true
```

**Query Parameters:**
- `category` (optional): Filter by service category
- `district` (optional): Filter by location
- `verified` (optional): Show only verified providers
- `page` (optional): Page number (default: 1)
- `page_size` (optional): Items per page (default: 20)

**Response:** `200 OK`
```json
{
  "count": 50,
  "next": "http://api.../providers/?page=2",
  "previous": null,
  "results": [
    {
      "id": "uuid",
      "business_name": "Quality Plumbing Services",
      "bio": "Professional plumbing services...",
      "district": "Kampala",
      "verification_status": "verified",
      "rating_average": 4.8,
      "total_reviews": 24,
      "profile_image": "https://...",
      "services_count": 5
    }
  ]
}
```

#### Get Provider Details
```http
GET /api/v1/providers/{id}/
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "business_name": "Quality Plumbing Services",
  "bio": "Professional plumbing with 10 years experience...",
  "district": "Kampala",
  "service_areas": ["Kampala", "Wakiso"],
  "verification_status": "verified",
  "profile_image": "https://...",
  "phone": "+256700000000",
  "rating_average": 4.8,
  "total_reviews": 24,
  "joined_date": "2024-06-15",
  "services": [
    {
      "id": "uuid",
      "title": "Emergency Plumbing Repair",
      "description": "24/7 emergency plumbing services",
      "starting_price": "50000.00",
      "currency": "UGX",
      "category": "Plumbing"
    }
  ],
  "portfolio": [
    {
      "id": "uuid",
      "image_url": "https://...",
      "caption": "Kitchen sink installation"
    }
  ],
  "recent_reviews": [...]
}
```

#### Create Provider Profile (Provider only)
```http
POST /api/v1/providers/
```

**Request Body:**
```json
{
  "business_name": "Quality Plumbing Services",
  "bio": "Professional plumbing services...",
  "district": "Kampala",
  "service_areas": ["Kampala", "Wakiso"],
  "phone": "+256700000000"
}
```

**Response:** `201 Created`

---

### Services

#### Search Services
```http
GET /api/v1/services/?q=plumbing&category=plumbing&location=kampala&min_price=0&max_price=100000
```

**Query Parameters:**
- `q` (optional): Search query
- `category` (optional): Filter by category slug
- `location` (optional): Filter by district
- `min_price` / `max_price` (optional): Price range
- `available_only` (optional): Show only available services

**Response:** `200 OK`
```json
{
  "count": 30,
  "results": [
    {
      "id": "uuid",
      "provider": {
        "id": "uuid",
        "business_name": "Quality Plumbing",
        "rating_average": 4.8,
        "verification_status": "verified"
      },
      "category": "Plumbing",
      "title": "Emergency Plumbing Repair",
      "description": "Fast emergency repairs...",
      "starting_price": "50000.00",
      "currency": "UGX",
      "is_available": true
    }
  ]
}
```

#### Create Service (Provider only)
```http
POST /api/v1/services/
```

**Request Body:**
```json
{
  "category_id": "uuid",
  "title": "Emergency Plumbing Repair",
  "description": "24/7 emergency plumbing services",
  "starting_price": "50000.00",
  "is_available": true
}
```

**Response:** `201 Created`

---

### Quote Requests

#### Create Quote Request (Customer only)
```http
POST /api/v1/quote-requests/
```

**Request Body:**
```json
{
  "description": "Need emergency plumbing for leaking pipe in kitchen",
  "district": "Kampala",
  "specific_location": "Kololo, near Acacia Mall",
  "budget": "100000.00",
  "deadline": "2025-02-01T00:00:00Z",
  "images": ["https://...", "https://..."]
}
```

**Response:** `201 Created`

#### List My Quote Requests (Customer only)
```http
GET /api/v1/quote-requests/my/?status=open
```

**Query Parameters:**
- `status`: open, quoted, closed

**Response:** `200 OK`

#### Get Quote Request Details
```http
GET /api/v1/quote-requests/{id}/
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "customer": {
    "id": "uuid",
    "full_name": "John Doe"
  },
  "description": "Need emergency plumbing...",
  "district": "Kampala",
  "budget": "100000.00",
  "deadline": "2025-02-01T00:00:00Z",
  "status": "open",
  "created_at": "2025-01-27T10:30:00Z",
  "quotes_count": 3,
  "quotes": [...]
}
```

---

### Quotes

#### Submit Quote (Provider only)
```http
POST /api/v1/quotes/
```

**Request Body:**
```json
{
  "request_id": "uuid",
  "amount": "75000.00",
  "message": "I can complete this job within 2 hours...",
  "estimated_duration": "2 hours",
  "expires_at": "2025-01-30T00:00:00Z"
}
```

**Response:** `201 Created`

#### Accept Quote (Customer only)
```http
POST /api/v1/quotes/{id}/accept/
```

**Request Body:**
```json
{
  "scheduled_at": "2025-01-28T14:00:00Z",
  "notes": "Please call when arriving"
}
```

**Response:** `200 OK` (Creates booking)

---

### Bookings

#### List My Bookings
```http
GET /api/v1/bookings/?status=confirmed&role=customer
```

**Query Parameters:**
- `status`: pending, confirmed, in_progress, completed, cancelled
- `role`: customer or provider

**Response:** `200 OK`
```json
{
  "count": 15,
  "results": [
    {
      "id": "uuid",
      "customer": {...},
      "provider": {...},
      "quote": {...},
      "scheduled_at": "2025-01-28T14:00:00Z",
      "status": "confirmed",
      "created_at": "2025-01-27T10:30:00Z",
      "can_review": false
    }
  ]
}
```

#### Update Booking Status (Provider only)
```http
PATCH /api/v1/bookings/{id}/status/
```

**Request Body:**
```json
{
  "status": "in_progress",
  "notes": "Started work on the project"
}
```

**Response:** `200 OK`

---

### Reviews

#### Create Review (Customer only, after completed booking)
```http
POST /api/v1/bookings/{booking_id}/reviews/
```

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Excellent service! Very professional and fast.",
  "would_recommend": true
}
```

**Response:** `201 Created`

#### List Provider Reviews
```http
GET /api/v1/providers/{provider_id}/reviews/
```

**Response:** `200 OK`

---

### Notifications

#### List My Notifications
```http
GET /api/v1/notifications/?unread_only=true
```

**Response:** `200 OK`
```json
{
  "count": 5,
  "unread_count": 3,
  "results": [
    {
      "id": "uuid",
      "type": "new_quote",
      "message": "You received a new quote for your plumbing request",
      "read_at": null,
      "created_at": "2025-01-27T10:30:00Z",
      "action_url": "/quote-requests/uuid"
    }
  ]
}
```

#### Mark Notification as Read
```http
PATCH /api/v1/notifications/{id}/read/
```

**Response:** `200 OK`

---

### Categories

#### List All Categories
```http
GET /api/v1/categories/
```

**Response:** `200 OK`
```json
{
  "count": 12,
  "results": [
    {
      "id": "uuid",
      "name": "Plumbing",
      "slug": "plumbing",
      "description": "Professional plumbing services",
      "icon": "wrench",
      "services_count": 45
    }
  ]
}
```

---

## Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `204 No Content` - Request successful, no content to return
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation errors
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

## Rate Limiting

- **Authentication endpoints**: 5 requests per minute
- **General API**: 100 requests per minute per user
- **Search endpoints**: 30 requests per minute

## Pagination

All list endpoints support pagination:
- Default page size: 20
- Maximum page size: 100
- Use `page` and `page_size` query parameters

---

**API Version**: v1  
**Last Updated**: January 2025

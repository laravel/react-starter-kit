# PassKit SaaS API Documentation

## Authentication

All API requests require authentication using a Bearer token. You can generate API tokens from your account settings at `/settings/api-tokens`.

Include your API token in the Authorization header:

```
Authorization: Bearer YOUR_API_TOKEN
```

## Base URL

```
https://your-domain.com/api
```

## Endpoints

### List All Passes

Get a paginated list of all your passes.

**Endpoint:** `GET /api/passes`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "serial_number": "abc-123",
      "platform": "apple",
      "pass_type": "coupon",
      "status": "active",
      "created_at": "2026-02-08T23:18:36.000000Z",
      "template": {
        "id": 1,
        "name": "Loyalty Card Template"
      }
    }
  ],
  "current_page": 1,
  "last_page": 5,
  "per_page": 50,
  "total": 234
}
```

### Create a Pass

Create a new pass from a template with custom data.

**Endpoint:** `POST /api/passes`

**Request Body:**
```json
{
  "template_id": 1,
  "member_id": "MEMBER123",
  "platform": "apple",
  "custom_fields": {
    "name": "John Doe",
    "points": "1000",
    "tier": "Gold",
    "expiry": "2026-12-31"
  }
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| template_id | integer | Yes | The ID of the pass template to use |
| member_id | string | No | A unique identifier for the pass holder |
| platform | string | Yes | Either "apple" or "google" |
| custom_fields | object | No | Key-value pairs to replace template placeholders |

**Custom Fields:**

Custom fields allow you to personalize each pass by replacing placeholders in your template. For example, if your template contains `{{name}}` and `{{points}}`, you can provide:

```json
{
  "custom_fields": {
    "name": "John Doe",
    "points": "1000"
  }
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Pass created successfully",
  "pass": {
    "id": 123,
    "serial_number": "550e8400-e29b-41d4-a716-446655440000",
    "platform": "apple",
    "pass_type": "coupon",
    "status": "active",
    "created_at": "2026-02-08T23:18:36.000000Z",
    "template": {
      "id": 1,
      "name": "Loyalty Card Template"
    }
  },
  "download_urls": {
    "apple": "https://your-domain.com/passes/123/download/apple",
    "google": "https://your-domain.com/passes/123/download/google"
  }
}
```

**Response (Error - 403 - Limit Reached):**
```json
{
  "error": "Pass limit reached",
  "message": "You have reached your pass creation limit. Please upgrade your plan.",
  "current_plan": "free",
  "pass_count": 10,
  "pass_limit": 10
}
```

**Response (Error - 422 - Validation Error):**
```json
{
  "error": "Validation failed",
  "messages": {
    "template_id": ["The template id field is required."],
    "platform": ["The platform field must be either apple or google."]
  }
}
```

### Get Pass Details

Retrieve details of a specific pass.

**Endpoint:** `GET /api/passes/{pass_id}`

**Response:**
```json
{
  "success": true,
  "pass": {
    "id": 123,
    "serial_number": "550e8400-e29b-41d4-a716-446655440000",
    "platform": "apple",
    "pass_type": "coupon",
    "status": "active",
    "pass_data": {
      "description": "Member Loyalty Card",
      "backgroundColor": "#000000",
      "foregroundColor": "#FFFFFF"
    },
    "created_at": "2026-02-08T23:18:36.000000Z",
    "template": {
      "id": 1,
      "name": "Loyalty Card Template"
    }
  },
  "download_urls": {
    "apple": "https://your-domain.com/passes/123/download/apple",
    "google": "https://your-domain.com/passes/123/download/google"
  }
}
```

## Example Usage

### cURL

```bash
# Create a pass
curl -X POST https://your-domain.com/api/passes \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "template_id": 1,
    "member_id": "MEMBER123",
    "platform": "apple",
    "custom_fields": {
      "name": "John Doe",
      "points": "1000"
    }
  }'
```

### PHP

```php
<?php

$apiToken = 'YOUR_API_TOKEN';
$baseUrl = 'https://your-domain.com/api';

$data = [
    'template_id' => 1,
    'member_id' => 'MEMBER123',
    'platform' => 'apple',
    'custom_fields' => [
        'name' => 'John Doe',
        'points' => '1000'
    ]
];

$ch = curl_init($baseUrl . '/passes');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $apiToken,
    'Content-Type: application/json',
]);

$response = curl_exec($ch);
$result = json_decode($response, true);

if ($result['success']) {
    echo "Pass created: " . $result['pass']['serial_number'];
    echo "\nDownload URL: " . $result['download_urls']['apple'];
}
```

### JavaScript (Node.js)

```javascript
const axios = require('axios');

const apiToken = 'YOUR_API_TOKEN';
const baseUrl = 'https://your-domain.com/api';

async function createPass() {
  try {
    const response = await axios.post(`${baseUrl}/passes`, {
      template_id: 1,
      member_id: 'MEMBER123',
      platform: 'apple',
      custom_fields: {
        name: 'John Doe',
        points: '1000'
      }
    }, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Pass created:', response.data.pass.serial_number);
    console.log('Download URL:', response.data.download_urls.apple);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

createPass();
```

### Python

```python
import requests
import json

api_token = 'YOUR_API_TOKEN'
base_url = 'https://your-domain.com/api'

data = {
    'template_id': 1,
    'member_id': 'MEMBER123',
    'platform': 'apple',
    'custom_fields': {
        'name': 'John Doe',
        'points': '1000'
    }
}

headers = {
    'Authorization': f'Bearer {api_token}',
    'Content-Type': 'application/json'
}

response = requests.post(f'{base_url}/passes', json=data, headers=headers)
result = response.json()

if result.get('success'):
    print(f"Pass created: {result['pass']['serial_number']}")
    print(f"Download URL: {result['download_urls']['apple']}")
else:
    print(f"Error: {result.get('error')}")
```

## Rate Limiting

API requests are rate-limited based on your subscription plan:

- **Free Plan**: 100 requests per hour
- **Basic Plan**: 1,000 requests per hour
- **Pro Plan**: 10,000 requests per hour
- **Enterprise Plan**: Unlimited

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1644336000
```

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 401 | Unauthorized - Invalid or missing API token |
| 403 | Forbidden - Pass limit reached or insufficient permissions |
| 404 | Not Found |
| 422 | Unprocessable Entity - Validation errors |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

## Webhooks (Coming Soon)

We plan to implement webhooks to notify your application about pass events:

- Pass created
- Pass updated
- Pass installed
- Pass removed

## Support

For API support, please contact us at support@your-domain.com or visit our documentation at https://docs.your-domain.com

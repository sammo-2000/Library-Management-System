# API Endpoint Template

**Endpoint**:
POST /api/create-payment-session

**Description**: Create payment session & get session ID.

**Headers**:
- `Content-Type`: application/json

**Request Body** (for `POST` requests):

```json
{
    "planType": "month",
    "userId": "1"
}
```

---

This example shows a `POST` endpoint for creating a payment session for monthly plan.

**Request Body**:

```json
{
    "planType": "month",
    "userId": "1"
}
```

***Response***:

- Status: 201 Created
- Body:

```json
{
    "type": "Success",
    "message": {
        "sessionId": "cs_test_a1h2LzIukRWxW3C1QKt7Xl9KjT8lzUo8FzcdhcjymlqUa3BEhUV6mq8hsM"
    }
}
```

***Invalid plan type given***

- Status: 400 Bad Request
- Body:

```json
{
    "type": "Fail",
    "message": {
        "error": "Failed: planType is Invalid enum value. Expected 'month' | 'year', received 'aaa'"
    }
}
```
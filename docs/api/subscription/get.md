# API Endpoint Template

**Endpoint**:
GET /get-subscription-status/:userId

**Description**: Check if the user has active subscription.

---

This example shows a `GET` endpoint for checking if user has an active subscription.

***Response***:

- Status: 200 Ok
- Body:

```json
{
    "type": "Success",
    "isActive": false
}
```
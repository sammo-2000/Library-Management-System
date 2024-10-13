---
date: { 2024-10-13 }
written-by: { Ahmed Sulaimon }
decision-makers: { Ahmed Sulaimon, Ayman Sammo, Nayan Stanley }
---

# Database choice

## Context and Problem Statement

- What type of database should be used for application development

## Considered Options

- [Relational Database (RDBMS)](#Relational-Database(RDBMS))
- [NoSQL Database (Document-Based)](#NoSQL-Database(Document-Based))
- [Key-Value Store (In-Memory Database))](#Key-Value-Store)
- [Graph Database](#Graph-Database)

## Decision Outcome

**Chosen option:**  Relational Database (RDBMS) and NoSQL Database (Document-Based)

**Rationale:** 
- A relational database is ideal for structured data that requires consistency and transactional integrity. This database can handle core functionalities like user management, inventory management, and transactional operations (borrowing/returning media, payments). 

-  NoSQL Database offers flexibility and scalability, making it ideal for managing media-related data and rapid data retrieval.

[See below for pros and cons](#pros-cons).

### Consequences

- **Positive:** Affordable starting costs.
- **Positive:** Can be upgraded as needed.
- **Positive:** Highly customizable.
- **Positive:** Can host multiple websites on a single VPS.
- **Positive:** Supports web apps built in any language.
- **Negative:** Cannot be dynamically scaled as demand increases.
- **Negative:** Requires manual setup for SSL, HTTPS, and domain forwarding.

### Confirmation

<!-- Is this valid option for the project & why -->

<a name="pros-cons"></a>

## Pros and Cons of the Options

<a name="digital-ocean-vps"></a>

### Digital Ocean (VPS)

- **Pros:**
  - Very affordable starting cost (as low as $4).
  - Easily upgradable.
  - Highly customizable.
  - Can host multiple websites on a single VPS.
  - Supports various programming languages.
- **Cons:**
  - Cannot be dynamically scaled as demand increases.
  - Requires manual setup for SSL, HTTPS, and domain forwarding.

<a name="hostinger-web-hosting"></a>

### Hostinger (Web Hosting)

- **Pros:**
  - Easy to run PHP applications.
- **Cons:**
  - Short-term plans are expensive; only long-term plans (3-4 years) are cost-effective.
  - Primarily suited for PHP projects.

<a name="hostinger-vps"></a>

### Hostinger (VPS)

- **Pros:**
  - Easily upgradable.
  - Highly customizable.
  - Can host multiple websites on a single VPS.
  - Supports various programming languages.
- **Cons:**
  - Can be expensive for short-term use; long-term plans are more affordable.
  - Cannot be dynamically scaled as demand increases.
  - Requires manual setup for SSL, HTTPS, and domain forwarding.

<a name="vercel"></a>

### Vercel (Next.js)

- **Pros:**
  - Optimized for Next.js applications.
  - Allows database integration on a single platform.
  - Runs on edge servers, scaling automatically with demand.
  - Comes pre-configured with HTTPS and port forwarding.
- **Cons:**
  - Can become costly for high-traffic applications.
  - Best suited for Next.js applications only.

## More Information

<!-- How did the team come up with the decision -->

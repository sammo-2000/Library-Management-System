---
date: { 2024-10-07 }
written-by: { Ahmed Sulaimon, Ayman Sammo, Nayan Stanley }
decision-makers: { Ahmed Sulaimon, Ayman Sammo, Nayan Stanley }
---

# Architecture Style

## Context and Problem Statement

- Which architecture should we choose for the library system?

## Considered Options

- [Service Oriented Architecture](#service-oriented-architecture)
- [Microservices](#microservices)
- [Three-Layer Architecture](#three-layer-architecture)

## Decision Outcome

**Chosen option:** Service Oriented Architecture  
**Rationale:** This option presents the best scalability and flexibility for the library system. [See below for pros and cons](#pros-cons).

### Consequences

- **Positive:** Easily scalable.
- **Positive:** Loosely coupled components.
- **Negative:** Difficult to maintain.
- **Negative:** Risk of a single point of failure (due to ESB).
- **Negative:** Potentially high development costs.

### Confirmation

<!-- Describe how the implementation will be confirmed. -->

<a name="pros-cons"></a>

## Pros and Cons of the Options

<a name="service-oriented-architecture"></a>

### Service Oriented Architecture

- **Pros:**
  - Easily scalable as system demands grow.
  - Loosely coupled, allowing for independent updates and deployments.
- **Cons:**
  - Maintenance can be complex due to multiple services.
  - Risk of a single point of failure, particularly with an Enterprise Service Bus (ESB).
  - Development can be costly due to integration and management overhead.
  - Slower because they share a common architecture.

<a name="microservices"></a>

### Microservices

- **Pros:**
  - Faster because it minimises sharing.
  - Simpler since they just use APIs to communicate.
  - Easier fault isolation since services are smaller than SOA.
- **Cons:**
  - Conistent data governance is more difficult.
  - More complex than Three-Layer Archicture.

<a name="three-layer-architecture"></a>

### Three-Layer Architecture

- **Pros:**
  - Clear separation of concerns improves maintainability.
  - Easier to implement and understand for smaller systems.
- **Cons:**
  - Less flexible for scaling compared to SOA.
  - Can become monolithic as the application grows.

## More Information

<!-- Additional evidence or team agreement on the decision, links to related resources. -->

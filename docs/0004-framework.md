---
date: 2024-10-10
writtenBy: { Ahmed Sulaimon, Ayman Sammo, Nayan Stanley }
decisionMakers: { Ahmed Sulaimon, Ayman Sammo, Nayan Stanley }
---

# Framework

## Context and Problem Statement

- Which framework should be used to develop the application?

## Considered Options

- [NextJS](#nextjs)
- [Nuxt](#nuxt)
- [Laravel](#laravel)

## Decision Outcome

**Chosen option:** NextJS  
**Rationale:** This option comes out the best. [See below for pros and cons](#pros-cons).

### Consequences

- **Positive:** Handles both front and back end functionality.
- **Positive:** The team is familiar with it.
- **Positive:** Flexible for different architectures (including the chosen one).
- **Positive:** Supports SSR and SSG, improving initial load times and SEO.
- **Positive:** Front-end development is straightforward with React.
- **Positive:** Strong communities for troubleshooting.
- **Negative:** Understanding SSR can be difficult.
- **Negative:** May be challenging to integrate with other tools.
- **Negative:** Complex configuration for advanced settings.

### Confirmation

- Gather information in sprint retrospectives about whether the pros and cons of NextJS are accurate.

<a name="pros-cons"></a>

## Pros and Cons of the Options

<a name="nextjs"></a>

### NextJS

- **Pros:**
  - Handles both front and back end functionality.
  - The team is familiar with it.
  - Flexible for different architectures (including the chosen one).
  - Supports SSR and SSG, improving initial load times and SEO.
  - Front-end development is straightforward with React.
  - Strong communities for troubleshooting.
- **Cons:**
  - Understanding SSR can be difficult.
  - May be challenging to integrate with other tools.
  - Complex configuration for advanced settings.

<a name="nuxt"></a>

### Nuxt

- **Pros:**
  - Works well for the chosen architecture.
  - Provides modules for integrating new technologies.
- **Cons:**
  - Enforces its opinions via conventions.
  - The team is unfamiliar with it.

<a name="laravel"></a>

### Laravel

- **Pros:**
  - Great for backend-centric applications.
  - Strong communities for troubleshooting.
  - Easy documentation.
- **Cons:**
  - The team is unfamiliar with it.

## More Information

<!-- Additional evidence or team agreement on the decision, links to related resources. -->

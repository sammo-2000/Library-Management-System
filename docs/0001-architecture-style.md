---
date: { 2024-10-07 }
decision-makers: { Ahmed Sulaimon, Ayman Sammo, Nayan Stanley }
---

# Architecture Style

## Context and Problem Statement

- Which architecture should we choose for the library system?

## Considered Options

- Service Oriented Architecture
- Three-Layer Architecture

## Decision Outcome

Chosen option: "Service Oriented Architecture", because comes out the best [See below pros and cons](#pros-cons)

### Consequences

- Good, because it can easily be scaled up
- Good, because it is loosly coupled
- Bad, because not easily maintainable
- Bad, because of single point of failure (ESB)
- Bad, because it can be expensive to develop

### Confirmation

{Describe how the implementation of/compliance with the ADR can/will be confirmed. Is the chosen design and its implementation in line with the decision? E.g., a design/code review or a test with a library such as ArchUnit can help validate this. Note that although we classify this element as optional, it is included in many ADRs.}

<a name="pros-cons"></a>

## Pros and Cons of the Options

### Service Oriented Architecture

{example | description | pointer to more information | …}

- Good, because {argument a}
- Good, because {argument b}
- Neutral, because {argument c}
- Bad, because {argument d}

### Three-Layer Architecture

{example | description | pointer to more information | …}

- Good, because {argument a}
- Good, because {argument b}
- Neutral, because {argument c}
- Bad, because {argument d}

## More Information

{You might want to provide additional evidence/confidence for the decision outcome here and/or document the team agreement on the decision and/or define when/how this decision the decision should be realized and if/when it should be re-visited. Links to other decisions and resources might appear here as well.}

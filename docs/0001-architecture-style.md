---
# These are optional metadata elements. Feel free to remove any of them.
status: "{proposed | rejected | accepted | deprecated | … | superseded by ADR-0123"
date: { 2024-10-07 when the decision was last updated }
decision-makers: { Ahmed Sulaimon, Ayman Sammo, Nayan Stanley }
consulted: { Ahmed Sulaimon, Ayman Sammo, Nayan Stanley }
informed: { Ahmed Sulaimon, Ayman Sammo, Nayan Stanley }
---

# Architecture Style

## Context and Problem Statement

Trying to choose our architecture style for the library system

## Considered Options

- Service Oriented Architecture
- Three-Layer Architecture

## Decision Outcome

Chosen option: "Service Oriented Architecture", because it allows for the development of a loosely coupled application, easily maintained, resilient and scalable. [See below pros and cons](#pros-cons)

### Consequences

- Good, because {positive consequence, e.g., improvement of one or more desired qualities, …}
- Bad, because {negative consequence, e.g., compromising one or more desired qualities, …}
- … <!-- numbers of consequences can vary -->

<!-- This is an optional element. Feel free to remove. -->

### Confirmation

{Describe how the implementation of/compliance with the ADR can/will be confirmed. Is the chosen design and its implementation in line with the decision? E.g., a design/code review or a test with a library such as ArchUnit can help validate this. Note that although we classify this element as optional, it is included in many ADRs.}

<!-- This is an optional element. Feel free to remove. -->

## Pros and Cons of the Options

<a name="pros-cons"></a>

### {title of option 1}

<!-- This is an optional element. Feel free to remove. -->

{example | description | pointer to more information | …}

- Good, because {argument a}
- Good, because {argument b}
<!-- use "neutral" if the given argument weights neither for good nor bad -->
- Neutral, because {argument c}
- Bad, because {argument d}
- … <!-- numbers of pros and cons can vary -->

### {title of other option}

{example | description | pointer to more information | …}

- Good, because {argument a}
- Good, because {argument b}
- Neutral, because {argument c}
- Bad, because {argument d}
- …

<!-- This is an optional element. Feel free to remove. -->

## More Information

{You might want to provide additional evidence/confidence for the decision outcome here and/or document the team agreement on the decision and/or define when/how this decision the decision should be realized and if/when it should be re-visited. Links to other decisions and resources might appear here as well.}

---
date: { 2024-11-18 }
written-by: { Ahmed Sulaimon, Ayman Sammo, Nayan Stanley }
decision-makers: { Ahmed Sulaimon, Ayman Sammo, Nayan Stanley }
---

# Hosting Platform

## Context and Problem Statement

- What cryptographics techniques should be employed when storing passwords?

## Considered Options

- [Hashing (BCrypt)](#bcrypt)
- [Hashing (SHA-256)](#sha256)
- [Encryption](#encryption)

## Decision Outcome

**Chosen option:** Hashing (BCrypt)
**Rationale:** This option is the slowest of the hashing algorithms so better for password (harder to brute force). [See below for pros and cons](#pros-cons).

### Consequences

- **Positive:** Password cannot be retrieved from the hash (One-way).
- **Positive:** BCrypt is a slow hashing algorithm so brute force attacks will take longer.
- **Negative:** The slowness could also hinder performance.

### Confirmation

Passwords should not be able to be retrieved from a given hash.

<a name="pros-cons"></a>

## Pros and Cons of the Options

<a name="bcrypt"></a>

### Hashing (BCrypt)

- **Pros:**
  - Password cannot be retrieved from the hash (One-way).
  - BCrypt is a slow hashing algorithm so brute force attacks will take longer.
- **Cons:**
  - The slowness could also hinder performance.

<a name="sha256"></a>

### Hashing (SHA-256)

- **Pros:**
  - Password cannot be retrieved from the hash (One-way).
  - Better performance since it is faster.
- **Cons:**
  - Easier to brute force due to algorithm speed.

<a name="encryption"></a>

### Encryption

- **Pros:**
  - The password is hidden form view.
- **Cons:**
  - There is a chance that the password could be decrypted and leaked.

## More Information

<!-- How did the team come up with the decision -->

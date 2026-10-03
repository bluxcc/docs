# Blux QA and Optimization Report

**Project:** Blux  
**Scope:** Authentication, wallet connectivity, SDK packages, modal UI, API reliability, security hardening, performance, and cross-platform compatibility  
**Status:** Completed  
**Report period:** Final tranche QA and optimization cycle

## 1. Overview

This report documents the QA, bug fixing, compatibility work, security hardening, and performance optimization completed during the final tranche of Blux.

The QA cycle covered the main Blux integration surface, including:

- `@bluxcc/react`
- `@bluxcc/core`
- Blux authentication flows
- Wallet login and wallet detection
- Passkey, email, SMS, and OAuth authentication
- Signing and wallet ownership verification
- Login, onboarding, profile, activity, send, swap, and related modal flows
- Blux API behavior
- Browser and mobile compatibility
- Package compatibility with common frontend build environments
- Modal rendering, positioning, responsiveness, and animation
- Horizon usage and fallback behavior
- Bundle and asset delivery
- Session and JWT handling
- Application-level access controls

The objective of this QA cycle was not only to resolve individual bugs, but to make Blux more reliable for applications using different frameworks, browsers, wallets, devices, and authentication methods.

Public documentation is available at:

- https://docs.blux.cc
- https://docs.blux.cc/changelog
- https://demo.blux.cc
- https://dashboard.blux.cc

---

## 2. QA Coverage

### Platforms and browsers

Authentication and the main user flows were tested across:

| Environment | Status |
| --- | --- |
| iOS | Passed |
| Android | Passed |
| Chrome | Passed |
| Firefox | Passed |
| Safari | Passed |
| Microsoft Edge | Passed |
| Opera | Passed |
| Brave | Passed |

The goal of this testing was to verify that authentication methods, wallet connections, modal flows, and session behavior remain usable across the browsers and devices commonly used by Stellar applications.

### Authentication methods

The QA cycle covered the authentication methods exposed by Blux, including:

- Existing Stellar wallets
- Email authentication
- SMS authentication
- Passkeys
- Google
- Apple
- Meta
- GitHub
- GitLab
- Discord
- Other supported social authentication methods

Wallet authentication was also checked against differences in browser extension behavior, mobile wallet behavior, wallet signing capabilities, and wallet availability detection.

### Integration paths

Testing covered both primary package integrations:

- React applications using `@bluxcc/react` and `BluxProvider`
- JavaScript applications using `@bluxcc/core` and `createConfig`

Additional compatibility testing included Vite-based applications and integrations where Blux is mounted without a conventional parent layout container.

---

# 3. Resolved Issues

The following issues were identified during development, QA, integration testing, or feedback from applications using Blux. They have been addressed as part of the tranche work.

## 3.1 Modal rendering, positioning, and interaction

### Persistent modal positioning

**Issue:** Modal placement could become incorrect when `isPersistent` was enabled.

**Resolution:** Modal positioning was corrected so persistent modals remain in the intended location and behave consistently with the surrounding application layout.

**Status:** Resolved.

### Modal placement without a parent container

**Issue:** Vertical placement could become incorrect when `createConfig` or `BluxProvider` was initialized without a suitable parent container.

**Resolution:** Modal mounting and positioning logic was updated so Blux no longer depends on a specific parent layout structure to render in the correct position.

**Status:** Resolved.

### Page interaction while a persistent modal is open

**Issue:** When `isPersistent` was enabled and a modal was open, controls in the underlying page could become unintentionally inaccessible.

**Resolution:** Pointer-event and modal interaction behavior was corrected so persistent modal behavior does not unnecessarily block unrelated page controls.

**Status:** Resolved.

### Repeated `login()` animation

**Issue:** Calling `login()` multiple times could cause the opening animation to replay incorrectly or leave the modal in an inconsistent animation state.

**Resolution:** Modal state and animation handling were updated to safely handle repeated login calls.

**Status:** Resolved.

### Mobile bottom sheet animation

**Issue:** The bottom sheet opening animation could fail to appear at mobile viewport sizes.

**Resolution:** Responsive animation handling was corrected for mobile modal layouts.

**Status:** Resolved.

### Modal position after scrolling

**Issue:** Blux modals could move, disappear, or render in the wrong position after the user scrolled the page.

**Resolution:** Modal positioning and viewport behavior were updated so modals remain correctly visible while scrolling.

**Status:** Resolved.

### Low `z-index`

**Issue:** Some applications could render Blux behind their own interface because the Blux modal did not have a sufficiently high stacking level.

**Resolution:** Modal stacking behavior was updated to reduce conflicts with application UI layers.

**Status:** Resolved.

### Firefox modal animation

**Issue:** Modal animations did not behave correctly in Firefox.

**Resolution:** Firefox-specific animation behavior was corrected and included in browser QA.

**Status:** Resolved.

### Modal logo rendering

**Issue:** Application logos could display incorrectly inside Blux modals.

**Resolution:** Logo rendering behavior was corrected.

**Status:** Resolved.

### Font loading

**Issue:** Custom fonts could fail to apply correctly during the initial modal load.

**Resolution:** Font initialization and application were updated so configured fonts are applied reliably when Blux first renders.

**Status:** Resolved.

---

## 3.2 Onboarding and responsive UI

### Incorrect initial wallet page

**Issue:** In some cases, Blux opened the "Other Stellar Wallets" screen directly instead of starting from the normal onboarding screen.

**Resolution:** Initial onboarding routing was corrected.

**Status:** Resolved.

### Mobile onboarding re-rendering

**Issue:** Responsive changes and state updates could cause unnecessary re-rendering of onboarding pages on mobile layouts.

**Resolution:** Onboarding state and responsive rendering were optimized to reduce unnecessary page re-renders.

**Status:** Resolved.

### Simplified onboarding

The onboarding page was simplified by reducing the number of buttons and making the initial authentication choices easier to understand.

This change is also documented in the Blux changelog.

**Status:** Completed.

### Re-login after refresh

**Issue:** Refreshing an application could produce an unreliable re-login or session restoration flow.

**Resolution:** Session restoration and re-login behavior were corrected.

**Status:** Resolved.

### Appearance updates without modal re-rendering

Blux added `setAppearance` so applications can update the Blux appearance dynamically without having to recreate or unnecessarily re-render the modal integration.

**Status:** Completed.

### Language support

The Blux UI supports multiple languages across its authentication and account modals.

The current documented languages include:

- English
- Spanish
- Portuguese
- French
- German
- Russian
- Chinese
- Japanese
- Korean
- Turkish

Language configuration is documented at:

https://docs.blux.cc/configuration/language

**Status:** Completed.

---

## 3.3 Wallet detection and wallet compatibility

### Freighter detection in Chrome

**Issue:** Blux could fail to detect that the Freighter extension was installed in Chrome.

**Resolution:** Freighter availability detection was corrected.

**Status:** Resolved.

### Freighter detection in Firefox

**Issue:** Blux could fail to detect that Freighter was installed in Firefox.

**Resolution:** Firefox extension detection was corrected and tested separately from Chromium-based detection.

**Status:** Resolved.

### Freighter inactive-account warning

**Issue:** Freighter could show an inactive-account warning during authentication in situations where the authentication flow should not require an active Stellar account.

**Resolution:** The Freighter authentication flow was updated to avoid the incorrect inactive-account warning.

**Status:** Resolved.

### Rabet mobile on iOS

**Issue:** Rabet mobile authentication did not work correctly on iOS.

**Resolution:** The mobile Rabet flow was corrected for iOS.

**Status:** Resolved.

### Rabet message signing

**Issue:** The Blux Rabet integration did not correctly support message signing.

**Resolution:** Rabet message-signing support was added/fixed and incorporated into the wallet authentication flow.

**Status:** Resolved.

### LOBSTR extension availability check

**Issue:** Checking availability of the LOBSTR Chrome extension could take too long and delay Blux readiness.

**Resolution:** Wallet availability detection was optimized to avoid long blocking checks.

**Status:** Resolved.

### WalletConnect configuration loop

**Issue:** An invalid or incomplete WalletConnect configuration could repeatedly reinitialize itself and eventually cause the host application to crash.

**Resolution:** WalletConnect initialization and configuration validation were updated to prevent repeated reinitialization.

**Status:** Resolved.

---

## 3.4 Authentication and signing

### SEP-10 authentication transaction issues

**Issue:** Some wallet authentication flows based on signing SEP-10 transactions could fail or create unnecessary friction.

**Resolution:** SEP-10 authentication handling was corrected where it remains required.

**Status:** Resolved.

### Message signing for supported wallets

For wallets and authentication methods that support message signing, Blux replaced transaction-based authentication with message signing.

This reduces unnecessary transaction-style prompts and provides a simpler proof-of-wallet-ownership flow.

The change is documented in the Blux changelog.

**Status:** Completed.

### Passkey authentication in Chrome

**Issue:** Passkey authentication could fail in Chrome because of incorrect WebAuthn algorithm or configuration parameters.

**Resolution:** Passkey configuration and supported algorithms were corrected.

**Status:** Resolved.

### GitHub redirect flow

**Issue:** GitHub authentication could return through an incorrect or unreliable redirect flow.

**Resolution:** GitHub OAuth redirect handling was corrected.

**Status:** Resolved.

### Terms and Privacy Policy rejection

**Issue:** Rejecting the Privacy Policy or Terms and Conditions could leave authentication in an invalid state or cause later login attempts to fail.

**Resolution:** Login cancellation and rejection state handling were corrected.

**Status:** Resolved.

### Signing modal messages

Signing modals were updated so message signing, auth-entry signing, and transaction signing display the correct action to the user.

This avoids presenting a generic or incorrect signing message for different signing operations.

**Status:** Completed.

---

## 3.5 API reliability and application validation

### Invalid App ID response

**Issue:** App ID validation could return an HTTP `500` response for invalid application identifiers.

**Resolution:** App validation and error handling were corrected so invalid client input is handled without being incorrectly treated as an internal server failure.

**Status:** Resolved.

### Server API authentication

Blux exposes an App ID and App Secret model for trusted backend access.

Server-side authentication, user lookup, user counting, and wallet verification are documented at:

- https://docs.blux.cc/api
- https://docs.blux.cc/api/authentication
- https://docs.blux.cc/api/verify-wallet

**Status:** Documented and available.

---

# 4. Performance and Optimization Work

## 4.1 Faster initial modal readiness

**Issue:** `isReady` could take too long to become `true` because wallet detection was performed as part of the initial Blux startup sequence.

**Optimization:** Wallet detection was optimized so slow wallet availability checks do not unnecessarily delay the first usable modal state.

This reduces perceived login latency, especially for users who do not have every supported browser wallet installed.

**Status:** Completed.

---

## 4.2 Activity data loading and Horizon request reduction

**Issue:** Immediately after login, Blux could send too many Horizon requests to retrieve recent transactions and operations for the Activity page. This could create unnecessary network traffic and cause the host application to feel slower.

**Optimization:** Activity data is now retrieved when the Activity interface is actually opened instead of aggressively loading the full activity history immediately after authentication.

This reduces:

- Initial Horizon requests
- Unnecessary API usage
- Login-time network activity
- Work performed for users who never open the Activity page

The lazy Activity loading change is also documented in the Blux changelog.

**Status:** Completed.

### Activity display correction

**Issue:** The Activity modal could display incorrect or incomplete activity data in some states.

**Resolution:** Activity state and rendering were corrected as part of the Activity flow QA.

**Status:** Resolved.

---

## 4.3 Horizon rate-limit fallback

**Issue:** Applications could be affected when the primary Horizon endpoint returned a rate-limit response.

**Optimization:** Blux can fall back to an alternative Horizon endpoint when rate limiting is encountered instead of allowing the integration to fail immediately.

**Status:** Completed.

---

# 5. Package Size and Asset Optimization

Bundle size was reviewed as part of the QA and optimization cycle because Blux is loaded directly into third-party applications. Package weight therefore affects the applications integrating the SDK.

## 5.1 Externalized peer dependencies

**Issue:** Dependencies that could be provided by the consuming application were increasing the generated Blux package bundles.

**Optimization:** Appropriate peer dependencies were externalized rather than being unnecessarily included in Blux bundles.

**Result:** Reduced package bundle size and reduced duplicate dependency code in consuming applications.

**Status:** Completed.

---

## 5.2 IIFE bundle distribution

**Issue:** Including IIFE builds directly in the package increased published package size even though most package users did not require that build format.

**Optimization:** IIFE distribution was removed from the main npm package and is served separately through the CDN.

This keeps the standard package smaller while preserving a browser/CDN integration path.

See the Blux documentation for current package installation and JavaScript integration instructions:

https://docs.blux.cc/getting-started

**Status:** Completed.

---

## 5.3 Image delivery through Cloudflare R2

**Issue:** Bundling interface images directly with the packages contributed to package and application bundle size.

**Optimization:** Static images were moved to Cloudflare R2 and are fetched when required by the packages.

Additional asset optimizations include:

- Compressed image assets
- Gzip compression where applicable
- In-memory caching during the current application session
- IndexedDB caching for reuse across reloads
- Avoiding repeated downloads when an asset is already available locally

This reduces the amount of static image data included in the JavaScript package and limits repeated network requests.

**Status:** Completed.

---

# 6. Build Tool and Package Compatibility

## 6.1 Vite `Buffer` compatibility

**Issue:** Some Blux package code expected Node.js `Buffer` globals that are not provided automatically by Vite browser builds.

**Resolution:** Browser compatibility was corrected so Vite applications no longer fail because `Buffer` is undefined.

**Status:** Resolved.

---

## 6.2 Ledger dependency `Buffer` usage

**Issue:** Dependencies from `@ledgerhq` use APIs such as:

- `Buffer.alloc`
- `Buffer.concat`
- `Buffer.from`

In browser-only environments, these calls could crash the entire host application if the required compatibility layer was unavailable.

**Resolution:** Buffer compatibility for the Ledger integration was corrected so Ledger-related dependencies do not break the rest of the Blux integration.

**Status:** Resolved.

---

## 6.3 Firefox TypeScript/runtime warnings

**Issue:** Blux-related type/runtime warnings appeared in the Firefox console.

**Resolution:** The relevant type and browser compatibility issues were corrected.

**Status:** Resolved.

---

## 6.4 Configuration type fixes

Blux corrected TypeScript types for `createConfig` options and improved configuration defaults.

The current integration only requires an App ID, while other configuration values can use Blux defaults when omitted.

This work is documented in the changelog and current Getting Started documentation.

**Status:** Completed.

---

# 7. Security Hardening

Security work in this tranche focused on session handling, API abuse resistance, wallet ownership verification, and reducing misuse of application credentials.

The following measures should be understood as security hardening. They reduce specific attack surfaces but are not presented as a claim that any internet-facing system is completely immune to denial-of-service attacks or abuse.

## 7.1 JWT storage

JWT token storage was improved to reduce unnecessary exposure of authentication state.

This change is documented in the Blux changelog.

**Status:** Completed.

---

## 7.2 Request throttling

**Issue:** Unrestricted repeated API requests from the same source could be used to create unnecessary backend load.

**Resolution:** Request throttling was added so a single IP address cannot send an unlimited number of requests within a short period.

**Security impact:** Reduces basic API flooding and automated abuse.

**Status:** Completed.

---

## 7.3 Proof of wallet ownership

Wallet-based authentication requires cryptographic proof that the user controls the wallet they are attempting to authenticate with.

Depending on wallet capabilities, this uses:

- Message signing
- SEP-10 transaction signing where required

This prevents a user from authenticating simply by submitting someone else's public wallet address.

For backend applications, Blux also provides a documented wallet verification endpoint:

https://docs.blux.cc/api/verify-wallet

**Status:** Completed.

---

## 7.4 Allowed Origins

Blux allows application owners to restrict the domains that are permitted to use their App ID.

This prevents an App ID from being freely reused from unapproved websites and reduces the risk of another site consuming an application's authentication resources.

Allowed Origins are documented at:

https://docs.blux.cc/dashboard/access-control

**Status:** Completed.

---

## 7.5 Server-side secret separation

Blux uses an App Secret for authenticated server-to-server API calls. The App Secret is intended to remain on trusted backend infrastructure and is separate from the public App ID used by frontend applications.

The recommended secret-handling model is documented at:

https://docs.blux.cc/api/authentication

**Status:** Documented and available.

---

# 8. User Experience Improvements

The tranche also included product changes discovered through QA that were not strictly defects but improved the integration experience.

## 8.1 Testnet USDC in the profile modal

Testnet USDC was added to the profile modal so developers and users testing Blux can more easily exercise asset and swap-related flows without requiring their own asset setup.

**Status:** Completed.

---

## 8.2 White-label authentication

Blux added headless/white-label authentication APIs for applications that want to use their own interface instead of the default Blux login modal.

Supported white-label flows include:

- Email
- SMS
- OAuth/social authentication
- Passkeys
- Wallet authentication

Documentation:

https://docs.blux.cc/javascript/usage/white-label-login

**Status:** Completed and documented.

---

## 8.3 Social login expansion

Support was expanded for additional social authentication providers, with social providers configured per application through the Blux dashboard.

Documentation:

https://docs.blux.cc/dashboard/socials

**Status:** Completed and documented.

---

## 8.4 On-ramp and off-ramp availability

Funding and off-ramp functionality is available through the Blux account/funding interfaces, including supported MoneyGram and MoonPay flows.

**Status:** Completed.

---

## 8.5 Soroban and account utility improvements

During the same development period, Blux expanded the SDK beyond authentication so applications can use the same integration for common Stellar and Soroban tasks.

Documented improvements include:

- Contract read helpers
- Contract write helpers
- Automatic conversion of common JavaScript values to contract-compatible values
- Support for XLM names in relevant helpers
- Transaction signing
- Message signing
- Auth-entry signing
- Built-in profile, send, swap, activity, and funding interfaces

These capabilities are documented throughout:

https://docs.blux.cc/getting-started

**Status:** Available and documented.

---

# 9. Public Documentation and Verification

The following public resources can be used to verify the current state of the product.

| Resource | Purpose |
| --- | --- |
| https://docs.blux.cc | Main product and SDK documentation |
| https://docs.blux.cc/changelog | Public release history and shipped fixes |
| https://docs.blux.cc/getting-started | Package installation and integration flow |
| https://docs.blux.cc/configuration | Configuration options |
| https://docs.blux.cc/configuration/appearance | Modal appearance and theming |
| https://docs.blux.cc/configuration/language | Supported UI languages |
| https://docs.blux.cc/dashboard | Dashboard behavior and project setup |
| https://docs.blux.cc/dashboard/users | Users and analytics |
| https://docs.blux.cc/dashboard/access-control | Allowed origins, allowlists, and blocklists |
| https://docs.blux.cc/dashboard/socials | Social authentication configuration |
| https://docs.blux.cc/api | Server API |
| https://docs.blux.cc/api/authentication | Server API authentication and App Secret handling |
| https://docs.blux.cc/api/verify-wallet | Wallet ownership verification |
| https://docs.blux.cc/javascript/usage/white-label-login | Headless authentication |
| https://demo.blux.cc | Live integration demo |
| https://dashboard.blux.cc | Application creation, configuration, users, and analytics |

---

# 10. Suggested Reviewer Verification Procedure

A reviewer can verify the completion of the QA and optimization work using the following flow.

### 1. Create a Blux application

Open:

https://dashboard.blux.cc

Create an application and copy its App ID.

### 2. Install Blux

Use either:

```bash
npm install @bluxcc/react
```

or:

```bash
npm install @bluxcc/core
```

Follow:

https://docs.blux.cc/getting-started

### 3. Test authentication

Enable several login methods and test:

- Wallet
- Email
- Passkey
- At least one social provider

Where available, repeat the flow on multiple browsers.

### 4. Test modal behavior

Verify:

- Login modal positioning
- Scrolling behavior
- Mobile bottom sheet behavior
- Repeated login calls
- Profile modal
- Activity modal
- Appearance configuration
- Responsive onboarding

### 5. Test wallet authentication

Where the wallet is available, test extension detection and signing with wallets such as Freighter and Rabet.

### 6. Test dashboard records

After authentication, open the Blux dashboard and verify that the user/login is associated with the application.

### 7. Review public release history

Open:

https://docs.blux.cc/changelog

The changelog provides public release-level evidence for multiple fixes and improvements included in this report.

---

# 11. Completion Summary

## QA and optimization reports published

**Completed.**

This report documents the QA coverage, identified issues, resolutions, optimization work, compatibility fixes, security hardening, and verification paths completed during the tranche.

Public product documentation and release notes are available through the Blux documentation site.

## All identified tranche QA issues resolved

**Completed.**

The issues listed in this report were addressed during the tranche QA cycle. The statement refers to issues identified and tracked as part of this QA scope, rather than claiming that no future defect can exist in the project.

Testing covered authentication, wallets, browser compatibility, mobile behavior, modal rendering, package integration, backend/API behavior, and common integration flows.

## Recovery system documented and working

This report is focused on QA and optimization. Recovery evidence should be provided separately with:

1. Public recovery documentation.
2. A live recovery/export flow.
3. A short end-to-end demonstration showing a user authenticating, locating their Blux-created account, and exporting or recovering access to that account.

This should be linked alongside this QA report in the final tranche submission.

---

# 12. Evidence Checklist for Final Tranche Submission

Before submitting the tranche, attach or link the following evidence:

- [x] QA and optimization report
- [x] Public Blux documentation
- [x] Public changelog
- [x] Live Blux demo
- [x] Browser and mobile QA coverage
- [x] Authentication QA coverage
- [x] Wallet compatibility fixes
- [x] Package/build compatibility fixes
- [x] Performance optimization details
- [x] Security hardening details
- [ ] Recovery documentation link
- [ ] Recovery demo/video link
- [ ] Optional GitHub PR/commit links for major fixes
- [ ] Optional screenshots/video showing cross-browser tests

For the strongest possible submission, the final two optional evidence types should be added wherever available. They make individual fixes independently traceable instead of relying only on this written report.

---

## Notes

This document describes the issues and work included in the final tranche QA cycle. Product behavior may continue to evolve after publication, and the Blux changelog should be treated as the current source for package-level release information.

**Documentation:** https://docs.blux.cc  
**Dashboard:** https://dashboard.blux.cc  
**Demo:** https://demo.blux.cc  
**Changelog:** https://docs.blux.cc/changelog

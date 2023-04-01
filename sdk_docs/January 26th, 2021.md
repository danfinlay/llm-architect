- [[Secure EcmaScript (SES)]][[LavaMoat]][[endo]] call
    - [[TC-39]]
        - Static module record
            - Add import names and export names
        - Chrome team proposals
            - Browser-specific problems specific to how [[Google]] is building [[Chrome]]
            - The only Realms that can reach each other would be subject to the CSP policy they're proposing.
                - Doesn't apply to other envs
                    - [[Moddable SDK]]
            - They assume All reachable evals are suppressed by the Content Security Policy.
        - Creation of security-focused technical group as part of TC-39.
            - Initial framing had illegitimized the SES goal, but the concerns were addressed very explicitly.
    - [[Dan Connolly]] is using [[XS Engine]] working for [[SwingSet]]
        - They hired [[Moddable SDK]] to build the snapshotting logic, and it was done in 3 days.
            - Not sure it's deterministic yet, but it may be.
            - They did a rough first pass at [[metering]]
        - [[XS Engine]] has a [[JavaScript Compartment]] implementation that is slightly different from [[ses-shim]].
            - [[ses-shim]] imports [[babel.js]] to rewrite import statements.
            - [[xsnap]] is going to rewrite those imports in advance, so they can do away with babel from the [[ses-shim]]
            - They have multiple ways of locking things down, it's a long story.
            - They have a custom external-function interface syntax that gets interpreted at build time somehow.
    - [[[[MetaMask]] Snaps]] confinement strategy
        - [[XS Engine]] compiles to [[wasm]] no problem
            - Just replace [[gcc]] with [[wasm-gcc]]
            - [[XS Engine]] is good at running within its memory constraints.
            - You might need to add a [[malloc]] implementation
            - It's slow, of course.
            - You'd need to establish something like [[CapTP]] as a communication protocol.
        - Is the [[wasm]] API well confined and not leaky?
            - [[Dan Connolly]] believes this should be safe.
    - [[LavaMoat]]
        - Removed the exports-defense [[membrane]] because its performance hit was too bad. A measure to safely auto-harden the exports of all membranes.
            - [[Monte]] requires hardening all exports, and would avoid this problem.
        - [[capability injection]]
        - Presenting this Friday at [[SpeakeasyJS]]
- [[Vitalik Buterin]] takes a second pass at explaining [[zk snarks]] https://twitter.com/vitalikbuterin/status/1353951703805124612?s=21
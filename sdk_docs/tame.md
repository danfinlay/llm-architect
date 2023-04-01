- In [[Secure EcmaScript (SES)]]
    - Trying to put things into a valid state before [[lockdown]]
    - While [[repair]] is trying to make a lawless system into one you can think of in ocap terms, but with too much authority.
    - Taming fixes things so there isn't too much authority lying around.
    - Distinction can be seen in the Function constructors, which have both phases
        - repair: Replaces the feral function with a function for the start compartment.
        - tame: Replace the function prototype so the constructor points at an inert prototype.
- Sensitive globals
    - Date.now()
    - Math.random()
    - [[Error ([[JavaScript]])]] in [[V8 Engine]] provides special properties for looking up on the call stack.
        - At least denies access to [[strict mode]] functions.
- Like code that is run in the unsafe mode to make an environment for some untrusted code safe to admit.
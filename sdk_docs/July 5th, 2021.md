- [[kickback]] has a fundamental challenge to scale, [[the [[oracle]] problem]].
    - https://twitter.com/makoto_inoue/status/1411960353332858883?s=21
- [[DAO]] challenges
    - https://twitter.com/lucicrypto/status/1411788581933404166?s=21
- [[Secure EcmaScript (SES)]]
    - [[eight magic lines]]
        - Mostly by [[Caridy Patino]]
        - Designed to run some untrusted code in a way that cannot access sloppy mode.
        - Without optimization
            - ```javascript
return function () {
  with (arguments[0]) {
    return function () {
      "use strict";
      return eval(arguments[0]);
    }
  }
}```
        - Components
            - [[with ([[JavaScript]] feature)]]
                - does not exist in strict mode, and so sloppy mode enables this confinement. [[the three wrongs that make a write]]
            - scope [[Proxy]]
                - Scope handler => unsafe eval
                - scope target
                    - global
                    - lexical
                    - contour
                        - [[global lexical contour]]
                            - No [[ses-shim]] code is ever global, and is always strict, and so is not prone to user code polluting the global contour.
                            - Used as a tool to allow module transforms to introduce [[metering]]. The object code gets access to it but the source code does not.
                            - If you could audit all code that could ever enter some scope, and all the variables it would ever mention, then you can be confident these variables are not entering to execution.
                            - Can enable [[repl]] type experiences via [[sloppyGlobals]]
                                - Is part of the [[ses-shim]] but not part of the [[Compartment]] spec.
                    - endowments
                    - this global
            - [[strict mode]]
                - Used before the [[eval]]
            - arguments[0]
                - uses [[arguments ([[JavaScript]] object)]]
                - Accesses arguments directly to avoid introducing variables into scope that would be viewable by the [[direct eval]]
            - unsafeFunction
            - optimizer
                - Hitting the scope [[Proxy]] is expensive, so this line is designed to reduce the cost.
                - ```javascript
return `const {${arrayJoin(constants, ',')}} = this;```
                - Inlines all the constants that are part of the global `this` at time of evaluation by looking at the readonly property descriptors of the global.
                - Now also uses `this` instead of `arguments[0]`
            - [[direct eval]]
                - must be called directly to avoid [[indirect eval]] violation of [[lexical scope]].
            - transforms
                - Aiming to be fast, heuristic, and fast to ban. We are trying to definitely not include a JS parser in the [[trusted computing base (TCB)]]. (We don't want to trust a parser, anyways).
                - Bans
                    - [[html-like comment]]
                    - dynamic imports
                    - apparent [[direct eval]]
                        - Not a safety issue, so admission of it can make errors in both directions.
                        - Can be turned off.
        - [[repair]] vs [[tame]]
        - [[vetted shim]]
        - Another example
            - Using Reflect.apply to avoid triggering any unusual `f.call` behavior.
            - ```javascript
Reflect.apply(f(scopeProxy), thisGlobal, [src]);```
        - Questions
            - 
    - JavaScript as Rome by [[Kris Kowal]]
        - City, state, and empire: All JavaScript executes together today. SES aspires to decompose this.
        - Current roles
            - [[process]]
            - [[thread]]
            - [[Realm]]
                - A unit of immutable [[primordial]]s.
            - [[Compartment]]
                - Sharing [[primordial]]s, so you can identify the Array-ness of another Compartment's arrays.
                - All the shared [[primordial]]s are frozen, and so is the shared global would describe [[Jessie]]. Relationship to [[Secure EcmaScript (SES)]]
        - Each of those things can be locked down
        - What is [[Secure EcmaScript (SES)]]?
            - Proposed definitions
        - [[to read]] [[Anathem]]
        - [[eight magic lines]]
            - `FERAL_FUNCTION`
                - The original unsafe Function construction.
        - [[knownScopeProxies]]
    - The [[TC-39]] [[ECMA]] [[JavaScript]] chapter 16 or so says that implementations are allowed to extend syntax, and intends only to establish a shared lower bound for the language. Any implementation that took advantage of this paragraph could make their implementation insecure while being spec compliant. [[Mark Miller]]
- [[Hyrum's Law]]
- [[to read]][[True Names]]
- [[Horton’s Who Done It?]]

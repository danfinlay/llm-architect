- [[[[TC-39]] JS/WASM Interop Reflector Call]]
    - [[Daniel Ehrenberg]] on [[wasm]]
        - Features that have changed and required changes in the JS API
            - Two phases (async)
                - Compile
                    - Not yet part of the import map.
                - Instantiate
            - Mutable globals
                - Supports importing mutable globals.
            - Garbage collection strategies
                - When the gc is written in wasm, let the compiled language handle it.
                - If we want to support cycles between JS and WASM, then we need to be able to track references in wasm itself, which is what [[externref]] is for.
        - There is a proposal for allowing importing wasm modules using normal JS module syntax!
- [[Dapp Tools]] [[midwit meme]]
    - https://twitter.com/transmissions11/status/1441239978810302468?s=20
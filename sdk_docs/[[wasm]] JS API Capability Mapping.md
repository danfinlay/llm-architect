- To ensure that it is safe to provide the [[WebAssembly JS API]] to an untrusted [[JavaScript Compartment]].
- APIs of note
    - [.Global()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Global/Global)
        - Creates a new global object for allowing inter-module linking. Is this new object available by any other means, or is it confined to code that has access to this newly instantiated `Global` object?
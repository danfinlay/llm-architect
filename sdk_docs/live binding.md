- https://jakearchibald.com/2021/export-default-thing-vs-thing-as-default/
    - Live
        - `export { thing as default; }`
            - When the host variable changes, the importer's view of that variable will also change.
    - Not-live
        - `export default thing;`
            - This is an expression/assignment, so it is not live.
- From [Stack Overflow](https://stackoverflow.com/questions/52211309/what-does-it-mean-by-live-bindings)
    - Live bindings is a concept introduced in ES modules. It means that 
when the exporting module changes a value, the change will be visible 
from the importer side. This is not the case for CommonJS modules. 
Module exports are copied in CommonJS. Hence importing modules cannot 
see changes happened on the exporter side.
    - ## ESM
    - ## counter.mjs
    - ## index.mjs
    - ## Output
    - ## CJS
    - ## counter.js
    - ## index.js
    - ## Output
- How to detect statically
    - if an exported variable also appears on the left of an assignment (not an initialization).

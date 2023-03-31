- ```javascript
'use strict';
const scopeProxy = new Proxy(null, policyHandler);
with (scopeProxy) {
  eval(untrustedCode);
}```
    - ```javascript
return FERAL_FUNCTION(`
  with (this) {
    ${optimizer}
    return function () {
      "use strict";
      return eval(arguments[0]);
    }
  }
`);```

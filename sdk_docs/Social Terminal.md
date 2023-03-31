- An idea for an application that could be built with [[endo]]
    - Would allow sessions to be resumable.
    - Functions created by a peer by default could only resolve once they came online.
        - Eventually could allow function “unwrapping”. 
- Would be a bit of a hybrid of a terminal and a chatroom.
- All rooms would be valid endo terminals, but with something like a "message" method that sends a message either to all or a subset of people in a room.
- Messages can include variables and function references, which the recipient can assign to local variables (much like a [[pet name]]) for later invocation.
- Each user has their own "endo" terminal running, and the concept of "rooms" is really just a concept for a shared message-space, where messages (and references!) sent in those channels are sent to everyone there.
- [[Mark Miller]] says something like this is part of [[Spritely]]
    - Thread discussing it on [[cap-talk]]: https://groups.google.com/g/cap-talk/c/Wa6VR-k3bLo
- Previous iterations
    - [[[[Discord]] [[Secure EcmaScript (SES)]] bot]]
- Current prototype approach: 
    - electron app
        - front end
            - [[react-repl]]
                - This seems to be the winner.
                - Modern.
                - Has hooks for replacing the execution.
            - UI enhancement framework
                - chat rooms?
                - template language?
                - panes?
                - canvas api?
                - "power box"?
                    - View & traverse personal compartment scope
                    - create a capability link (object, note): [link, id]
                        - MVP: Returns `ws://${address}/${crypto_hard_object_key}`
                        - Eventually: Returns `onion://${address}/${crypto_hard_object_key}`
                        - Stored as ```javascript
const shareMap: Map<object, Array<{
  "id": string,
  "note": string,
}>> = new Map();
const linkMap: Map<id:string, object> = new Map();
function revoke(id) {
  const obj = linkMap.get(id);
  if (!obj) return;
  linkMap.delete(id);
  shareMap.delete(object);
}```
            - Other tools
                - [[react-mosaic]]
                    - Could allow "panes" for adding custom views, via API! Send views to your friends?
                - js terminal libraries https://ourcodeworld.com/articles/read/292/top-5-best-terminal-console-emulator-plugins-for-javascript-and-jquery
                    - [[JavaScript Sandbox Console]]
                        - Very simplistic, but seems to have the basic features I want.
                        - jQuery and backbone based, with highly opinionated configuration, will almost certainly require forking to make it do what I want.
                    - [[jsconsole]]
                        - oh that interactive home page sold me real good. Will use it unless there turns out to be a good reason not to.
                        - Oh crap, it hasn't been updated in 2 years and has no readme.
        - backend
            - node.js container running [[ses-shim]]
            - provides API to frontend
                - execute message
                - subscribe to messages
                - create a capability link (object, note): [link, id]
                    - MVP: Returns `ws://${address}/${crypto_hard_object_key}`
                    - Eventually: Returns `onion://${address}/${crypto_hard_object_key}`
                    - Stored as ```javascript
const shareMap: Map<object, Array<{
  "id": string,
  "note": string,
}>> = new Map();
const linkMap: Map<id:string, object> = new Map();
function revoke(id) {
  const obj = linkMap.get(id);
  if (!obj) return;
  linkMap.delete(id);
  shareMap.delete(object);
}```
            - 
- Tools that may help build it
    - [[CapTP]]
    - [[Secure EcmaScript (SES)]]
    - [[Spritely]]
    - [[endo]]
    - Approaches
        - electron app
            - front end
                - [[react-repl]]
                    - This seems to be the winner.
                    - Modern.
                    - Has hooks for replacing the execution.
                - UI enhancement framework
                    - chat rooms?
                    - template language?
                    - panes?
                    - canvas api?
                    - "power box"?
                        - View & traverse personal compartment scope
                        - create a capability link (object, note): [link, id]
                            - MVP: Returns `ws://${address}/${crypto_hard_object_key}`
                            - Eventually: Returns `onion://${address}/${crypto_hard_object_key}`
                            - Stored as ```javascript
const shareMap: Map<object, Array<{
  "id": string,
  "note": string,
}>> = new Map();
const linkMap: Map<id:string, object> = new Map();
function revoke(id) {
  const obj = linkMap.get(id);
  if (!obj) return;
  linkMap.delete(id);
  shareMap.delete(object);
}```
                - Other tools
                    - [[react-mosaic]]
                        - Could allow "panes" for adding custom views, via API! Send views to your friends?
                    - js terminal libraries https://ourcodeworld.com/articles/read/292/top-5-best-terminal-console-emulator-plugins-for-javascript-and-jquery
                        - [[JavaScript Sandbox Console]]
                            - Very simplistic, but seems to have the basic features I want.
                            - jQuery and backbone based, with highly opinionated configuration, will almost certainly require forking to make it do what I want.
                        - [[jsconsole]]
                            - oh that interactive home page sold me real good. Will use it unless there turns out to be a good reason not to.
                            - Oh crap, it hasn't been updated in 2 years and has no readme.
            - backend
                - node.js container running [[ses-shim]]
                - provides API to frontend
                    - execute message
                    - subscribe to messages
                    - create a capability link (object, note): [link, id]
                        - MVP: Returns `ws://${address}/${crypto_hard_object_key}`
                        - Eventually: Returns `onion://${address}/${crypto_hard_object_key}`
                        - Stored as ```javascript
const shareMap: Map<object, Array<{
  "id": string,
  "note": string,
}>> = new Map();
const linkMap: Map<id:string, object> = new Map();
function revoke(id) {
  const obj = linkMap.get(id);
  if (!obj) return;
  linkMap.delete(id);
  shareMap.delete(object);
}```
                - 

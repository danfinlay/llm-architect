- [[Proxy]] research papers by [[Mark Miller]]
    - 2013, pretty up to date: https://research.google/pubs/pub40736/
        - https://storage.googleapis.com/pub-tools-public-publication-data/pdf/40736.pdf
    - Much older, assume stale: https://research.google/pubs/pub36574/
        - https://storage.googleapis.com/pub-tools-public-publication-data/pdf/36574.pdf
- [[VSCode]] for [[object oriented programming]]
    - [[codeful]]
        - Allows collapsing everything else
        - Shows an outline
- [[programming with [[object capability (ocap)]] style]] on [[The Agoric Blockchain]]
    - How to expose blockchain-level parameters while maintaining an object-capability interface?
    - examples of parameters
        - batching
        - gas price
        - gas limit
    - object-capability interface
        - one object, one capability.
    - Some ideas
        - A "transaction block"
            - ```javascript
// Special function atomicBlock will fire these as a batch
atomicBlock([capA, capB], async (capA, capB)=> {
  return Promise.all([
    capA.sendTo(capB, 10),
    capB.sendTo(capA, 20),
  ])
}, extraOpts)```
                - `dispatch.deliver`
                    - would be what each of these are.
                - `dispatch.notify`
                    - would be avoided by this
                    - only used for responses to outbound promises (like to other chains)
    - Today, [[The Agoric Blockchain]] message failure results in [[vat]] suicide instead of just crank suicide, because messages can be processed in an unintended order.
        - Contracts (receivers) mostly pay for their own computation
        - Senders pay for the first x milliseconds of a message's computation.
        - This means contract authors need to ensure they validate incoming messages very quickly when they arrive. The top of every promise handling function.
    - Questions
        - {{[[TODO]]}} What replay-protection is [[The Agoric Blockchain]] using today? 
    - [[combination auction]]
    - [[magic wormhole]]

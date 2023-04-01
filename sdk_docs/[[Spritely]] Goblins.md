- An [[object capability (ocap)]] framework written in [[Scheme]]
- Syntax
    - Invocation
        - `(<- ..)` for an async send
        - `($ ...)` for synchronous send
            - ie `($ my-actor "foo")`
    - Create actors `(spawn ...)`
    - Designate next behavior `(bcom ...)`
        - "become" a new thing... 
        - If we had a counter function that returns a value AND increments a value, 
- [[Jonathan A Rees]] inspired some amount of this with his writing on [[lambda calculus]]
- Talks
    - [Spritely Goblins Comes to Guile](https://fosdem.org/2022/schedule/event/spritelygoblins/)
- Defined in https://srfi.schemers.org/srfi-119/srfi-119.html
- https://www.draketo.de/software/wisp
- [[Lisp]]
- Questions
    - Answered
        - What's the curly brace syntax about? Seems to use non-lisp operator ordering, ie `{1 + 2}`.
            - > Wisp treats braces "{}" the same as parentheses "()" and square brackets "[]", so you can use it with curly infix ([SRFI-105](http://srfi.schemers.org/srfi-105/srfi-105.html)) to get more customary math expressions. In Guile Scheme with Wisp, curly infix is activated by default - as shown in the [Fibonacci](https://hg.sr.ht/~arnebab/wisp#fibonacci) example.
        - What's with the hash-prefixed lines? I can't think of named parameters in normal lisp, so why do these seem to be parameter names?
            - keywords (eg, #:happy? below) are implicitly considered to be continuing
arguments in the previous expression:
                - ```javascript
render-to-file
  . "cool-cat.png"
  make-cat-drawing
    #:happy? #t
    #:size 100```
                - ```commonlisp
(draw-to-file
     "cool-cat.png"
     (make-cat-drawing
       #:happy? #t
       #:size 100))```

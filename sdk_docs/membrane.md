- A barrier through which digital object resources are passed, giving one environment access to a resource from another, in a form that may be [attenuated]([[attenuation]]).
- Rich explanation from [[es-membrane]] docs
    - # Additional reading
        - [Tom van Cutsem's original article, "Membranes in JavaScript"](https://tvcutsem.github.io/js-membranes)
        - [A StackOverflow question on why we might want a Membrane](http://stackoverflow.com/questions/36368363/what-would-be-a-use-case-for-identity-preserving-membrane-proxies/)
        - [What is a Membrane?](http://blog.ezyang.com/2013/03/what-is-a-membran/)
        - [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) and [ProxyHandler](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) documentation on developer.mozilla.org
        - The ECMAScript specifications, [6th Edition, aka "2015 Edition"](http://www.ecma-international.org/ecma-262/6.0/) and [7th Edition, aka "2016 Edition"](http://www.ecma-international.org/ecma-262/7.0/)
    - # Glossary of terms
        - __Object Graph__: A collection of objects (and proxies to 
objects) which relate to one another and are for direct access from a 
single JavaScript scope.  The term comes from [graph theory](https://medium.com/basecs/a-gentle-introduction-to-graph-theory-77969829ead8).
  In the context of membranes, each unique object within an object graph
 has a one-to-one relationship with a proxy to that object in a 
completely separate object graph.  Most importantly, the references from
 an object to its child properties are copied in the proxy, but refer to
 equivalent properties in the proxy's object graph, not the original 
object's graph.
        - [[membrane]]: A collection of object graphs, and the rules for managing and creating proxies within them.
        - "Wet", "Dry", "Damp", "Steamy":  These are names we use for 
convenience to refer to object graphs within a sample membrane (or a 
test membrane).  Otherwise, they have exactly the same meaning as "foo" 
or "bar" in computer programming.  "Wet" and "dry" come from the 
original concept of a biological cell's membrane:  "wet" refers to 
anything inside the membrane, "dry" refers to anything outside the 
membrane, and never shall the two meet.  "Damp" and "steamy" are just 
two other object graph names, because we can have more than two object 
graphs in a Membrane.
        - __ObjectGraphHandler__:  This is a special [ProxyHandler](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler)
 implementation which forms the base for all membrane proxies.  It is 
what really enforces the rules, and correct behavior, for membrane 
proxies.
        - __ChainHandler__: This is an object which inherits from a ObjectGraphHandler, for the purpose of overriding proxy traps.
        - __Wrapped__ versus __unwrapped__:  An unwrapped object is the raw object.  A wrapped object is a membrane proxy to the unwrapped object.
        - __Wrapping and counter-wrapping__:  Wrapping refers to creating a proxy for an object and adding the proxy to a different object graph.  __Counter-wrapping__
 happens with function arguments and "this" arguments, where the proxy 
to a function is invoked as a function itself.  In this case, each 
argument must be either unwrapped (if it belongs to the same object 
graph as the target function) or wrapped in a proxy (if it belongs to a 
different object graph) before the ObjectGraphHandler passes it into the
 function's object graph.  This latter process I call 
"counter-wrapping", to indicate it is going from the foreign object 
graph back to the function's object graph.  Otherwise, it is the same.
        - __Shadow target__:  Every Proxy instance in ECMAScript requires
 a shadow target to form the base for the proxy.  In es-membrane, this 
means the shadow target usually functions as a copy of the original 
object, with cached properties defined only as necessary.  Shadow 
targets must be of the same primordial type as the object we're 
reflecting:  to call a proxy as if it were a function, the proxy's 
shadow target must be a function.  To make a proxy look like an array, 
the shadow target must be an array, and so on.
        - [[distortion]]:  A Membrane's proxies must always parallel the 
properties of the objects they mirror... unless there are explicit rules
 defined on the proxy where they don't.  These rules I call 
"distortions", because they distort the image of the underlying object 
through the proxy.  One example would be hiding properties of the 
underlying object.
        - __ProxyMapping__: This is a convenience object which stores the
 one-to-one relationship between an unwrapped object and its matching 
wrapped proxies.  It is through a ProxyMapping instance that we may have
 more than two object graphs.  The ProxyMapping also stores the 
distortions defined for each membrane proxy.
        - __ChainHandler__: This is a ProxyHandler which inherits, 
directly or indirectly, from an ObjectGraphHandler.  The 
ObjectGraphHandler specifies default proxy traps.  The ChainHandler 
allows us to override those traps as necessary, and provides frozen 
references to the parent ChainHandler (if there is one) and to the base 
ObjectGraphHandler it derives from.
        - __ProxyListener__: This is a special object which reacts to the
 creation of a Membrane proxy before it is returned to the caller that 
demanded the proxy.  It is the one and only chance to customize the 
proxy's distortions, including recreating it or throwing a deliberate 
exception, before the requesting object graph receives its proxy.
        - [[primordial]]:  This basically means globals provided by the 
ECMAScript engine, and their properties:  Object, Array, Function, 
String, Date, etc.
- Types
    - [[async [[membrane]]]]
    - [[near [[membrane]]]]
    - [[[[JavaScript]] [[membrane]]]]
- Implementations
    - [[JavaScript]]: [[es-membrane]]
- [An excellent introduction](http://blog.ezyang.com/2013/03/what-is-a-membran/)
- History
    -  Originated in [[KeyKOS]] in its [[KeySAFE]] system.
        - https://twitter.com/marksammiller/status/1354577956253753344?s=20
    - Then represented in [[Towards a Unified Approach to Access and Concurrency Control]]

-  [a proposal](https://gist.github.com/littledan/20e15111b98f384644ba1fdd7d035c95) by [[Daniel Ehrenberg]]
- So far, Objects in JavaScript all "have identity". This means:
    - Comparison with === and Object.is is based on the "identity", not the contents
    - If you make another object with exactly the same contents, it "has a different identity"
    - Objects might have mutable properties, might be unsealed, might have
 mutations to private fields or internal slots--these mutations only 
apply to one particular identity of object, not to other objects with 
the same contents
    - New private fields can be added to Objects through the return override trick
    - Objects can be used as keys in WeakMaps and entries in WeakSets, targets of WeakRefs and registered in FinalizationRegistries
- Deep freezing of objects doesn't quite get "all the way there": Even 
if you ensure that these objects don't have internal slots or private 
fields, it is still possible to associate mutable data to their 
identity, through various mechanisms mentioned above.
- In this gist, we consider an alternative semantics for Records and 
Tuples: Here, Records and Tuples are objects which do not have identity.
 This means:
    - Records and Tuples are not primitives with wrappers, but instead are objects directly.
    - Comparison is by their contents, not through their identity. There is no way to observe their identity.
    - Records and Tuples are always frozen and never have internal slots or private fields that change over time.
    - It is not possible to add private fields to Records or Tuples.
    - Records and Tuples cannot be used as keys in WeakMaps and entries in
 WeakSets, or as targets of WeakRefs or be registered in 
FinalizationRegistries.
- We've been discussing making Records and Tuples primitives to explain
 these properties, but this gist makes the case that they should instead
 be considered __objects without identity__. This document talks about the implications of this change.
- ## [](https://gist.github.com/littledan/20e15111b98f384644ba1fdd7d035c95#definition-of-equality)
- ## Definition of equality
- Equality of Records and Tuples as objects without identity would be identical to the definition proposed for them as primitives:
    - Object.is checks if scalars are identical, or applying the Object.is operation recursively on Records and Tuples.
    - SameValueZero, === and == are defined as equating -0 and 0,
 any other scalars as distinct from each other but equal to themselves, 
and on Records and Tuples, applying the SameValueZero operation 
recursively.
- There is no way to observe the identity of Records and Tuples, even if we consider them objects.
- ## [](https://gist.github.com/littledan/20e15111b98f384644ba1fdd7d035c95#no-wrappers)
- ## No wrappers
- The main observable difference with this change is that Records and 
Tuples have no wrappers: they already are objects, and can be used for 
property access directly. This change has the following advantages:
    - Many details for wrappers are already worked out, e.g., the objects 
are frozen, and there is no need to make a separate decision about 
wrappers.
    - Wrappers would have identity, unlike Records and Tuples, so their 
definition of equality is visibly "broken", violating developer 
expectations if they ever unfortunately deal with one.
    - Engines would have to optimize out the creation of wrappers, and 
attention to detail has to be paid in the design of everything to avoid 
wrapper creation. At the same time, the semantics of the language would 
have to be specified to make it so that, if you __do__ have a wrapper, then it behaves reasonably to use it. Eliminating wrappers is a big simplification.
- Many JavaScript specification algorithms are simplified if they don't
 have to add a case for these new types, since Records and Tuples are 
objects.
- ## [](https://gist.github.com/littledan/20e15111b98f384644ba1fdd7d035c95#record-proxies)
- ## Record Proxies
- It would be completely sensible to make a version of Proxy which does
 not have identity. We could call these "Record Proxies". The API could 
be something like:
- Proxy.record(target, handler)
- which would create a Proxy without identity, where equality is based on respective equality of the target and handler. So, Proxy.record(t, h) === Proxy.record(t1, h1) iff t === t1 && h === h1.
- Record Proxies would immediately be useful for membrane systems: they
 eliminate the need for a WeakMap to intern the wrapped objects, since a
 new Record Proxy can simply be created each time an object passes over 
the membrane.
- For Records and Tuples, a Record Proxy would allow something which 
has the equality semantics of Records and Tuples but has some other 
behavior on object operations. For example, membranes over Records and 
Tuples should "just work". Further, Record Proxies would give a great 
deal of additional expressive power, especially combined with the Box 
feature.
- ## [](https://gist.github.com/littledan/20e15111b98f384644ba1fdd7d035c95#box)
- ## Box
- Records and Tuples still present the strong opinion towards deeply 
immutable data structures: it is a TypeError to include a Record or 
Tuple entry which has identity. However, given the ability to put a 
membrane around a Record or Tuple, this is no longer a hard requirement,
 and instead just a recommendation. The Box type presents an escape hatch.
- Box is a built-in class without identity, with a simple API: new Box(value).deref() ==> value.
- When a Box is used as an entry of a Record or Tuple, it is 
automatically dereferenced "on the way in", so further accesses do not 
require additional deref() calls.  (Note, this is a possible decision point where we could go the other way, and still require .deref()
 calls; more research needs to be done on this ergonomics vs correctness
 tradeoff to understand what would avoid bugs in practice.)
- The combination of Record Proxies and Box could be used to build a 
by-value bound function construct without the need to intern them in a 
WeakMap.
- ## [](https://gist.github.com/littledan/20e15111b98f384644ba1fdd7d035c95#record-classes)
- ## Record classes
- __Note: This section isn't as well-thought-through as the above sections.__
- Given the existence of Proxy.record and Box, instances of record classes can simply have prototypes, and even Record literals can support __proto__ in a way that "just works".
- let x = #{ a: 1, __proto__: Box({ b: 2 }) }x.b  // 2
- Records with prototypes can be declared more easily with the syntax record class.
 Record classes are always base classes, and don't use constructors, as 
subclassing and constructors are based on incremental mutation, which 
doesn't work for always-immutable Records. Instead, a new construct new.instance can make an instance of the immediately lexically enclosing class based on a following Record literal.
- record class C {
  x;
  y;
  static make(x, y) { return new.instance #{ x, y }; }`
}
- This construct can be used in conjunction with private fields and methods, where private fields are declared as described in [this gist](https://gist.github.com/littledan/5451d6426a8ed65c0f3c2822c51314d1), and private methods are added by new.initialize:
- record class C {
  private #x;
  private #y;
  static make(x, y) { return { with #x: x, with #y: y }; }
  #manhattanDistance() { return this.#x + this.#y; }
  abs() { return this.#manhattanDistance(); }}new C(1, 2).abs();  // 3new C(1, 2) === new C(1, 2)  // true

- https://en.wikipedia.org/wiki/Capability-based_security
    - > A **capability** (known in some systems as a **key**) is a communicable, unforgeable [token](https://en.wikipedia.org/wiki/Access_token) of authority. It refers to a value that [references](https://en.wikipedia.org/wiki/Reference_%28computer_science%29) an [object](https://en.wikipedia.org/wiki/Object_%28computer_science%29) along with an associated set of [access rights](https://en.wikipedia.org/wiki/Access_control). A [user](https://en.wikipedia.org/wiki/User_%28computing%29) [program](https://en.wikipedia.org/wiki/Computer_program) on a [capability-based operating system](https://en.wikipedia.org/wiki/Capability-based_operating_system)
 must use a capability to access an object. Capability-based security 
refers to the principle of designing user programs such that they 
directly share capabilities with each other according to the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege),
 and to the operating system infrastructure necessary to make such 
transactions efficient and secure. Capability-based security is to be 
contrasted with an approach that uses [traditional UNIX permissions](https://en.wikipedia.org/wiki/Unix_permissions) and [Access Control Lists](https://en.wikipedia.org/wiki/Access_Control_Lists).
- Compared to [[object capability (ocap)]] security
    - Can be built on to become [[object capability (ocap)]] security if the capabilities themselves are represented as objects within a [[lexical scope]]d language, ensuring the key management is as easy as the host language's own syntax.
    - programmer ergonomics
        - Provides most of the same security benefits, except with the programmer ergonomics.
        - Programmer ergonomics are largely an extra layer of security and convenience: The easier it is to use the capability system correctly, the less likely it is to be used incorrectly. Not to mention the benefits of a more pleasurable programming experience.

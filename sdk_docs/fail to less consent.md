- A safety property of some [[Secure UI]] that is lighter-handed than [[security pattern]] and [[line of death]] but still provides well defined guarantees.
- Allows customization of its UI, but in such a way that parent-container UI can always be safely rendered on top of the less-trusted UI.
- Resembles how [[iframes]] work.
- This means that for child elements, 
    - Impersonating UI is possible
        - This UI can make the user think they are consenting to something they are not actually consenting to (because the child system lacks the permissions it claims to be exercising)
        - A given child component can **not** get the user to perform an action that they do not consent to. (no [[clickjacking]])
        - This combination is important, it deserves a name. Maybe something like [[fail to less consent]]
- May not be compatible with [[trusted-in-untrusted [[Secure UI]]]]
    - Because in that paradigm, a child component may have capabilities that the parent does __not__ have, and so the parent needs to be unable to render any interface over child interface ([[clickjacking]]).
        - Possible mitigation: Do not allow invisible control elements.
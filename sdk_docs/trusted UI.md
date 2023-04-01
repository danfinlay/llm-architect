- User interface elements that can render in a way that they can appear over all other things in a way that they cannot be invisibly blocked by the thing that they are approving.
- Problem: [[line of death]] degrades each level down.
    - If the only way to display [[untrusted UI]] is to show a header above it, then each extended component will always have a header above its own prompts, and so each "layer deeper" of extension becomes worse and worse for the user.
    - Solution: Allow the child layer to render anything it wants, even filling the screen.
        - Properties
            - Impersonating UI is possible
                - This UI can make the user think they are consenting to something they are not actually consenting to (because the child system lacks the permissions it claims to be exercising)
                - A given child component can **not** get the user to perform an action that they do not consent to. (no [[clickjacking]])
                - This combination is important, it deserves a name. Maybe something like [[fail to less consent]]
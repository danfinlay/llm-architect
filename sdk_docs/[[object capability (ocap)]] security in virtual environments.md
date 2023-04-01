- [Full text](https://www.uni-weimar.de/fileadmin/user/fak/medien/professuren/Virtual_Reality/documents/publications/capsec_vr2008_preprint.pdf)
- Notes
    - Teacher & student avatars in class
        - Can all message each other
            - Ask questions
            - Submit assignments
        - Can view each others' profiles
        - The teacher can silence students
            - How to implement?
                - Bad: The teacher has to keep track of a mute table for each kid
                - Good
                    - Anyone can go `studentAvatar.adminInterface()`, which returns a `<sealed 'for teachers only'>` [[sealers and unsealers]]
                    - So every user has an object that returns an object that can only be unsealed by the teacher.
- [On Wikipedia](https://en.wikipedia.org/wiki/Google_Fuchsia)
    - **Fuchsia** is an [open-source](https://en.wikipedia.org/wiki/Open-source_software) [capability-based](https://en.wikipedia.org/wiki/Capability-based_security) [operating system](https://en.wikipedia.org/wiki/Operating_system) developed by [Google](https://en.wikipedia.org/wiki/Google). It first became known to the public when the project appeared on a self hosted form of [git](https://en.wikipedia.org/wiki/Git) in August 2016 without any official announcement. The name means "Pink + Purple = Fuchsia (a new Operating System)",[[2]](https://en.wikipedia.org/wiki/Google_Fuchsia#cite_note-2) which is a reference to [Pink](https://en.wikipedia.org/wiki/Apple_Pink) ([Apple's](https://en.wikipedia.org/wiki/Apple_Inc.) first effort at an [object-oriented](https://en.wikipedia.org/wiki/Object-oriented_operating_system), [microkernel](https://en.wikipedia.org/wiki/Microkernel)-based operating system) and [Purple](https://en.wikipedia.org/wiki/List_of_Apple_codenames#iPhone) (the original [iPhone](https://en.wikipedia.org/wiki/IPhone)'s codename).[[3]](https://en.wikipedia.org/wiki/Google_Fuchsia#cite_note-Mysterious_Fuchsia-3) In contrast to prior Google-developed operating systems such as [Chrome OS](https://en.wikipedia.org/wiki/Chrome_OS) and [Android](https://en.wikipedia.org/wiki/Android_%28operating_system%29), which are based on the [Linux kernel](https://en.wikipedia.org/wiki/Linux_kernel),
 Fuchsia is based on a new kernel called Zircon. After years of 
development, Fuchsia was officially released to the public on the 
first-generation [Google Nest Hub](https://en.wikipedia.org/wiki/Google_Nest_Hub), replacing its original Cast OS.
    - ### Kernel
        - Fuchsia is based on a new messaging-passing kernel called Zircon, named after [the mineral](https://en.wikipedia.org/wiki/Zircon). The project describes it as both a [microkernel](https://en.wikipedia.org/wiki/Microkernel) and not a microkernel in different parts of its documentation.[[25]](https://en.wikipedia.org/wiki/Google_Fuchsia#cite_note-25)[[26]](https://en.wikipedia.org/wiki/Google_Fuchsia#cite_note-26)
 Zircon's code base was derived from that of Little Kernel (LK), a 
real-time kernel for embedded devices, aimed for low resource 
consumption, to be used on a wide variety of devices.[[27]](https://en.wikipedia.org/wiki/Google_Fuchsia#cite_note-27) Little Kernel was developed by Travis Geiselbrecht, who had also coauthored the NewOS kernel used by [Haiku](https://en.wikipedia.org/wiki/Haiku_%28operating_system%29).
        - Zircon is written mostly in [C++](https://en.wikipedia.org/wiki/C%2B%2B), with some parts in [assembly language](https://en.wikipedia.org/wiki/Assembly_language).
 It is composed of a kernel with a small set of user services, drivers, 
and libraries which are all necessary for the system to boot, 
communicate with the hardware, and load the user processes.[[28]](https://en.wikipedia.org/wiki/Google_Fuchsia#cite_note-An_Early-28)
 Its present features include handling threads, virtual memory, 
processes intercommunication, and waiting for changes in the state of 
objects.[[29]](https://en.wikipedia.org/wiki/Google_Fuchsia#cite_note-:0-29)
        - It is heavily inspired by [Unix](https://en.wikipedia.org/wiki/Unix) kernels, but differs greatly. For example, it does not support [Unix-like](https://en.wikipedia.org/wiki/Unix-like) signals but incorporates [event-driven programming](https://en.wikipedia.org/wiki/Event-driven_programming) and the observer pattern. Most system calls don't block the main thread. Resources are represented as [objects](https://en.wikipedia.org/wiki/Object_%28computer_science%29) rather than files, unlike traditional Unix systems.
- Principles
    - [Security](https://fuchsia.dev/fuchsia-src/concepts/principles/secure) ([[principle of least authority (POLA)]])
- Built on the [[Zircon Kernel]]
- [Google plans to](https://hub.packtpub.com/google-is-planning-to-bring-node-js-support-to-fuchsia/) bring [[Node.js]] support to [[Fuchsia OS]]
- Questions
    - Is this a true [[object capability (ocap)]] operating system?

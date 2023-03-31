- The kernel for [[Fuchsia OS]]
- Based on a fork of [[Little Kernel (LK)]]
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

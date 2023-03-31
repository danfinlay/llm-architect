- [Full Text](https://eighty-twenty.org/2016/10/18/actors-hopl)
    - ## Introduction
        - Today I’m going to talk about the actor model. I’ll first put the
model in context, and then show three different styles of actor
language, including two that aim to be realistic programming systems.
        - I’m going to draw on a few papers:
        - I’ve put an annotated bibliography at the end of this file.
    - ## Actors in context: Approaches to concurrent programming
        - One way of classifying approaches is along a spectrum of private vs.
shared state.
        - Pure functional “data parallelism” doesn’t fit on this chart - it
lacks shared mutable state entirely.
    - ## The actor model
        - The actor model, then is
        - In the model, each actor performs “turns” one after the other: a turn
is taking a waiting message, interpreting it, and deciding on both a
state update for the actor and a collection of actions to take in
response, perhaps sending messages or creating new actors.
        - A turn is a sequential, atomic block of computation that happens in
response to an incoming message.
        - What the actor model buys you:
        - It’s worth remarking that actor-like concepts have sprung up several
times independently. Hewitt and many others invented and developed
actors in the 1970s, but there are two occasions where actors seem to
have been independently reinvented, as far as I know.
        - One is work on a capability-based operating system, KeyKOS, in the
1980s which involved a design very much like Hewitt’s actors, feeding
into research which led ultimately to the language E.
        - The other is work on highly fault-tolerant designs for telephone
switches, also in the 1980s, which culminated in the language Erlang.
        - Both languages are clearly actor languages, and in both cases,
apparently the people involved were unaware of Hewitt’s actor model at
the time.
    - ## Terminology
        - There are two kinds of things in the actor model: __messages__, which
are data sent across some medium of communication, and __actors__, which
are stateful entities that can only affect each other by sending
messages back and forth.
        - Messages are completely immutable data, passed by copy, which may
contain references to other actors.
        - Each actor has
        - Together, the private state and the interface make up the actor’s
__behaviour__, a key term in the actor literature.
        - In addition, each actor has
        - Within this framework, there has been quite a bit of variety in how
the model appears as a concrete programming language.
        - De Koster et al. classify actor languages into
        - We see instances of the actor model all around us. The internet’s IP
network is one example: hosts are the actors, and datagrams the
messages. The web can be seen as another: a URL denotes an actor, and
an HTTP request a message. Seen in a certain light, even Unix
processes are actor-like (when they’re single threaded, if they only
use fds and not shm). It can be used as a structuring principle for a
system architecture even in languages like C or C++ that have no hope
of enforcing any of the invariants of the model.
    - ## Rest of the talk
        - For the rest of the talk, I’m going to cover the classic actor model
using Agha’s presentations as a guide; then I’ll compare it to E, a
communicating event-loop actor language, and to Erlang, a process
actor language.
    - ## Classic Actor Model
        - The original 1973 actor paper by Hewitt, Bishop and Steiger in the
International Joint Conference on Artificial Intelligence, is
incredibly far out!
        - It’s a position paper that lays out a broad and colourful research
vision. It’s packed with amazing ideas.
        - The heart of it is that Actors are proposed as a universal programming
language formalism ideally suited to building artificial intelligence.
        - The goal really was A.I., and actors and programming languages were a
means to that end.
        - It makes these claims that actors bring great benefits in a huge range
of areas:
        - (It’s amazingly “full-stack”: computer architecture!?)
        - In each of these areas, you can see what they were going for. In some,
actors have definitely been useful; in others, the results have been
much more modest.
        - In the mid-to-late 70s, Hewitt and his students Irene Greif, Henry
Baker, and Will Clinger developed a lot of the basic theory of the
actor model, inspired originally by SIMULA and Smalltalk-71. Irene
Greif developed the first operational semantics for it as her
dissertation work and Will Clinger developed a denotational semantics
for actors.
        - In the late 70s through the 80s and beyond, Gul Agha made huge
contributions to the actor theory. His dissertation was published as a
book on actors in 1986 and has been very influential. He separated the
actor model from its A.I. roots and started treating it as a more
general programming model. In particular, in his 1990 Comm. ACM paper,
he describes it as a foundation for CONCURRENT OBJECT-ORIENTED
PROGRAMMING.
        - Agha’s formulation is based around the three core operations of the
classic actor model:
        - The classic actor model is a UNIFORM ACTOR MODEL, that is, everything
is an actor. Compare to uniform object models, where everything is an
object. By the mid-90s, that very strict uniformity had fallen out of
favour and people often worked with __two-layer__ languages, where you
might have a functional core language, or an object-oriented core
language, or an imperative core language with the actor model part
being added in to the base language.
        - I’m going to give a simplified, somewhat informal semantics based on
his 1997 work with Mason, Smith and Talcott. I’m going to drop a lot
of details that aren’t relevant here so this really will be
simplified.
        - and we imagine convenience syntax
        - We forbid programs from containing literal process IDs.
        - Configurations are a pair of a set of actors and a multiset of
messages:
        - The normal lambda-calculus-like reductions apply, like beta:
        - Plus some new interesting ones that are actor specific:
        - Whole programs e are started with
        - where a is an arbitrary label.
        - Here’s an example - a mutable cell.
        - Notice that when it gets a get message, it first performs a become
in order to quickly return to ready state to handle more messages.
The remainder of the code then runs alongside the ready actor. Actions
after a become can’t directly affect the state of the actor anymore,
so even though we have what looks like multiple concurrent executions
of the actor, there’s no sharing, and so access to the state is still
serialized, as needed for the isolated turn principle.
        - (You could consider adding a garbage collection rule like
        - to discard the final value at the end of an activation.)
        - Because at this level all the continuations are explicit, you can
encode patterns other than sequential control flow, such as fork-join.
        - For example, to start two long-running computations in parallel, and
collect the answers in either order, multiplying them and sending the
result to some actor k’, you could write
        - Practically speaking, both Hewitt’s original actor language, PLASMA,
and the language Agha uses for his examples in the 1990 paper,
Rosette, have special syntax for ordinary RPC so the programmer
needn’t manipulate continuations themselves.
        - So that covers the classic actor model. Create, send and become.
Explicit use of actor addresses, and lots and lots of temporary actors
for inter-actor RPC continuations.
        - Before I move on to Erlang: remember right at the beginning I told you
the actor model was
        - ?
        - The isolated turn principle requires __liveness__ - you’re not allowed
to block indefinitely while responding to a message!
        - But here, we can:
        - Compare this with
        - These are both degenerate cases, but in different ways: the first
becomes inert very quickly and the actor d is never returned to an
idle/ready state, while the second spins uselessly forever.
        - Other errors we could make would be to fail to send an expected reply
to a continuation.
        - One thing the semantics here rules out is interaction with other
actors before doing a become; there’s no way to have a waiting
continuation perform the become, because by that time you’re in a
different actor. In this way, it sticks to the very letter of the
Isolated Turn Principle, by forbidding “blocking”, but there are other
kinds of things that can go wrong to destroy progress.
        - Even if we require our behaviour functions to be total, we can still
get __global__ nontermination.
        - So saying that we “don’t have deadlock” with the actor model is very
much oversimplified, even at the level of simple formal models, let
alone when it comes to realistic programming systems.
        - In practice, programmers often need “blocking” calls out to other
actors before making a state update; with the classic actor model,
this can be done, but it is done with a complicated encoding.
    - ## Erlang: Actors for fault-tolerant systems
        - Erlang is an example of what De Koster et al. call a Process-based
actor language.
        - It has its origins in telephony, where it has been used to build
telephone switches with fabled “nine nines” of uptime. The research
process that led to Erlang concentrated on high-availability,
fault-tolerant software. The reasoning that led to such an actor-like
system was, in a nutshell:
        - Erlang is a two-level system, with a functional language core equipped
with imperative actions for asynchronous message send and spawning new
processes, like Agha’s system.
        - The difference is that it lacks become, and instead has a construct
called receive.
        - Erlang actors, called processes, are ultra lightweight threads that
run sequentially from beginning to end as little functional programs.
As it runs, no explicit temporary continuation actors are created: any
time it uses receive, it simply blocks until a matching message
appears.
        - After some initialization steps, these programs typically enter a
message loop. For example, here’s a mutable cell:
        - A client program might be
        - Instead of using become, the program performs a tail call which
returns to the receive statement as the last thing it does.
        - Because receive is a statement like any other, Erlang processes can
use it to enter substates:
        - While the process is blocked on the inner receive, it only processes
messages matching the patterns in that inner receive, and it isn’t
until it does the tail call back to mainloop that it starts waiting
for req messages again. In the meantime, non-matched messages queue
up waiting to be received later.
        - This is called “selective receive” and it is difficult to reason
about. It doesn’t __quite__ violate the letter of the Isolated Turn
Principle, but it comes close. (become can be used in a similar
way.)
        - The goal underlying “selective receive”, namely changing the set of
messages one responds to and temporarily ignoring others, is important
for the way people think about actor systems, and a lot of research
has been done on different ways of selectively enabling message
handlers. See Agha’s 1990 paper for pointers toward this research.
        - One unique feature that Erlang brings to the table is crash
signalling. The jargon is “links” and “monitors”. Processes can ask
the system to make sure to send them a message if a monitored process
exits. That way, they can perform RPC by
        - This general idea of being able to monitor the status of some other
process was one of the seeds of my own research and my language
Syndicate.
        - So while the classic actor model had create/send/become as primitives,
Erlang has spawn/send/receive, and actors are processes rather than
event-handler functions. The programmer still manipulates references
to actors/processes directly, but there are far fewer explicit
temporary actors created compared to the “classic model”; the ordinary
continuations of Erlang’s functional fragment take on those duties.
    - ## E: actors for secure cooperation
        - The last language I want to show you, E, is an example of what De
Koster et al. call a Communicating Event-Loop language.
        - E looks and feels much more like a traditional object-oriented
language to the programmer than either of the variations we’ve seen so
far.
        - The mutable cell in E is interestingly different: It yields __two__
values. One specifically for setting the cell, and one for getting it.
E focuses on security and securability, and encourages the programmer
to hand out objects that have the minimum possible authority needed to
get the job done. Here, we can safely pass around references to
getter without risking unauthorized update of the cell.
        - E uses the term “vat” to describe the concept closest to the
traditional actor. A vat has not only a mailbox, like an actor, but
also a call stack, and a heap of local objects. As we’ll see, E
programmers don’t manipulate references to vats directly. Instead,
they pass around references to objects in a vat’s heap.
        - This is interesting because in the actor model messages are addressed
to a particular actor, but here we’re seemingly handing out references
to something finer grained: to individual objects __within__ an actor or
vat.
        - This is the first sign that E, while it uses the basic
create/send/become-style model at its core, doesn’t expose that model
directly to the programmer. It layers a special E-specific protocol on
top, and only lets the programmer use the features of that upper layer
protocol.
        - There are two kinds of references available: near refs, which
definitely point to objects in the local vat, and far refs, which may
point to objects in a different vat, perhaps on another machine.
        - To go with these two kinds of refs, there are two kinds of method
calls: __immediate__ calls, and __eventual__ calls.
        - receiver.method(arg, …)
        - receiver <- method(arg, …)
        - It is an error to use an immediate call on a ref to an object in a
different vat, because it blocks during the current turn while the
answer is computed. It’s OK to use eventual calls on any ref at all,
though: it causes a message to be queued in the target vat (which
might be our own), and a __promise__ is immediately returned to the
caller.
        - The promise starts off unresolved. Later, when the target vat has
computed and sent a reply, the promise will become resolved. A nifty
trick is that even an unresolved promise is useful: you can __pipeline__
them. For example,
        - would block and perform multiple network round trips in a traditional
simple RPC system; in E, there is a protocol layered on top of raw
message sending that discusses promise creation, resolution and use.
This protocol allows the system to send messages like
        - Crucial here is that the protocol, the language of discourse between
actors, allows the expression of concepts including the notion of a
send to happen at a future time, to a currently-unknown recipient.
        - The protocol and the E vat runtimes work together to make sure that
messages get to where they need to go efficiently, even in the face of
multiple layers of forwarding.
        - Each turn of an E vat involves taking one message off the message
queue, and dispatching it to the local object it denotes. Immediate
calls push stack frames on the stack as usual for object-oriented
programming languages; eventual calls push messages onto the message
queue. Execution continues until the stack is empty again, at which
point the turn concludes and the next turn starts.
        - One interesting problem with using promises to represent cross-vat
interactions is how to do control flow. Say we had
        - By the time we need to make a decision which way to go, the promise r3
may not yet be resolved. E handles this by making it an error to
depend immediately on the value of a promise for control flow;
instead, the programmer uses a when expression to install a handler
for the event of the resolution of the promise:
        - The test of r3 and the call to a() or b() and the update to myvar are
__delayed__ until r3 has resolved to some value.
        - This looks like it violates the Isolated Turn Principle! It seems like
we now have some kind of interleaving. But what’s going on under the
covers is that promise resolution is done with an incoming message,
queued as usual, and when that message’s turn comes round, the when
clause will run.
        - Just like with classic actors and with Erlang, managing these
multiple-stage, stateful interactions in response to some incoming
message is generally difficult to do. It’s a question of finding a
balance between the Isolated Turn Principle, and its commitment to
availability, and encoding the necessary state transitions without
risking inconsistency or deadlock.
        - Turning to failure signalling, E’s vats are not just the units of
concurrency but also the units of partial failure. An uncaught
exception within a vat destroys the whole vat and invalidates all
remote references to objects within it.
        - While in Erlang, processes are directly notified of failures of other
processes as a whole, E can be more fine-grained. In E, the programmer
has a convenient value that represents the outcome of a transaction:
the promise. When a vat fails, or a network problem arises, any
promises depending on the vat or the network link are put into a
special state: they become __broken promises__. Interacting with a
broken promise causes the contained exception to be signalled; in this
way, broken promises propagate failure along causal chains.
        - If we look under the covers, E seems to have a “classic style” model
using create/send/become to manage and communicate between whole vats,
but these operations aren’t exposed to the programmer. The programmer
instead manipulates two-part “far references” which denote a vat along
with an object local to that vat. Local objects are created
frequently, like in regular object-oriented languages, but vats are
created much less frequently; and each vat’s stack takes on duties
performed in “classic” actor models by temporary actors.
    - ## Conclusion
        - I’ve presented three different types of actor language: the classic
actor model, roughly as formulated by Agha et al.; the process actor
model, represented by Erlang; and the communicating event-loop model,
represented by E.
        - The three models take different approaches to reconciling the need to
have structured local data within each actor in addition to the more
coarse-grained structure relating actors to each other.
        - The classic model makes everything an actor, with local data largely
deemphasised; Erlang offers a traditional functional programming model
for handling local data; and E offers a smooth integration between an
imperative local OO model and an asynchronous, promise-based remote OO
model.
    - ## Annotated Bibliography
    - ### Early work on actors
    - ### Actors as Concurrent Object-Oriented Programming
    - ### Erlang: Actors from requirements for fault-tolerance / high-availability
    - ### E: Actors from requirements for secure interaction
    - ### Taxonomy of actors
- Prerequisites
    - The basic syntax of [[formal semantics]]
- Notes
    - The original 1973 actor paper by Hewitt, Bishop and Steiger in the International Joint Conference on Artificial Intelligence, is
incredibly far out!

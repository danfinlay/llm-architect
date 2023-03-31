- Syndicating an old article from zooko.com (which is no longer online)
- Full text ([from the internet archive](https://web.archive.org/web/20060117234832/http://zooko.com/distnames.html))
    - # zooko.com
    - ## Names: Decentralized, Secure, Human-Meaningful: Choose Two
    - version 0.9.9.0, 2003-09-22
    - I greatly appreciate feedback. Whether you found it to be enlightening,
confusing or boring, I want to know. Please send comments to: [<zooko@zooko.com>](https://web.archive.org/web/20060117234832/mailto:zooko@zooko.com).
    - Update:
Tyler Close has written a nice analogy about "naming versus pointing",
and has proposed that secure, non-human-meaningful names be called
"pointers" instead of "names". I think this is an excellent idea, that
obviates a lot of conflict by helping people think of human-meaningful
"naming", and secure "pointing" as separate. Tyler's company, Waterken,
has developed a secure pointing standard named "YURL". Read more about
it at their website: [http://www.waterken.com/dev/YURL/Analogy/](https://web.archive.org/web/20060117234832/http://www.waterken.com/dev/YURL/Analogy/).
    - ## Non-Self-Authenticating Names Cannot Span Trust Boundaries
    - There
are two kinds of name-value pairs: those that are self-authenticating
and those that aren't. A name-value pair is "self-authenticating" if,
given the name-value pair, you can verify on your own that the mapping
from that name to that value is correct. (For example, if the name
comes with a public key and the value comes with a digital signature
made by the corresponding private key, then it is easy to verify
without any other information that the value is a valid value for that
name.)
        - I would say it is easy to verify __that the keyholder is claiming that name__.
    - If your decentralized namespace confines itself to
serving self-authenticating name-value pairs, then you can easily be
free from the risk of deception and the only remaining security issue
is to prevent denial of service attacks.
    - If your decentralized namespace allows non-self-authenticating name-value
pairs, then I doubt that it will be secure. I have not seen any proof
that such a system is even possible in principle, it isn't even clear
what the intended behavior __should__ be, and the best designs that I have seen are complex, limited, and risky.
    - In this essay, I use the word "decentralized" to denote that the system
spans trust boundaries. This means that two peers can use this system
to interoperate with each other, while neither of them is vulnerable to
the other __nor__ is either vulnerable to a third party.
    - ## Self-Authenticating Names Cannot Be Meaningful To Humans
    - Examples of self-authenticating name-value pairs are those where the name is the secure hash of the value ([Freenet](https://web.archive.org/web/20060117234832/http://freenet.sourceforge.net/)'s __CHKs__ and [Mnet](https://web.archive.org/web/20060117234832/http://mnet.sourceforge.net/)'s __mnetids__)
and those where the name includes the id of a public key and the value
includes a digital signature from the corresponding private key
(Freenet's __SSKs__ and [Self-certifying File System](https://web.archive.org/web/20060117234832/http://www.fs.net/sfs/new-york.lcs.mit.edu:85xq6pznt4mgfvj4mb23x6b8adak55ue/pub/sfswww/index.html)'s directory names).
    - Okay, so if we can have a decentralized namespace to securely share
self-authenticating pairs but not non-self-authenticating pairs, then
why don't we just satisfy ourselves with the former? Because they are
not meaningful to humans.
    - Cryptographic values such as hashes and public keys are too long and random-looking for humans to use them as meaningful names.
    -  "Humans are incapable of securely storing high-quality cryptographic keys, and they have unacceptable speed and accuracy when performing cryptographic operations. (They are also large, expensive to maintain, difficult to manage, and they pollute the environment. It is astonishing that these devices continue to be manufactured and deployed. But they are sufficiently pervasive that we must design our protocols around their limitations.)"
    - __             --
Kaufman, Perlman, and Speciner quoted in Anderson's "Security
Engineering"__
    - ## But Your Computer Can Remember Things For You
    - Okay, that's funny, but we __don't__ have to design __every__ namespace to support human-meaningful keys.  For example, I often cut-and-paste URLs from amazon.com.  They look like this:
    - I have never memorized one of these or used one in spoken conversation, and I probably never will.
    - If you are designing a decentralized namespace, think about whether you __have__ to support human-meaningful, non-self-authenticating keys, at the cost of losing the ability to safely span trust boundaries. For some
applications, you do need human-meaningful keys, for others you don't.
    - Further, consider that your human user might have a loyal computer assistant at hand, which can translate self-authenticating names into
human-meaningful names as described in the [Pet Names Markup Language](https://web.archive.org/web/20060117234832/http://www.erights.org/elib/capability/pnml.html)
and as implemented in Self-certifying File System. If so, then you can
have both the safety of self-authenticating keys and the
human-friendliness of traditional names. Indeed, the way that my
desktop software, editor and e-mail software allow me to cut-and-paste
URLs from one application to another is an example of how tools can
free humans from the need to remember names. I didn't need any new
software tools to use the amazon.com URL above as an opaque reference
-- just a web browser and a text editor.
    - ## Two Ways To Design A Namespace That Does Not Span Trust Boundaries
    - The current state of the art, as far as I have seen, tends to fall into one of two traps.
    - ## You Can't Have It All, But You Can Have Some Of It
    - To
summarize, you cannot have a namespace which is all three of: 1.
decentralized (which is the same as saying that the namespace spans
trust boundaries), 2. secure in the sense that an attacker cannot cause
name lookups to return incorrect values that violate some universal
policy of name ownership, and 3. using human-memorizable keys.
    - So what should you do?  There are at least five alternatives:
    - If you
want my advice, I recommend strategy #3 and the optional added feature
of #4. The best example to emulate is probably Self-certifying File
System.
    - Thanks to [Mark Miller](https://web.archive.org/web/20060117234832/http://www.caplet.com/)
for teaching me about the important distinction between
self-authenticating and non-self-authenticating key-value pairs and for
helpful comments on an earlier draft of this article. Thanks to [Aaron Swartz](https://web.archive.org/web/20060117234832/http://www.aaronsw.com/) and others for suggestions.
    - Links mentioned on this page:

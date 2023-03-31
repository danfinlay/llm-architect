- [Interesting thread](https://groups.google.com/g/cap-talk/c/E-z6LBrg0Ow/m/elcw1PqPAAAJ) on [[cap-talk]] forum about [[Secure UI]]
    - full text
        - ### rat...@gmail.com
            - Oct 28, 2020, 8:05:41 PM (yesterday)
            - to cap-talk
            - In [[trusted window system]]s, often applications are not allowed to take up the entire screen, as a portion of the screen is reserved for secure system interaction, in order to avoid allowing arbitrary windows to spoof the system.
            - It has occurred to me that using a backlit RGB addressable keyboard, you could regain potentially fullscreen, by reserving specific backlight colors for secure system interactions, though there are some color perception issues that need to be worked out.
            - Anyhow it seemed plausible to me that it might be a decent solution, but curious what others think.
            - While not exactly a capability question but, [[Genode's nitpicker]], and [[EROS Trusted Window System (EWS)]] trusted window system, both had such mechanisms for secure
            - interaction.
            - ![fra...@pwpconsult.com's profile photo](https://lh3.googleusercontent.com/a/default-user=s40-c)
        - ### fra...@pwpconsult.com
            - Oct 28, 2020, 8:23:30 PM (yesterday)
            - to cap-...@googlegroups.com
            - A tried and true solution is a "Secure Attention" key. Pressing
            - this key assures that you are speaking to the security system.
            - Most popular during logon, to avoid having passwords stolen by
            - Trojan logon screens, it was a part of many peoples logon ritual.
            - The IBM 3277 display terminal had a switch which would
            - disconnect it from the computer and send it back to the logon
            - screen. Many people used this switch as a secure attention.
            - Build a secure attention facility on a modern
            - computer/terminal/smart phone is left as an exercise for the
            - student. :-)
            - Cheers - Bill
            - ---------------------------------------------------------------------------
            - [[Bill Frantz]]      
        - ### eri...@gmail.com
            - ![eri...@gmail.com's profile photo](https://lh3.googleusercontent.com/a-/AOh14GiuN4PlScF6VXxd-j5ER8tTcCdT2QGwDpeyftk6=s40-c)
            - Oct 28, 2020, 8:50:46 PM (yesterday)
            - to cap-talk, Dan Finlay
            - I do not believe that the secure attention key is adequate for *anything*
 other than initial login. And it is only adequate for login if it is 
the only way to log in so users are habituated to doing that no matter 
what they see.
            - Post login, trusted path cues need to be visual and provide context that the user understands tacitly --- without having to first think "I wonder if what I am looking at is what it seems?" I think of [[trusted path]] as integrity of quoting hierarchy:
                - Alice said that Joe said "foo"
                - where "foo" is text chosen by Joe.
            - If
 Joe can choose text such that this message from Alice is misinterpreted
 by the reader as a claim that Alice said something different, then Joe 
has effectively escaped the quote marks Alice tried to contain him in.
            - The main post-login trusted path issue we're all aware of is browser: chrome vs url bar vs content. The quoting relationship is
            -    Browser says that URL says "page contents"
            - where the page contents are chosen by the website at URL
            - If
 the page at the URL can choose page contents such that a user looking 
at those contents thinks he is looking at one of his browser windows, 
then the page can fool the user into thinking that the user's browser is
 saying something that the user's browser itself would never say.
            - The
 most general approach that works in theory follows spatial 
containment, which is exactly what we should expect from the linguistic 
quoting analogy. Full screen violates the spatial containment invariant 
that enables it to work. The keyboard color thing I could imagine 
actually succeeding as a counter to that --- so the user is always 
tacitly aware, without needing to think about it, that the whole screen 
is temporarily occupied by something that isn't outermost, i.e., by 
something other than their desktop. This is worth trying.
            - However,
 even after fixing this problem, I don't believe that spatial 
containment works in practice on large screens. The problem is that 
anytime the user needs to verify context, their eye would have to travel
 back out to the edge and then step by step, though each level of 
quotation, back to the thing they actually want to look at. Instead 
users will just infer from what the region they're looking at seems to 
be. The only effective technique I know of for countering this is 
tartans --- a texture as a shared secret between a quoter (e.g., a 
browser) and the users, where the attacker can't render it, not because 
of quoting limitations but because they don't know the secret texture.
            - I
 expect that this is a very limited signal. That a human in normal 
non-vigilant use mode will be sensitive to at most a very small number 
of these tartans representing distinct quoting relationships.
            - Such
 secure UI questions are I think the next frontier. The gap between what
 we need and what we know how to build, even in theory, is larger here 
than in any other area of computer security. It is also tragically 
neglected.
            - 
--
            - 
You received this message because you are subscribed to the Google Groups "cap-talk" group.
            - 
To unsubscribe from this group and stop receiving emails from it, send an email to [cap-talk+u...@googlegroups.com](https://groups.google.com/).
            - 
To view this discussion on the web visit https://groups.google.com/d/msgid/cap-talk/r480Ps-10146i-6876AB8BC55B43818DCC8A33FA4919ED%40Williams-MacBook-Pro.local.
            - --
            -   Cheers,
            -   --[[Mark Miller]]
        - ![bas...@gmail.com's profile photo](https://lh3.googleusercontent.com/a-/AOh14Gj0WkqKIt2OcEec4IzypoJPVl_bw8VyfTt9zvA74Q=s40-c)
        - ### bas...@gmail.com
        - 5:30 AM (11 hours ago)
        - to cap-...@googlegroups.com
        - On Wed, Oct 28, 2020 at 8:05 PM Matt Rice <[rat...@gmail.com](https://groups.google.com/)> wrote:
        - It has occurred to me that using a backlit RGB addressable keyboard,
        - 
you could regain potentially fullscreen, by reserving specific
        - 
backlight colors for secure system interactions, though there are some
        - 
color perception issues that need to be worked out.
        - Though much maligned, the MacBook Pro's TouchBar could suffice for these purposes as well.
        - In
 particular the current implementation is paired with and driven by the 
Secure Enclave Processor (e.g. the T2 chip, which is effectively a TPM. 
Also the current iteration has an unpatchable security flaw, but)
        - The
 nice thing is they do support biometric access policies for encryption 
keys which also require the user to be logged in as well (or the key 
material won't even be decrypted).
        - --
        - Tony Arcieri
        - ![i...@zenhack.net's profile photo](https://lh3.googleusercontent.com/-SRCwu_u8aaI/AAAAAAAAAAI/AAAAAAAAAAA/ZgvzrA4sarc/s40-c/photo.jpg)
        - ### i...@zenhack.net
        - 7:08 AM (9 hours ago)
        - to Dan Finlay, eri...@gmail.com, cap-talk
        - Quoting Mark S. Miller (2020-10-28 23:50:33)
        - > The only effective technique I know of for countering this is
        - > tartans --- a texture as a shared secret between a quoter� (e.g., a
        - > browser) and the users, where the attacker can't render it, not
        - > because of quoting limitations but because they don't know the secret
        - > texture. I expect that this is a very limited signal. That a human in
        - [408-348-7900](tel:(408)%20348-7900)       | intelligence.  There's a knob called
        - > normal non-vigilant use mode will be sensitive to at most a very small
        - "brightness", but
        - > number of these tartans representing distinct quoting relationships.
        - [www.pwpconsult.com](http://www.pwpconsult.com) | it doesn't work. -- Gallagher
        - I'm skeptical that even this can work in practice: the web is littered
        - with dodgy ads that look like Windows 98 dialog boxes, and non-techies
        - are regularly fooled by these.
    - Reply draft
        - This is a great thread, and an important topic.

Could I get links to "Geonode's Nitpicker"?
- [[MetaMask]] [[phishing]] [[Secure UI]] [impersonation attack blog post](https://medium.com/metamask/new-phishing-strategy-becoming-common-1b1123837168) by [[Dan Finlay]]
- [[Niklas Luhman]] [[Zettelkasten]] https://twitter.com/conaw/status/1129788856851619840?s=21

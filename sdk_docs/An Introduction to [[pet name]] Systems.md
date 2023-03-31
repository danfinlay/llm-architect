- A canonical introduction to [[pet name]] systems by [[Marc Stiegler]]
- http://www.skyhunter.com/marcs/petnames/IntroPetNames.html
- Notes
    - Seem good & we should consider using them.
    - Name types
        - pet names
        - [[alleged name]]
            - Alleged names are similar enough to nicknames to be worth distinguishing. An alleged name is the name for an entity proposed by a third party, typically in an introduction. This can also be useful as a starting place for picking a petname. Alleged names, like nicknames, are usually memorable, often global, and never securely unique. Alleged names are often based on nicknames, though this is unreliable enough, if one really cares about the nickname then one really needs to ask the entity holding the key, not the introducer.
        - nicknames
            - In this article, a nickname refers to a self-[[alleged name]].
            - This seems to counter the colloquial meaning of nicknames, where [it is a taboo to give yourself a nickname.](https://www.quora.com/Is-it-proper-to-give-yourself-a-nickname-or-should-other-people-give-you-one)
        - [[proposed name]]
    - [[zooko's triangle]]
    - Browser bookmarks are not actually petnames because the page still loads its own title
    - Language nits
        - Most people wouldn't call a "key" a name, but it is the example of secure+globally unique.
        - most nicknames aren't self-assigned
    - A little shy on concrete designs
    - Why aren't these adopted?
        - Requires [[trusted-in-untrusted [[Secure UI]]]]
            - Not possible in modern browsers.
        - Somewhat achieved by incoming calls on a phone?
        - In practice Trademark law has upheld ok, but in decentralized systems, there are far more keys, and creating new keys is more trivial than ever, and so this problem is rapidly exacerbated.
    - The example of getting PayPal & cross-referencing Google result seemed unrealistic.
    - Displaying similar pet names when adding.
    - Where could this work in MetaMask?
        - Custom Networks API
            - Names
                - Internal network base currency
                - Network label
            - Enforced unique networks PER URL.
                - {{[[TODO]]}} Should custom network key incorporate chain_id?
            - Dapp proposes a name for the new network.
            - Should user be able to assign a pet name to these?
                - (Probably!)
            - Indicate if this chain_id was in our registry?
                - We can endorse what we can, and then we let users trust what they want, and eventually let users indicate trustworthiness to each other and subscribe to each others' claims.
                - But I wouldn't want to permanently force our "we didn't recommend this" warning on everything we didn't.
            - What about when the chain_id is outside of our registry?
                - Emphasize the proposed-ness of the name?
                - Recommend cross-checking?
                - Learn more link
                    - Talk about the risks they're assuming, how to verify, etc.
                    - If they can't find it on chainid.network , we can't really guarantee they'll be able to recover these funds, it's going to be on them to do research and make an act of [[purposeful trust]].
        - When adding/seeing new tokens
            - Andre points out: I am thinking that if we suggest names for custom tokens based on a user contacts’ petnames, this could be used for a larger scale attack. I am thinking for example when Libra was announced a lot of people were trying to “buy” it even though it was wasn’t even available for purchase. So if a user’s contact added a token and called it Libra then it could spread. So we would have to have some kind of system to prevent this
                - This isn't *just* adding a contact, this is "making yourself vulnerable" to them. The trust act should be added to the friend act.
                - A minimum number of users that vouch for a thing?
            - If we added them to assets, would be extra confusing to have to manage them between devices.
                - At least this would not cause extra trust between devices.
                    - Could cause trust fatigue.
                - This kind of judgement call is extra laborious for users, so we should minimize it as much as possible.
        - NFTs: There are many many of them!
    - More real world examples
        - Natural emergence
            - Keeping a note of addresses.
        - Venmo
            - Initially shows alleged name, then allows you to check their phone number & validate.
        - Signal
            - Used to use a clear differentiation between alleged name and local name. (Tilde prefix)
        - Google Docs
            - You can duplicate & rename a google doc.
        - Twitter
            - People have both a user-name and an alleged-name/display-name.
            - Why not allow labeling your contacts?
            - Easy to see who your contacts follow at least!
        - [[secure scuttlebutt (SSB)]]
            - combines pet names with web of trust to help display trusted things.
        - [[Keybase]]
            - doesn't use pet names, but indicates connection within a graph.
        - [[Discord]]
            - Allows admins of a channel to assign local names to everyone within the channel. Is not a [[pet name]] system, but is still also not a self-assigned name system, so it has some hybrid qualities.
- Annotated Text
    - # An
Introduction to Petname Systems
        - by
Marc Stiegler, Feb 2005, copyright under the MIT X License
        - 
updated June 2010
    - ## Abstract
        - Zooko's Triangle [Zooko] argues
that names cannot be global, secure, and memorable, all at the same
time. Domain names are an example: they are global, and memorable, but
as the rapid rise of phishing demonstrates, they are not secure.
        - Though no single name can have
all three properties, the __petname____system__
does indeed embody all three properties. Informal
experiments with petname-like systems suggest that petnames can be both
intuitive and effective. Experimental implementations already exist for
simple
extensions to existing browsers that could alleviate (possibly
dramatically) the problems with phishing. As phishers gain
sophistication, it seems compelling to experiment with petname systems
as part of the solution.
    - ## Basic Petname Layout
        - Below, we have Zooko's Triangle
overlaid with a petname system:
        - ![Zooko's Triangle with Petname System Overlay](http://www.skyhunter.com/marcs/petnames/zooko-triangle.gif)
        - For the purposes of this document, we actually use an
alternate rendering of the key points of Zooko's Triangle.  The
points
of the triangle are:
            - [[memorable]]: this means
that  a human being has a chance of
remembering the name. Memorable names pass the "[[moving bus test]]": if you see the name on the side of a bus as it drives past you, you should be able to remember the name long enough to use it when you get home.
            - Global: this means the name
is publicly available, and indeed the entity to whom the name is
attached is eager to give it to you. A key goal of marketing and
advertising is to capture memorable names in such a fashion that the
memorable name is globally locked to a particular entity.
            - Securely Unique: This is
means that the name cannot be __forged__
or __mimicked__.
A name can be forged
if one can
manufacture an exact duplicate of the name such that neither man nor
machine can tell the difference. A name can be mimicked
if
one can make a name similar enough to fool the human being. In general,
phishing depends on mimicry, not forgery. This difference becomes
crucial later in the discussion.
        - Each name set consists of three
elements: a __key__
that is global and securely unique (but not necessarily memorable); a __nickname__
that is global and memorable (but not at all unique) , and a __petname__
that is securely unique and memorable (but private, not global):
            - **Keys** lie at the heart of the security properties
of the petname system. Nicknames and petnames exist to make it easy for
human beings to manipulate keys. The security of the system can be no stronger than the unforgeability of the keys. Self-authenticating public/private key pairs make excellent keys since they have strong unforgeability properties. But there are other ways of achieving
unforgeability. A [[trusted path]] can also work well as the key: the full pathname to a file on a specific computer is
also unforgeable (or at least, as unforgeable as the designation of the specific computer, which can be quite strong in some cases). It does not make any difference in a petname system whether a key can be mimicked: keys are handled only by the computer, the human being handles the keys only indirectly via petnames. For a particular person, for a particular application, there is a one-to-one mapping between a key and a petname.
            - **[[nickname]]**
can be used to assist in discovery of
keys, and for help in selecting a petname. Nicknames are chosen by the owners of  keys in hopes of creating a distinctive, if not
unique, mapping from the memorable nickname to the key. Such nicknames often are promulgated throughout the world in
the hopes of making the nickname stick in the mind as a reference to the key. Since there are strong incentives to "take ownership" of a nickname, even though true ownership is not possible, nicknames are the most often misunderstood part of a petname system.
                - In colloquial terms, nicknames are rarely self-assigned.
            - In the simple case, a nickname has a one-to-many mapping to
keys The name John Smith is obviously a nickname: there are many John Smiths. Other nicknames produce the illusion of being globally unique: the name Marc Stiegler
appears to be globally unique at the time of this writing. But there is no security property in this accident of global uniqueness. The
uniqueness of the name Marc Stiegler would change quite quickly if,
through the
mysterious forces of human whimsy, the name suddenly became desirable.
Sometimes the desirability of a nickname is not whimsical, but venal.
It is already desirable for some applications to call
themselves Quicken, for example, and draw windows that request a Quicken password.
            - **Petnames**
are our private bidirectional
references to keys.
There are many Mark Millers, but there is one specific Mark Miller that
the name means to me, the Mark Miller who
works with object-capabilities for secure cooperation. "Mark Miller" is
Mark Miller's nickname; it also happens to be my petname for the same individual. My private pet name for my wife is not recognizably similar to the public nickname used by my wife. In the computer setting, for a specific person with a specific application, petnames are unique, each petname refers to exactly one key, and each key is represented by exactly one petname. In all places in the application where the app wants to designate the key, the petname is displayed -- which is to say, __a true petname is a bidirectional one-to-one mapping to a key__.
All references to the key by the user interface are represented by
petname. A key cannot have two petnames; if a single key had two petnames, under what circumstances would the user interface use petname1 as the
representation of the key, and under what circumstances would it bring
up petname2?
    - ### More Detail, and Interactions
        - A good example of a nickname management system is Google. Type
in a name, and Google will return a list that includes all the entities
Google knows, to which the name refers. Google
makes a mapping between these nicknames and their keys (if we think
of the url of a page as a trusted-path-style key, which will be
discussed later). Often
enough to be interesting, the first item in the list will be the one
you wanted. But it fails often enough, and endless pages of other
choices appear often enough, to never leave us in doubt that these
identifiers are not unique mappings to single keys. As is already true in the
current world, in a world filled with petname
systems, a key goal of marketing would be to get your nickname listed
at the top of the Google rankings for that nickname.
        - A single key may map to multiple nicknames. The entity that comes up
first in a Google search for "Marc Stiegler" is an entity who proposes
the
nickname "marcs" for himself in many forums. However, to assess the
security
properties of a petname system, this is irrelevant.
        - Nicknames are conveniences that may serve as good starting points
for petnames. If I send
you my key and my nickname, often my nickname (which I normally will
have chosen to
be reasonably rare in the world) will work great as your petname. But
do not confuse the nickname-as-proposal with the
petname-as-decided. **Never in a true petname system is
the nickname presented or employed as if it were a petname.**
        - In action, keys and alleged names tend to be transferred together. We refer henceforth to such key/alleged-name pairs as __referrals.__
        - It is crucial not to confuse
private petnames with global nicknames
that temporarily happen to have a unique mapping to a key.
Experience to date suggests that the word "petname" is attractive,
leading people to desire to use it. People can thence easily fall into
the trap of referring to momentarily
unique nicknames as "petnames". This error then leads them inevitably
to draw fatally confused conclusions about the possibility of petnames
with global meaning. The security properties of a petname come from its
privacy. Public nicknames are trivially vulnerable to
both forgery and mimicry; they have no security properties.
        - Petnames are guessable. Most people will accept Paypal's nickname as
the petname. This can only impact the security of the
system if the user interface distinguishes the petnames from the nicknames so poorly that the user gets confused.
        - The term "petname" suggests that this name is embodied as text. This
is not necessary; petnames can be graphical as well. Indeed, some of the
petname systems listed later use petnames that include both __[[pet
texts]]__ and __[[pet graphics]].__
        - Petnames must be repeatably editable by the human being so that the set
of petnames can evolve as the user's set of associations
grow.
You might use the petname "Mark Miller" for the one and only Mark
Miller that you know. But then if you meet another Mark Miller you will
have to distinguish, possibly by editing the first one: the single
entry "Mark Miller" may now split into "Mark Miller Capability Guru"
and "Mark Miller Dentist".
        - Petnames convey power: since the petname is the user representation
of the key, it is through the petname that the human
being uses the key, communicates with the key owner, and conveys authority to the key owner based on the user's __[[purposeful trust]]__
relationship with that owner (__purposeful
trust__ is the type of trust needed to engage in action: I trust (i.e., I am willing to be vulnerable to) Entity X to hold N number of dollars on my behalf, and to engage in transfers of that money based on orders I give).
            - Sure reminds me of [[social collateral]]
        - Another way of thinking about the relationship between a key and a
petname is this. The key is used to authenticate the entity that owns
the key. The petname is used as a handle upon which to hang the
trust/reliance/vulnerability data used by the human being to make
authorization decisions for that entity. If the entity represented by
the petname My Phone Company asks for my credit card, if the
justification sounds reasonable, I will release it. If the entity
represented by the petname Deadbeat Brother (whom I nonetheless trust
to teach my daughter soccer in the afternoon without supervision -- the
trust relationship with such a brother is neither positive nor
negative, it is complex) asks for my credit card, I will not release it
no matter what the justification.____
        - __The security of a petname system depends on the
keys to prevent forgery, and on the petnames to prevent mimicry.__
    - ## Petnames In Action
        - Informal
experimentation suggests that a petname system is
much easier to use than to explain (see examples below). We will create
a single example for this introduction, and give some hint as to the
wide diversity of variations in the Examples. Suppose I send you Mark
Miller's OpenPGP pubkey in email. I say, "here is mark miller's
pubkey."
I sent you both a key  and an alleged
name (mark miller). Implicit in the transmission of the alleged name is the
proposal that you might want to consider "mark miller" as the petname.
What you actually choose as a petname depends entirely on your context.
If you know this particular mark miller in other contexts in other
applications as "markm", you may choose "markm" as the name referring
to this key in your list of pubkeys. If you think this might be
the same mark miller, but are not willing to be vulnerable to me as the
sole source of such powerful mapping, you might use the petname "Marc Stiegler's Mark
Miller" or "Mark Stiegler's markm". If you perform appropriate
incantations on the pubkey, you can get the entity's nickname. If this
pubkey already exists
in your list, your software shouldn't give you the choice of adding it:
the software should tell you that you already have this one, and tell
you the current petname (and perhaps bring up the petname editor so you
can change the petname if the newly-received reference suggests a
better name). If you receive a message signed with the private key for
the markm petname's pubkey, the software should display the
petname markm. If you send a message to mark miller, you should pick the
encryption key based on the petname.
        - The above example has the
security properties of a petname system, but OpenPGP systems often do
not demonstrate the  usability properties a petname system
needs. Instant messaging systems with buddy lists demonstrate the usability
properties, but for reasons beyond the understanding of this author,
discard all the security properties. See the examples section for more
details on buddy lists as petname systems.
    - ## Key Issues with Petname Systems
        - Two elements of full-fledged
petname systems seem to be principle
sources of controversy. One is, how do I get the keys transferred
around the system? The other is, "how easily can Darth Vader mimic a
petname?".
    - ### Transferring
Keys and Purposeful Trust
        - Transferring keys around the universe is easy; for example, plaster the
keys on all the web sites in the world that'll let you do so. The hard
part is transferring a key with an association to purposeful trust. It
is useless to both PayPal and the phisher who wants your Paypal account
if you just know PayPal's key; you have to be willing to make yourself
vulnerable to the entity who owns the key to hold your credit card, trusting him to engage in only transfers that you specify.
        - The question, "how do I transfer a purposeful
trust association?", is hard to
answer because there is no simple single answer. Instead, there are a
vast array of
answers, each of which works in narrow circumstances. The question
is made
even more difficult to answer because the mechanisms by which humans
determine an appropriate purposeful trust to be associated with an
entity
is subtle, complex, powerful, and completely subconscious: the
question of how you transfer the association can easily slide into a
hopeless discussion of how to create purposeful trust in the first
place. Here we outline some general ideas for transferring
key/purposeful-trust
mappings, then in the
Examples point out some practical approaches in specific narrow contexts.
        - Answers often start with direct
physical contact. You get a combination of
a nickname and a key in a file from your best friend, who says, "this
Google thing is a great search engine", or "this Consumer Reports site
will not lead you astray". You stick these referrals in your browser,
assign petnames,
and make yourself vulnerable to them for the purposes stated because
your friend said so.
Then when the side of the bus says PayPal, you might go and see what
Google thinks Paypal means. Since a relationship with PayPal is a
serious vulnerability decision, serious enough so that we're not going
to jump
at the first site just because Google said so, we'll ask a few of our
friends to email referrals to the entities they use for online money.
If the referrals they send all share the same key as the Google
key (which is easy to tell, because trying to add each new key/petname
mapping will
produce the alert that the key matches something you've already got),
the
quality of your willingness to be vulnerable to the key you have
petnamed PayPal improves.
This is pretty similar to how
we all started using PayPal even without the petname system: we jumped
in when enough of our friends and organizations that we trust for
recommendations about financial matters concurred. The only difference
in the petname version of the story is that our friends explicitly gave
us referrals rather than easily mimicked domain names, and we
explicitly set a petname (perhaps by just clicking an Accept key when
the alleged name was proposed as the petname).
        - While a full-fledged, purebred
petname system could in principle
supplant the entire DNS system, we have DNS now, and we can use it to
do some bootstrapping.  My ability to type google.com and
paypal.com is probably adequate to get started.
        - Regardless of how you
bootstrap, you can get referrals by email, thumbdrive, web page, chat, and even by telephone.
    - ### Converting
From Nickname to Petname
        - The other part of the system
that is impossible to quantify is the
mimicability of pet names. Let us assume a poorly built petname system
in the clutches of a clueless user. We have a money transfer site
on the Web that we have petnamed PayPal. We get an email telling us to
update our PayPal account, we click the link, and go to a domain that
has given itself the nickname PayPa1 (for those of you with typically
broken fonts, that last character, "1", is a one). Our poorly
built  hypothetical petname system
is so poorly
built, the nickname is put into the field where the petnames go, with a
hint of  shading or some other easy-to-miss mod to mark the
fact that
this is the web site's nickname for
itself, not our petname for it. The  distinction is missed,
and
our
user is phished.
            - Reminds me of how filmmakers use blurry camera effects to convey a dream sequence.
        - The solutions to this problem
are
application and context specific,
though there are some good ideas floating around that seem to have wide
applicability. In the Waterken Petname Toolbar proposal (see below),
the alleged name is always "untrusted".  It's hard to fail to
recognize
that
this isn't PayPal, though a sufficiently unobservant user might
completely disregard the petname and nickname information and get
phished anyway. There is limited informal evidence that users really do
notice things like this (see below), and so the most cynical of
skeptics are probably mostly wrong though they are probably slightly
right: if you send a million phishing emails to each of a million
users, some day some one will be tired and unobservant and will get
phished. If sending a trillion emails like this is cheap enough,
phishing will remain profitable, so part of the solution needs to be
making a trillion emails ever so slightly expensive. Regardless,
multiple experiments with multiple
user interfaces would be a good idea to help develop user interfaces
that maximize the probability that a tired unobservant user will notice
a warning.
        - There are a couple of user
interface issues. The petnames must be unambiguously distinct from
nicknames. This seems easy to do, through colors, fonts, additional
text, and separate fields for the nickname as examples of pieces of
strategy.
        - More difficult is the following
problem: Petname creation must be
both painless (or people will reject the whole idea) and reliably
mimicry-free (it would be a disaster to have both PayPal and PayPa1 as
petnames!).  Is this one of those hopeless tradeoffs that the
computer security community enjoys throwing in its own face? To the
author, this problem looks solvable; indeed, it seems hard to believe that this
cannot be solved with some reasonable satisfaction, given the number of
user interface ideas for this problem floating around. But implementations and experiments, will be required to identify minimally intrusive, adequately effective solutions.
        - Here are two example ideas for petname creation user interface
that seem generally applicable. First is to compose the default choice for the petname out of a combination of contextual information and nickname information. Suppose we click on a link to "PayPal" in the Consumer Reports site (that is, the site that we have assigned the nickname, "Consumer Reports"). This takes us to a new site that proposes the nickname "PayPal". The system clearly marks that we do not have a petname for this site and proposes "Consumer Reports's PayPal".
The user can press a button to accept this name, edit it, or, with algorithmic chicanery left as an exercise for the reader, press a
second button that says, "let me use the raw nickname PayPal as the
petname." This system still depends on the user remembering the petnames he has already assigned and noticing at the time of creation of the new petname, whether he already has a similar name in his list.
This by itself is probably enough to protect the PayPal pet name -- most of us who gave PayPal a petname would have no trouble remembering we had done so, and if we saw something that looked like "PayPal", we'd notice we were at risk of confusing ourselves if we accepted a similar
name -- but again, we are dealing with humans, so the process is
imperfect. To support the human being, we'd want to use a font that was
as unambiguous as possible during petname creation, mixing up 1 and l and
I in a hopeless mess, so that we could be confident that our petnames looked unique no matter what ridiculous font got used later.
        - The second idea is to have a weak algorithm for comparing a candidate
petname in the act of being accepted to the existing petnames. We
explicitly call this a __weak__ algorithm because it can be
pretty poor. It  is quite acceptable for the algorithm to pop a list of "similar petnames" that is overly extensive, i.e., it is fine to show names that the human easily recognizes as distinct. The serious error is to fail to show
names that the human might confuse. Comparing Paypal to Paypa1, a sample algorithm might notice that the names are of similar length and have three
letters in common ("p", "a", and "y"), and say, "that's similar enough
to worry me, I'm gonna check with the boss." The algorithm for noticing
similarity between private petnames is under much less pressure to be
perfect than is the algorithm for a Certificate Authority when deciding
whether to award the name "pawpal" when the name "paypal" already exists. A CA might like to prevent mimicry, but to do so must tread a
difficult line with abolishing huge swaths of namespace to ensure
similarities don't arise.
        - However it is done, mixing alphabets from different languages into a
single petname list is ridiculous. These are private petnames. Only one
person in the whole world needs to read them. Use the user's default
character set, and be done.
    - ## Examples, Near Examples, and
Comparisons
    - ### Physical
World Petnames
        - Humans have been using parts of
petname systems since before the
invention of the written word. Human faces
were used as keys. These keys resisted forgery far better than most
things that pass for security today on computers (except in episodes
of Mission Impossible, and the occasional Shakespearian comedy like
12th Night). The referral, "Joe, this is my son Billy,
he's great with a club," transferred both a key/alleged-name pair and a
first-order purposeful trust recommendation. The recipient of this referral
typically accepts the alleged name as a petname, though in some cases
the recipient may instead choose other petnames, such as, "Bob's big
dumb dufus of a son", which is a strictly private petname.
        - These physical world petname
systems were sufficiently different
from computer-based petname systems that it is dangerous to draw too
many conclusions from them. But the similarities are sufficiently
intriguing that the author feels compelled to mention them. More
comprehensive comparison and contrasting of physical petnaming to
computer-based petnaming is left as an entertainment for the reader.
    - ### Trademark
Law
        - Trademark law is not a petname
system. When civilization started
creating entities that did not have unforgeable faces (like Apple
Computer), we settled on a legal system that attempted, with fair
success, to enforce (that is, secure) purpose-unique memorable
global IDs for small numbers of entities. It is hard to map trademarks
onto petname systems for comparison, but an attempt seems in order. The
trademark-purpose pair is the key, made unforgeable by government
coercion. It is important to note that the trademark itself is not the key: Apple Computer and Apple Music both used the trademark Apple for decades,
without conflict, until Apple Computer entered the music business.
        - The trademark by itself is the
nickname: Apple Computer thinks of itself as "Apple". Petnames are
absent. Mimicry is prevented by the same
government action as forgery, and indeed the trademark system makes no
distinction between forgery and mimicry (which helps explain why the
distinction is so blurred in most computer security discussions).
        - Trademark law depends on the
legal system to disambiguate "similar
purpose". This is expensive, and consequently trademark law can only
apply to "small" numbers of "big" entities. The name Mark Miller is
covered by trademark law, but only in explicitly recognizing that all
people who have that name may use it, i.e., trademark law recognizes
non-uniqueness in this case. On the Web, the number of entities with
whom we would like to associate trust/vulnerability relationships is extremely
large; indeed, one of the failures of the Web today is that we cannot construct as many such associations as we would like. Those relationships span
multiple legal jurisdictions, further complicating the trademark
system. Trademarking simply does not scale well enough for the age of the Web, despite its success in earlier eras.
    - ### Instant
Messaging Buddy Lists
        - Buddy lists for instant messengers follow the logic of petname systems
quite closely, though all the security properties are discarded in current
implementations. Each entity gets a globally unique id, rooted in the
domain name of the messaging service, which fills the role of "key". A
weak effort is made to make the id both human memorable on the one
hand, and unforgeable, on the other. The id is used as a nickname;
being sometimes memorable, it works well enough often enough. The same
id is used as a key even though it is easy to forge (either through man in the middle attacks or password attacks). The important point is that, once the user puts a petname into the buddy list, all references to the id are represented using the petname: you can connect to the entity using the petname, and when the entity connects to you, the petname displays.
        - Buddy lists are so intuitive,
people easily learn how to use them
with neither instruction nor documentation. An instant messenger that
used true keys, true nicknames, and enforced good security properties
would be virtually indistinguishable in user-interface presentation
from
existing systems; indeed, if one used an object-capability style of
key, the biggest difference would be the absence of passwords, an
actual usability improvement. Informal experimentation on a global
scale in the
instant messaging arena suggests the petname architecture embodied in
buddy lists can work well.
    - ### CapDesk and Polaris
        - [[CapDesk]] and [[Polaris]] are desktop systems that
explicitly flesh out a petname system to enforce security
properties. CapDesk is a point and click desktop that combines
usability, security, and functionality, to a degree often found
surprising by those unfamiliar with it. In CapDesk, at
application installation time the
application proposes a pet text and a pet graphic (the icon for the top
left corner, and the text in the title bar that is immediately
adjacent). The user may accept this petname or modify it. Windows
launched thereafter by the installed application are unforgeably marked
with the petname. Limited informal experimentation suggested that the
CapDesk petname system was intuitive and easy to use, like the buddy
lists.
        - [[Polaris]] is a derivative of
[[CapDesk]] that defends the Windows
operating system against several interesting classes of attack. Polaris
uses pet texts similar to the CapDesk pet texts for marking the
windows. Polaris was used in a larger set of pilot programs than
CapDesk ever experienced. One result of the pilots that proved a pleasant surprise was that people were  aware of and sensitive to the petname markings. This supports the hope that petnames could indeed strongly impact phishing.
    - ### Domain
Names
        - The DNS system is perhaps the most widely used naming architecture in
the world. There are a couple of ways of viewing DNS from a petname
perspective. The most clarifying view is perhaps the view of the domain
name as both key and
nickname rolled into one -- a unique nickname that must try to support
security
properties. One powerful way to describe DNS is to say that DNS strives
to make keys that are memorable. In other words, it is a direct
violation of Zooko's triangle. And that is why mimicry is possible. __Mimicry is an emergent
property of the violation of Zooko's
triangle. __Mimicry emerges as
the system grows to large scale. DNS is the leading example of the
problem.
        - Several of the other examples
here treat the domain name as a trusted-path key.
Domain names are forgeable, but in practice they seem to be resistant
enough to forgery to be useful. Judging by the
prevalence of mimicry-based phishing over DNS forgery, it seems clear
that forgery is not the weakest link in DNS; mimicry is.
    - ### Browser Bookmarks
        - Browser bookmarks combined with DNS have a remarkable similarity to a
petname system...with a fatal flaw. Think of the domain name as both a
key and a nickname (which is not fatal to a petname system, remember
the nickname has no security properties, it can be gibberish or
massively oversubscribed or mimicked without violation...though the
petname system has a better chance of success if users understand that
the nickname has no security properties, which is another problem with
DNS). With this characterization, the bookmark can be thought of as a
private name that points at the key,
suggested by the nickname. It sounds like a petname system.
        - However, the bookmark is not a petname. Technically, it is a__
lambda name__. As noted earlier, a true petname is a__ two-way __mapping: any reference to the key is represented in the user's world as the petname.
However, lambda names like bookmarks only map from the private name to
the key, with no mapping back. When you follow a bookmark to a page, or
take any other path to get to the page, the domain name is used
throughout the user interface as the "name" for presentation to the
user, a fundamental violation of petname logic. Despite this violation,
bookmarks plus DNS demonstrate how even a partial implementation
of petnames will deliver some of the defense against
mimicry that a full petname system can achieve. Any person who uses the
strategy of reading an email allegedly from PayPal, and then clicking
on their existing bookmark to go to PayPal rather than following the
email-embedded link, is getting a security benefit derived from the
partial implementation of petnames afforded by bookmarks.
    - ### OpenPGP and the Web of Trust
        - OpenPGP keys
carry nicknames with them, and the user can replace nicknames with a
name of the user's choosing, which would be a petname. When an entity's
key is observed by the software, the pet name is properly presented,
i.e., the petname is properly bidirectional.
The Web of Trust supplies an interesting way to associate these keys
with purposeful trust, by asking other entities who have vouched for
the new entity, what they recommend as a trust relationship.
        - With all these features,
OpenPGP supplies a true petname system
architecture. OpenPGP has not been tested by phishing attacks yet.
Since all the basic elements are there, the biggest question would be,
how must the user interfaces for applications using OpenPGP evolve to
face such a threat? This is another reminder that **user interface is as
critical for any practical security architecture as is the crypto**. **A
security system whose user interface is written by cryptographers is no
more likely to succeed than a security system whose encryption
machinery is written by user interface designers.**
    - ### Waterken
Petname Toolbar
        - This toolbar [[Waterken]] is a proposal for web browsers explicitly based
on petname architecture, explicitly to prevent phishing. A certificate plus a
domain name is treated as the key. The petname is a true two-way mapping between key and private name. The alleged name for all sites is "untrusted"; there is no nickname. For those
sites to which the user assigns a petname, the toolbar supplies markings
that makes it easy for the user to unambiguously distinguish the site.
This toolbar has been implemented for Firefox. This author switched to
FireFox from Mozilla just to be able to use this tool. Limited informal experimentation suggests that the petname toolbar is as
intuitive as the buddy lists and desktop systems described earlier.
    - ### Certificate Authorities
        - Certificate
Authorities create
nickname/key pairs. The certificates
share with pgp keys the cryptographic strength to ensure
unforgeability. The claim is made that, because the nickname is unique
within the CA, interesting security properties may be ascribed to the
nickname. Petnames are not included in the scheme. It looks a fair bit
like DNS, with the CA root playing the role of the DNS root servers.
        - How do CA-based
systems fair against mimicry? The similarity to DNS is certainly
suspicious. A generous author
might just say, CA defense against mimicry is controversial in theory
and untested in practice. A less generous author would probably say no
more, since such an author would still desire people who
think that CAs are beneficial to read the rest of the paper.
    - ### Trustbar
        - The trustbar [[trustbar]] is a CA-based
browser system that
allows user construction of petnames, including both pet text and pet
graphics, for the certified entity.  In the 0.1 Mozilla
implementation, the distinction between a nickname (based on the cert)
and the petname is implied by the popup of a dialog box when the cert
is first encountered and no petname has yet been assigned. The petname
and the key are not quite fully bidirectional: the key is properly
represented by the petname in user interactions, but the petname cannot
be used to get to the key. This is just a quibble, however. The
Trustbar implements a petname system. It has, however, a big change
from a simple petname system: the inclusion of a
CA in the mix. Does this help or hinder?
        -  In the presence of the popular
"Just click Ok" mantra for certs, adding a CA
to the system may introduce new vulnerabilities. Two CA-based
attack examples: "We here at Verisign are upgrading our root key.
Please
follow the link and click Ok." Alternatively, "We here at Paypal have
fallen into a legal dispute with Entrust. We are using a new CA that is every
bit as trustworthy. Please follow the link and click Ok." Brief
informal experimentation with the author's 83-year-old mother-in-law
suggests that an email asserting Paypal has changed domain names is
easily recognized as an attack. However, email asserting a cert has
changed is viewed as a foolish demand impeding progress -- just click OK.
        - As noted earlier, user interface design is every bit as important to
security as the strength of the keys. Simply stripping the trustbar
tool of the inevitable plethora of CA-related dialog boxes would
significantly improve usability, increasing the chances that real human
beings would tolerate it; all the security properties of a
petname system without CAs would remain intact. The Trustbar itself
pops dialogs at the user (sometimes several in a row, if the entity
maintaining a web site decides to use different certs for different
pages, as discovered during the author's experiments). Private
correspondence
with the designers of the trustbar suggest that evolution in a
direction reducing the frequency and annoyance of the dialogs is a
possibility.
        - How well will the current implementation of the trustbar work in
practice? Only
experimentation can tell.
    - ### Pet
Name Markup Language
        - PNML is an XML proposal for
using petname systems ubiquitously. In a chat system, if Bob made a reference to Alice in the text he wrote to Ted, and if Alice is Bob's petname for a person known to Ted with petname Carol, the sent reference to Alice would be converted via the magic of computers into a received reference to Carol. It would take more effort to build PNML into an existing browser than to integrate the Waterken Petname Toolbar, but the results would be interesting indeed.
            - {{mermaid}}
                - erDiagram
    Bob <|-- Alice: places
    - ## Conclusions
        - Many informal experiments with systems identified here that use parts of petname systems have demonstrated that they can be intuitive and easy to use (Buddy Lists, Browser bookmarks, the petname toolbar, and the CapDesk and Polaris secure desktops). A user who understands their petname system and is alert to the information it conveys can be extremely hard to trick using mimicry, making that user a difficult target for phishing. Experimentation is required to
determine how much less vulnerable to phishing the typical user would
become given a petname system. Experimentation with
petnames for web browsers does not have to be expensive; both the
Trustbar and the Waterken
Petname Toolbar are ready now, both for usage and for further
experimentation by building variations based on the open-source code.
    - ## Implementation
Notes/Requirements
        - Following are key features of a [[pet name]] system. If an implementation of a naming system for an application does not include these properties, it is not fully following the logic of petnames:
            - The key must be resistant
enough to forgery to survive in the
context of the application threat model.
            - There can be at most one
petname per key per user per
application.
            - There can be at most one key
per petname (per user per
application).
            - In the application user
interface, all references to the key are
represented by the petname.
            - The user must be able to
assign a private petname to any key.
            - The petname must be assigned
to the key only by explicit user
action.
            - The user must be able to
repeatedly edit the petname of any key.
            - The user interface shall
assist the user in assuring that two
petnames are not similar enough to enable mimicry, to the extent
necessitated by the complexity of the application context in which the
petnames are selected and manipulated. If the number of petnames needed
by the application is small and they are easily remembered, no
assistance may be required. If the number of petnames is large, and/or
difficult to remember and/or likely to be similar, and the resultant
forms of mimicry, accidental or intentional, leads to vulnerability
inside the threat model, assistance is required.
            - Nicknames and alleged names
must be unambiguously visually
distinct from petnames.
            - Nicknames are optional.
    - ## Glossary
        - **[[pet name]]:** a naming system in
which, for each individual entity recognized by another entity, three interlocking names solve Zooko's Triangle. The three elements are the key
(global and secure), the nickname (global and memorable), and the petname
(secure and memorable).
        - **[[pet name]]:**
This term has three distinct but related
usages in the literature on petnames. Sometimes it is used as a
shorthand for referring to the petname system as a whole. Sometimes it
is used as a direct reference to the naming element that is secure,
memorable, and private to the individual who refers to another
entity; this is the
meaning used throughout this paper. Sometimes "petname" is used to
refer to the textual component of a
petname (which may have graphical elements as well). In
contexts outside this paper, the reader must
ascertain the correct interpretation from that context. True petnames
are 2-way associative: given a petname in a specific application on a
specific machine, you can acquire the key, and given the key, you can
acquire the petname. The mapping back from the key to the petname is
always performed when presenting data to the user. This makes petnames
different from [[lambda names]], which only map from the name to the key.
        - **Pet Text:** A petname, or part of
a petname, that is textual. The
owner of a machine upon which a petname resides can edit the text to
modify the petname.
        - **Pet Graphic:** A petname, or part
of a petname, that is graphical.
        - **Pet Face:** A petname, or part of
a petname, that is an image of a
human face. Pet faces are intended to exploit the special powers of the
human mind for associating purposeful trust with another human.
        - **[[purposeful trust]]:** The type of trust that is needed before a person should empower another entity. Examples: "I trust Entity X to hold N dollars for me, and to perform transfers of that money on my behalf." And, "I trust Entity Y to tell me whether or not to buy a car from Entity Z." We speak of purposeful trust to distinguish it from the many other things computer people call "trust" these days. CAs, for example supply "trust". But CAs do not tell you if you can trust a certificate owner to pick up your garbage, or handle your stock portfolio. It's just "trust".
        - **Forgery:**
An exact duplication
of a key, such that neither human nor computer can distinguish the
duplicate from the original.
        - **Mimicry:**
A duplication of
a name that is good enough to fool the human being, though not good
enough to fool a computer. A famous example is
the name __paypa1__
(with a "one" as the final character),
which mimics __paypal__
quite well.
The quality of the mimicry of paypal depends on the ambiguity of the
font in use, and the alertness of the human reading the message.
        - **Lambda Names:**
Names that are memorable, secure, and
private, but
which only map from the name to the key: given the lambda name, you can
retrieve the key, but given the key there is no mapping back to the
name. Objects in programming languages follow this logic: the
programmer gives the object a name in the program, but once compiled,
neither the object nor much of anything else knows how to get back to
the name (though this is an imperfect example, since debuggers can
indeed map back). Bookmarks in browsers are another example: the
bookmark maps to a url, but once you go to the url, the url is
presented directly to the user, not the name embodied in the bookmark.
Consequently bookmarks cannot help against phishing.
    - ## Acknowledgements
        - Thank you to everyone on the Cap-Talk mailing list for their help,
especially Ian Grigg for his deliciously relentless criticism, but also
notably including David Hopwood, Alan Karp, Mark Miller, Tyler Close,
Trevor Perrin, and Charles Landau, each of whom made comments that
directly caused modification to the early draft. Thank you also to Amir
Herzberg for his assistance in understanding the Trustbar.
    - ## References
        - [[Zooko Wilcox]] http://zooko.com/distnames.html
        - [Trustbar] http://eprint.iacr.org/2004/155/
or [http://www.cs.biu.ac.il/~herzbea//Papers/ecommerce/spoofing.htm](http://www.cs.biu.ac.il/%7Eherzbea//Papers/ecommerce/spoofing.htm)
        - [CapDesk] http://www.skyhunter.com/marcs/CapDeskSpec.html
or http://www.combex.com/tech/edesk.html
        - [Polaris] http://www.hpl.hp.com/techreports/2004/HPL-2004-221.html
        - [Waterken] http://www.waterken.com/user/PetnameTool/[](http://www.erights.org/elib/capability/pnml.html)

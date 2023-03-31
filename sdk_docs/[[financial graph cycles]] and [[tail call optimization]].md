- Inspired while reading through various [[Intro to [[Spritely]]]] documents, and imagining what a [[personal token]] economy might look like in a Spritely context.
    - A person's token might be hosted entirely on their own machine.
    - Granting someone a token would grant that person an object that enables them to "look up" their balance & transfer through an encrypted tunnel.
        - This has pretty cool/free [[financial [[privacy]]]] benefits.
- I was at the same time thinking about how a [[streaming payment]] would work with [[Delegatable Eth]], and started considering how ideally the stream would extend all the way into a cycle.
- This reminded me of that [[[[Vinay Gupta]] [[SweetBridge]] podcast on [[supply chain]] economics]]
    - In it they described some insane amount, of the global GDP is tied up waiting for clearance in the supply chain: Someone placing an order from a vendor, waiting for the check to clear before the next step can proceed, etc.
    - > let’s talk about the size of it. It’s $54 trillion of GDP globally, which … it’s two-thirds of the world’s global economy.
    - > so, they’re, basically, trying to make their receivables match their 
payables and their inventory. It’s kind of a magical financial formula. 
If you could have the amount of money that you have tied up in people 
you owe be equal to the amount of money tied up in people that owe you, 
then you have a zero-working capital requirement
- If we wanted a delegation chain to support wrapping into cycles, a [[zcap-ld]] or [[Delegatable Eth]] style delegation chain would grow linearly, eventually hitting the gas limit, effectively a [[stack overflow]]
- In this way, good delegatable financial payment flows might __need__ [[tail call optimization]].
- Step through a simple example
    - Setup assumptions
        - An economy with two members, each of whom has only one resource need and produced.
            - A weaver, who takes fibers to make clothes.
                - ```javascript
weaver = (fibers) => clothes```
            - A farmer, who takes clothes and makes fibers.
                - ```javascript
farmer = (clothes) => fibers```
        - they are both formerly accustomed to a fiat economy, but money has become very tight due to a hard season, and so neither has any working capital to buy from the other.
        - While each has what the other needs, they do not have it exactly __when__ the other needs it. Let's say, right now the weaver has clothes but the farmer is out of season.
        - We will set aside direct barter because we are trying to explore a model for abstract representation of cyclical promises.
    - Scenarios
        - A token centric approach
            - The farmer issues some [[personal token]] representing their future fibers.
        - An [[object capability]] approach
            - The farmer issues a [[power/capability]] representing their future fibers.
            - The weaver, having some established trust in the farmer, is willing to accept these promises on the [[social collateral]] of their established relationship, and so is willing to grant clothes in value up to how much they think the farmer values their relationship.
            - 

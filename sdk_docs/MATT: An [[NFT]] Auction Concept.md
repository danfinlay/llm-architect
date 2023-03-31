- An auction system by [[Dan Finlay]]
    - https://twitter.com/mattgcondon/status/1386182368180916228?s=20
    - https://twitter.com/spencecoin/status/1386186573901799424?s=20
- [Interactive demo app](https://danfinlay.github.io/matt-demo/)
- [Sample code](https://github.com/danfinlay/matt-auction-scaffold-eth/blob/main/packages/hardhat/test/matt-auction.js) in [[Solidity]]
- Video explanations
    - {{youtube: https://youtu.be/0FJ3sYcoLwA}}
    - Older explanations
        - {{youtube: https://youtu.be/gUavUA9ItO4}}
- [Original tweet & discussion](https://twitter.com/danfinlay/status/1386179171626340352?s=20)
- Inspiration
    - I really enjoyed [[Pyramid Scheme (song)]] about [[NFT]]s. I thought it was charming, I'd have loved to have sported it on a profile somewhere as a contributor, but I just am not the kind of person who is going to spend $5k patronizing a single song (as the high bid did).
    - This left me thinking that there __might have been__ money left on the table for the artist, and there might actually be a way for many fans to all show support for artists they appreciate in a way where many of them can win, but winning would still be exclusive enough to be valuable, winning could actually be cheaper per person, and the artist would actually make more money as well.
    - This gave me an idea for a type of auction, and so far on further consideration it's continued to seem sound.
- Summary
    - Since NFTs can have runs of any size, a seller might ask, what’s the ideal price and quantity to sell at?
    - If you consider any set of bidders, each with a max price they’d be willing to pay, there is always going to be at least one optimal edition size and price where the seller is able to get the maximum total revenue for any price and run size.
    - A MATT auction helps efficiently discover an optimal price and run size. It does not provide bidders any exclusivity guarantees (there might be a million editions minted), but instead guarantees that if they win, they will pay no more than anyone else, so a large run will end up with a lower price.
    - The process
        - A seller defines an NFT that will have a limited run.
        - Buyers submit bids (signed commitments to pay) at prices they are willing to pay up to.
        - Whenever they want, the seller submits the highest-revenue set of, and they all pay the lowest price of any of the provided bids, and earn a copy of the NFT.
- Examples
    - Basic 1-10 bidders
        - Imagine 10 bidders, each of whom is willing to bid a different value between 1 and 10.
        - [On Google Sheets](https://docs.google.com/spreadsheets/d/1E6VPZ03Nno1q1MLDOOD9W8vRL5ZOFKR7Oy_xqfqSrng/edit#gid=0)
        - In this scenario, if only the single bid for $10 is taken, or if all 10 bids are taken for $1, the net result is $10 in revenue, but as we approach the mid-range, we can see the ideal revenue is $30, which is available at either 5 or 6 NFTs minted. This would allow the seller to choose between a more exclusive sale or a broader fan-base.
        - This demonstrates a very simple example of how this algorithm seems to allow the seller to choose their preferred peak on the demand curve.
        - {{iframe: https://docs.google.com/spreadsheets/d/e/2PACX-1vTEy1tetjhBdsNj6S5br7lkoMH9D3QMRuXk1US-1G6d-CgPnRzISjsZ86Fd_Y9a6OqHVpPN_0w3xO0P/pubchart?oid=441547134&format=interactive}}
        - https://twitter.com/ptrwtts/status/1387648956528685065?s=20
    - The crowd beating a high-roller
        - [Sheet](https://docs.google.com/spreadsheets/d/1Bkqha71KhSnLNrKs5mtZoaYt-B0nn2JvryE7pZSBWIA/edit#gid=0)
        - Consider a single $10 bidder, but then many bidders at the $1, $2, and $3 ranges.
        - While offering any number of NFTs is going to bring more total revenue at $10 than at $9 or $8, once the price comes down to $3, it starts spiking up, and in this case we see an optimum at $2.
        - {{iframe: https://docs.google.com/spreadsheets/d/e/2PACX-1vQU6PgK-2aDuFIpnixPfyZC6L_XnFI6r49CIVhdo5GJ9uPByeQ3CsARhMtNR1xWAX8SAGJeHZ0kN76d/pubchart?oid=441547134&format=interactive}}
    - Fox by Nelly (imperfect data)
        - Consider [Fox by Nelly](https://opensea.io/assets/fx-by-nelly-baksht).
        - ![metamask fox painting](https://lh3.googleusercontent.com/X3BlDlA4Fd7q0MixGyDc2VSj_67vrcuDVNSJhUdp9uVNke99S9MwoxZ40dSfTRlEn9ZNlwAOinKpCTd97i9QgPTTUw=s0)
        - She issued 10 digital editions of a common art, so there is already a sense that she was not going for perfect exclusivity, but wanted many people to have a chance at it.
        - On a traditional auction site like [[OpenSea]] (as it's on), each bid is for a specific one of the editions, and so their prices can vary, resulting in fomo and a sense of overpayment.
        - If we look at the bids she received, what would the ideal number of editions have been? What would the price have been? How would her revenue have differed? Keep in mind, lots of people probably didn't bid, because their bid would've been below the low-bid, so that information is lost, but in a MATT all of those withheld bids could have been eligible contenders for an edition (if there had been enough of them!)
        - This example isn't perfect because it turns out many of the editions seem to have been given directly to people or paid for on other sites, but we can work with the bids we do have.
        - Of the 3 that concluded with auctions, we see a MATT distribution that looks like this:
        - {{iframe: https://docs.google.com/spreadsheets/d/e/2PACX-1vSUivE4ErBGZTSitcR6p53dzgpTPGK_VgvsVqwfy32oT7FAe8NU5EPg1J5YDKoGDIRv5QpQUUolVXMD/pubchart?oid=441547134&format=interactive}}
        - A noteworthy part of her sale is that it actually might not have resulted in more revenue if done as a MATT. In particular, she had one sale that went for 4.8 eth, and then two sales that went for 1 eth each. That buyer who paid 4.8 eth probably feels a little silly, and meanwhile she could've made just about the same revenue (it looks like) if a MATT auction had run and settled at a 1-eth equilibrum, minting 5 editions (instead of those 3 sold) for the 5 interested parties.
    - To do: Add examples of examples from history!
- Safety Properties
    - By submitting additional bids, the seller can not favorably manipulate the price.
        - By submitting higher bids, the seller can not favorably manipulate the price.
            - Proof by induction:
                - Base case: If no other bids below the bid they are bidding higher than would satisfy the pool criteria, then the artist receives no revenue, and so was not able to "game" any buyers.
                - Inductive step: If an additional bid the satisfies the pool criteria, then it would win alongside the previous winners, and pay its bid value, which is the same result as if no bids above it had been placed, and so the buyer has not been gamed.
        - By submitting lower bids, the seller can not favorably manipulate the price.
            - If the lower bid is too low to meet the pool criteria, it has no effect on the outcome.
            - If the lower bid is high enough to meet the pool criteria, it
                - does not change the price
                - reduces the price for all other bidders, and so the seller can at best not affect the sale price by this technique, and at worst lowers the sale price, losing money.
    - The bids can be submitted off-chain, and the seller can be trusted to submit the eligible winning bids for final division of the winnings without being able to increase the payment of any bidder nor result in additional profit, enabling cheap on-chain computation.
        - Let's assume the bids are submitted as off-chain commitments (after an allowance, no doubt).
        - The question would be: Is the seller perfectly incentivized to submit the correct set of winning bids?
        - Scenario: The seller excludes high bids
            - This would result in a decisively lower total sale.
        - Scenario: The seller excludes low bids
            - Since additional low bids would only be included by the algorithm if they increased the overall revenue to the seller, excluding them could only reduce the seller's total revenue.
    - No overpayment: No winning bidder pays more than any other
        - This is plainly the fact of the protocol. It does not guarantee the size of the run, but it guarantees bidders do not pay more than their stated bid, and they will not pay more than anyone else.
    - the artist is able to receive the highest price they could get from any subset of the bids (given they all receive the lowest-bid price, and the bidders are not batch-size sensitive)
        - This is provable because the seller is submitting the set of winning bids themselves, and so if there is ever a combination of bids that would bring them more revenue, they can select them.
    - Hopefully will prove later (would represent target properties being achieved, needs proof)
        - Artist revenue is the best it could be given the provided bidders (regardless of bid tallying mechanism)
            - Compare to a [[[[Gnosis]] Auction]], which requires a fixed size lot to sell.
                - If the Gnosis auction is selling a smaller lot, while it could have a higher price per unit, it could only bring a lower total profit given the artist is able to receive the highest price they could get from any subset of the bids (given they all receive the lowest-bid price, and the bidders are not batch-size sensitive)
                - If the Gnosis auction is selling a smaller lot, it would have to be for a lower price that brings a lower final return to the seller, given the artist is able to receive the highest price they could get from any subset of the bids (given they all receive the lowest-bid price, and the bidders are not batch-size sensitive)
        - There should be no benefit to a bidder submitting a side-payment to the seller to include their bid or exclude other bids.
            - low-bidder pays via side-channel for inclusion
                - Either
                    - Low bid is so low that it drags all other bids to a total value lower than before (safe, the seller should not do this)
                    - Low bid is within current bounds of acceptable bids, so sale price for other payers is not affected.
                        - The buyer has no financial incentive to do this, since it implies they are basically just paying the seller, which they can do anyways.
            - high-bidder pays via side-channel for exclusion of other bids
                - High bidders can already simply bid more to exclude other bids, need to consider middle cases...
- Caveats/Dangers
    - Anyone willing to submit a bid of a size that would be included can split it up to receive more NFTs.
        - Emphasizing the nft represents having funded, not exclusivity.
        - This also lowers the minimum price for additional funders, effectively pushing the series towards many cheap editions vs few expensive ones.
        - Minimum bids can also be cheaper to exclude for a higher bidder.
    - The artist can effectively mint additional editions for free by creating their own bids.
        - From [[Adam Dossa]]
            - https://twitter.com/adamaid/status/1387371214155358208?s=21
        - Implies
            - This type of auction relies on an environment where the artist is at least somewhat trusted to not dilute their own work.
            - This type of auction might be best in use cases that having the NFT is its own reward, and its value is not derived entirely from exclusivity.
- Use cases
    - Funding scientific research
        - Like on [[p1anck]], where an NFT is sold for the prestige of having funded a scientific study.
        - Funding science even moreso should foster funders who are interested in maximizing the funding of the project, not about exclusivity of the collectible.
    - Selling intellectual property rights
        - novel chemical production
            - When deciding who should have rights to manufacture a new vaccine, a research company could use a MATT auction to ensure they're maximizing their revenue while simultaneously ensuring the highest number of manufacturers are empowered to begin production.
        - music licensing
            - Suggested by [[Joe Benso]], who is building [[Soundlouder]], a blockchain-based music rights distribution platform.
            - An artist could auction off the rights to remix & redistribute a track of their property.
            - Beat collectors could try low-balling or trying to get [[Bundle Magic]], and prominent major artists could bid high to get exclusive rights.
    - Dividing ownership evenly between a group of founders who want equal stakes in a venture.
    - Crowdfunding to produce a good where economies of scale are involved.
        - The current norm on [[Kickstarter]] is to give early backers a discount, and otherwise guess the order size that will bring the most backers, and any backers beyond that point will likely be overpaying.
        - A Matt auction in this case allows flexibly finding the most profitable and lowest priced purchase order size, independent of timeframe, and without requiring capital lockup from bidders until the sale is activated.
- User interface considerations
    - The interface could indicate a "current minimum price" which would go down the more bids there are, a bit like how [[Humble Bundle]] does. A person could also bid higher than the minimum to make the series more exclusive.
        - The lowest possible bid would not increase artist revenue, but would add an NFT to the collection, and reduce the cost for all other winners.
        - Any bid over the lowest eligible bid would increase artist revenue.
        - A bid over the previous highest bid could result in fewer winners.
        - A bid below the current minimum could still be eligible to win, if enough other people bid at that level!
    - Stacked line chart
        - 
        - https://react-google-charts.com/area-chart
        - x axis: price per bid
        - y axis: total revenue
        - sample code
            - 
            - <Chart
                - width={'500px'}
                - height={'300px'}
                - chartType="AreaChart"
                - loader={<div>Loading Chart</div>}
                - data={[
                    - ['Year', 'Sales', 'Expenses'],
                    - ['2013', 1000, 400],
                    - ['2014', 1170, 460],
                    - ['2015', 660, 1120],
                    - ['2016', 1030, 540],
                - ]}
                - options={{
                    - isStacked: true,
                    - height: 300,
                    - legend: { position: 'top', maxLines: 3 },
                    - vAxis: { minValue: 0 },
                - }}
                - rootProps={{ 'data-testid': '2' }}
            - />
- Other Thoughts
    - Goals
        - For auctions where the number of items to award is flexible, and the seller wants to make the most money, discovering the optimal price and series size.
        - Maximizing the artist's resulting profit given the interest expressed as bids.
        - Ensure winners pay the lowest price possible (each) while still Maximizing the artist's resulting profit given the interest expressed as bids.
        - Let as many people as want to bid.
        - Allow any number of winners.
        - All winners pay the lowest price that any of them bid, ensuring no winners feel they’ve overpaid.
            - Yes, this means bidders need to bid like they are bidding on a limited run of unknown size, which can affect the psychology of the bid, at least for some people.
    - The psychology for bidding on this type of NFT is slightly different from a fixed-size series.
        - Bidders are not bidding on exclusivity at any known level.
        - Bidders are bidding for the right to be __one of the funders__.
        - No winner pays more or less than any other, so all winning NFTs are equally valuable.
        - The priority is not about having an exclusive claim to the art, but to having contributed to the artist's sustainability, which I think is more meaningful anyways. Good art collectors should care more about keeping the art flowing than having an exclusive claim to it.
    - A Matt seller does not need to accept all bids, and may choose to accept less profit to preserve a market or exclusivity or other benefits of non-market-clearing sales, as discussed by [[Vitalik Buterin]]
        - https://twitter.com/vitalikbuterin/status/1429272304530313218?s=21
- External links
    - [[Picaroon Inc]] [had a similar idea](https://medium.com/@picarooninc/auctions-with-variable-supply-in-crypto-nft-markets-8893b75ed7f1?_branch_match_id=807383162856965029) on [[September 7th, 2021]]
    - [Podcast discussion](https://anchor.fm/digitallyrare/episodes/AMMs--MATT-Auctions--and-NFT-MySpace-e112dpo) on [[Digitally Rare]]
    - [[FeralFile]] has a similar type of auction they call a [[group auction]], which is basically the same except it has a fixed number of items for sale.
        - https://twitter.com/FeralFile/status/1521195282809065473?s=20&t=EZPZIeg1zdGu08nhTAwlUw
- Possible variants
    - Blind/public bids
        - Since the bids can be submitted to the seller off-chain and only need to be submitted to the blockchain at time of redemption, it's very easy to make this a blind auction.
    - User bid parameters
        - Maximum editions permitted
            - A user might have a maximum number of editions they were willing to be part of for their bid.
        - [[Picaroon Inc]] [had a similar idea](https://medium.com/@picarooninc/auctions-with-variable-supply-in-crypto-nft-markets-8893b75ed7f1?_branch_match_id=807383162856965029) on [[September 7th, 2021]] ideas
            - > It is also possible to factor in the bidders preference in terms of 
quantity of items acquired: “I want to acquire at least X items and at 
most Y” but as well as percentage of ownership: “I want to acquire at 
least W% and at most Z% of the items”.
            - a __minimum__ and a __maximum__ NFT price. Outside this zone, they do not wish to participate.
                - The concept of a minimum bid price is outside the current design, but is an optional extension to the current format.
    - Auction constraints
        - Minimum/maximum editions (commitment)
            - From [[Picaroon Inc]] [had a similar idea](https://medium.com/@picarooninc/auctions-with-variable-supply-in-crypto-nft-markets-8893b75ed7f1?_branch_match_id=807383162856965029) on [[September 7th, 2021]]
- Why the name Matt?
    - It's an acronym for Maximizing Artist Turnout and Takings ([[retcon]])
    - Playfully named after [[Matt Condon]] for digging it and being an [[NFT]] pioneer. Might have to rename if another name catches on and nobody accepts this.
        - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fcapabul%2FelRmuG9gAd.png?alt=media&token=d5a19d2c-51f1-49b2-8eae-a446de8f1ffa)
- Implementation Notes
    - [[Solidity]]
        - Used [[[[EIP 712: signTypedData]] Toolkit]] to generate signature related code.
        - [On GitHub](https://github.com/danfinlay/EIP712-Toolkit/blob/matt-auction/generated/contracts/soliditySample.sol)
        - Roughly copied from there:
        - ```javascript
function startAuction (bytes32 nftData, uint endTime, address token, address owner) public {
   auctions[nftData] = Auction(endTime, owner, token, true);
}

function endAuction (bytes32 nftData, SignedBid[] calldata signedBids) public {
    Auction memory auction = auctions[nftData];

    // Enforce only the auction starter can end it
    assert(msg.sender == auction.owner);

    // Assume the lowest (price-setting) bid is first (enforce in the loop)
    uint256 price = signedBids[0].bid.currencyTokenAmount;
    for (uint i=0; i < signedBids.length; i++) {
        SignedBid memory signed = signedBids[i];

        // Enforce each bid is at least the first (low) bid price:
        assert(signed.bid.currencyTokenAmount >= price);
        assert(signed.bid.currencyTokenAddress == auction.currencyTokenAddress);

        // Verify signature
        assert(verifyBidSignature(signed.bid.nft, signed.bid.bidderAddress, signed.bid.currencyTokenAddress, signed.bid.currencyTokenAmount, signed.sig));

        // Transfer payment
        IERC20(auction.currencyTokenAddress).transferFrom(signed.bid.currencyTokenAddress, auction.owner, price);

        // Issue NFT
    }        

    auction.open = false;
    auctions[nftData] = auction;
}```
        - Possible upgrades
            - {{[[TODO]]}} Allow including `permit()` messages alongside the auction-ending signatures, to allow a single tx to both permit AND pay for bids.
            - {{[[TODO]]}} Consider allowing creating auctions entirely off-chain. The owner commits to an end date, and can always not submit if they want, but otherwise there's not a strong reason to put the start on-chain.
            - {{[[TODO]]}} Allow a single transfer/bid/sale to fail on transfer without terminating the entire auction conclusion. (A bidder can revoke an allowance, and that should disqualify their winning, but the auction should still be able to end).
            - Allow users to revoke their own bids before the auction ends (bid validation would need to check a revocation list)
    - Algorithm, rough JS
        - The NFT is put up for auction for a fixed auction duration
        - Bidders submit bids
        - After the auction duration, the bids are tallied and winners are chosen.
        - The bids are sorted by value, highest first.
```javascript
bids = bids.sort(byValue)
function byValue (a, b) {
  return a.value - b.value
}```
        - The highest bid is guaranteed an NFT.
The current price starts at that bid's value.
```javascript
let winners = [bids.shift()]
let current_price = winners[0].value```
        - pool criteria
            - For each sorted bid, if all bids up to it paying that price would result in a higher total payment to the seller than the previous group of winners at the previous price, then accept this bid and all before it as winners, and update the current_price to be this bid's value.
                - ```javascript
for (const i in bids) {
  if (((i + 1) * bids[i].value) > (current_price * winners.length)) {
    current_price = bids[i].value
    winners.push(...bids.splice(0, i))
  }
}```
        - Afterwards, all winners pay the `current_price` and receive an NFT.

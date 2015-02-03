# hochar

A cocktail recipe book made with few features and minimal nonsense. Likely not useful to anybody but me. It's not done yet, so it likely doesn't even do the few things I say it does.

Basic idea is, when mixing drinks, you need a few things:

* The ingredients
* Any garnish information or (rarely) special instructions 
* An ability to find a particular recipe by name
* An ability to locate recipes by ingredients

What this will never be:

* Pretty; it's not likely going to look good and it's certainly never going to have pretty drink pictures
* Descriptions of techniques; if anything I should restrict instructions to ~tweet size. Already think that things like "mix" or "shake" are too verbose, given that can be inferred from the ingredients; same goes for service up or down, though preference for a rock or neat is less obvious
* Glassware guidance: if you need this, find a different program
* Extensible: this is just about cocktails

Some goofy design decisions so far:

* Ingredients have two parts, a generic name and an extended field. I don't use this entirely consistently, but the idea is that the generic ingredient is "scotch" (always lower case) and the extended is "Laphroaig" if the drink is best with that. The problem is something like a Laphroaig-specific cocktail can't (in theory) be made with just any old scotch. It's a tradeoff, deal with it. Or don't, I already told you this likely isn't for you.
* There's no security; don't run this out in the open if you want your data to be left intact. This is also my first all-javascript app and my first real web development in about a decade, so it's probably fuill of security holes and bad practices.
* I used express and angular and nedb because they were the first things I could figure out how to get working quickly enough; they likely aren't the best choices and boy is the Internet full of confusing guidance on that front

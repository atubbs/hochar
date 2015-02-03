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
* Deleting ingredients: just blank all the items out and save; it'll work, trust me

Things that work:

* Adding a recipe
* Editing a recipe
* Listing all ingredients
* Listing all recipes
* Listing all recipes that match one ingredient

Things that are broken or won't work:

* database path is hard-coded; unless you're running on linux and your username is atubbs, your odds of success without changing that are zero
* The searching on the home page will find ingredients but it does nothing else and you can't do anything with them

Things that I want to get working soon:

* List all recipes that match several ingredients
* Easily search a recipe by name
* Easily search an ingredient by name and allow it to be pinned; execute a multi-ingredient search via the pins

Things I'm interested in getting working someday:

* Find similar recipes and/or list n most similar recipes
* ingredient aliasing/branching (e.g. gin can be split into london dry, old tom, genever; rye isn't that far from bourbon and bourbon isn't that far from cognac (flavor/mixer profiles people, not saying they're at all similar production/history/culture-wise)
* usable touch UI

To get going:

* clone it
* npm install
* npm start
* visit localohst:8080
* mix
* drink

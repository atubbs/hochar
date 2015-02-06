# hochar

Hochar is a cocktail recipe book made with limited features and minimal nonsense. I find it useful. There is a remote chance you will find it useful.

## The Idea: Make It As Simple As Possible

When I'm mixing drinks, I need a few pieces of information:

* The ingredients
* Any garnish information or unique instructions
* The ability to find a particular recipe by name
* The ability to locate recipes by ingredients(s)

Hochar is that little paper flipbook behind the bar that collects the house drinks, new ideas, and recipes from visiting adventurers, enthusiasts, and mixologists. The biggest difference is that it won't look like crap after three years, accidentally be thrown away, or have its pages stuck together with sour mix. Mostly because anybody that uses sour mix might as well not use recipes in the first place.

## Things Hochar Will Never Be

* This thing will never be pretty. It's not going to have glamor shots of drinks. Functionality is the only requirement.
* It will not be a system for describing techniques or ingredients. Instructions are meant to be brief. A hundred characters should be enough for anybody. If you need several sentences or paragraphs of instructions to make a drink, this app is not for you.
* There will be no guidance or schema for things like glassware, garnishes, etc. If it matters, throw it in the sentence of instructions. If not, leave it up to the bartender.
* This is not an extensible system. While one can store whatever they want in its mindlessly simple schema, and perhaps even find that useful, the only point is providing a title, ingredients, and room for an instruction or note.

## Goofy Design Decisions, Mistakes, and Other Disclaimers

* Ingredients have two parts, a generic name and an extended field. I don't use this entirely consistently, but the idea is that the generic ingredient is "scotch" and the extended is "Laphroaig" if the drink is best with that. The problem is something like a Laphroaig-specific cocktail can't (in theory) be made with just any old scotch. I leave resolving these ambiguities and complexities to the wetware.
* I kind of lied about that last part. I've left generic ingredients lower-case in the ingredient field and upper-case (e.g. Fernet-Branca) when there is no generic. You may choose to use it in a different fashion, but the ingredient matching will always be case-insensitive. If you do spell your ingredients differently, I can't help you.
* There's no security; don't run this out in the open if you want your data to be left intact. This is also my first all-javascript app and my first real web development in about a decade, so it's probably full of security holes and bad practices. You've been warned.
* I used bootstrap, express, angular and nedb because they were the first things I could figure out how to get working quickly enough; they likely aren't the best choices and boy is the Internet full of confusing guidance on nearly every front. If anything, I think there's probably a little too much on the framework and libraries front. For example, ngResource is limited enough and hand-wavy enough that I'm pretty confident I should have just done this all via $http. Anyway, what gives? I think if I followed all of the advice I found, the architecture would be some odd hybrid of restify, mongo, express, angular, ember, knockout, bootstrap, apache tomcat, PHP, mysql, sinatra, and half a dozen other things I've since forgotten. As is, just the "bare basics" necessary to run this thing include about 35 megabytes and 3500 files! Okay, rant over...
* There's no exposed mechanism to delete ingredients. Just blank them out and they'll quietly disappear.

## Things That Work

* Adding a recipe
* Editing a recipe
* Listing all ingredients
* Listing all recipes
* Listing all recipes that match one ingredient
* Searching a recipe by name

## Known Errata

* The database path is hard-coded; unless you're running on linux and your username is atubbs and your directly layout is eerily similar to mine, your odds of success without changing that are zero.
* The searching on the home page will find ingredients but it does nothing else and you can't do anything with them.
* the web front-end pretty just has a bad day if the back end isn't running.
* There's basically no error handling/recovery for anything.

## Soon I Hope

* List all recipes that match several ingredients.
* Easily search an ingredient by name and allow it to be pinned; execute a multi-ingredient search via the pins.

## Maybe Someday

* Testing. Literally anything would be an improvement at this point.
* Find similar recipes and/or list n most similar recipes.
* Ingredient aliasing/branching (e.g. gin can be split into london dry, old tom, genever; rye isn't that far from bourbon and bourbon isn't that far from cognac (flavor/mixer profiles people, not saying they're at all similar production/history/culture-wise).
* Usable touch UI.
* Drink scaling & automatic unit conversion / normalization.

# Getting It To Work

* clone it
* npm install
* fix the hardcoded crap
* npm start
* visit localhost:8080
* mix
* drink

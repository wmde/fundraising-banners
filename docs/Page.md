# The Page Classes

We display banners on wikipedia.org and wikipedia.de. These sites have different HTML markup, have a different campaign configuration structure, and have different ways of logging events. We use a Page interface with 2 implementations which ensures our code is compatible with these 2 environments.

They are used for:

* Mounting the banners in the correct place.
* Tracking events.
* Passing the calculated banner height from our banner javascript to css.

In our entry points we give the BannerConductor one of these implementations to perform actions as needed.

## PageOrg (Used on wikipedia.org)
This implementation is for interacting with wikipedia.org and is a little complex.

### The mw Object
ikipedia.org provides the global `mw` JavaScript object. For PageOrg we wrap the object in a `MediaWiki` interface and use it for things like:

* Discovering which skin the user has active.
* Discovering the current namespace of the page the banner is being showed on.
* Notifying Central Notice that a user has seen or interacted with a banner.
* Tracking events with Wikipedia's tracking tools.

### Skins

There are multiple skins that our banners can appear on:

* **Vector** This skin is the default on dewiki.
* **Vector 2022** This skin is the default on enwiki.
* **Minerva** This is the default mobile skin.

Each one of these skins has different markup and the users will interact with different parts of the skins that may prevent banner display so this needs to be set up per-skin.

## PageDe (Used on wikipedia.de)
This is the simplest of the 2 implementations. We use it only to mount the banner and send tracking events to our Matomo analytics.

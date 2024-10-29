# 2025 Post Campaign Clean Up

## New Form Action Composable

Fundraising team wanted to send the donor to different address form depending on the amount,
so we created a new formAction composable
 
Ticket: https://phabricator.wikimedia.org/T372555

### Files to look at:
- UseAmountBasedFormAction.ts (This is the new composable)
- MultistepDonation.vue (We added a formActionOverride prop for this, it may need to be integrated or removed)
- Take care of the tests

## Store numeric amount as cents instead of floating points

We got confused when creating `../src/components/composables/useAmountBasedFormAction.ts`. We thought numeric amount was `Cents`,
but actually it was `Euros and Cents`. We are used to the amount being `Cents` from the Fundraising App, where we're already 
using this best practice. See https://stackoverflow.com/questions/3730019/why-not-use-double-or-float-to-represent-currency

### Files to look at:
../src/utils/FormModel/FormModel.ts
../src/components/composables/useAmountBasedFormAction.ts

## Try lowering the maximum asset and entry point size

Some features (SVG payment icons, fallback banners, slider) make the size of the compiled banner bigger, which triggers
a Webpack warning. The current "solution" was to set the limit to 310KB (from 250KB) to avoid the warning, but a better
solution would be to remove features. When that can be done, please check with lower limits.

### Files to look at:
../webpack/webpack.production.js

## Move "close cookie" setting for WPDE banners into `PageWPDE.setCloseCookieIfNecessary`

Currently, we're setting close cookies inside the WPDE banners by doing `switch` statements inside the different "close"
handlers of the banner components, including and excluding images with `src` pointing to specific banner server routes. 
This leads to code duplication and inconsistencies across banners. And a proliferation of components that are wrappers 
around API calls. Instead of using components, we should create an abstraction class, e.g. `BannerServerCookieSetter` that manipulates
the DOM to insert/delete the image with the right URL. The class should have methods for the different URLs that the
banner server supports (see all routes that inherit from [
`AbstractCookieController.php`](https://github.com/wmde/banner-server/blob/main/src/Controller/AbstractCookieController.php)).
Then we remove the custom components and the code that toggles them and move the `switch` statement to
`PageWPDE.setCloseCookieIfNecessary`. `PageWPDE` should get an instance of `BannerServerCookieSetter` as a dependency
and call its different methods inside the `setCloseCookieIfNecessary` method.

## Files to look at
../src/page/PageWPDE.ts
../banners/*/components/*.vue

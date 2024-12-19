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
- `src/utils/FormModel/FormModel.ts`
- `src/components/composables/useAmountBasedFormAction.ts`


## Create parameters for 2025 campaign and adapt dev banner

1. Create the page - https://meta.wikimedia.org/wiki/MediaWiki:WMDE_Fundraising/Campaign_Parameters_2025
   - When creating the page, copy the values from 2024. Kai will adapt it when needed.

2. Change the dev banner to point to the above given new parameter page - 
https://meta.wikimedia.org/wiki/Special:CentralNoticeBanners/edit/B22_WMDE_local_prototype
    - Change the start date and end date in this file as needed - src/environment/dev/CampaignParameterOverride.ts

## Try lowering the maximum asset and entry point size

Some features (SVG payment icons, fallback banners, slider) make the size of the compiled banner bigger, which triggers
a Webpack warning. The current "solution" was to set the limit to 310KB (from 250KB) to avoid the warning, but a better
solution would be to remove features. When that can be done, please check with lower limits.

### Files to look at:
- `webpack/webpack.production.js`

## Average Donation
This value is in the dynamic content and was previously only used for calculating part of the projection. It's now exposed to the banner content so we should decide if we need to move it out of the campaignProjection part of the CampaignParameters and inject it into the CampaignProjection class separately.

### Files to look at
- `src/page/PageWPORG.ts`
- `src/utils/DynamicContent/CampaignProjection.ts`
- `src/utils/DynamicContent/DynamicCampaignText.ts`

## UpgradeToYearly form

- The "2 radio button + 1 button" form was dropped a while ago. The 2nd form page is supposed to have two buttons only.
- Right now our way of handling this is:
```vue
<UpgradeToYearlyButtonForm :page-index="pageIndex" :showManualUpgradeOption="false" @submit="submit" :is-current="isCurrent" @previous="previous">
	<template #back>
		<ChevronLeftIcon/>
	</template>
<UpgradeToYearlyButtonForm>
```
The prop `:showManualUpgradeOption="false"` does not show the third, link option.
- How do we take care of this form in future? Because our UpgradeToYearly for will always have two buttons only.

### Files to look at:
- `src/components/DonationForm/Forms/UpgradeToYearlyButtonForm.vue`
 

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
- `src/page/PageWPDE.ts`
- `banners/*/components/*.vue`


## Remove: AlreadyDonatedModal is probably no longer used after HK24

Since `C24_WMDE_Desktop_EN_02b` (https://github.com/wmde/fundraising-banners/pull/582)
the AlreadyDonated feature does not open a modal anymore but closes the banner directly.

### Files to look at:
- `src/components/AlreadyDonatedModal/AlreadyDonatedModal.vue`
- css styling + tracking events (close events of the buttons)


## Move translations for "transaction fee" into "MainDonationForm" messages

If the "transaction fee" feature moves into other banners, we should move the translation key `cover-transaction-costs` 
into the `MainDonationForm` messages.

### Files to look at:

- `src/components/DonationForm/Forms/messages/MainDonationForm.*.ts`
- `banners/*/*/messages.ts`

## Delete Info Icon

The `InfoIcon.vue` class is not compatible with the swatches. In the "starting" banners (With the "test number" `_00`) of 2025, all remaining instances of the class should be replaced with `InfoIconStraight.vue` or `InfoIconItalic.vue` and the old component should be deleted.

### Files to look at:

- `src/components/Icons/InfoIcon.vue`

## Remove deprecated urgencyMessageDaysLeft parameter from DynamicTextPlugin

This was hardcoded in our banner entry points and is now moved into the campaign configuration. Deleting it from the plugin constructor items would cause backwards breaking changes so it is deprecated instead and should be removed in 2025.

### Files to look at:

- `src/DynamicTextPlugin.ts`

## Clean up event classes

Some banners used `events` directory in the banner directory and import it from there in all subsequent banners. We should not do that, but should accumulate all events in `@src/tracking/events` and clean up at the end of the campaign.
If any imports from the `@banners/` namespace remain in the "final" banner, they should be moved into `@src/tracking/events` instead. Also, the existing events there should be checked if any of them are unused. If they are, delete them.  

### Files to look at

- `banners/*/LAST_BANNER/event_map*` (`LAST_BANNER` is a placeholder for the last banner (i.e. highest test number) in each channel)
- `src/tracking/events/*.ts`

## Rename `ProgressBarAlternative.vue`

### Files to look at

- src/components/ProgressBar/ProgressBarAlternative.vue

## Make all Fallback banner classes independent of non-fallback banners

The fallback banner shares some class names with the other banners, leading to wrongly displayed progress bars and other issues. We should make sure that the classes of the fallback banner and the other banners are independent from each other and that the CSS of the fallback banner is self-contained.

Since the fallback banner uses a progress bar, this means that we'll have to duplicate the progress bar component and its CSS for the fallback banner, to be able to give the progress bar elements different class names as well.

Also talk with the PM about the "fallback banner" feature in general (and maybe drop it or at least reduce the number of features in it):
- Duplicating the CSS will increase the size of the banner
- Duplicating the progress bar and footer components will increase the size of the banner
- The "resize" feature of the fallback banner means there is additional code and 2 footer components. Do we really need those?

Suggested prefix for the fallback banner classes: `wmde-fallback-banner-`

The styles for the fallback banner should be self-contained in the fallback banner's Vue file instead of bing a separate theme that's included in the `style.scss` files of each banner.

### Files to look at

- `src/components/ProgressBar/ProgressBar.vue`
- `banners/*/syles/*` Go to the browser inspector and duplicate all the styles from the main banner to the fallback banner
- `banners/*/components/FallbackBanner.vue`
- `src/themes/Fijitiv/*` (this is the fallback banner "theme")


## Fix Heart Icon & Thank You Box

This has a CSS variable setting its fill, which doesn't work. The fill attribute should be removed from the `svg` element, and the path changed to `style="fill: var( --heart-icon-fill )"`. Then in the mobile banner themes it should be set up in the thank you box CSS, something like:

```css
.thank-you-container {
   --heart-icon-fill: var( --thank-you-box-color );
}
```
Also, the CSS that's currently in the Vue component should be moved or removed.

### Files to look at
- `src/components/Icons/HeartIcon.vue`
- `src/themes/Modo/ThankYouBox/ThankYouBox.scss`
- `src/themes/Mikings/ThankYouBox/ThankYouBox.scss`
- `src/components/ThankYouBox/ThankYouBox.vue`

## Request coverage of all banners

We want our coverage report to check *all* banners

- Remove `coverage.exclude` section from `vitest.campaign.config.mjs` and
  clean up the `ignoredBannersGlob` generation from `getFilterForInactiveCampaigns`
- Remove the `coverage:filtered` script from `package.json`

### Files to look at

- `vitest.campaign.config.mjs`
- `package.json`
- `test/filterForInactiveCampaigns.mjs`


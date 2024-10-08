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


## Create parameters for 2025 campaign and adapt dev banner

1. Create the page - https://meta.wikimedia.org/wiki/MediaWiki:WMDE_Fundraising/Campaign_Parameters_2025
   - When creating the page, copy the values from 2024. Kai will adapt it when needed.

2. Change the dev banner to point to the above given new parameter page - 
https://meta.wikimedia.org/wiki/Special:CentralNoticeBanners/edit/B22_WMDE_local_prototype
    - Change the start date and end date in this file as needed - src/environment/dev/CampaignParameterOverride.ts

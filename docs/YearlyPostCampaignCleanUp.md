<details>
    <summary>Purpose of this file</summary>
    The banner repository has to get ***cleaned up regularly** after every donation campaign 
    because we accumulate lots of "tech debt" (e.g. temporary features/bugfixes or unused code clutter) during the campaign.
    The big clean up usually happens in January-February of the following year.

    ⚠️ Do not delete this file!
</details>

- - - 
# List of tasks for the yearly "Post Campaign Clean Up"

## Delete all old banners 
1. Delete all banners that are older than the most recent one in each banner channel.
2. Also delete banners that merely served as prototypes
3. Give the most recent banners a new name:
   - change the campaign year
   - change the index number to 00
   - also adapt the tests and `campaign_info.toml`

## Create `campaign parameters` for 2025 campaign and adapt dev banner

1. Create the page - https://meta.wikimedia.org/wiki/MediaWiki:WMDE_Fundraising/Campaign_Parameters_2025
    - When creating the page, copy the values from 2024. Kai will adapt it when needed.

2. Change the dev banner to point to the above given new parameter page -
   https://meta.wikimedia.org/wiki/Special:CentralNoticeBanners/edit/B22_WMDE_local_prototype
    - Change the start date and end date in this file as needed - src/environment/dev/CampaignParameterOverride.ts


## Try lowering the maximum asset size and entry point size

Some features (SVG payment icons, fallback banners, slider) make the size of the compiled banner bigger, which triggers
a Webpack warning. The current "solution" was to set the limit to 310KB (from 250KB) to avoid the warning, but a better
solution would be to remove features. When that can be done, please check with lower limits.

### Files to look at:
- `webpack/webpack.production.js`


## Remove unused code

Some components or features might no longer be used and should be deleted.

Note:
You can use the command line tool `Knip` to support you finding unused code 
(be careful: it produces lots of false positives and does not find everything).

### Files to look at:
- CSS, vue and typescript/javascript, translation message files in the whole project

## Clean up event classes

Some banners used `events` directory in the banner directory and import it from there in all subsequent banners. We should not do that, but should accumulate all events in `@src/tracking/events` and clean up at the end of the campaign.
If any imports from the `@banners/` namespace remain in the "final" banner, they should be moved into `@src/tracking/events` instead. Also, the existing events there should be checked if any of them are unused. If they are, delete them.

### Files to look at

- `banners/*/LAST_BANNER/event_map*` (`LAST_BANNER` is a placeholder for the last banner (i.e. highest test number) in each channel)
- `src/tracking/events/*.ts`



## Remove old thank-you banners

- Delete `banners/thank_you` and rename `banners/thank_you_20XX` to `banners/thank_you`.
- Adapt `campaign_info.thank_you.toml`.


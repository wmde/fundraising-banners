# Dynamic Content

The campaign text is mostly static but contains some dynamic content. This content consists of things like:

* The number of days left in the campaign.
* The current day name.
* The average donation.
* The average number of donors.

This content is used to generate sentences that are displayed as part of the banner text content, and as values for the progress bar.

## Structure

### Generators
These are for building the sentences and progress bar items. There is a single generator per dynamic text item.

### Formatters
These are tools used by the generators for localizing numbers depending on if the banners are in German or English.

### Campaign Projection
The campaign team measures the progress of the campaign and uploads the current measurements every few days. We use these measurements to project the numbers displayed in the dynamic text. The calculation starts at the last upload time up to the point in time when the user sees the banner. The CampaignProjection is responsible for doing the calculations for this projection.

### Dynamic Campaign Text
The DynamicCampaignText class acts as a factory that instantiates the various generators.

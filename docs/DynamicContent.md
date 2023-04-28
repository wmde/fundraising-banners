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
These are tools used by the generators for localising numbers depending on if the banners are in German or English.

### Campaign Projection
The current campaign stats are only uploaded every few days during the campaign. The stats are then projected forward from the last upload time in order to keep the data as current as possible. The CampaignProjection is responsible for doing this projection.

### Dynamic Campaign Text
The DynamicCampaignText class acts as a factory that instantiates the various generators.

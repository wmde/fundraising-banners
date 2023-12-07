# How banners import use of funds

We have the requirement to easily change the use of funds content (kept in the
[fundraising-frontend-content](https://github.com/wmde/fundraising-frontend-content) repository)
during the campaign without having to re-deploy all the channels.
To fulfill that requirement, we have implemented 3 styles/solutions to import UoF content into the banners:

- *development environment*: Import JSON data directly. We do this to be able to use our 
  "[prototyping banner](https://meta.wikimedia.org/wiki/Special:CentralNoticeBanners/edit/B22_WMDE_local_prototype)" on
  CentralNotice which could only transclude one language version. 
- **WPORG production environment**: The content is in a data attribute on a page in Meta-Wiki. In our MediaWiki text wrapper,
  we transclude the content page. In our banner code we access the HTML element and the data attribute.
- **WPDE production environment**: For now, we import JSON data directly, since we only have 2 channels and deployment is easy
  (committing compiled content to the [wikipedia.de banner repository](https://github.com/wmde/wikipedia.de-banners)) 
  We might replace the direct import with a different solution if people edit the "use of funds" content multiple times
  during the campaign and the frequent re-deployments become too cumbersome.

## Changing the "Use of Funds" page at the beginning of the campaign

Each yearly campaign has two pages on meta.wikipedia.org that contain the "Use of Funds" data. You can generate this data with a script in the
[fundraising-frontent-content](https://github.com/wmde/fundraising-frontend-content) repository.
Each year, create two new pages on meta.wikipedia.org, one for English and one for German. Example pages from 2023 are:

* https://meta.wikimedia.org/wiki/MediaWiki:WMDE_Fundraising/UseOfFunds_2023_DE
* https://meta.wikimedia.org/wiki/MediaWiki:WMDE_Fundraising/UseOfFunds_2023_EN

To use different pages, change the setting `use_of_funds_source` in the file [`campaigns_info.toml`](../campaign_info_main.toml).

## Initializing the loader class in the entry points

Use the language- and channel-Specific factory class from `src/util/LocaleFactory`, e.g. `LocaleFactoryDe`, `LocaleFactoryEn` and `LocaleFactoryWpDe`.
The factory will do the necessary imports. Using the factory makes sure that each banner only bundles the dependencies
it actually uses.

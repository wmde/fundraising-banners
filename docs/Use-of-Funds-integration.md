# How banners import use of funds

We have the requirement to easily change the use of funds content (kept in the
[fundraising-frontend-content](https://github.com/wmde/fundraising-frontend-content) repository)
during the campaign without having to re-deploy all the channels.
To fulfill that requirement, we have implemented 3 styles/solutions to import UoF content into the banners:

- *development environment*: import JSON data directly
- **WPORG production environment**: The content is in data attribute on a page in Meta-Wiki. In our mediawiki text wrapper,
  we transclude the content page. In our banner code we access the html element and the data attribute.
- **WPDE production environment**: For now, we import json directly, since we only have 2 channels and deployment is easy
  (committing compiled content to the [wikipedia.de banner repository](https://github.com/wmde/wikipedia.de-banners)) 
  We might replace this with a different solution if this becomes too cumbersome.

TODO setting the UoF in campaigns_info.toml

TODO how does dev vs prod work?
    - environment specific loaders using webpack import aliases

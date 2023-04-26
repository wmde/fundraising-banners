# Loading different implementations in development and production

Sometimes we need to encapsulate differences between the compiled banner sources in production
(banner code wrapped in wikitext) and our
"[prototyping banner](https://meta.wikimedia.org/wiki/Special:CentralNoticeBanners/edit/B22_WMDE_local_prototype)" that
loads the banner code from your local server. The compiled banner code relies on the transclusion of
banner- and campaign-specific [MediaWiki templates](https://www.mediawiki.org/wiki/Help:Templates) which we don't have
in the prototyping banner.

If you need to load different implementations of a class or function, you can use the special `@environment/`
[resolve alias](https://webpack.js.org/configuration/resolve/#resolvealias) in your code. Example

```typescript
import { MyClass } from '@environment/MyClass';
```

You then need to put two different implementations in the directories `src/environment/prod` and `src/environment/dev`.
The files need the same name and need to export the same classes.

The different webpack configurations will resolve the imports from `@environment/` to the different paths.

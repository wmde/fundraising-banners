# WMDE Fundraising banners

This project is bundling all assets and dependencies of WMDE fundraising banners with Webpack.

## Installing dependencies

To install all dependencies run

    npm install

## Starting the preview

You can preview the banners by running the built-in server.

    npm run dev

The preview server is at [http://localhost:8084/](http://localhost:8084/)

It will display a selection of banners to preview in their respective channel (German Wikimedia / mobile German Wikipedia / wikipedia.de).

While the preview is running, you should be able to see changes immediately via hot reload.

## Check the sources

To verify the code is correct and up to our coding standards. These tests will also run in CI.

    npm run test
    npm run lint:js
    npm run lint:css

## Building the assets

To build a minified version of the banner into the `dist` directory run

    npm run build

## Using the compiled JavaScript on CentralNotice

After you have built the assets, the `dist` directory contains `.wikitext`
files that you can insert 1:1 in CentralNotice.

## Configuring campaigns, banners and tracking

The file `campaign_info.toml` contains the metadata for all banners and
campaigns. Webpack uses it to determine the unique file names of the
output and the input files, the so-called *[entry
points](https://webpack.js.org/configuration/entry-context/)*. Entry
points are the local files (configured with the setting `filename`) which
Webpack will compile to pure JavaScript code ( or JavaScript code wrapped
in wikitext for banners on wikipdia.org). The CentralNotice banner names
(which Webpack will also for the `devbanner` parameter in the preview)
come from the `pagename` setting.

Webpack uses the `campaign_tracking` and `tracking` parameters in
`campaign_info.toml` to create the tracking information inside the banner
code. Webpack passes the tracking information to the form fields and event
tracking pixels inside the banner.

## Creating new campaigns
1. Duplicate an existing folder with banner entry points, e.g. `banners/desktop`.
2. Create a new campaign and its banner configuration in `campaign_info.toml`.

### Creating A/B tests

TODO: Rewrite this section for different types of tests (text changes,
style changes, different behavior)

## Directory structure

- `archive/`: Archived banners
- `banners/`: Contains subdirectories for each campaign (sometimes also called
	a *channel*). Subfolder names *should* match the campaign names
	(top-level configuration sections in `campaign_info.toml`), but are
	not required to match.
  - `desktop/`: contains the entry points and the banner components for
	the desktop campaign.
- `dashboard/`: Dashboard UI that displays the overview of the
  banners in development mode.
- `dist/`: compiled banner code
- `src/`: All TypeScript code and components shared between banners
- `test/`: Unit and component tests
  - `unit`: Unit tests for small library functions.
  - `components`: Unit tests for components
- `themes/`: Theme files
- `webpack/`: Files related how we build the banners with webpack: Webpack
	plugins and loaders, a class that can process information from
	`campaign_info.toml` into smaller chunks.

## Conventions when writing unit tests

1. All test files must end in `.spec.ts`
2. Component tests must match the directory structure in `src/components/`.
   test file name must match component file name (PascalCase) with
   `.spec.ts` instead of `.vue` suffix.
3. Unit tests should replicate the directory structure and names
   (snake_case) in the `src/` directory.
4. Component tests should test:
   - Props have an effect. If a prop has a limited value range, e.g.
     boolean or a set of strings, test all possible values.
   - Computed properties
   - Event handlers
   - Passing props to children
   - Slots
5. Use `shallowMount` instead of `mount` in *every* test where you don't
   need to check the values of child components.

## How the preview feature works
* The webpack dev server loads the file `dashboard/index.html`, which requests a small Vue application inside the `dashboard` directory. The application renders an overview of campaigns and banners, generated from `campaign_info.toml`.
* `webpack-dev-server` has the ability to act as a proxy for certain URL paths, meaning that it will fetch the content for that
  path from a configured URL in the background and serve it transparently from the local host. The configuration tells the web server to relay the paths `/w`, `/wiki` and `/static` to the German Wikipedia at https://de.wikipedia.org. 
* There are two meta banners that read the `devbanner` parameter from the URL and insert it in a script tag with the same hostname as the webpack server (e.g. `localhost` or `10.0.2.2`).
  * [B22_WMDE_local_prototype](https://meta.wikimedia.org/wiki/Special:CentralNoticeBanners/edit/B22_WMDE_local_prototype) on CentralNotice
  * [dev-mode-wpde](https://github.com/wmde/wikipedia.de-banners/blob/master/dev-mode-wpde.js) on the [`wmde/wikipedia.de-banners` repository](https://github.com/wmde/wikipedia.de-banners) on GitHub.


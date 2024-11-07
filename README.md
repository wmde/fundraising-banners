# WMDE Fundraising banners

This project is bundling all assets and dependencies of WMDE fundraising banners with Webpack.

## Installing dependencies

To install all dependencies run

    npm install

## Starting the development preview

You can preview the banners by running the built-in server.

    npm run dev

The preview server is at [http://localhost:8084/](http://localhost:8084/)

It will display a selection of banners to preview in their respective channel (German Wikimedia / mobile German Wikipedia / wikipedia.de).

While the preview is running, you should be able to see changes immediately via hot reload.

### Start the preview with CSS linting

In the default preview, your SCSS won't be linted inside the preview. If you want CSS errors to appear in the console and as an overlay in the browsers, you can the preview with

    npm run dev-strict

The startup of the development environment will be a bit slower with this feature enabled (15-20 seconds).

### Starting the preview of the thank-you banners

If you want to work on the "thank you" banners, run

    npm run thankyou

## Checking the sources

To verify the code is correct and up to our coding standards. These tests will also run in CI.

    npm run test

will run all the tests. If you want to run only the banner integration tests, run

    npm run test:banners

To run all the code checks (CSS style, TypeScript type checks, TypeScript code style and best practices) run

    npm run lint

See `package.json` or run `npm run` for an overview of individual checks.

To run both tests and code checks, run

    npm run ci

## Building the assets

All build commands will clear out the `dist/` directory.

### Building all the banners
To build minified versions of all the banners into the `dist` directory run

    npm run build

### Building a set of banners for a specific channel or campaign 
To build the assets for a specific channel, run

    npm run build:channel CHANNEL_NAME

`CHANNEL_NAME` is the name of the channel in `campaign_info.toml`, e.g. `desktop`, `mobile`, `pad`, `english`, etc.

You can also use the campaign name (from the `campaign` key in the TOML file) as the argument to build a specific campaign.

    npm run build:campaign CAMPAIGN_NAME

### Building the "Thank You" banners
If you want to build the "thank you" banners for all the channels, run

    npm run build:thankyou

## Using the compiled JavaScript on CentralNotice

After you have built the assets, the `dist` directory contains `.wikitext`
files that you can insert 1:1 in CentralNotice.

## Configuring campaigns, banners and tracking

The file `campaign_info.toml` contains the metadata for all banners and
campaigns. Each campaign definition is for a *channel*. A "channel" is a
combination of Website (wikipedia.org or wikipedia.de), platform (desktop,
mobile, ipad) and language (German, English). Each channel has a name.

Webpack uses `campaign_info.toml` to determine the unique file names of the
output and the input files, the so-called *[entry
points](https://webpack.js.org/configuration/entry-context/)*. Entry points are
the local files (configured with the setting `filename`) which Webpack will
compile to pure JavaScript code ( or JavaScript code wrapped in wikitext for
banners on wikipdia.org). The CentralNotice banner names (which Webpack will
also for the `devbanner` parameter in the preview) come from the `pagename`
setting.

Webpack uses the `campaign_tracking` and `tracking` parameters in
`campaign_info.toml` to create the tracking information inside the banner
code. Webpack passes the tracking information to the form fields and event
tracking pixels inside the banner.

The [Banner Screenshots](https://github.com/wmde/banner-screenshots) software
uses the `.test_matrix` subsection of each channel to determine which browser
platforms and resolutions to test each banner on.

The `npm run test` and `npm run lint` commands also check the `campaign_info.toml`
file to determine which files in the `banners/` directory to check.

## Creating new campaigns
1. Duplicate an existing folder with banner entry points, e.g. `banners/desktop/C24_WMDE_Desktop_DE_02`.
2. Create a new campaign and its banner configuration in `campaign_info.toml`.

## Developing and building "thank you" banners

The "thank you" banners have a special configuration file, `campaign_info.thank_you.toml`.
Edit this file for the necessary campaign and tracking parameters.

To use this file instead of the standard `campaign_info.toml` file, run `npm run thankyou` instead of `npm run dev`.
This environment does *not* use `nodemon` to watch for changes in `campaign_info.thank_you.toml`.
If you change that file or one of the webpack configuration files, you need to restart the server.

To build the "thank you" banners, run `npm run build:thankyou` instead of `npm run build`.

### Creating A/B tests

TODO: Rewrite this section for different types of tests (text changes,
style changes, different behavior)

## Directory structure

- `banners/`: Contains subdirectories for each channel and the campaigns in each channel. Subfolder names *should* match the channel names
	(top-level configuration sections in `campaign_info.toml`) and campaigns names, but are
	not required to match.  Example: `banners/desktop/C24_WPDE_Desktop_01`: contains the entry points and the banner components for
	the desktop campaign.
- `dashboard/`: Dashboard UI that displays the overview of the
  banners in development mode.
- `dist/`: compiled banner code
- `src/`: All TypeScript code and components shared between banners
  - `components/`: Vue single-file components. Each component can be in a
	  subdirectory.
- `test/`: Unit and component tests
  - `unit`: Unit tests for small library functions.
  - `components`: Unit tests for components
  - `features`: Collections of banner feature tests. They are not standalone, but a library for the tests in `test/banner`
  - `banner`: Banner feature tests for each banner. File structure follows the pattern `test/banner/CHANNELNAME/CAMPAIGN_NAME`
- `themes/`: Theme style files
  - `theme1/`: Theme folder for one theme, containing files for components.
     The directory structure inside the theme folder should replicate the 
	 directory structure in `src/components/`
- `webpack/`: Files related how we build the banners with webpack: Webpack
	plugins and loaders, a class that can process information from
	`campaign_info.toml` into smaller chunks.

## Banner themes

Each component in `src/components` defines their "layout" style
(positioning, flex, padding reset, etc) inside its `<style>` section.

You must put all other styling (colors, fonts, borders, etc.)in a theme
file of the same name as the component.  
Example: The theme files for the themes `foo` and `bar` for the component
`src/components/Icons/CloseIcon.vue` are
`themes/foo/Icons/CloseIcon.scss` and `themes/bar/Icons/CloseIcon.scss`

Each banner has a `styles.scss` file that imports all the component
styles. You must import this style file in the `<style>` section of the
top-most component, e.g. `banners/desktop/components/MainBanner.vue`:

```
<style>
@use "../styles/styles";
</style
```

At the moment, you have to know which components a banner uses and add and
remove the right `@use` statements for the component theme files to
`styles.scss`. In the future we might use Webpack to validate the imports.

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
* The Webpack dev server loads the file `dashboard/index.html`, which requests a small Vue application inside the `dashboard` directory. The application renders an overview of campaigns and banners, generated from `campaign_info.toml`.
* `webpack-dev-server` has the ability to act as a proxy for certain URL paths, meaning that it will fetch the content for that
  path from a configured URL in the background and serve it transparently from the local host. The configuration tells the web server to relay the paths `/w`, `/wiki` and `/static` to the German Wikipedia at https://de.wikipedia.org. 
* There are two meta banners that read the `devbanner` parameter from the URL and insert it in a script tag with the same host name as the Webpack server (e.g. `localhost` or `10.0.2.2`).
  * [B22_WMDE_local_prototype](https://meta.wikimedia.org/wiki/Special:CentralNoticeBanners/edit/B22_WMDE_local_prototype) on CentralNotice
  * [dev-mode-wpde](https://github.com/wmde/wikipedia.de-banners/blob/master/dev-mode-wpde.js) on the [`wmde/wikipedia.de-banners` repository](https://github.com/wmde/wikipedia.de-banners) on GitHub.

For offline previewing of banners for wikipedia.de (when the banner server is not available), you can use the URL http://localhost:8084/wpde-offline?devbanner=YOUR_BANNER_NAME (replacing the placeholder by copy-pasting from `campaign_info.toml`). In the future, we might add an "offline mode" that's integrated into the dashboard and works without proxying.

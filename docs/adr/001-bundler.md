# Used bundler

Date: 2023-02-07

Deciders: Abban Dunne, Corinna Hillebrand, Gabriel Birke, Tanuja D.

## Status

Accepted

## Context

On wikipedia.org we can't deploy banners as a set of files. Instead, we
must deploy one file that needs to contain all assets and resources.
"Deploy" in this context means pasting JavaScript code wrapped in wikitext
and a `<script>` tag into a text field.

But we still want to develop using ES6/TypeScript modules and Vue
components. Therefore, our bundler must be configured in a way that each
entry point (a small TypeScript file that imports the main component and
calls `createApp`) bundles all JavaScript and CSS from the entry point
dependencies into one file.

Possible bundlers for this task are Webpack, Vite and Rollup.

## Decision

We decided to use Webpack as a bundler, because "bundling into one file"
is its default behavior. Also, we already have a working Webpack
configuration for the banners.

Vite tries to modularize the code as much as possible and its support for
more than one entry point (each entry point with its own dependency tree)
is not good enough at the moment (January 2023). We experimented with Vite
and found that configuring Vite for our use case would go "against the
grain" of this tool.

Vite uses Rollup "under the hood", so it's unclear if we would run into
similar trouble or if we would be building a "custom Vite" just for our
use case. 

We don't know how well the `vue-loader` plugin of Webpack will be
supported in the future. Or if future Vite versions will support or use
case better, but at the moment Webpack looks like the best choice.

## Consequences

With our Webpack setup we can build the banner code exactly like we want
to, possibly at the cost of some build speed and features that Vite would
bring.


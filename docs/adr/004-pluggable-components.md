# Pluggable components

Date: 2023-04-24

Deciders: Abban Dunne, Corinna Hillebrand, Gabriel Birke, Tanuja D.

## Status

Accepted

## Context

In the old banners we used a React-ish* way to make components pluggable for A/B tests. We want to replicate this
but use patterns recommended by the Vue.js team.

(*) Components are passed through the tree as props. 

Patterns we considered:

* Components as props similar to how we did it in React.
* Top level component that defines the subcomponents to be used in slots.
* Components that are registered globally in the entry point.

## Decision

We decided to use Vue slots

### Benefits of Slots
* Allows visible hierarchy in the banner components.
* All used components are imported in a single file making it easy to compare A/B tests against one another.
* This is the recommended method for dynamic components by the Vue team.
* Internally, we can encapsulate components (i.e. import them in a child component) and only expose them as slots when
  needed.
* All pluggable component imports in one place

### Drawbacks of Slots
* Passing props and event handlers from a child component with slots to the top level component is confusing, 
  and it can make it hard to see what's going on.
* We need a separate top level component for each of the CTRL/VAR banners.
* Top level component gets long.
* Two files to compare - entry point and top-level component

### Drawbacks of Components as Props
* Passing component definitions as props isn't really the Vue way of doing things.
* It would introduce those props all through the component hierarchy as they need to be passed around.

### Drawbacks of Globally Registered Components
* The IDE doesn't like it.
* Global components can be used anywhere, meaning there's no enforcement of hierarchy.
* To find component usages we would need to do a text search.
* It's hard to see the banner structure when all components are registered in a single list.

## Consequences

* Components will be "pluggable" for having them easy to use in A/B tests
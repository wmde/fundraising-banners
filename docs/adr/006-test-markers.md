# Test markers to separate testing from styling

Date: 2025-02-05

Deciders: Abban Dunne, Corinna Hillebrand, Gabriel Birke, Tanuja D.

## Status

Rejected

## Context

Our unit and integration tests use class names for finding elements (to
check their existence or to trigger their events). This leads to two
problems:

1. In cases where we want to improve the semantics of names for styling by
   simplifying/restructuring the markup, we need to keep the old class
   names to avoid breaking the tests. See 2024 Mobile-DE-11.
2. In cases where we introduce a new element for similar purposes (e.g.
   close button with and without text) we need to use the old class name
   to avoid breaking the tests and need to specify the CSS with a
   qualifying 2nd class.

To avoid these problems, we're thinking about separating *style names* from
*markers for testing*.


## Decison

We decided that we continue with our practice of using style-focused CSS
class names as selectors in tests and won't be using "test markers" in our
code.

This decision is based on the following factors:

- We want to keep the banners as small as possible, not shipping any
  code that is only for testing proposes to production
- the vitest/jsdom selectors don't support selecting on data attributes
- name conflicts have been a rare occurrence


### Other options considered

#### Test markers as unique IDs in data attributes

Example

```html
<button class="wmde-banner-close-button" data-tm="soft-close-close-button">
  <Icon/>
</button>
```

```typescript
await wrapper.find( '[data=soft-close-close-button]' ).trigger( 'click' );
```

### Test markers with local semantic meaning in data attributes

Example

```html
<div class="wmde-banner-soft-close" data-tm="soft-close">
    <button class="wmde-banner-close-button" data-tm="close-button">
      <Icon/>
    </button>
    <!-- Other elements go here -->
</div>
```

```typescript
await wrapper.find( '[data=soft-close] [data=close-button]' ).trigger( 'click' );
```

Benefits:

- Shorter, composable marker names
- Allows for reusable components, without having to make their test marker name a
  property
- Feels "expressive"
- Less probability of name collision when introducing a new element with
new meaning (context), but same name as existing 


Drawbacks:

- Puts more burden on the developer to find the right "path" of selectors
  in the tests

### Test markers in class names

```html
<button class="wmde-banner-close-button tm-soft-close-close-button">
  <Icon/>
</button>
```

```typescript
await wrapper.find( 'tm-soft-close-close-button]' ).trigger( 'click' );
```

Benefits:
- More performant selectors (See [Don't use HTML data attributes to find
elements with JS][1])
- More compact banner code


Drawbacks:
- No enforcement to using only the test marker class names in tests
- "Overloading" the class attribute, only implicit separation of concerns

### Doing nothing, keep the status quo

We consider the problems outlined in the "Context" section edge cases that
don't necessitate the additional effort. We'll revisit this decision and
this document after the 2024 and 2025 campaign in January 2024 and 2025.
We'll check of many of these edge cases we encountered and if the
additional effort and banner size of separating the concerns is worth it.


## Consequences (in case we decide to do something)

[1]: https://intu.io/blog/dont-use-data-attributes-to-find-html-elements-with-js/


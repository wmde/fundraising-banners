# CSS and Styling

## Layout and themes

Each component has two sets of styles:

- **layout** styles define how the component fits inside the banner (e.g. `display`, `width`, `flex` properties) and  
  how it changes visibility/visual behavior when the component script adds "marker classes" (e.g. `.has-error`, `.is-visible` etc ) 
  We define the layouts as SCSS mixins.
- **theme** styles define the appearance of the component: margins, paddings, font sizes, colors, borders, etc.
  They may override *some* properties defined in the layout. 

## Including styles for a banner

Create a file called `styles.scss` in your channel directory. Add a [`@use` statement](https://sass-lang.com/documentation/at-rules/use)
for every component the banner uses, pointing to the theme file. Example:

```scss
@use 'src/themes/treedip/ButtonClose/ButtonClose';
@use 'src/themes/treedip/ProgressBar/ProgressBar';
@use 'src/themes/treedip/DonationForm/MultiStepDonation';
```

Some components might share a theme file, so the component:theme association might not be 1:1. 

Import the file at the top of your banner entry point (`banner_ctrl.ts` and `banner_var.ts`) like this:

```typescript
import "./styles/styles.scss";
```

If the Variant (VAR) banner uses different components or a different design, create a second style import file called 
`styles_var.scss` and import it in your `banner_var.ts` file. 

Make sure to always delete the `styles_var.scss` file when you start a new banner test! If the variant banner "won"
in the previous test, copy its contents to `styles.scss` and delete the `styles_var.scss`.
This makes sure that you're only using an alternate style file if you really need to. 

### Overriding styles for a channel

In some rare cases you might put some additional styles in the `styles.scss` file at the bottom,
but make sure to remove them at the start of the next test! 

## How to create layout and theme files for a component

1. create the layout SCSS file, named after the component. Put all the styles in a [mixin](https://sass-lang.com/documentation/at-rules/mixin).
2. Create the mixin under the assumption that it will be included in the class `.wmde-banner`.

Example layout for a close button component:

```scss
@mixin layout{
  &-close {
    position: absolute;
    top: 0;
    right: 0
  }
}
```

3. In each theme, create another SCSS file named after the component (replicating the folder structure in `src/components/`).
4. Use the layout file and include it in the theme file in the `.wmde-banner` class (our general namespace class prefix) like this:

```scss
@use 'src/components/ButtonClose/ButtonClose';

.wmde-banner {
  @include ButtonClose.layout;
  &-close {
    // Theme definitions here
  }
}
```

## Naming conventions

We prefer flat hierarchies, try to avoid nesting and use prefixes instead.
All classes start with our "namespace" of `.wmde-banner`

To avoid having to type long class names, we use the `&` operator to create sub-namespaces 

Example SCSS:

```scss
.wmde-banner {
  &-form {
    display: flex;

    &-submit {
      display: inline-block;
    }
  }
}
```

This will generate the following CSS:

```css
.wmde-banner-form { display: flex }
.wmde-banner-form-submit { display: inline-block}
```

We use an addition set of classes with the prefix `.t-` for testing with our ["Dandy" Test Suite](https://github.com/wmde/Dandy)

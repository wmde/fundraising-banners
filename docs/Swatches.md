# Swatches

The Vector 2022 Wikipedia skin now supports dark mode and that means our banners are now required to support it.

## Changes

- Removed the `_colors.scss` file that contained our colour settings.
- Added a swatch folder into the themes that implement the colours as [css vars](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).
- Added swatches to the Use of Funds, and Fallback banner themes.

## Implementation Notes

### Naming Scheme Changes

Because we now need fine-grained control of how each colour for each part of the banners are defined, we needed to change the naming scheme.

Our old structure for colours was based around the names of the colours:

```scss
$primary: #386d94;
$secondary: #da9000;
$error: #dd3333;  
  
$white: #ffffff;  
$black: #000000;  
$gray: #54595d;  
$gray-medium: #a2a9b1;  
$gray-light: #e5e5e5;  
```

While we still keep variables for the colours for convenience, the new structure gets rid of this convention and defines the colour variables per feature:

[color_light.scss](https://github.com/wmde/fundraising-banners/blob/main/src/themes/Treedip/swatches/light.scss)
```scss
$white: #ffffff;  
$black: #000000;  
  
$grey100: #f8f9fa;  
$grey150: #dddddd;  
$grey200: #bbbbbb;  
$grey300: #b7b7b7;  
$grey500: #808080;  
$grey600: #747474;  
$grey700: #202122;  
  
$red600: #990a00;  
  
$blue600: #4465a7;  
$blue700: #2a4b8d;

--main-background: #{$white};  
--main-color: #{$grey700};  
--main-title-line-background: #{$red600};  
--main-border-bottom: #{$grey200};  
--message-border: #{$red600};
```

This means that rather than defining global colours to be used in our styles we now define css variables on a component/feature level.

### Using Swatches With Skins

Because not all skins support dark mode, and when they do they'll most likely have slightly different ways of implementing it, we need a flexible way of including the vars into the banners that run on them.

This resulted in the swatch files being split up into colour definitions and implementations, for example the files in the swatch folder look like this:

```
/swatches
    color_dark.scss // Colours for dark theme
    color_light.scss // Colours for the light theme
    skin_default.scss // Default implementation for skin that doesn't have dark mode
    skin_vector-2022.scss // Vector 2022 implementation that includes dark mode
```

The [`color_dark.scss`](https://github.com/wmde/fundraising-banners/blob/main/src/themes/Treedip/swatches/dark.scss) and [`color_light.scss`](https://github.com/wmde/fundraising-banners/blob/main/src/themes/Treedip/swatches/light.scss) files are the colour definitions. They contain all the variables to control all the colours in the banner. They provide these vars through a mixin.

The [`skin_default.scss`](https://github.com/wmde/fundraising-banners/blob/main/src/themes/Treedip/swatches/default.scss) and [`skin_vector-2022.scss`](https://github.com/wmde/fundraising-banners/blob/main/src/themes/Treedip/swatches/vector-2022.scss) files are the per-skin implementations of the colours. They contain css selectors that target the light or dark mode skin and insert the variables from the colour definitions into them.

Banners that are running on skins that don't have a dark mode toggle can include the `skin_default.scss` implementation. The variables are declared inside the `.wmde-banner` selector.

Banners that are running on the Vector 2022 skin can include the `skin_vector-2022.scss`. The variables in this are declared 4 times:

1. When the donor has selected *Light Mode*.
2. When the donor has selected *Dark Mode*.
3. When the donor has selected *Automatic* and their OS is set to *dark mode*.
4. When the donor has selected *Automatic* and their OS is set to *light mode*.

If/when another skin starts to implement dark mode we will need to create a new implementation for that.

### Optional Variables

Because all banners don't include all components/features, we define [default scss variables](https://sass-lang.com/documentation/at-rules/use/#configuration) as boolean flags in the swatch implementations that allow you to include only the variables for the features the banner uses. This helps keep the compiled css a little smaller, especially on banners that need to declare the variables 4 times.

Whenever you add a new component/feature, you'll have to add a section to `colors_light.scss` and `colors_dark.scss` where you define the new color names:

```scss
$grey150: #eeeeee;

@mixin swatch(
    // ...
    $myNewFeature: false,
    // ...
) {
    @if $myNewFeature {
        --my-new-feature-background: #{$grey150};
        --my-new-feature-border: #{$grey150};
    }
}
```

You also need to add the flag to the skin file:

```scss
$myNewFeature: false !default;

.wmde-banner {
    @include light.swatch(
        // ...
        $myNewFeature,
        // ...
    );
}

```

### Using Swatches

You import the swatch for the skin the banner is running on at the top of the banner's `style.scss`. Then add the flags for the features/components used in your banners, e.g.:

```scss
@use 'src/themes/Treedip/swatches/skin_default' with (
    $slider: true,
    $progress-bar: true,
    $select-group-button: true,
    $upgrade-to-yearly: true,
    $fallback-banner: true,
);
```

Not all banner themes use swatches yet, but all banners will need to include the Use of Funds swatches:

```scss
@use 'src/themes/UseOfFunds/swatches/skin_default' as uof-default;
```

Please note the use of namespacing here as the compiler will complain if we use 2 modules with the same name and default is already defined when importing the main swatch.

### Converting a theme to a swatch:

When you need to convert an existing theme to use the swatches you should follow these steps:

1. Create `color_light.scss` and `skin_default.scss` files in a swatches folder.
2. Copy the colours from the `variables/_colors.scss` file into the `color_light.scss`.
3. Add the swatch mixin.
4. Add the global colour variables that will be used in every banner (`--main-background`, `--main-color`, etc.). These won't need a feature flag.
5. Go through each of the component folders and where needed:
   1. Add a feature/component flag into the colour mixin and skin defaults.
   2. Replace the colours in the component styles with new variables that target that feature/component.
   3. Refresh the banner and make sure the feature/component still has it's colour.
6. Go through every banner that uses the theme and update the imports and swap any color variables to the css vars in the banner stylesheets.
7. Once you've replaced all the colours in your theme you should rename the colour variables following the [semantic colour system](https://dev.to/ynab/a-semantic-color-system-the-theory-hk7). 
8. Delete the old colours.scss, and check if the compiler is throwing errors due to missing imports and fix them.

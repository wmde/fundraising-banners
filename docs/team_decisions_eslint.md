## Code styling rules

There are 3 stylistic rules that change how our code looks fundamentally and introduce broad changes in our code base. While creating the code styles in the frontend and banner repositories I started with the frontend repo and activated the styles, but shied away from activating them in the banner repo:

### Dangling commas
https://eslint.style/rules/js/comma-dangle

Enforce or forbid a comma at the last element of objects, arrays, enums, etc?
Pro: Easier to add and remove elements
Pro: Prettier diffs
Con: Inconsistent with JSON notation

### Spaces around operators and union types
https://eslint.style/rules/js/space-infix-ops

Would enforce spaces around mathemetical operators, assignment operators, etc

Pro: Consistent everywhere
Con: By default also puts spaces around union types, e.g. `(): TypeA | TypeB => { /* some_code */ }` instead of `(): TypeA|TypeB => { /* some_code */ }`. We're using union types extensively, which will lead to one huge code change when we introduce this rule.

If we want to keep the current code in the banner repo ( spaces around operators but not around union type separators) we need to add the `ignoreTypes` option to the rule, see https://eslint.style/rules/ts/space-infix-ops

### Delimiters in interfaces and type definitions
https://eslint.style/rules/default/member-delimiter-style

We used commas in the past, but the new default (and recommended
TypeScript style) is semicolons.

Example: 

```typescript
// Type definitions
function foo(): { a: number, b: string } {
  return { a: 1, b: '2' };
}

// vs

function foo(): { a: number; b: string } {
  return { a: 1, b: '2' };
}

// interfaces
interface Bar {
    a: number,
    b: string,
}

interface Bar {
    a: number;
    b: string;
}
```

Con: Large code change, esp. in type definitions
Con: Type definition notation looks different than return object.
Con: Might mess with habits/muscle memory
Pro: Good idea to go with recommended defaults
Pro: Semicolons don't interfere with our comma-dangle rules/consistency


## Vue styling rules
### When to do multiline attributes (splitting components)
https://eslint.vuejs.org/rules/max-attributes-per-line.html

### Forbid default value of "true" for boolean properties, always assume false
https://eslint.vuejs.org/rules/no-boolean-default.html

Would force us to rename some "positive" properties that have "true" as default name.

### Forbid binding dynamic values in HTML to string literals
https://eslint.vuejs.org/rules/no-useless-v-bind.html

`<MyComponent :prop="'value'"></MyComponent>` -> `<MyComponent prop="value"></MyComponent>`

We'd have to check how that affects our banner code

### Enforce two `class` properties for static and dynamic classes on elements
https://eslint.vuejs.org/rules/prefer-separate-static-class.html

` <MyComponent class="static" :class="dynamicValue"></MyComponent>` -> `<MyComponent class="['static', dynamicValue]"></MyComponent>`



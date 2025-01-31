# Form Actions

A `form action` is the action an HTML form will perform when the form gets submitted.
In our case the action can be different **URLs** that the user will then get redirected to (spenden.wikimedia.de).

The URL can have different paths and parameters.
It depends on different A/B tests we want to perform on the fundraising application.

The banners currently use different Vue `composables` that help encapsulating the URL creation process:

## useFormAction.ts
- basic URL that redirects to an anonymous donation process or a donation page where they can choose address options

## useFormActionWithReceipt.ts
- used when the donation form asks the user about whether they need a receipt

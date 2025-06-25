# Form Actions

## Background information
A `form action` is URL in an HTML that the browser will send the form data to, when the user submits the form.
In our case, the actions are two different **end points** (URL with protocol, host name and path ) of the fundraising application:

- One for showing the donation form, with pre-filled payment data (path `/donation/new`)
- One for immediately creating an anonymous donation (path `/donation/add`)

The Fundraising Application also needs different **URL parameters** from the banner:

- The Matomo campaign parameters for associating a donation with a banner
- Impression counts, to check the effectiveness of showing banners repeatedly.
- (optional) Additional parameters that trigger A/B test or feature toggle behavior 

### Important classes
- The `FormAction` class encapsulates URL generation with the different parameters, with the tracking parameters being mandatory. Do not add parameters to the URL via string concatenation, always use its `setParameter` functions!
- The `FormActionCollection` holds the two actions.

These two classes are part of the entry point initialization (`banner_ctrl.ts` and `banner_var.ts`), are not reactive. We inject the initialized `FormActionCollection` with the `formActions` key, so all components have access to it.
To choose one action (and potentially changing parameters) means our form action must be _reactive_. We achieve this though using Vue composables, by default `useFormAction`.

## Default form action
- **file name(s):**
    - `useFormActions.ts`
    - `FormActions.ts`
    - `createFormActions.ts`
    - `MultiStepDonation.vue` (can override default form action from `useFormAction`)
- **description:**
  - If the user can explicitly choose anonymous donations in the form (setting `formModel.addressType.value` to `AddressTypes.ANONYMOUS.value`) _and_ the payment type is not direct debit, then it will return the URL for the direct, anonymous donation
  - In all other cases, it will return the URL for the donation
- **used in (banner name):**
  - All banners not listed elsewhere in this document. 


## useFormActionWithReceipt.ts
- **file name(s):**
    - `useFormActionWithReceipt.ts`
    - `FormActions.ts`
    - `createFormActions.ts`
    - `BannerCtrl.vue` / `BannerVar.vue` (sets result of custom form action composable to `form-action-override` of `MultiStepDonation` component )
- **description:**
  - See [Show Donation Receipt checkbox only below a certain amount threshold with different submit button labels](DonationForms.md)
- **used in (banner name):**
  - `WMDE_FR_2025_Desktop_DE_00 VAR` 
  - `WMDE_FR_2025_Desktop_EN_00 VAR` 

## Creating a new banner test with same banner, but different A/B test behavior in the Fundraising application

Edit the `banner_var.ts` entry point and add additional parameters to the call `createFormActions`:

```typescript
// example CTRL
app.provide( 'formActions', createFormActions( page.getTracking(), impressionCount ) );
// example VAR
app.provide( 'formActions', createFormActions( page.getTracking(), impressionCount, { ap: '1' } ) );

```

## Creating a new behavior, based on form state
Create a new `useFormActionZZZ` composable (see default `useFormAction.ts` for reference), use it in `BannerVar.vue`. Set `formAction.value` of custom form action composable to `form-action-override` of `MultiStepDonation` component


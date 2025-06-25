# Donation Forms

- - - 
## Main Donation Form Page

### Basic Main Form
- **file name(s):**
  - `MainDonationForm.vue`
- **description:**
  - Basic Donation form that asks the user for interval, payment type and amount
  - The button is set to `MainDonationFormButtonMultiStep.vue`, so it can dynamically change its label depending on 
    interval and payment type.
- **used in (banner name):**
  - `WMDE_FR_2025_Mobile_EN_00`
  - `WMDE_FR_2025_iPad_DE_00`
  - `WMDE_FR_2025_Mobile_00`
  - `WMDE_FR_2025_Desktop_00`

### Dynamic amount options
- **file name(s):**
  - `MainDonationFormAdaptiveAmounts.vue`
- **description:** 
  - This form allows to pass in amount options for the donation form directly with a new property.
  - The amounts no longer come from the `form_items.ts` file. Instead, the (mobile) banner component that
     includes `MainDonationFormAdaptiveAmounts.vue` has two sets of amounts and changes them, depending on which button
     the user clicked in the mini banner.
  - It is used for the mobile banners (full page form) to react to the situation when a user chooses "other amount" 
    in the MiniBanner and should see different amount options than the amount suggestion they already got in the MiniBanner ("donate 10€").
    - It got introduced in `WMDE_FR_2025_Mobile_DE_10`
- **used in (banner name):** 
  - `WMDE_FR_2025_Mobile_DE_00` 


### 🗑️ Show Donation Receipt checkbox (generic)
- **important file(s):**
  - `MainDonationFormReceipt.scss`
- **difference:**
  - Show additional checkbox on the form that asks whether the user needs a donation receipt.
  - This influences whether we offer the user to donate anonymously or not.
- **used in (banner name):**
  - no longer used

### 🗑️ Show Donation Receipt checkbox only below a certain amount threshold
- **extends:**
  - `Show Donation Receipt checkbox`
- **important file(s):**
  - `MainDonationFormReceipt.scss`
  - `MainDonationFormReceiptAboveValue.vue`
  - `MainDonationFormPaymentsAndReceiptButton.vue`
  - `useFormActionWithReceipt.ts`
- **difference:**
  - It got introduced in `WMDE_FR_2025_Desktop_EN_07_var`.
  - When a user selects <10€ a checkbox will appear and ask whether they need a donation receipt.
  - When the user selects >=10€ they will get sent to `?ap=1` without a checkbox
    - Depending on the choice, this will mean: 
      - anonymous donation (directly to payment provider) 
      - or 
      - go to fundraising page to enter the address data first
  - https://phabricator.wikimedia.org/T382304
- **used in (banner name):**
  - no longer used

### Show Donation Receipt checkbox only below a certain amount threshold with different submit button labels
- **extends:**
  - `Show Donation Receipt checkbox only below a certain amount threshold`
- **difference:**
  - the Submit Button shows different labels, depending on address type, amount, payment type, receipt checkbox
- **important file(s):**
  - `MainDonationFormReceipt.scss`
  - `MainDonationFormReceiptAboveValueDynamicLabel.vue`
  - `MainDonationFormPaymentsAndReceiptButtonDynamicLabel.vue`
- **used in (banner name):**
  - `WMDE_FR_2025_Desktop_DE_00`
  - `WMDE_FR_2025_Desktop_EN_00`
  - `WMDE_FR_2025_Mobile_DE_00`
  - `WMDE_FR_2025_Mobile_EN_00`
  - `WPDE_FR_2025__Mobile_00`
  - `WPDE_FR_2025_Desktop_00`

- - -
## Upgrade to Yearly Form Page

### Upgrade to Yearly Form
- **file name(s):**
  - `UpgradeToYearlyButtonForm.vue`
  - `SubmittableUpgradeToYearly.ts`
- **description:**
  - Banner form page that shows upsell buttons, asking the user to increase the payment interval to "yearly".
  - This is supposed to increase recurring donations.
- **used in (banner name):**
  - `WMDE_FR_2025_Desktop_DE_00`
  - `WMDE_FR_2025_Desktop_EN_00`
- - -

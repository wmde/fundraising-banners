# Donation Forms

- - - 
## Main Donation Form Page

### Basic Main Form
- **file name(s):**
  - `MainDonationForm.vue`
- **description:**
  - TBD
- **used in (banner name):**
  - `C25_WMDE_Mobile_EN_00`
  - `C25_WMDE_iPad_DE_00`
  - `C25_WPDE_Mobile_00`
  - `C25_WPDE_Desktop_00`

### Dynamic amount options
- **file name(s):**
  - `MainDonationFormAdaptiveAmounts.vue`
- **description:** 
  - This form allows to pass in amount options for the donation form directly with a new property.
  - It got introduced in `C24_WMDE_Mobile_DE_10`
- **used in (banner name):** 
  - `C25_WMDE_Mobile_DE_00` 


### Show Donation Receipt checkbox (generic)
- ( no longer used )
- **important file(s):**
  - `MainDonationFormReceipt.scss`
- **difference:**
  - Show additional checkbox on the form that asks whether the user needs a donation receipt.
  - This influences whether we offer the user to donate anonymously or not.
- **used in (banner name):**
  - TBD

### Show Donation Receipt checkbox only below a certain amount threshold
- ( no longer used? )
- **extends:**
  - `Show Donation Receipt checkbox`
- **important file(s):**
  - `MainDonationFormReceipt.scss`
  - `MainDonationFormReceiptAboveValue.vue`
  - - `MainDonationFormPaymentsAndReceiptButton.vue`
- **difference:**
  - It got introduced in `B24_WMDE_Desktop_EN_07_var` 
  - When a user selects <10€ a checkbox will appear and ask whether they need a donation receipt.
  - When the user selects >=10€ they will get sent to `?ap=1` without a checkbox
    - Depending on the choice, this will mean: 
      - anonymous donation (directly to payment provider) 
      - or 
      - go to fundraising page to enter the address data first
  - https://phabricator.wikimedia.org/T382304
- **used in (banner name):**
  - TODO

### Show Donation Receipt checkbox only below a certain amount threshold with different submit button labels
- **extends:**
  - `Show Donation Receipt checkbox only below a certain amount threshold`
- **difference:**
  - TODO
- **important file(s):**
  - `MainDonationFormReceipt.scss`
  - `MainDonationFormReceiptAboveValueDynamicLabel.vue`
  - `MainDonationFormPaymentsAndReceiptButtonDynamicLabel.vue`
- **used in (banner name):**
  - `C25_WMDE_Desktop_DE_00`
  - `C25_WMDE_Desktop_EN_00`


## Upgrade to Yearly Form Page

- - -

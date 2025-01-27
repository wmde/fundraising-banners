# Donation Forms

- - - 
## Main Donation Form Page

### Dynamic amount options
- **file name(s):**
  - `MainDonationFormAdaptiveAmounts.vue`
- **description:** 
  - This form allows to pass in amount options for the donation form directly with a new property.
  - It got introduced in `C24_WMDE_Mobile_DE_10`
- **used in (banner name):** 
  - `C25_WMDE_Mobile_DE_00` 


### Show Donation Receipt checkbox
- **important file(s):**
  - `MainDonationFormReceipt.scss`
- **difference:**
  - Show additional checkbox on the form that asks whether the user needs a donation receipt.
  - This influences whether we offer the user to donate anonymously or not.
- **used in (banner name):**
  - `C24_WMDE_Desktop_EN_07` VAR
  - `C25_WMDE_Desktop_EN_00` VAR

### Show Donation Receipt checkbox above certain value
- **extends:**
  - `Show Donation Receipt checkbox`
- **important file(s):**
  - `MainDonationFormReceipt.scss`
  - `MainDonationFormReceiptAboveValue.vue`
  - ...
- **difference:**
  - It got introduced in `B24_WMDE_Desktop_EN_07_var` 
  - When a user selects <10€ a checkbox will appear and ask whether they need a donation receipt.
  - When the user selects >=10€ they will get sent to `?ap=1`
    - Depending on the choice, this will mean: 
      - anonymous donation (directly to payment provider) 
      - or 
      - go to fundraising page to enter the address data first
  - https://phabricator.wikimedia.org/T382304
- **used in (banner name):**
  - `C25_WMDE_Desktop_DE_00`

### Payments and Receipt Button
- **difference:**
  - TODO
- **used in (banner name):**
  - TODO


## Upgrade to Yearly Form Page

- - -

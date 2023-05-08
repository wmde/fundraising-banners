// This is a stopgap data structure to have names for each form step in a central location
// When we can use `defineOptions` to define names for our form components (in Vue 3.3), we should
// delete and replace this object with using the Component.name in the form step setup parameters

export const useFormStepNames = (): Record<string, string> => ( {
	AddressTypeButtonForm: 'AddressTypeButtonForm',
	AddressTypeForm: 'AddressTypeForm',
	CustomAmountForm: 'CustomAmountForm',
	MainDonationForm: 'MainDonationForm',
	UpgradeToYearlyButtonForm: 'UpgradeToYearlyButtonForm',
	UpgradeToYearlyForm: 'UpgradeToYearlyForm'
} );

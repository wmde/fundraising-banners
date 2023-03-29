import { FormItem } from '@src/utils/FormItemsBuilder/FormItem';

export const AddressTypes: Record<string, FormItem> = {
	FULL: { value: 'person', label: 'address-type-option-full', className: 'address-type-person', notice: 'address-type-notice-full' },
	EMAIL: { value: 'email', label: 'address-type-option-email', className: 'address-type-email', notice: 'address-type-notice-email' },
	NO: { value: 'anonym', label: 'address-type-option-none', className: 'address-type-none', notice: 'address-type-notice-none' }
};

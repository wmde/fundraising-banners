import type { FormItem } from '@src/utils/FormItemsBuilder/FormItem';

export interface DynamicFormItems {
	interval: string;
	amounts: FormItem[];
}

export interface DonationFormItems {
	intervals: FormItem[];
	amounts: FormItem[];
	dynamicAmounts: DynamicFormItems[];
	addressType: FormItem[];
	paymentMethods: FormItem[];
}

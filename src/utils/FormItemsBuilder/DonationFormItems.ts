import { FormItem } from '@src/utils/FormItemsBuilder/FormItem';

export interface DonationFormItems {
	intervals: FormItem[];
	amounts: FormItem[];
	addressType: FormItem[];
	paymentMethods: FormItem[];
}

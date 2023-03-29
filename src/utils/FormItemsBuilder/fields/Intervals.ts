import { FormItem } from '@src/utils/FormItemsBuilder/FormItem';

export const Intervals: Record<string, FormItem> = {
	ONCE: { value: '0', label: 'interval-once', className: 'interval-0' },
	MONTHLY: { value: '1', label: 'interval-monthly', className: 'interval-1' },
	QUARTERLY: { value: '3', label: 'interval-quarterly', className: 'interval-3' },
	BIANNUAL: { value: '6', label: 'interval-biannual', className: 'interval-6' },
	YEARLY: { value: '12', label: 'interval-yearly', className: 'interval-12' }
};

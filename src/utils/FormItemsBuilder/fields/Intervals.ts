import { FormItem } from '@src/utils/FormItemsBuilder/FormItem';

type IntervalsKey = 'ONCE' | 'MONTHLY' | 'QUARTERLY' | 'BIANNUAL' | 'YEARLY';
export const Intervals: Record<IntervalsKey, FormItem> = {
	ONCE: { value: '0', label: 'interval-once', className: 'interval-0' },
	MONTHLY: { value: '1', label: 'interval-monthly', className: 'interval-1' },
	QUARTERLY: { value: '3', label: 'interval-quarterly', className: 'interval-3' },
	BIANNUAL: { value: '6', label: 'interval-biannual', className: 'interval-6' },
	YEARLY: { value: '12', label: 'interval-yearly', className: 'interval-12' }
};

export const RecurringIntervals = [
	Intervals.MONTHLY.value,
	Intervals.QUARTERLY.value,
	Intervals.BIANNUAL.value,
	Intervals.YEARLY.value
];

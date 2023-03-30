import { AmountValidity } from '@src/utils/FormModel/AmountValidity';

export function validateAmount( amount: number, selectedAmount: string, customAmount: string ): AmountValidity {
	if ( selectedAmount === '' && customAmount === '' ) {
		return AmountValidity.Unset;
	}

	if ( amount < 1.0 ) {
		return AmountValidity.TooLow;
	}

	if ( amount >= 100000 ) {
		return AmountValidity.TooHigh;
	}

	return AmountValidity.Valid;
}

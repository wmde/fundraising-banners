import { AmountValidity } from '@src/utils/FormModel/AmountValidity';

export function validateAmount( amountInCents: number, selectedAmount: string, customAmount: string ): AmountValidity {
	if ( selectedAmount === '' && customAmount === '' ) {
		return AmountValidity.Invalid;
	}

	if ( amountInCents < 1_00 ) {
		return AmountValidity.TooLow;
	}

	if ( amountInCents >= 100_000_00 ) {
		return AmountValidity.TooHigh;
	}

	return AmountValidity.Valid;
}

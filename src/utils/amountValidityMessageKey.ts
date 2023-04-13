import { AmountValidity } from '@src/utils/FormModel/AmountValidity';

export function amountValidityMessageKey( amountValidity: AmountValidity ): string {
	switch ( amountValidity ) {
		case AmountValidity.Unset:
		case AmountValidity.Invalid:
			return 'amount-empty-message';
		case AmountValidity.Valid:
			return '';
		case AmountValidity.TooHigh:
			return 'amount-too-high-message';
		case AmountValidity.TooLow:
			return 'amount-too-low-message';
	}
}

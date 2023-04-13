import { Validity } from '@src/utils/FormModel/Validity';

export function validateStringIsNotEmpty( value: string ): Validity {
	return value !== '' ? Validity.Valid : Validity.Invalid;
}

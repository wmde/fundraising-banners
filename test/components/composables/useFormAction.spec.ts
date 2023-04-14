import { describe, expect, test } from 'vitest';
import { useFormAction } from '@src/components/composables/useFormAction';
import { useFormModel } from '@src/components/composables/useFormModel';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';

const anonymousAction: string = 'Anonymously';
const withAddressAction: string = 'WithAddress';

describe( 'useFormAction', () => {

	test.each( [
		[ '', withAddressAction ],
		[ AddressTypes.FULL.value, withAddressAction ],
		[ AddressTypes.EMAIL.value, withAddressAction ],
		[ AddressTypes.ANONYMOUS.value, anonymousAction ]
	] )( 'returns the correct action with address type', ( addressType: string, expectedAction: string ) => {
		const formModel = useFormModel();
		formModel.addressType.value = addressType;

		const { formAction } = useFormAction( {
			donateAnonymouslyAction: anonymousAction,
			donateWithAddressAction: withAddressAction
		} );

		expect( formAction.value ).toBe( expectedAction );
	} );
} );

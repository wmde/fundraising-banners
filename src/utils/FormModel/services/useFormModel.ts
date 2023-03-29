import { computed, ref, watch } from 'vue';
import { FormModel } from '@src/utils/FormModel/FormModel';
import { Validity } from '@src/utils/FormModel/Validity';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';

const allIntervalsExceptOnce = [
	Intervals.MONTHLY.value,
	Intervals.QUARTERLY.value,
	Intervals.BIANNUAL.value,
	Intervals.YEARLY.value
];

export function useFormModel(): FormModel {
	const interval = ref<string>( '' );
	const intervalValidity = ref<Validity>( Validity.Unset );

	const amount = ref<number>( 0 );
	const amountValidity = ref<Validity>( Validity.Unset );
	const customAmount = ref<number>( null );

	const paymentMethod = ref<string>( '' );
	const paymentMethodValidity = ref<Validity>( Validity.Unset );

	const addressType = ref<string>( '' );
	const addressTypeValidity = ref<Validity>( Validity.Unset );

	watch( paymentMethod, ( newPaymentMethod: string ) => {
		if ( newPaymentMethod === PaymentMethods.DIRECT_DEBIT.value && addressType.value === AddressTypes.NO.value ) {
			addressType.value = '';
			addressTypeValidity.value = Validity.Unset;
		}
	} );

	const disabledIntervals = computed( (): string[] => {
		if ( paymentMethod.value === PaymentMethods.SOFORT.value ) {
			return allIntervalsExceptOnce;
		} else {
			return [];
		}
	} );

	const disabledPaymentMethods = computed( (): string[] => {
		if ( interval.value === Intervals.ONCE.value || interval.value === '' ) {
			return [];
		} else {
			return [ PaymentMethods.SOFORT.value ];
		}
	} );

	const disabledAddressTypes = computed( (): string[] => {
		if ( paymentMethod.value === PaymentMethods.DIRECT_DEBIT.value ) {
			return [ AddressTypes.NO.value ];
		}

		return [];
	} );

	// TODO clear custom amount (watch other fields for that)

	return {
		interval,
		intervalValidity,
		disabledIntervals,

		amount,
		customAmount,
		amountValidity,

		paymentMethod,
		paymentMethodValidity,
		disabledPaymentMethods,
		addressType,

		addressTypeValidity,
		disabledAddressTypes
	};
}

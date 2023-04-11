import { computed, ref, watch } from 'vue';
import { FormModel } from '@src/utils/FormModel/FormModel';
import { Validity } from '@src/utils/FormModel/Validity';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { Intervals, RecurringIntervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { parseFloatFromFormattedString } from '@src/utils/parseFloatFromFormattedString';
import { AmountValidity } from '@src/utils/FormModel/AmountValidity';

const interval = ref<string>( '' );
const intervalValidity = ref<Validity>( Validity.Unset );

const selectedAmount = ref<string>( '' );
const amountValidity = ref<AmountValidity>( AmountValidity.Unset );
const customAmount = ref<string>( '' );
const numericAmount = computed( (): number => parseFloatFromFormattedString( selectedAmount.value || customAmount.value ) );

const paymentMethod = ref<string>( '' );
const paymentMethodValidity = ref<Validity>( Validity.Unset );

const addressType = ref<string>( '' );
const addressTypeValidity = ref<Validity>( Validity.Unset );

const disabledIntervals = computed( (): string[] => {
	if ( paymentMethod.value === PaymentMethods.SOFORT.value ) {
		return RecurringIntervals;
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

watch( interval, ( newInterval: string ) => {
	if ( intervalValidity.value === Validity.Invalid && newInterval !== '' ) {
		intervalValidity.value = Validity.Valid;
	}
} );

watch( paymentMethod, ( newPaymentMethod: string ) => {
	if ( paymentMethodValidity.value === Validity.Invalid && newPaymentMethod !== '' ) {
		paymentMethodValidity.value = Validity.Valid;
	}
	if ( newPaymentMethod === PaymentMethods.DIRECT_DEBIT.value && addressType.value === AddressTypes.NO.value ) {
		addressType.value = '';
		addressTypeValidity.value = Validity.Unset;
	}
} );

watch( selectedAmount, ( newAmount: string, oldAmount: string ) => {
	if ( ![ AmountValidity.Unset, AmountValidity.Valid ].includes( amountValidity.value ) && newAmount !== '' ) {
		amountValidity.value = AmountValidity.Valid;
	}
	if ( oldAmount === '' && newAmount !== '' ) {
		customAmount.value = '';
	}
} );

watch( customAmount, ( newCustomAmount: string, oldCustomAmount: string ) => {
	if ( ![ AmountValidity.Unset, AmountValidity.Valid ].includes( amountValidity.value ) && newCustomAmount !== '' ) {
		amountValidity.value = AmountValidity.Valid;
	}
	if ( oldCustomAmount === '' && newCustomAmount !== '' ) {
		selectedAmount.value = '';
	}
} );

export function useFormModel(): FormModel {
	return {
		interval,
		intervalValidity,
		disabledIntervals,

		selectedAmount,
		customAmount,
		numericAmount,
		amountValidity,

		paymentMethod,
		paymentMethodValidity,
		disabledPaymentMethods,
		addressType,

		addressTypeValidity,
		disabledAddressTypes
	};
}

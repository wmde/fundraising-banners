import { Validity } from '@src/utils/FormModel/Validity';
import { ComputedRef, Ref } from 'vue';

export interface FormModel {
	interval: Ref<string>;
	intervalValidity: Ref<Validity>;
	disabledIntervals: ComputedRef<string[]>;
	amount: Ref<string>;
	customAmount: Ref<string>;
	amountValidity: Ref<Validity>;
	paymentMethod: Ref<string>;
	paymentMethodValidity: Ref<Validity>;
	disabledPaymentMethods: ComputedRef<string[]>;
	addressType: Ref<string>;
	addressTypeValidity: Ref<Validity>;
	disabledAddressTypes: Ref<string[]>;
}

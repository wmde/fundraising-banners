import { ReactiveProperty } from '@src/domain/ReactiveProperty';
import { Validity } from '@src/utils/FormModel/Validity';
import { ComputedProperty } from '@src/domain/ComputedProperty';

export interface FormModel {
	interval: ReactiveProperty<string>;
	intervalValidity: ReactiveProperty<Validity>;
	disabledIntervals: ComputedProperty<string[]>;
	amount: ReactiveProperty<number>;
	customAmount: ReactiveProperty<number>;
	amountValidity: ReactiveProperty<Validity>;
	paymentMethod: ReactiveProperty<string>;
	paymentMethodValidity: ReactiveProperty<Validity>;
	disabledPaymentMethods: ComputedProperty<string[]>;
	addressType: ReactiveProperty<string>;
	addressTypeValidity: ReactiveProperty<Validity>;
	disabledAddressTypes: ReactiveProperty<string[]>;
}

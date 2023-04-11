import { describe, vi, it, expect, beforeEach } from 'vitest';
import { useFormModel } from '@src/components/composables/useFormModel';
import { FormControllerCtrl } from '../../../../banners/desktop/FormControllerCtrl';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { resetFormModel } from '@test/resetFormModel';

describe( 'FormControllerCtrl', () => {
	const formModel = useFormModel();

	beforeEach( () => resetFormModel( formModel ) );

	it( 'should submit when recurring interval is selected', () => {
		const controller = new FormControllerCtrl( formModel );
		const onSubmit = vi.fn();
		controller.onSubmit( onSubmit );

		formModel.interval.value = Intervals.BIANNUAL.value;
		controller.submitStep( { event: null, pageIndex: 0 } );

		expect( onSubmit ).toHaveBeenCalledOnce();
	} );

	it( 'should submit when the payment type is sofort', () => {

		const controller = new FormControllerCtrl( formModel );
		const onSubmit = vi.fn();
		controller.onSubmit( onSubmit );

		formModel.interval.value = Intervals.ONCE.value;
		formModel.paymentMethod.value = PaymentMethods.SOFORT.value;
		controller.submitStep( { event: null, pageIndex: 0 } );

		expect( onSubmit ).toHaveBeenCalledOnce();
	} );

	it( 'should go to next page when interval is "once"', () => {
		const controller = new FormControllerCtrl( formModel );
		const onNext = vi.fn();
		controller.onNext( onNext );

		formModel.interval.value = Intervals.ONCE.value;
		controller.submitStep( { event: null, pageIndex: 0 } );

		expect( onNext ).toHaveBeenCalledOnce();
	} );

} );

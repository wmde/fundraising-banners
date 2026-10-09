import { beforeEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { useDynamicAmounts } from '@src/components/composables/useDynamicAmounts';
import { useFormModel } from '@src/components/composables/useFormModel';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { resetFormModel } from '@test/resetFormModel';
import { DynamicFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';

const model = useFormModel( '{amount} €' );

const formItems = {
	ONE: {
		value: '1',
		label: 'one',
		className: 'useDynamicAmounts-test-one',
	},
	TWO: {
		value: '2',
		label: 'two',
		className: 'useDynamicAmounts-test-two',
	},
	THREE: {
		value: '3',
		label: 'three',
		className: 'useDynamicAmounts-test-three',
	},
};

const dynamicAmounts: DynamicFormItems[] = [
	{
		interval: Intervals.ONCE.value,
		amounts: [ formItems.ONE ]
	},
	{
		interval: Intervals.MONTHLY.value,
		amounts: [ formItems.TWO ]
	},
	{
		interval: Intervals.QUARTERLY.value,
		amounts: [ formItems.TWO, formItems.THREE ]
	},
	{
		interval: Intervals.YEARLY.value,
		amounts: [ formItems.THREE ]
	}
];

describe( 'useDynamicAmounts', () => {

	// The model values are in the global scope, and they need to be reset before each test
	beforeEach( () => resetFormModel( model ) );

	it( 'should clear selected amount when interval changes', async () => {
		model.interval.value = Intervals.MONTHLY.value;
		useDynamicAmounts( model, dynamicAmounts );
		model.selectedAmount.value = formItems.TWO.value;

		model.interval.value = Intervals.QUARTERLY.value;
		await nextTick();

		expect( model.selectedAmount.value ).toEqual( '' );
		expect( model.customAmount.value ).toEqual( '' );
	} );

	it( 'should clear custom amount when interval changes', async () => {
		model.interval.value = Intervals.MONTHLY.value;
		useDynamicAmounts( model, dynamicAmounts );
		model.customAmount.value = '5';

		model.interval.value = Intervals.QUARTERLY.value;
		await nextTick();

		expect( model.selectedAmount.value ).toEqual( '' );
		expect( model.customAmount.value ).toEqual( '' );
	} );

	it( 'should clear selected amount when selection unavailable', async () => {
		model.interval.value = '';
		useDynamicAmounts( model, dynamicAmounts );
		model.selectedAmount.value = formItems.ONE.value;

		model.interval.value = Intervals.MONTHLY.value;
		await nextTick();

		expect( model.selectedAmount.value ).toEqual( '' );
		expect( model.customAmount.value ).toEqual( '' );
	} );

	it( 'should not touch the amount when not necessary', async () => {
		model.interval.value = '';
		useDynamicAmounts( model, dynamicAmounts );
		model.selectedAmount.value = formItems.ONE.value;

		model.interval.value = Intervals.ONCE.value;
		await nextTick();

		expect( model.selectedAmount.value ).toEqual( formItems.ONE.value );
		expect( model.customAmount.value ).toEqual( '' );
	} );

} );

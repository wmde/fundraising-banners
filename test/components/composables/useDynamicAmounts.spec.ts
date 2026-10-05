import { beforeEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { useDynamicAmounts } from '@src/components/composables/useDynamicAmounts';
import { useFormModel } from '@src/components/composables/useFormModel';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { resetFormModel } from '@test/resetFormModel';

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

describe( 'useDynamicAmounts', () => {

	// The model values are in the global scope, and they need to be reset before each test
	beforeEach( () => resetFormModel( model ) );

	it( 'should move selected amount into custom amount when necessary', async () => {
		model.interval.value = Intervals.MONTHLY.value;
		useDynamicAmounts( model, ( { interval } ) => {
			if ( interval.value === Intervals.MONTHLY.value ) {
				return [ formItems.ONE ];
			} else {
				return [ formItems.TWO ];
			}
		} );
		model.selectedAmount.value = formItems.ONE.value;

		model.interval.value = Intervals.YEARLY.value;
		await nextTick();

		expect( model.selectedAmount.value ).toEqual( '' );
		expect( model.customAmount.value ).toEqual( `${ formItems.ONE.value } €` );
	} );

	it( 'should not touch the amount when not necessary', async () => {
		model.interval.value = Intervals.MONTHLY.value;
		useDynamicAmounts( model, ( { interval } ) => {
			if ( interval.value === Intervals.MONTHLY.value ) {
				return [ formItems.ONE, formItems.TWO ];
			} else if ( interval.value === Intervals.QUARTERLY.value ) {
				return [ formItems.TWO, formItems.THREE ];
			} else {
				return [ formItems.THREE ];
			}
		} );
		model.selectedAmount.value = formItems.TWO.value;

		model.interval.value = Intervals.QUARTERLY.value;
		await nextTick();

		expect( model.selectedAmount.value ).toEqual( formItems.TWO.value );
		expect( model.customAmount.value ).toEqual( '' );
	} );

	it( 'should not move customAmount back into selected amount', async () => {
		model.interval.value = Intervals.MONTHLY.value;
		useDynamicAmounts( model, ( { interval } ) => {
			if ( interval.value === Intervals.MONTHLY.value ) {
				return [ formItems.ONE ];
			} else {
				return [ formItems.TWO ];
			}
		} );
		model.customAmount.value = formItems.TWO.value;

		model.interval.value = Intervals.YEARLY.value;
		await nextTick();

		expect( model.selectedAmount.value ).toEqual( '' );
		expect( model.customAmount.value ).toEqual( formItems.TWO.value );
	} );

} );

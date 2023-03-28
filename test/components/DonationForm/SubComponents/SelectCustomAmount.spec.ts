import { beforeEach, describe, expect, it } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import SelectCustomAmount from '@src/components/DonationForm/SubComponents/SelectCustomAmount.vue';

describe( 'SelectCustomAmount.vue', () => {

	let wrapper: VueWrapper<any>;
	beforeEach( () => {
		wrapper = shallowMount( SelectCustomAmount, {
			props: {
				placeholder: 'placeholder-text',
				fieldName: 'fld-custom-amount'
			}
		} );
	} );

	it( 'updates the CSS classes when a value is entered', async () => {
		await wrapper.find<HTMLInputElement>( 'input[type=text]' ).setValue( '2500' );

		expect( wrapper.attributes( 'class' ) ).toContain( 'value-entered' );
	} );

	it( 'updates the CSS classes when a value is entered', async () => {
		await wrapper.find<HTMLInputElement>( 'input[type=text]' ).trigger( 'focus' );

		expect( wrapper.attributes( 'class' ) ).toContain( 'focused' );
	} );

	it( 'clears the custom amount when the selectedAmount becomes not null', async () => {
		const textField = wrapper.find<HTMLInputElement>( 'input[type=text]' );
		await textField.setValue( '2500' );
		await wrapper.setProps( { selectedAmount: '42' } );

		expect( textField.element.value ).toBe( '' );
	} );

	it( 'should check radio button when input field is focused', async () => {
		await wrapper.find<HTMLInputElement>( 'input[type=text]' ).trigger( 'focus' );

		expect( wrapper.find<HTMLInputElement>( 'input[type=radio]' ).element.checked ).toBeTruthy();
	} );

	it( 'should check radio button when input field has custom amount', async () => {
		await wrapper.find<HTMLInputElement>( 'input[type=text]' ).setValue( '2500' );

		expect( wrapper.find<HTMLInputElement>( 'input[type=radio]' ).element.checked ).toBeTruthy();
	} );

	it( 'should show euro symbol when field is focussed', async () => {
		expect( wrapper.find( '.wmde-banner-select-custom-amount-euro-symbol' ).exists() ).toBe( false );

		await wrapper.find<HTMLInputElement>( 'input[type=text]' ).trigger( 'focus' );

		expect( wrapper.find( '.wmde-banner-select-custom-amount-euro-symbol' ).exists() ).toBe( true );
	} );

	it( 'should show euro symbol when field has an entered value', async () => {
		expect( wrapper.find( '.wmde-banner-select-custom-amount-euro-symbol' ).exists() ).toBe( false );

		await wrapper.find<HTMLInputElement>( 'input[type=text]' ).setValue( '2500' );

		expect( wrapper.find( '.wmde-banner-select-custom-amount-euro-symbol' ).exists() ).toBe( true );
	} );

	it( 'renders field name of radio input', async () => {
		expect( wrapper.find( 'input[type=radio]' ).attributes( 'name' ) ).toBe( 'fld-custom-amount' );
	} );

	it.todo( 'checks if radio element has focus on click', async () => {
		await wrapper.find( '.wmde-banner-select-custom-amount-radio' ).trigger( 'click' );

		// TODO find out how to test this OR if the component code is broken
		expect( wrapper.find( 'input[type=text]' ) ).toBe( document.activeElement );
	} );

	it( 'should hide placeholder when the input has focus', async () => {
		const input = wrapper.find<HTMLInputElement>( 'input[type=text]' );

		await input.trigger( 'focus' );

		expect( input.attributes( 'placeholder' ) ).toBe( '' );
	} );

	it( 'should render the placeholder when the input in out of focus', async () => {
		const input = wrapper.find<HTMLInputElement>( 'input[type=text]' );

		expect( input.attributes( 'placeholder' ) ).toBe( 'placeholder-text' );
	} );
} );

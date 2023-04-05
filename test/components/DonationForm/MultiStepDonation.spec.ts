import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import { defineComponent, nextTick } from 'vue';

describe( 'MultistepDonation.vue', () => {

	it( 'passes submit event to page controller', async () => {
		const mockedFormController = {
			submit: vi.fn(),
			next: vi.fn(),
			previous: vi.fn(),
			goToStep: vi.fn()
		};

		const mockedComponent1 = defineComponent( {
			template: '<div class="mc1"></div>',
			emits: [ 'submit', 'next', 'previous' ]
		} );

		const mockedComponent2 = defineComponent( {
			template: '<div  class="mc2"></div>'
		} );

		const wrapper = mount( MultiStepDonation, {
			props: {
				formController: mockedFormController
			},
			slots: {
				formPage1: mockedComponent1,
				formPage2: mockedComponent2
			}
		} );

		const mockedComponent1Instance = wrapper.findComponent( mockedComponent1 );

		expect( mockedComponent1Instance.exists() ).toBe( true );

		console.log( mockedComponent1Instance.props() );

		mockedComponent1Instance.vm.$emit( 'next' );
		await nextTick();

		expect( mockedFormController.next ).toHaveBeenCalled();
	} );

} );

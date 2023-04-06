import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import { markRaw, nextTick } from 'vue';
import SubFormStub from '@test/fixtures/SubFormStub.vue';
import { FormController } from '@src/utils/FormController/FormController';

describe( 'MultistepDonation.vue', () => {
	let mockedFormController: FormController;
	let wrapper: VueWrapper<any>;

	beforeEach( () => {
		mockedFormController = {
			submit: vi.fn(),
			next: vi.fn(),
			previous: vi.fn(),
			goToStep: vi.fn()
		};

		wrapper = mount( MultiStepDonation, {
			props: {
				formController: mockedFormController,
				forms: [
					markRaw( SubFormStub )
				]
			}
		} );

	} );

	it( 'passes submit event to page controller', async () => {
		const subForm = wrapper.findComponent( SubFormStub );

		const eventPayload = { event: new Event( 'submit' ), pageNumber: 1 };
		subForm.vm.$emit( 'submit', eventPayload );
		await nextTick();

		expect( mockedFormController.submit ).toHaveBeenCalledWith( eventPayload );
	} );

	it( 'passes next event to page controller', async () => {
		const subForm = wrapper.findComponent( SubFormStub );

		subForm.vm.$emit( 'next' );
		await nextTick();

		expect( mockedFormController.next ).toHaveBeenCalled();
	} );

	it( 'passes previous event to page controller', async () => {
		const subForm = wrapper.findComponent( SubFormStub );

		subForm.vm.$emit( 'previous' );
		await nextTick();

		expect( mockedFormController.previous ).toHaveBeenCalled();
	} );

} );

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import { markRaw, nextTick } from 'vue';
import SubFormStub from '@test/fixtures/SubFormStub.vue';
import { FormController } from '@src/utils/FormController/FormController';

describe( 'MultistepDonation.vue', () => {
	let mockedFormController: FormController;

	beforeEach( () => {
		mockedFormController = {
			submitStep: vi.fn(),
			next: vi.fn(),
			previous: vi.fn(),
			onNext: vi.fn(),
			onPrevious: vi.fn(),
			onGoToStep: vi.fn(),
			onSubmit: vi.fn()
		};
	} );

	const getWrapper = ( forms: Array<any> = [] ): VueWrapper<any> => {
		return mount( MultiStepDonation, {
			props: {
				formController: mockedFormController,
				forms
			}
		} );
	};

	it( 'passes submit event to page controller', async () => {
		const wrapper = getWrapper( [ markRaw( SubFormStub ) ] );
		const subForm = wrapper.findComponent( SubFormStub );

		const eventPayload = { event: new Event( 'submit' ), pageNumber: 1 };
		subForm.vm.$emit( 'submit', eventPayload );
		await nextTick();

		expect( mockedFormController.submitStep ).toHaveBeenCalledWith( eventPayload );
	} );

	it( 'passes next event to page controller', async () => {
		const wrapper = getWrapper( [ markRaw( SubFormStub ) ] );
		const subForm = wrapper.findComponent( SubFormStub );

		const eventPayload = { event: new Event( 'next' ), pageNumber: 1 };
		subForm.vm.$emit( 'next', eventPayload );
		await nextTick();

		expect( mockedFormController.next ).toHaveBeenCalledWith( eventPayload );
	} );

	it( 'passes previous event to page controller', async () => {
		const wrapper = getWrapper( [ markRaw( SubFormStub ) ] );
		const subForm = wrapper.findComponent( SubFormStub );

		const eventPayload = { event: new Event( 'previous' ), pageNumber: 1 };
		subForm.vm.$emit( 'previous', eventPayload );
		await nextTick();

		expect( mockedFormController.previous ).toHaveBeenCalledWith( eventPayload );
	} );

	it( 'should render the sub form pages', function () {
		const wrapper = getWrapper( [
			markRaw( SubFormStub ),
			markRaw( SubFormStub ),
			markRaw( SubFormStub )
		] );

		expect( wrapper.findAll( '.wmde-banner-form-page' ).length ).toBe( 3 );
	} );

	it( 'should add callbacks when initialised', function () {
		getWrapper( [ markRaw( SubFormStub ) ] );

		expect( mockedFormController.onNext ).toHaveBeenCalled();
		expect( mockedFormController.onPrevious ).toHaveBeenCalled();
		expect( mockedFormController.onGoToStep ).toHaveBeenCalled();
		expect( mockedFormController.onSubmit ).toHaveBeenCalled();
	} );

	it( 'should go to next when callback is invoked', async function () {
		let callbackInvoker: () => void;
		mockedFormController.onNext = ( callback: () => void ): void => {
			callbackInvoker = callback;
		};

		const wrapper = getWrapper( [ markRaw( SubFormStub ), markRaw( SubFormStub ), markRaw( SubFormStub ) ] );
		callbackInvoker();

		await nextTick();

		expect( wrapper.find( '.wmde-banner-form-page:nth-child(2)' ).attributes( 'class' ) ).toContain( 'wmde-banner-form-page--current' );
	} );

} );

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import { markRaw, nextTick } from 'vue';
import SubFormStub from '@test/fixtures/SubFormStub.vue';
import { FormController } from '@src/utils/FormController/FormController';

describe( 'MultistepDonation.vue', () => {
	let mockedFormController: FormController;
	let callbackInvokerNext: () => void;
	let callbackInvokerPrevious: () => void;
	let callbackInvokerGoToStep: ( pageNumber: number ) => void;
	let callbackInvokerSubmit: () => void;

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
			},
			global: {
				provide: {
					formActions: {
						donateWithAddressAction: `https://example.com/withAddress`,
						donateWithoutAddressAction: `https://example.com/?withoutAddress=okay`
					}
				}
			}
		} );
	};

	const addCallbackInvokers = (): void => {
		mockedFormController.onNext = ( callback: () => void ): void => {
			callbackInvokerNext = callback;
		};

		mockedFormController.onPrevious = ( callback: () => void ): void => {
			callbackInvokerPrevious = callback;
		};

		mockedFormController.onGoToStep = ( callback: ( indexNumber: number ) => void ): void => {
			callbackInvokerGoToStep = callback;
		};

		mockedFormController.onSubmit = ( callback: () => void ): void => {
			callbackInvokerSubmit = callback;
		};
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

	it( 'should go to next when next callback is invoked', async function () {
		addCallbackInvokers();
		const wrapper = getWrapper( [ markRaw( SubFormStub ), markRaw( SubFormStub ), markRaw( SubFormStub ) ] );

		callbackInvokerNext();
		await nextTick();

		expect( wrapper.find( '.wmde-banner-form-page:nth-child(2)' ).attributes( 'class' ) )
			.toContain( 'wmde-banner-form-page--current' );
	} );

	it( 'should go to specified step when goToStep callback is invoked', async function () {
		addCallbackInvokers();
		const wrapper = getWrapper( [ markRaw( SubFormStub ), markRaw( SubFormStub ), markRaw( SubFormStub ) ] );

		callbackInvokerGoToStep( 2 );
		await nextTick();

		expect( wrapper.find( '.wmde-banner-form-page:nth-child(3)' ).attributes( 'class' ) )
			.toContain( 'wmde-banner-form-page--current' );
	} );

	it( 'should go to previous when previous callback is invoked', async function () {
		addCallbackInvokers();
		const wrapper = getWrapper( [ markRaw( SubFormStub ), markRaw( SubFormStub ), markRaw( SubFormStub ) ] );

		callbackInvokerGoToStep( 1 );
		await nextTick();
		callbackInvokerPrevious();
		await nextTick();

		expect( wrapper.find( '.wmde-banner-form-page:nth-child(1)' ).attributes( 'class' ) )
			.toContain( 'wmde-banner-form-page--current' );
	} );

	it( 'should submit donation form when submit callback is invoked', async function () {
		addCallbackInvokers();
		const wrapper = getWrapper( [ markRaw( SubFormStub ), markRaw( SubFormStub ), markRaw( SubFormStub ) ] );
		const submitForm = wrapper.find<HTMLFormElement>( '.wmde-banner-submit-form' );
		submitForm.element.submit = vi.fn();

		callbackInvokerSubmit();
		await nextTick();

		expect( submitForm.element.submit ).toHaveBeenCalledOnce();
	} );
} );

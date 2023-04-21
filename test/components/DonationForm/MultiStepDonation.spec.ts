import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import { nextTick } from 'vue';
import SubFormStub from '@test/fixtures/SubFormStub.vue';
import { FormController } from '@src/utils/FormController/FormController';

const subFormEmitterTemplate = `<template #form-page-1="{ pageIndex, submit, next, previous }">
	<button
		class="emitting-sub-form"
		:page-index="pageIndex"
		@submit="() => submit( { pageIndex } )"
		@next="() => next( { pageIndex } )"
		@previous="() => previous( { pageIndex } )"
    />
</template>`;

describe( 'MultistepDonation.vue', () => {
	let mockedFormController: FormController;
	let callbackInvokerNext: () => void;
	let callbackInvokerPrevious: () => void;
	let callbackInvokerGoToStep: ( pageIndex: number ) => void;
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

	const getWrapper = ( forms: Record<string, any> = {} ): VueWrapper<any> => {
		return mount( MultiStepDonation, {
			props: {
				formController: mockedFormController
			},
			slots: forms,
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
		const wrapper = getWrapper( { form: subFormEmitterTemplate } );

		await wrapper.find( '.emitting-sub-form' ).trigger( 'submit' );

		expect( mockedFormController.submitStep ).toHaveBeenCalledWith( { pageIndex: 0 } );
	} );

	it( 'passes next event to page controller', async () => {
		const wrapper = getWrapper( { form: subFormEmitterTemplate } );

		await wrapper.find( '.emitting-sub-form' ).trigger( 'next' );

		expect( mockedFormController.next ).toHaveBeenCalledWith( { pageIndex: 0 } );
	} );

	it( 'passes previous event to page controller', async () => {
		const wrapper = getWrapper( { form: subFormEmitterTemplate } );

		await wrapper.find( '.emitting-sub-form' ).trigger( 'previous' );

		expect( mockedFormController.previous ).toHaveBeenCalledWith( { pageIndex: 0 } );
	} );

	it( 'should render the sub form pages', function () {
		const wrapper = getWrapper( { form01: SubFormStub, form02: SubFormStub, form03: SubFormStub } );

		expect( wrapper.findAll( '.wmde-banner-form-page' ).length ).toBe( 3 );
	} );

	it( 'should add callbacks when initialised', function () {
		getWrapper( { form: SubFormStub } );

		expect( mockedFormController.onNext ).toHaveBeenCalled();
		expect( mockedFormController.onPrevious ).toHaveBeenCalled();
		expect( mockedFormController.onGoToStep ).toHaveBeenCalled();
		expect( mockedFormController.onSubmit ).toHaveBeenCalled();
	} );

	it( 'should go to next when next callback is invoked', async function () {
		addCallbackInvokers();
		const wrapper = getWrapper( { form01: SubFormStub, form02: SubFormStub, form03: SubFormStub } );

		callbackInvokerNext();
		await nextTick();

		expect( wrapper.find( '.wmde-banner-form-page:nth-child(2)' ).attributes( 'class' ) )
			.toContain( 'wmde-banner-form-page--current' );
	} );

	it( 'should go to specified step when goToStep callback is invoked', async function () {
		addCallbackInvokers();
		const wrapper = getWrapper( { form01: SubFormStub, form02: SubFormStub, form03: SubFormStub } );

		callbackInvokerGoToStep( 2 );
		await nextTick();

		expect( wrapper.find( '.wmde-banner-form-page:nth-child(3)' ).attributes( 'class' ) )
			.toContain( 'wmde-banner-form-page--current' );
	} );

	it( 'should go to previous when previous callback is invoked', async function () {
		addCallbackInvokers();
		const wrapper = getWrapper( { form01: SubFormStub, form02: SubFormStub, form03: SubFormStub } );

		callbackInvokerGoToStep( 1 );
		await nextTick();
		callbackInvokerPrevious();
		await nextTick();

		expect( wrapper.find( '.wmde-banner-form-page:nth-child(1)' ).attributes( 'class' ) )
			.toContain( 'wmde-banner-form-page--current' );
	} );

	it( 'should submit donation form when submit callback is invoked', async function () {
		addCallbackInvokers();
		const wrapper = getWrapper( { form01: SubFormStub, form02: SubFormStub, form03: SubFormStub } );
		const submitForm = wrapper.find<HTMLFormElement>( '.wmde-banner-submit-form' );
		submitForm.element.submit = vi.fn();

		callbackInvokerSubmit();
		await nextTick();

		expect( submitForm.element.submit ).toHaveBeenCalledOnce();
	} );
} );

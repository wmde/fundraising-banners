import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import FundsModal from '@src/components/UseOfFunds/FundsModal.vue';
import { UseOfFundsContent } from '@src/domain/UseOfFunds/UseOfFundsContent';

const content: UseOfFundsContent = {
	applicationOfFundsData: [],
	benefitsList: { benefits: [], headline: '' },
	callToAction: '',
	comparison: { citationLabel: '', companies: [], headline: '', paragraphs: [], subhead: '' },
	detailedReports: {
		germany: { intro: '', linkName: '', linkUrl: '' },
		international: { intro: '', linkName: '', linkUrl: '' },
		mixed: { text: '' }
	},
	intro: { headline: '', text: '' },
	orgchart: { headline: '', imageUrl: '', organizationClasses: {}, paragraphs: [] },
	provisional: ''
};

describe( 'FundsModal.vue', () => {
	it( 'shows the modal', async () => {
		const wrapper = shallowMount( FundsModal, {
			props: {
				isFundsModalVisible: false,
				content
			}
		} );

		expect( wrapper.attributes( 'class' ) ).not.toContain( 'is-visible' );

		await wrapper.setProps( { isFundsModalVisible: true } );

		expect( wrapper.attributes( 'class' ) ).toContain( 'is-visible' );
	} );

	it( 'emits the hideFundsModal event', async () => {
		const wrapper = shallowMount( FundsModal, {
			props: {
				isFundsModalVisible: false,
				content
			}
		} );

		await wrapper.find( '.banner-modal-background' ).trigger( 'click' );
		await wrapper.find( '.banner-modal-close-link' ).trigger( 'click' );

		expect( wrapper.emitted( 'hideFundsModal' ).length ).toBe( 2 );
	} );
} );

import { describe, expect, it } from 'vitest';
import { UseOfFundsContent } from '@src/domain/UseOfFunds/UseOfFundsContent';
import { shallowMount } from '@vue/test-utils';
import FundsContent from '@src/components/UseOfFunds/FundsContent.vue';

describe( 'FundsContent.vue', () => {
	const getContent = (): UseOfFundsContent => {
		return {
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
			orgchart: {
				headline: '',
				imageUrl: '',
				organizationClasses: { ' replace me ': 'gib-class' },
				paragraphs: [ 'This is some text where I want you to replace me with text wrapped in a span' ]
			},
			provisional: ''
		};
	};

	it( 'shows the provisional addendum when one is set', async () => {
		const wrapper = shallowMount( FundsContent, {
			props: {
				content: getContent()
			}
		} );

		const intro = wrapper.find( '.use-of-funds-section-intro h2' );

		expect( intro.text() ).toBe( '' );
		expect( wrapper.find( '.use-of-funds-provisional' ).exists() ).toBe( false );

		const content = getContent();
		content.provisional = 'This is provisional';
		await wrapper.setProps( { content: content } );
		const provisional = wrapper.find( '.use-of-funds-provisional' );

		expect( intro.text() ).toBe( '*' );
		expect( provisional.exists() ).toBe( true );
		expect( provisional.text() ).toBe( 'This is provisional' );
	} );

	it( 'highlights organisation in the orgchart text', async () => {
		const wrapper = shallowMount( FundsContent, {
			props: {
				content: getContent()
			}
		} );

		expect( wrapper.find( '.use-of-funds-orgchart-text > div p:first-child' ).html() )
			.toContain( '<span class="use-of-funds-org use-of-funds-org-gib-class"> replace me </span>' );
	} );
} );

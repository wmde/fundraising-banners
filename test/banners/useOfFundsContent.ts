import { UseOfFundsContent } from '@src/domain/EditableContent/UseOfFundsContent';

export const useOfFundsContent: UseOfFundsContent = {
	title: '',
	summary: '',
	callToAction: '',
	accordion: {
		items: [],
		summary: ''
	},
	benefits: {
		title: '',
		items: []
	},
	revenueComparison: {
		title: '',
		content: [],
		companies: {
			title: '',
			items: []
		}
	},
	closingParagraph: ''
};

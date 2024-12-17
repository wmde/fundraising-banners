interface AccordionItem {
	title: string;
	content: string;
}

interface BenefitsItem {
	icon: 'hand' | 'smartphone' | 'world' | 'megaphone' | 'twentyfourseven';
	content: string;
}

export interface RevenueComparisonItem {
	name: string;
	budget: number;
	budgetString: string;
	link: string;
	linkText: string;
}

export interface UseOfFundsContent {
	title: string;
	summary: string;
	callToAction: string;
	accordion: {
		items: AccordionItem[];
		summary: string;
	};
	benefits: {
		title: string;
		items: BenefitsItem[];
	};
	revenueComparison: {
		title: string;
		content: string[];
		companies: {
			title: string;
			items: RevenueComparisonItem[];
		};
	};
	closingParagraph: string;
}

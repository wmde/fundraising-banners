import { ApplicationOfFundsItem } from '@src/domain/UseOfFunds/ApplicationOfFundsItem';
import { Benefit } from '@src/domain/UseOfFunds/Benefit';
import { Company } from '@src/domain/UseOfFunds/Company';

export interface UseOfFundsContent {
	intro: {
		headline: string;
		dynamicHeadline: {
			published: string;
			provisional: string;
		}
		text: string;
	}

	applicationOfFundsData: ApplicationOfFundsItem[];

	detailedReports: {
		mixed: {
			text: string;
		}
		germany: {
			intro: string;
			linkName: string;
			linkUrl: string;
		}
		international: {
			intro: string;
			linkName: string;
			linkUrl: string;
		}
	}

	benefitsList: {
		headline: string;
		benefits: Benefit[];
	}

	comparison: {
		headline: string;
		paragraphs: string[];
		subhead: string;
		companies: Company[];
		citationLabel: string;
	}

	orgchart: {
		headline: string;
		imageUrl: string;
		paragraphs: string[];
	}

	callToAction: string;
	provisional: string;
}

import { Ordinal } from '@src/utils/DynamicContent/formatters/Ordinal';

export class OrdinalEn implements Ordinal {
	get( figures: number ): string {
		const lastFigure = figures % 10;

		// There are exceptions to the ordinal when the last 2 figures
		// are 11, 12, or 13 meaning we need to check for those
		const last2Figures = figures % 100;

		if ( lastFigure === 1 && last2Figures !== 11 ) {
			return figures + 'st';
		}

		if ( lastFigure === 2 && last2Figures !== 12 ) {
			return figures + 'nd';
		}

		if ( lastFigure === 3 && last2Figures !== 13 ) {
			return figures + 'rd';
		}

		return figures + 'th';
	}
}

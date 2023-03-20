import { Ordinal } from '@src/utils/DynamicContent/formatters/Ordinal';

export class OrdinalDe implements Ordinal {
	get( figures: number ): string {
		return figures.toString();
	}
}

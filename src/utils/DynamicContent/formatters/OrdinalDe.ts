import { Ordinal } from '@src/utils/DynamicContent/formatters/Ordinal';

export class OrdinalDe implements Ordinal {
	public getFormatted( figures: number ): string {
		return figures.toString();
	}
}

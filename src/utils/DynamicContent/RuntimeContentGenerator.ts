import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { TranslationMessages } from '@src/TranslationPlugin';
import { DynamicContentGenerator } from '@src/utils/DynamicContent/DynamicContentGenerator';
import { TextGenerator } from '@src/utils/DynamicContent/generators/TextGenerator';

export class RuntimeContentGenerator {
	private date: Date;
	private translations: TranslationMessages;
	private dayName: TextGenerator;

	public getContent(): DynamicContent {
		return {
			dayName: this.dayName.get()
		};
	}

}

export function newRuntimeContentGenerator(): DynamicContentGenerator {
	return new RuntimeContentGenerator();
}

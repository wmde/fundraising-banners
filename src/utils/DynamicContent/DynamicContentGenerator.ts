import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

export interface DynamicContentGenerator {
	getContent(): DynamicContent;
}

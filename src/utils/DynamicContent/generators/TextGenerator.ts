/**
 * @param T - Defines the type of optional parameter that can be passed to getText()
 */
export interface TextGenerator<T = void> {
	getText( parameter: T ): string;
}

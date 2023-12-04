const text = `Über {{millionImpressionsPerDay}} Millionen Mal wird unser Spendenaufruf täglich
	angezeigt, aber nur {{currentDonorsSoFar}} Menschen haben heute gespendet.`;

export function visitorsVsDailyDonorsSentence( millionImpressionsPerDay: number, currentDonorsSoFar: string ): string {
	return text.replace( '{{millionImpressionsPerDay}}', millionImpressionsPerDay.toString() )
		.replace( '{{currentDonorsSoFar}}', currentDonorsSoFar );
}

export enum BannerNotShownReasons {
	SizeIssue = 'SizeIssue',
	DisallowedNamespace = 'DisallowedNamespace',
	UserInteraction = 'UserInteraction'
}

export function isNotShownReason( value: any ): value is BannerNotShownReasons {
	return typeof value === 'string' && value in BannerNotShownReasons;
}

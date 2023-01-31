export interface Banner {
	pageName: string,
	fileName: string,
	tracking: string
}

export interface Campaign {
	name: string,
	tracking: string,
	previewLinkDev: string,
	previewLinkProd: string,
	wrapperTemplate: string,
	banners: Record<string, Banner>
}

export type CampaignConfig = Record<string, Campaign>;

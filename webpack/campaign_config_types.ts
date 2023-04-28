export interface Banner {
	pageName: string,
	fileName: string,
	tracking: string
}

export interface Campaign {
	name: string,
	description: string,
	tracking: string,
	previewUrlDev: string,
	previewUrlProd: string,
	wrapperTemplate: string,
	banners: Record<string, Banner>
}

export type CampaignConfig = Record<string, Campaign>;

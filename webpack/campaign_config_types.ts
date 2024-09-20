export interface Banner {
	pageName: string,
	fileName: string,
	tracking: string
}

export interface Campaign {
	name: string,
	description: string,
	campaign: string,
	icon: string,
	tracking: string,
	previewUrlDev: string,
	previewUrlDevDark: string,
	previewUrlProd: string,
	wrapperTemplate: string,
	banners: Record<string, Banner>
}

export type CampaignConfig = Record<string, Campaign>;

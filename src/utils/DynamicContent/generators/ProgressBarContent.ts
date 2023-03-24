import { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import { CampaignProjection } from '@src/utils/DynamicContent/CampaignProjection';
import { Translator } from '@src/Translator';

export class ProgressBarContent {
	private readonly _donationTarget: number;
	private _campaignProjection: CampaignProjection;
	private _translator: Translator;
	private _currencyFormatter: Currency;

	public constructor( donationTarget: number, campaignProjection: CampaignProjection, translator: Translator, currencyFormatter: Currency ) {
		this._donationTarget = donationTarget;
		this._campaignProjection = campaignProjection;
		this._translator = translator;
		this._currencyFormatter = currencyFormatter;
	}

	public get percentageTowardsTarget(): number {
		return this._campaignProjection.projectedPercentageTowardsTarget();
	}

	public get donationTarget(): string {
		return [
			this._translator.translate( 'amount-total' ),
			this._currencyFormatter.millions( this._donationTarget )
		].join( ' ' );
	}

	public get amountDonated(): string {
		return this._currencyFormatter.millions( this._campaignProjection.projectedDonationSum() );
	}

	public get amountNeeded(): string {
		return [
			this._translator.translate( 'missing-amount' ),
			this._currencyFormatter.millions( this._campaignProjection.projectedRemainingDonationSum() )
		].join( ' ' );
	}
}

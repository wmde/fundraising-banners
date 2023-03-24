import { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import { Translator } from '@src/Translator';

export class ProgressBarContent {
	private readonly _donationTarget: number;
	private readonly _translator: Translator;
	private readonly _currencyFormatter: Currency;
	private readonly _percentageTowardsTarget: number;
	private readonly _donationSum: number;
	private readonly _remainingDonationSum: number;

	public constructor(
		donationTarget: number,
		percentageTowardsTarget: number,
		donationSum: number,
		remainingDonationSum: number,
		translator: Translator,
		currencyFormatter: Currency
	) {
		this._donationTarget = donationTarget;
		this._percentageTowardsTarget = percentageTowardsTarget;
		this._donationSum = donationSum;
		this._remainingDonationSum = remainingDonationSum;
		this._translator = translator;
		this._currencyFormatter = currencyFormatter;
	}

	public get percentageTowardsTarget(): number {
		return this._percentageTowardsTarget;
	}

	public get donationTarget(): string {
		return [
			this._translator.translate( 'amount-total' ),
			this._currencyFormatter.millions( this._donationTarget )
		].join( ' ' );
	}

	public get amountDonated(): string {
		return this._currencyFormatter.millions( this._donationSum );
	}

	public get amountNeeded(): string {
		return [
			this._translator.translate( 'missing-amount' ),
			this._currencyFormatter.millions( this._remainingDonationSum )
		].join( ' ' );
	}
}

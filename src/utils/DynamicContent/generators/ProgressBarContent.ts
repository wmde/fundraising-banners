import { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import { Translator } from '@src/Translator';
import { DynamicProgressBarContent } from '@src/utils/DynamicContent/DynamicProgressBarContent';

export class ProgressBarContent implements DynamicProgressBarContent {
	private readonly _donationTarget: number;
	private readonly _translator: Translator;
	private readonly _currencyFormatter: Currency;
	private readonly _percentageTowardsTarget: number;
	private readonly _donationSum: number;
	private readonly _remainingDonationSum: number;
	private readonly _isLateProgress: boolean;
	private readonly _dramaText: string;

	public constructor(
		donationTarget: number,
		percentageTowardsTarget: number,
		donationSum: number,
		remainingDonationSum: number,
		translator: Translator,
		currencyFormatter: Currency,
		isLateProgress: boolean,
		dramaText: string
	) {
		this._donationTarget = donationTarget;
		this._percentageTowardsTarget = percentageTowardsTarget;
		this._donationSum = donationSum;
		this._remainingDonationSum = remainingDonationSum;
		this._translator = translator;
		this._currencyFormatter = currencyFormatter;
		this._isLateProgress = isLateProgress;
		this._dramaText = dramaText;
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

	public get donationTargetAmount(): string {
		return this._currencyFormatter.millions( this._donationTarget );
	}

	public get amountDonated(): string {
		const upperDisplayLimitDeltaInEuro = 100_000;
		if ( this._remainingDonationSum < upperDisplayLimitDeltaInEuro ) {
			return this._currencyFormatter.millions( this._donationSum - upperDisplayLimitDeltaInEuro );
		}
		return this._currencyFormatter.millions( this._donationSum );
	}

	public get amountNeeded(): string {
		var amountToShow = this._currencyFormatter.millions( this._remainingDonationSum );
		if ( this._remainingDonationSum < 1_000_000 ) {
			amountToShow = this._currencyFormatter.euroAmountWithThousandSeparator( this._remainingDonationSum );
		}
		return this._translator.translate( 'amount-missing', {
			amount: amountToShow
		} );
	}

	public get isLateProgress(): boolean {
		return this._isLateProgress;
	}

	public get dramaText(): string {
		return this._dramaText;
	}
}

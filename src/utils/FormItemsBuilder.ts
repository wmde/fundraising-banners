import { Translator } from '@src/Translator';
import { CurrencyFormatter } from '@src/utils/DynamicContent/formatters/Currency';

export const Intervals = {
	ONCE: { value: '0', label: 'interval-once' },
	MONTHLY: { value: '1', label: 'interval-monthly' },
	QUARTERLY: { value: '3', label: 'interval-quarterly' },
	BIANNUAL: { value: '6', label: 'interval-biannual' },
	YEARLY: { value: '12', label: 'interval-yearly' }
};

export const PaymentMethods = {
	DIRECT_DEBIT: { value: 'BEZ', label: 'payment-direct-debit' },
	BANK_TRANSFER: { value: 'UEB', label: 'payment-bank-transfer' },
	CREDIT_CARD: { value: 'MCP', label: 'payment-credit-card' },
	PAYPAL: { value: 'PPL', label: 'payment-paypal' },
	SOFORT: { value: 'SUB', label: 'payment-sofort' }
};

export const AddressTypes = {
	FULL: { value: 'person', label: 'address-type-option-full', notice: 'address-type-notice-full' },
	EMAIL: { value: 'email', label: 'address-type-option-email', notice: 'address-type-notice-email' },
	NO: { value: 'anonym', label: 'address-type-option-none', notice: 'address-type-notice-none' }
};

export interface FormItem {
	value: string;
	label: string;
	notice?: string;
}

export interface DonationFormItems {
	intervals: FormItem[];
	amounts: FormItem[];
	addressType: FormItem[];
	paymentMethods: FormItem[];
}

export default class FormItemsBuilder {
	private readonly _formatAmounts: ( amount: number ) => { label: string; value: string };
	private readonly _translate: ( item: FormItem ) => FormItem;
	private readonly _formItems: DonationFormItems;
	public constructor( translator: Translator, amountFormatter: CurrencyFormatter ) {
		this._formItems = {
			intervals: [],
			amounts: [],
			paymentMethods: [],
			addressType: []
		};

		this._translate = ( item: FormItem ): FormItem => {
			return { value: item.value, label: translator.translate( item.label ), notice: item.notice ? translator.translate( item.notice ) : null };
		};
		this._formatAmounts = ( amount: number ): FormItem => {
			return { value: String( amount ), label: amountFormatter( amount ) };
		};
	}

	public setIntervals( ...intervals: FormItem[] ): void {
		this._formItems.intervals = intervals.map( this._translate );
	}

	public setAmounts( ...amounts: number[] ): void {
		this._formItems.amounts = amounts.map( this._formatAmounts );
	}

	public setPaymentMethods( ...paymentMethods: FormItem[] ): void {
		this._formItems.paymentMethods = paymentMethods.map( this._translate );
	}

	public setAddressType( ...addressType: FormItem[] ): void {
		this._formItems.addressType = addressType.map( this._translate );
	}

	public getItems(): DonationFormItems {
		return this._formItems;
	}

}

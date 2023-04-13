import { FormItem } from '@src/utils/FormItemsBuilder/FormItem';

type PaymentMethodsKey = 'DIRECT_DEBIT' | 'BANK_TRANSFER' | 'CREDIT_CARD' | 'PAYPAL' | 'SOFORT';

export const PaymentMethods: Record<PaymentMethodsKey, FormItem> = {
	DIRECT_DEBIT: { value: 'BEZ', label: 'payment-direct-debit', className: 'payment-BEZ' },
	BANK_TRANSFER: { value: 'UEB', label: 'payment-bank-transfer', className: 'payment-UEB' },
	CREDIT_CARD: { value: 'MCP', label: 'payment-credit-card', className: 'payment-MCP' },
	PAYPAL: { value: 'PPL', label: 'payment-paypal', className: 'payment-PPL' },
	SOFORT: { value: 'SUB', label: 'payment-sofort', className: 'payment-SUB' }
};

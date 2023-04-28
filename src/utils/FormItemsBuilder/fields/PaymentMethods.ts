import { FormItem } from '@src/utils/FormItemsBuilder/FormItem';

type PaymentMethodsKey = 'DIRECT_DEBIT' | 'BANK_TRANSFER' | 'CREDIT_CARD' | 'PAYPAL' | 'SOFORT';

export const PaymentMethods: Record<PaymentMethodsKey, FormItem> = {
	DIRECT_DEBIT: { value: 'BEZ', label: 'payment-direct-debit', className: 'payment-bez' },
	BANK_TRANSFER: { value: 'UEB', label: 'payment-bank-transfer', className: 'payment-ueb' },
	CREDIT_CARD: { value: 'MCP', label: 'payment-credit-card', className: 'payment-mcp' },
	PAYPAL: { value: 'PPL', label: 'payment-paypal', className: 'payment-ppl' },
	SOFORT: { value: 'SUB', label: 'payment-sofort', className: 'payment-sub' }
};

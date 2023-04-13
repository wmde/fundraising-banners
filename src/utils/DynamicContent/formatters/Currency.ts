export interface Currency {
    /**
     * Divide the amount by 1_000_000 and format the decimal number according to locale
     */
    millionsNumeric( amount: number ): string;

    /**
     * Divide the amount by 1_000_000 and format the decimal value according to locale,
     * adding unit and currency symbol.
     */
    millions( amount: number ): string;

    /**
     * Format an amount for displaying as a label or inline in text
     */
    euroAmount( amount: number ): string;

    /**
     * Format an amount while editing it in the custom amount input field
     */
    customAmountInput( amount: number ): string;
}

export interface Currency {
    /**
     * Divide the amount by 1_000_000 and format the decimal number according to locale
     */
    millionsNumeric( amount: number ): string;

    /**
     * Add unit and currency symbol to an amount that is a fraction of a million, e.g. 1.2
     * and format the decimal value according to locale.
     */
    millions( amount: number ): string;
}

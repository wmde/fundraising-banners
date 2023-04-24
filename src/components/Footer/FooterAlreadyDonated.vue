<template>
    <div class="wmde-banner-footer">
        <div class="wmde-banner-footer-bank">
            <a href="#" class="wmde-banner-footer-already-donated" @click="$emit( 'showAlreadyDonatedModal' )">
                <TickIcon :fill="'#5B5B5B'"/> {{ $translate( 'already-donated-open-link' ) }}
            </a>
            <label class="wmde-banner-footer-bank-item account">{{ $translate( 'donation-account' ) }}:
                <SelectionInput :value="'Wikimedia'"/>
            </label>
            <label class="wmde-banner-footer-bank-item bic">BIC:
                <SelectionInput :value="'BFSWDE33BER'"/>
            </label>
            <label class="wmde-banner-footer-bank-item iban">IBAN:
                <SelectionInput :value="'DE33 1002 0500 0001 1947 00'" :focusedValue="'DE33100205000001194700'"/>
            </label>
        </div>

        <div class="wmde-banner-footer-usage">
            <div class="wmde-banner-footer-item">
                <a
                    id="application-of-funds-link"
                    class="wmde-banner-footer-usage-link t-use-of-funds-link"
                    @click="$emit( 'showFundsModal' )">
                    {{ $translate('use-of-funds-link') }}
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SelectionInput from '@src/components/Footer/SelectionInput.vue';
import TickIcon from '@src/components/Icons/TickIcon.vue';

defineEmits( [ 'showAlreadyDonatedModal', 'showFundsModal' ] );

</script>

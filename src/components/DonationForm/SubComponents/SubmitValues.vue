<template>
	<div class="wmde-banner-submit-values">
		<input type="hidden" name="addressType" :value="addressType" />
		<input type="hidden" name="amount" :value="formattedAmountForServer" />
		<input type="hidden" name="interval" :value="interval" />
		<input type="hidden" name="paymentType" :value="paymentMethod" />
		<input type="hidden" name="receipt" :value="receipt" />
	</div>
</template>

<script setup lang="ts">

import { useFormModel } from '@src/components/composables/useFormModel';
import { computed } from 'vue';

const { addressType, totalNumericAmount, interval, paymentMethod, receipt } = useFormModel();

const formattedAmountForServer = computed( (): number => {
	return parseFloat( totalNumericAmount.value.toFixed( 2 ) ) * 100;
} );

</script>

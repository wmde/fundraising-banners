<template>
	<PayPalLogo v-if="paymentMethod === 'PPL'"/>
	<template v-if="paymentMethod === 'MCP'">
		<VisaLogo/>
		<MastercardLogo/>
	</template>
	<template v-if="paymentMethod === 'BEZ'">
		<DirectDebitIcon/> <span>Lastschrift</span>
	</template>
</template>

<script setup lang="ts">

import VisaLogo from '@src/components/PaymentLogos/VisaLogo.vue';
import MastercardLogo from '@src/components/PaymentLogos/MastercardLogo.vue';
import PayPalLogo from '@src/components/PaymentLogos/PayPalLogo.vue';
import DirectDebitIcon from '@src/components/PaymentLogos/DirectDebitIcon.vue';

interface Props {
	paymentMethod: string;
}

defineProps<Props>();

</script>

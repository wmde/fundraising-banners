<template>
	<PayPalIcon v-if="paymentMethod === 'PPL'"/>
	<MasterCardIcon v-if="paymentMethod === 'MCP'"/>
	<DirectDebitIcon v-if="paymentMethod === 'BEZ'"/>
	<BankTransferIcon v-if="paymentMethod === 'UEB'"/>
</template>

<script setup lang="ts">

import PayPalIcon from '@src/components/PaymentLogos/PayPalIcon.vue';
import MasterCardIcon from '@src/components/PaymentLogos/MasterCardIcon.vue';
import BankTransferIcon from '@src/components/PaymentLogos/BankTransferIcon.vue';
import DirectDebitIcon from '@src/components/PaymentLogos/DirectDebitIcon.vue';

interface Props {
	paymentMethod: string;
}

defineProps<Props>();

</script>

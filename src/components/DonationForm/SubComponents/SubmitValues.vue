<template>
	<input type="hidden" name="addressType" :value="addressType" />
	<input type="hidden" name="amount" :value="amount" />
	<input type="hidden" name="interval" :value="interval" />
	<input type="hidden" name="paymentType" :value="paymentType" />
</template>

<script setup lang="ts">

interface Props {
	addressType?: string;
	amount: string;
	interval: string;
	paymentType: string;
}

defineProps<Props>();
</script>

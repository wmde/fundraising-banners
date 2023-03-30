<template>
	<div class="wmde-banner-submit-values">
		<input type="hidden" name="addressType" :value="addressType" />
		<input type="hidden" name="amount" :value="amount" />
		<input type="hidden" name="interval" :value="interval" />
		<input type="hidden" name="paymentType" :value="paymentMethod" />
	</div>
</template>

<script setup lang="ts">

import { useFormModel } from '@src/utils/FormModel/services/useFormModel';

const { addressType, amount, interval, paymentMethod } = useFormModel();

</script>

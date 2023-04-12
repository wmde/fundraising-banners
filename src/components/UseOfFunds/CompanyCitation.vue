<template>
	<a v-if="company.budgetCitation" class="company_budgets__citation_link" :href="company.budgetCitation" target="_blank">
		{{ citationLabel }}
	</a>
</template>

<script setup lang="ts">

import { Company } from '@src/domain/UseOfFunds/Company';

interface Props {
	company: Company;
	citationLabel: string;
}

defineProps<Props>();

</script>

<template>
	<a v-if="company.budgetCitation" class="company_budgets__citation_link" :href="company.budgetCitation" target="_blank">
		{{ citationLabel }}
	</a>
</template>

<script setup lang="ts">

import { Company as CompanyInterface } from '@src/domain/UseOfFunds/Company';

interface Props {
	company: CompanyInterface;
	citationLabel: string;
}

defineProps<Props>();

</script>

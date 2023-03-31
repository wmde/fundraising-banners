<template>
	<DonationForm :form-items="formItems" :form-url="formUrl.donateWithAddressAction">
		<SubmitValues/>
	</DonationForm>
</template>

<script setup lang="ts">

import { inject } from 'vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import SubmitValues from '@src/components/DonationForm/SubComponents/SubmitValues.vue';
import DonationForm from '@src/components/DonationForm/Forms/DonationForm.vue';
import { FormActions } from '@src/domain/FormActions';

interface Props {
	showErrorScrollLink?: boolean;
}

const formUrl = inject<FormActions>( 'formActions' );

withDefaults( defineProps<Props>(), {
	showErrorScrollLink: false
} );

const formItems: DonationFormItems = inject( 'formItems' );

</script>

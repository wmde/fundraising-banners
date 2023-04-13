<template>
	<div class="wmde-banner-form wmde-banner-form-single-step">
		<DonationForm>
			<SubmitValues/>
		</DonationForm>
	</div>
</template>

<script setup lang="ts">

import SubmitValues from '@src/components/DonationForm/SubComponents/SubmitValues.vue';
import DonationForm from '@src/components/DonationForm/Forms/MainDonationForm.vue';

interface Props {
	showErrorScrollLink?: boolean;
}

withDefaults( defineProps<Props>(), {
	showErrorScrollLink: false
} );

</script>

<style lang="scss">
.wmde-banner {
	&-form {
		display: flex;
		height: 100%;
		width: 100%;
		overflow: hidden;

		&-button-container {
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: flex-start;
			flex: 0 1 auto;
			width: 100%;
			margin-top: auto;
		}

		&-button {
			width: 100%;
			display: block;
			box-sizing: border-box;
			cursor: pointer;
			border: 0 none;
			white-space: nowrap;
		}
	}

	&-sub-form {
		display: flex;
		height: 100%;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-end;
		margin: 0;

		&-donation {
			.wmde-banner-form-button-container {
				margin-top: 0;
			}
		}
	}
}
</style>

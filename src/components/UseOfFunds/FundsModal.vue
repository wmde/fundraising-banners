<template>
	<div :class="[ 'banner-modal', { 'is-visible': isFundsModalVisible } ]">
		<div class="banner-modal-background" @click="$emit( 'hideFundsModal', { source: UseOfFundsCloseSources.close } )"></div>
		<div class="banner-modal-container">
			<div class="banner-modal-close">
				<button class="banner-modal-close-link" @click="$emit( 'hideFundsModal', { source: UseOfFundsCloseSources.close } )">
					<img src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Icon_close.svg"  alt="Close Icon"/>
				</button>
			</div>
			<div class="banner-modal-content">
				<FundsContent :content="content" @hide-funds-modal="$emit( 'hideFundsModal', { source: UseOfFundsCloseSources.callToAction } )"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import FundsContent from '@src/components/UseOfFunds/FundsContent.vue';
import { UseOfFundsContent } from '@src/domain/UseOfFunds/UseOfFundsContent';
import { UseOfFundsCloseSources } from '@src/components/UseOfFunds/UseOfFundsCloseSources';

interface Props {
	isFundsModalVisible: boolean,
	content: UseOfFundsContent,
}

defineProps<Props>();
defineEmits( [ 'hideFundsModal' ] );

</script>

<template>
	<div :class="[ 'banner_modal', { 'is-visible': isFundsModalVisible } ]">
		<div class="banner_modal__background" @click="$emit( 'hideFundsModal' )"></div>
		<div class="banner_modal__container">
			<div class="banner_modal_close">
				<button class="banner_modal_close__link" @click="$emit( 'hideFundsModal' )">
					<img src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Icon_close.svg"  alt="Close Icon"/>
				</button>
			</div>
			<div class="banner_modal__content">
				<FundsContent :content="content"  assets-path=""/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import FundsContent from '@src/components/UseOfFunds/FundsContent.vue';
import { UseOfFundsContent } from '@src/domain/UseOfFunds/UseOfFundsContent';

interface Props {
	isFundsModalVisible: boolean,
	content: UseOfFundsContent,
}

defineProps<Props>();
defineEmits( [ 'hideFundsModal' ] );

</script>

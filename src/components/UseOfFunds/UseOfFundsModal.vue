<template>
	<dialog class="wmde-banner-funds-modal" ref="useOfFundsDialogue" aria-labelledby="use-of-funds-heading" tabindex="-1">
		<div class="wmde-banner-funds-modal-close">
			<button @click="$emit( 'hide' )">
				<span class="is-sr-only">{{ $translate( 'close' ) }}</span>
				<IconClose/>
			</button>
		</div>
		<div class="wmde-banner-funds-modal-scroll">
			<UseOfFunds :content="content" @call-to-action="$emit( 'callToAction' )"/>
		</div>
	</dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import IconClose from '@src/components/UseOfFunds/Icons/IconClose.vue';
import UseOfFunds from '@src/components/UseOfFunds/UseOfFunds.vue';
import { UseOfFundsContent } from '@src/domain/UseOfFunds2024/UseOfFundsContent';

interface Props {
	content: UseOfFundsContent
	visible?: boolean;
}

const props = withDefaults( defineProps<Props>(), {
	visible: false
} );

const emit = defineEmits( [ 'shown', 'hide', 'callToAction' ] );
const useOfFundsDialogue = ref<HTMLDialogElement>();

watch( () => props.visible, ( newVisible: boolean ) => {
	if ( newVisible ) {
		useOfFundsDialogue.value.showModal();
		useOfFundsDialogue.value.focus();
		emit( 'shown' );
	} else {
		useOfFundsDialogue.value.close();
	}
} );
</script>

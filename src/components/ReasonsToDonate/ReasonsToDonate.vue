<template>
	<dialog class="wmde-banner-10-reasons" ref="reasonsDialogue">
		<div class="wmde-banner-10-reasons-close">
			<button @click="$emit( 'hide' )">
				<IconClose/>
			</button>
		</div>

		<h2>{{ $translate( 'reasons-title' ) }}</h2>

		<div class="wmde-banner-10-reasons-accordion">
			<details class="wmde-banner-10-reasons-accordion-item" v-for="index in 10" :key="index">
				<summary
					class="wmde-banner-10-reasons-accordion-title"
					tabindex="0"
					:class="$translate( `reasons-${index}-class` )"
					@click="$emit( 'accordionItemClicked', { itemNumber: index.toString() } )"
				>
					<span><span class="wmde-banner-10-reasons-accordion-title-index">{{ index }}.</span>{{ $translate( `reasons-${index}-title` ) }}</span>
					<span class="wmde-banner-10-reasons-accordion-title-chevron"><ChevronDownIcon/></span>
				</summary>

				<div class="wmde-banner-10-reasons-accordion-content">
					{{ $translate( `reasons-${index}-content` ) }}
				</div>

			</details>
		</div>

		<p class="wmde-banner-10-reasons-final-content">
			<span v-html="$translate( 'reasons-final-content' )"/> <strong class="wmde-banner-10-reasons-final-highlight"
				v-html="$translate( 'reasons-final-content-highlighted' )"/>
		</p>

		<div class="wmde-banner-10-reasons-cta">
			<button @click="$emit( 'callToActionClicked' )">
				{{ $translate( 'reasons-cta' ) }}
			</button>
		</div>
	</dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import IconClose from '@src/components/UseOfFunds/Icons/IconClose.vue';
import ChevronDownIcon from '@src/components/ReasonsToDonate/Icons/ChevronDownIcon.vue';

interface Props {
	visible?: boolean;
}

const props = withDefaults( defineProps<Props>(), {
	visible: false
} );

const emit = defineEmits( [ 'shown', 'hide', 'callToActionClicked', 'accordionItemClicked' ] );
const reasonsDialogue = ref<HTMLDialogElement>();

watch( () => props.visible, ( newVisible: boolean ) => {
	if ( newVisible ) {
		reasonsDialogue.value.showModal();
		emit( 'shown' );
	} else {
		reasonsDialogue.value.close();
	}
} );

</script>

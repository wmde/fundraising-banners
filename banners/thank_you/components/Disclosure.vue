<template>
	<details class="wmde-b-disclosure wmde-c-flow wmde-b-prose" :id="id" ref="dialogue" @toggle.prevent="onDialogueToggle">
		<summary class="wmde-c-repel" data-nowrap>
			<hgroup>
				<slot name="header"/>
			</hgroup>
			<ChevronDownIcon/>
		</summary>
		<hr>
		<slot name="content"/>
	</details>
	<div>
		<button
			class="wmde-b-link-button wmde-b-disclosure__read-more"
			:aria-controls="id"
			:aria-expanded="dialogueIsOpen"
			@click="dialogue.open = !dialogue.open"
		>
			<template v-if="dialogueIsOpen">
				<span>Weniger lesen</span><ChevronDownIcon class="wmde-u-flip"/>
			</template>
			<template v-else>
				<span>Weiterlesen</span><ChevronDownIcon/>
			</template>
		</button>
	</div>
</template>

<script setup lang="ts">

import ChevronDownIcon from './Icons/ChevronDownIcon.vue';
import { ref } from 'vue';

interface Props {
	id: string;
}

defineProps<Props>();
const dialogue = ref<HTMLDialogElement>();
const dialogueIsOpen = ref<boolean>( false );

const onDialogueToggle = (): void => {
	dialogueIsOpen.value = dialogue.value.open;
};

</script>

<template>
	<details class="wmde-b-disclosure wmde-c-flow wmde-b-prose" ref="dialogue" @toggle.prevent="onDialogueToggle">
		<summary class="wmde-c-repel" data-nowrap>
			<hgroup>
				<slot name="header"/>
			</hgroup>
			<ChevronDownIcon/>
		</summary>

		<slot name="content"/>
	</details>
	<div>
		<button class="wmde-b-link-button" @click="dialogue.open = !dialogue.open">
			<template v-if="dialogueIsOpen">
				Weniger lesen
			</template>
			<template v-else>
				Weiterlesen
			</template>
		</button>
	</div>
</template>

<script setup lang="ts">

import ChevronDownIcon from './Icons/ChevronDownIcon.vue';
import { ref } from 'vue';

const dialogue = ref<HTMLDialogElement>();
const dialogueIsOpen = ref<boolean>( false );

const onDialogueToggle = (): void => {
	dialogueIsOpen.value = dialogue.value.open;
};

</script>

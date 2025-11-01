<template>
	<div class="wmde-b-close-button">
		<button class="wmde-c-cluster" @click="$emit( 'click' )">
			<span :class="{ 'visually-hidden' : hideLabel }">
				{{ $translate( 'close' ) }}
			</span>
			<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M20.2227 1.83789L11.9492 10.1104L20.2256 18.3867L18.3867 20.2256L10.1104 11.9492L1.83789 20.2227L0 18.3848L8.27246 10.1113L0.00292969 1.84082L1.84082 0.00292969L10.1113 8.27246L18.3848 0L20.2227 1.83789Z" style="fill: var( --close-icon-stroke )"/>
			</svg>
		</button>
	</div>
</template>

<script setup lang="ts">

interface Props {
	hideLabel?: boolean;
}

defineProps<Props>();
defineEmits( [ 'click' ] );
</script>

<template>
	<ProgressBar>
		<template #left-text-amount>
			<HandIcon/>
		</template>
		<template #left-text-time>
			<TimerIcon/>
		</template>
	</ProgressBar>
</template>

<script setup lang="ts">
import HandIcon from '@src/components/ProgressBar/Icons/HandIcon.vue';
import ProgressBar from '@src/components/ProgressBar/DoubleProgressBar.vue';
import TimerIcon from '@src/components/ProgressBar/Icons/TimerIcon.vue';
</script>

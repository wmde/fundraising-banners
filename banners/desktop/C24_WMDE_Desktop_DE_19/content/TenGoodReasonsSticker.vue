<template>
<div :class="[
	'ten-good-reasons-sticker',
	{
		'ten-good-reasons-sticker-non-slider': onLargeScreen,
		'ten-good-reasons-sticker-slider': !onLargeScreen
	} ]">
	<div class="arrow-right">
		<svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M8.75752 8.58554C9.08083 8.26215 9.08083 7.73785 8.75752 7.41446L1.58721 0.242538C1.25599
		-0.088754 0.71618 -0.079448 0.396574 0.263065L0.222655 0.449448C-0.080274 0.77409 -0.0732549 1.27995
		0.238566 1.59605L6.36447 7.80614C6.4705 7.91362 6.4705 8.08638 6.36447 8.19386L0.238567 14.4039C-0.0732528
		14.7201 -0.0802727 15.2259 0.222656 15.5506L0.396575 15.7369C0.716182 16.0794 1.25599 16.0888 1.58721
		15.7575L8.75752 8.58554Z" style="fill: #ffffff;"/>
		</svg>
	</div>
	<a class="ten-good-reasons-sticker-text" @click.prevent="$emit( 'showTenGoodReasonsModal' )">10 Gründe für <br/> eine Spende</a>
</div>
</template>

<script setup lang="ts">

interface Props {
	onLargeScreen: boolean
}

defineProps<Props>();
defineEmits( [ 'showTenGoodReasonsModal', 'hideTenGoodReasonsModal' ] );
</script>

<style lang="scss">
.ten-good-reasons-sticker {
	height: 44px;
	width: 164px;
	background: #fadf7a;
	border-radius: 4px;
	right: 315px;
	position: absolute;
	overflow: hidden;
	cursor: pointer;
	box-shadow: 3px 3px 3px rgba( 0, 0, 0, 0.25 );
}

.ten-good-reasons-sticker-non-slider {
	top: 35px;
}

.ten-good-reasons-sticker-slider {
	top: 208px;
	transform: scale( 0.8 );
	transform-origin: center right;

	// The breakpoint is roughly the point where the footer becomes two lines (because of I already donated) and pushes the progress bar.
	@media ( min-width: 1120px ) {
		transform: scale( 1 );
		top: 210px;
	}
}

.arrow-right {
	height: 33px;
	width: 33px;
	background: #8c1f11;
	border-radius: 16px;
	margin: 5px 0 5px 7px;
	float: left;
	text-align: center;
	padding-top: 8px;
}

.ten-good-reasons-sticker-text {
	position: relative;
	padding: 8px 5px 5px 13px;
	color: #8c1f11;
	line-height: 15px;
	font-size: 14px;
	font-weight: bold;
	overflow: hidden;
	display: block;
}

.ten-good-reasons-sticker-text:hover {
	text-decoration: underline;
}

</style>

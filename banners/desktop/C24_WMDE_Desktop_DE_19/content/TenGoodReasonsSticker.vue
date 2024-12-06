<template>
<div class="ten-good-reasons-sticker">
	<!-- <div class="chevron-right-icon"> -->
		<p><i class="arrow right"></i></p>
	<!-- </div> -->
	<div class="ten-good-reasons-text">10 Gründe für <br/> eine Spende</div>
</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.ten-good-reasons-sticker {
	height: 44px;
	width: 164px;
	background: #fadf7a;
	border-radius: 4px;
	margin: -1% 0 12% 65%;
	position: absolute;
	overflow: hidden;
}

.chevron-right-icon {
	height: 33px;
	width: 33px;
	background: #8c1f11;
	border-radius: 16px;
	margin: 5px 0 5px 7px;
	float:left;
}

.arrow-right {
	float:left;
	border: solid aqua;
	border-width: 0 3px 3px 0;
	display: inline-block;
	padding: 3px;
	background: #8c1f11;
	transform: rotate(-45deg);
	-webkit-transform: rotate(-45deg);
}

// working
.ten-good-reasons-text {
	position: relative;
	padding: 8px 5px 5px 13px;
	color: #8c1f11;
	line-height: 15px;
	font-size: 14px;
	font-weight: bold;
	overflow: hidden;
}
</style>
<template>
	<div class="wmde-banner-sms-box">
		<label>
			<a href="sms:81190;?&body=WIKI" class="wmde-banner-sms-box-label">
				<slot name="sms-icon"/>{{ $translate( 'sms-payment-message' ) }}
			</a>
		</label>
		<span class="wmde-banner-sms-box-notice">
			{{ $translate( 'sms-info-message' ) }}
		</span>
	</div>
</template>

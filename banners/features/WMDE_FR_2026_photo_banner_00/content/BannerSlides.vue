<template>

	<KeenSliderSlide :current-slide="currentSlide" :index="0" class="wmde-c-flow wmde-b-prose">
		<p>
			<span class="wmde-b-tag" data-warning>WOFÜR WIKIPEDIA STEHT</span>
		</p>
		<h2>Millionen Themen. Frei zugänglich.</h2>
		<p>
			Ein fast unendlicher Kosmos des Wissens: Über 66 Millionen Artikel weltweit. Wikipedia ist für alle Menschen frei zugänglich. Entsteht aber nicht von selbst ...
		</p>
		<ProgressBar/>
	</KeenSliderSlide>

	<KeenSliderSlide :current-slide="currentSlide" :index="1" class="wmde-c-flow wmde-b-prose">
		<p>
			<span class="wmde-b-tag">WER WIKIPEDIA MÖGLICH MACHT</span>
		</p>
		<h2>
			Über 250.000 Freiwillige weltweit. Eine Gemeinschaft
		</h2>
		<p>
			Freiwillige schreiben, prüfen und verbessern Wikipedia. Neutral und verlässlich. Ihre Spende hilft uns, die Freiwilligen bei ihrer Arbeit zu unterstützen und die Technik dahinter zu finanzieren.
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :current-slide="currentSlide" :index="2" class="wmde-c-flow wmde-b-prose">
		<p>
			<span class="wmde-b-tag" data-success>
				WAS IM HINTERGRUND LÄUFT
			</span>
		</p>
		<h2>
			Leistungsstarke Technik
		</h2>
		<p>
			Milliarden Zugriffe, riesige Datenmengen, rund um die Uhr. Eigene Server, Software und technische Infrastruktur sorgen dafür, dass Wikipedia zuverlässig, sicher und frei zugänglich bleibt.
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :current-slide="currentSlide" :index="3" class="wmde-c-flow wmde-b-prose">
		<p>
			<span class="wmde-b-tag" data-error>
				WARUM IHRE SPENDE ZÄHLT
			</span>
		</p>
		<h2>
			Wikipedia gehört niemandem. Und ist für alle da.
		</h2>
		<p>
			Keine Paywall. Keine Werbung. Kein Konzern oder Milliardär, der hier Einfluss nimmt und Geschäfte macht. Ihre Unterstützung hilft, dass Wikipedia unabhängig und frei bleibt. Jede Spende hilft.
		</p>
	</KeenSliderSlide>

</template>

<script setup lang="ts">
import KeenSliderSlide from '@src/components/Slider2026/KeenSliderSlide.vue';
import ProgressBar from '../components/ProgressBar.vue';

interface Props {
	currentSlide: number
}

defineProps<Props>();

</script>

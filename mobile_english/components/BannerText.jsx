// eslint-disable-next-line no-unused-vars
import { h } from 'preact';
import TextHighlight from '../../shared/components/ui/TextHighlight';

export default function BannerText( props ) {
	const { weekdayPrepPhrase, currentDayName, campaignDaySentence, visitorsVsDonorsSentence } = props;
	return <div className="banner-text">
		<p className="text__headline">
			To all our readers in Germany.
		</p>
		<p>
			It's a little awkward, so we'll get straight to the point: { weekdayPrepPhrase } { currentDayName } we humbly
			ask you to protect Wikipedia's independence.
			{ campaignDaySentence } We depend on donations averaging about € 22.81, but 99% of our readers don't give.{ ' ' }
			{ visitorsVsDonorsSentence }
			<TextHighlight registerStartAnimation={ props.registerStartHighlight }>
				If everyone reading this gave a small amount, we could keep Wikipedia thriving for years to come.
			</TextHighlight>
			The price of your { currentDayName } coffee is all we need. When we made Wikipedia a non-profit,
			people warned us we'd regret it. But if Wikipedia became commercial, it would be a great loss to the world.
			Wikipedia is a place to learn, not a place for advertising. It unites all of us who love knowledge: contributors,
			readers and the donors who keep us thriving. The heart and soul of Wikipedia is a community of
			people working to bring you unlimited access to reliable, neutral information.
			Please take a minute to help us keep Wikipedia growing. Thank you!
		</p>
	</div>;
}

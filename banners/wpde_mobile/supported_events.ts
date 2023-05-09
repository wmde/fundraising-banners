import { CloseSources } from '@src/tracking/CloseSources';

export default new Set( [
	CloseSources.MainBanner
	// TODO add more supported events (e.g. submit). We don't track SizeIssue events on WPDE
] );

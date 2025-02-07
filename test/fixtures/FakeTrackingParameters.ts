import { TrackingParameters } from '@src/domain/TrackingParameters';

export class FakeTrackingParameters implements TrackingParameters {
	public readonly campaign = 'testCampaign';
	public readonly keyword = 'testKeyword';
};

import { FormAction, FormActionCollection } from '@src/domain/FormActions';
import { FakeTrackingParameters } from '@test/fixtures/FakeTrackingParameters';

const trackingParameters = new FakeTrackingParameters();
export const fakeFormActions = new FormActionCollection(
	new FormAction( 'https://example.com/with-address', trackingParameters ),
	new FormAction( 'https://example.com/without-address', trackingParameters ),
);

import { baseEnvironment } from './environment.base';
import { mergeEnvironments } from './environment.utils';

const developmentEnvironment = {
	apiUrl: 'http://dev-api.example.com',
	featureFlags: {
		enableNewUI: true
	}
};

export const environment = mergeEnvironments(baseEnvironment, developmentEnvironment);

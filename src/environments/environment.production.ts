import { baseEnvironment } from './environment.base';
import { mergeEnvironments } from './environment.utils';

const productionEnvironment = {
	production: true,
	apiUrl: 'https://api.your-domain.com', // Update with your production API URL
	featureFlags: {
		enableAnalytics: true
	},
	github: {
		// In production, the token is injected at build time via GitHub Actions
		token: (globalThis as any)?.['NG_APP_GITHUB_TOKEN'] || process?.env?.['NG_APP_GITHUB_TOKEN'] || '',
		apiUrl: 'https://api.github.com'
	}
};

export const environment = mergeEnvironments(baseEnvironment, productionEnvironment);
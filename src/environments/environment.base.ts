export const baseEnvironment = {
	production: true,
	apiUrl: 'http://localhost:3000/api',
	featureFlags: {
		enableNewUI: false,
		enableAnalytics: false
	},
	version: '1.0.0',
	defaultLanguage: 'en',
	mediumUser: 'jdev-king',
	github: {
		// GitHub token will be injected at build time from environment variables
		// For development, you can set NG_APP_GITHUB_TOKEN in your .env file
		// For production, this will be set via GitHub Actions secrets
		token: (globalThis as any)?.['NG_APP_GITHUB_TOKEN'] || '',
		apiUrl: 'https://api.github.com'
	}
};

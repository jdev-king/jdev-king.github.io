export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export function mergeEnvironments<T>(base: T, override: DeepPartial<T>): T {
	const merged = { ...base };

	for (const key in override) {
		if (override.hasOwnProperty(key)) {
			if (
				override[key] &&
				typeof override[key] === 'object' &&
				!Array.isArray(override[key]) &&
				typeof base[key] === 'object'
			) {
				merged[key] = mergeEnvironments(base[key], override[key]);
			} else {
				merged[key] = override[key] as T[Extract<keyof T, string>];
			}
		}
	}

	return merged;
}

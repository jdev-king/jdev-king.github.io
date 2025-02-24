export interface GitHubRepo {
	id: number;
	name: string;
	description: string | null;
	html_url: string;
	stargazers_count: number;
	language: string | null;
	created_at: string;
	updated_at: string;
	fork: boolean;
}

export interface RepoWithImage extends GitHubRepo {
	readmeImageUrl?: string | null;
}

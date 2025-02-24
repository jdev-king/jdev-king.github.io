// Interface for Medium post data structure
export interface MediumPost {
	title: string;
	author: string;
	pubDate: Date;
	link: string;
	content: string;
	thumbnail: string;
	categories: string[];
}

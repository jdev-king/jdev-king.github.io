import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MediumPost } from '../../shared/domain/MediumPost';

@Injectable({
	providedIn: 'root'
})
export class MediumService {
	// Medium RSS feed URL with CORS proxy
	private readonly MEDIUM_FEED_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/';

	constructor(private http: HttpClient) {}

	// Get posts for a specific Medium username
	getUserPosts(username: string): Observable<MediumPost[]> {
		return this.http.get<any>(`${this.MEDIUM_FEED_URL}@${username}`).pipe(
			map((response) => {
				return response.items.map((item: any) => ({
					title: item.title,
					author: item.author,
					pubDate: new Date(item.pubDate),
					link: item.link,
					content: item.content,
					thumbnail: item.thumbnail,
					categories: item.categories
				}));
			})
		);
	}

	// Get posts from a Medium publication
	getPublicationPosts(publicationName: string): Observable<MediumPost[]> {
		return this.http.get<any>(`${this.MEDIUM_FEED_URL}${publicationName}`).pipe(
			map((response) => {
				return response.items.map((item: any) => ({
					title: item.title,
					author: item.author,
					pubDate: new Date(item.pubDate),
					link: item.link,
					content: item.content,
					thumbnail: item.thumbnail,
					categories: item.categories
				}));
			})
		);
	}

	// Get latest posts from multiple users
	getMultipleUsersPosts(usernames: string[]): Observable<MediumPost[]>[] {
		return usernames.map((username) => this.getUserPosts(username));
	}
}

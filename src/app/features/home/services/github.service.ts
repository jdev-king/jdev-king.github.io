import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, mergeMap, of, tap } from 'rxjs';
import { GitHubRepo, RepoWithImage } from '../../../shared/domain/GitHubRepo';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  private readonly BASE_URL = environment.github.apiUrl;
  private readonly headers: HttpHeaders;
  private cachedReposWithImages: { [username: string]: RepoWithImage[] } = {};

  constructor(private http: HttpClient) {
    // Use token from environment configuration
    // Token is injected at build time from environment variables
    const token = environment.github.token;

    this.headers = new HttpHeaders({
      Accept: 'application/vnd.github.v3+json',
      ...(token && { Authorization: `token ${token}` }), // Only add Authorization header if token exists
    });
  }

  /**
   * Fetches public repositories for a given GitHub username
   * @param username GitHub username
   * @returns Observable containing array of repository data
   */
  getUserRepos(username: string): Observable<GitHubRepo[]> {
    return this.http
      .get<GitHubRepo[]>(`${this.BASE_URL}/users/${username}/repos`, {
        headers: this.headers,
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching GitHub repos:', error);
          throw error;
        })
      );
  }

  /**
   * Fetches a specific repository by username and repo name
   * @param username GitHub username
   * @param repoName Repository name
   * @returns Observable containing repository data
   */
  getRepo(username: string, repoName: string): Observable<GitHubRepo> {
    return this.http
      .get<GitHubRepo>(`${this.BASE_URL}/repos/${username}/${repoName}`, {
        headers: this.headers,
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching GitHub repo:', error);
          throw error;
        })
      );
  }

  /**
   * Fetches the README content and extracts the first image URL
   * @param username GitHub username
   * @param repoName Repository name
   * @returns Observable containing the first image URL from the README
   */
  getReadmeFirstImage(
    username: string,
    repoName: string
  ): Observable<string | null> {
    return this.http
      .get<{ content: string }>(
        `${this.BASE_URL}/repos/${username}/${repoName}/readme`,
        { headers: this.headers }
      )
      .pipe(
        map((response) => {
          // GitHub returns README content in base64
          const decodedContent = atob(response.content);

          // Regular expression to find the first image in markdown or HTML
          const imageRegex = /<img[^>]+src=["'](https?:\/\/[^"']+)["']/i;
          const match = decodedContent.match(imageRegex);

          return match ? match[1] : null;
        }),
        catchError((error) => {
          console.error('Error fetching README:', error);
          throw error;
        })
      );
  }

  /**
   * Gets user repositories with their README first image
   * @param username GitHub username
   * @returns Observable of repositories with their first README image
   */
  getUserReposWithReadmeImage(username: string): Observable<RepoWithImage[]> {
    if (this.cachedReposWithImages[username]) {
      return of(this.cachedReposWithImages[username]);
    }

    return this.getUserRepos(username).pipe(
      map((repos) =>
        repos
          .filter(
            (repo) =>
              repo.name !== 'jdev-king' && repo.name !== 'jdev-king.github.io'
          )
          .map((repo) => ({
            ...repo,
            readmeImageUrl: null,
          }))
      ),
      tap((repos) => {
        this.cachedReposWithImages[username] = repos;
      })
    );
  }
}

export class AnalyticsService {
  track(event: string, payload?: Record<string, unknown>): void {
    console.log('analytics', event, payload ?? {});
  }
}

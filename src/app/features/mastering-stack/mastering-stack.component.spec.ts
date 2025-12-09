import { TestBed } from '@angular/core/testing';
import { MasteringStackComponent } from './mastering-stack.component';
import { By } from '@angular/platform-browser';

describe('MasteringStackComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasteringStackComponent],
    }).compileComponents();
  });

  it('renders progress bars with correct ARIA values', () => {
    const fixture = TestBed.createComponent(MasteringStackComponent);
    fixture.detectChanges();
    const nodeEl = fixture.debugElement.query(By.css('[data-testid="progress-node"]'));
    expect(nodeEl.attributes['aria-valuemin']).toBe('0');
    expect(nodeEl.attributes['aria-valuemax']).toBe('100');
    expect(nodeEl.attributes['aria-valuenow']).toBe('88');
  });

  it('shows version in secondary text style', () => {
    const fixture = TestBed.createComponent(MasteringStackComponent);
    fixture.detectChanges();
    const versionEl = fixture.debugElement.query(By.css('div.text-sm.text-neutral-400'));
    expect(versionEl.nativeElement.textContent.trim()).toContain('v');
  });

  it('has responsive grid classes for cards', () => {
    const fixture = TestBed.createComponent(MasteringStackComponent);
    fixture.detectChanges();
    const grid = fixture.debugElement.query(By.css('[data-testid="grid-responsive"]'));
    const classList = grid.nativeElement.className as string;
    expect(classList).toContain('grid-cols-1');
    expect(classList).toContain('sm:grid-cols-2');
    expect(classList).toContain('xl:grid-cols-3');
  });

  it('shows complementary tools column only when tools exist', () => {
    const fixture = TestBed.createComponent(MasteringStackComponent);
    fixture.detectChanges();
    const nodeTools = fixture.debugElement.query(By.css('[data-testid="tools-col-node"]'));
    const vertexTools = fixture.debugElement.query(By.css('[data-testid="tools-col-vertex"]'));
    const postgresTools = fixture.debugElement.query(By.css('[data-testid="tools-col-postgres"]'));
    const gcloudTools = fixture.debugElement.query(By.css('[data-testid="tools-col-gcloud"]'));
    expect(nodeTools).toBeTruthy();
    expect(vertexTools).toBeTruthy();
    expect(postgresTools).toBeFalsy();
    expect(gcloudTools).toBeFalsy();
  });

  it('uses two-column layout per item on md and above', () => {
    const fixture = TestBed.createComponent(MasteringStackComponent);
    fixture.detectChanges();
    const itemGrid = fixture.debugElement.query(By.css('[data-testid="item-grid-node"]'));
    const classList = itemGrid.nativeElement.className as string;
    expect(classList).toContain('md:grid-cols-2');
  });

  it('renders FontAwesome icon with aria-label', () => {
    const fixture = TestBed.createComponent(MasteringStackComponent);
    fixture.detectChanges();
    const iconEl = fixture.debugElement.query(By.css('[data-testid="icon-angular"]'));
    expect(iconEl).toBeTruthy();
    expect(iconEl.attributes['aria-label']).toContain('icon');
  });

  it('flags outdated when version is behind latest', () => {
    const fixture = TestBed.createComponent(MasteringStackComponent);
    const cmp = fixture.componentInstance;
    const items = cmp.items().map((it) => (it.id === 'fastapi' ? { ...it, version: '0.114.0' } : it));
    cmp.items.set(items);
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.css('[data-testid="badge-outdated"]'));
    expect(badge).toBeTruthy();
  });

  it('renders various mastery percentages correctly', () => {
    const fixture = TestBed.createComponent(MasteringStackComponent);
    const cmp = fixture.componentInstance;
    cmp.items.set([
      { id: 't0', name: 'Test0', category: 'frontend' as any, version: '1.0.0', latestVersion: '1.0.0', mastery: 0, tools: [] },
      { id: 't50', name: 'Test50', category: 'frontend' as any, version: '1.0.0', latestVersion: '1.0.0', mastery: 50, tools: [] },
      { id: 't100', name: 'Test100', category: 'frontend' as any, version: '1.0.0', latestVersion: '1.0.0', mastery: 100, tools: [] },
    ]);
    fixture.detectChanges();
    const p0 = fixture.debugElement.query(By.css('[data-testid="progress-t0"]'));
    const p50 = fixture.debugElement.query(By.css('[data-testid="progress-t50"]'));
    const p100 = fixture.debugElement.query(By.css('[data-testid="progress-t100"]'));
    expect(p0.attributes['aria-valuenow']).toBe('0');
    expect(p50.attributes['aria-valuenow']).toBe('50');
    expect(p100.attributes['aria-valuenow']).toBe('100');
  });
});

import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { PortfolioRepository } from './core/domain/repositories/portfolio.repository';
import { InMemoryPortfolioRepository } from './core/infrastructure/repositories/in-memory-portfolio.repository';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: PortfolioRepository, useClass: InMemoryPortfolioRepository },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the hero heading with the name', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Danny Armijos');
  });

  it('should render the mobile apps section', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#apps')).toBeTruthy();
  });
});

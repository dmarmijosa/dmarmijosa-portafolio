import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { App } from './app';
import { routes } from './app.routes';
import { PortfolioRepository } from './core/domain/repositories/portfolio.repository';
import { InMemoryPortfolioRepository } from './core/infrastructure/repositories/in-memory-portfolio.repository';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter(routes),
        { provide: PortfolioRepository, useClass: InMemoryPortfolioRepository },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the hero heading with the name on the home route', async () => {
    const harness = await RouterTestingHarness.create('/');
    const compiled = harness.routeNativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Danny Armijos');
  });

  it('should render the mobile apps section on the home route', async () => {
    const harness = await RouterTestingHarness.create('/');
    const compiled = harness.routeNativeElement as HTMLElement;
    expect(compiled.querySelector('#apps')).toBeTruthy();
  });

  it('should render the VerbDuel privacy policy at /verbduel/privacy', async () => {
    const harness = await RouterTestingHarness.create('/verbduel/privacy');
    const compiled = harness.routeNativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1')?.textContent ?? '';
    expect(h1.toLowerCase()).toMatch(/privacidad|privacy/);
    expect(compiled.querySelectorAll('h2').length).toBeGreaterThan(5);
    expect(compiled.querySelector('a[href^="mailto:"]')).toBeTruthy();
  });

  it('should render the account deletion page at /verbduel/delete-account', async () => {
    const harness = await RouterTestingHarness.create('/verbduel/delete-account');
    const compiled = harness.routeNativeElement as HTMLElement;
    expect(compiled.querySelector('ol li')).toBeTruthy();
  });
});

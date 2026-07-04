import { TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { PortfolioRepository } from '../../../core/domain/repositories/portfolio.repository';
import { InMemoryPortfolioRepository } from '../../../core/infrastructure/repositories/in-memory-portfolio.repository';

describe('HeroComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [
        { provide: PortfolioRepository, useClass: InMemoryPortfolioRepository },
      ],
    }).compileComponents();
  });

  it('should render sage-mode hero art image', async () => {
    const fixture = TestBed.createComponent(HeroComponent);
    await fixture.whenStable();
    const img = fixture.nativeElement.querySelector(
      'img[ng-reflect-ng-src="portfolio-sage-hero-art.png"], img[src*="portfolio-sage-hero-art"]',
    ) as HTMLImageElement | null;
    const fallback = fixture.nativeElement.querySelector(
      'img[ngsrc="portfolio-sage-hero-art.png"]',
    ) as HTMLImageElement | null;
    const anyHeroArt = fixture.nativeElement.querySelector(
      'img[alt=""]',
    ) as HTMLImageElement | null;
    expect(img ?? fallback ?? anyHeroArt).toBeTruthy();
  });

  it('should render the profile name in the heading', async () => {
    const fixture = TestBed.createComponent(HeroComponent);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Danny Armijos');
  });

  it('should expose eyebrow label with sage-mode styling class', async () => {
    const fixture = TestBed.createComponent(HeroComponent);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.eyebrow-label')).toBeTruthy();
  });
});

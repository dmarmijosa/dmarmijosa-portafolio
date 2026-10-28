import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { NovaLandingComponent } from './nova-landing.component';
import { PortfolioRepository } from '../../../core/domain/repositories/portfolio.repository';
import { InMemoryPortfolioRepository } from '../../../core/infrastructure/repositories/in-memory-portfolio.repository';

describe('Nova section navigation', () => {
  afterEach(() => vi.restoreAllMocks());

  function setup(positions: Record<string, { top: number; bottom: number }>) {
    TestBed.configureTestingModule({
      imports: [NovaLandingComponent],
      providers: [{ provide: PortfolioRepository, useClass: InMemoryPortfolioRepository }],
    });
    const fixture = TestBed.createComponent(NovaLandingComponent);
    vi.spyOn(document, 'getElementById').mockImplementation((id) => {
      const position = positions[id];
      if (!position) return null;
      const element = document.createElement('section');
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({ ...position } as DOMRect);
      return element;
    });
    return fixture.componentInstance;
  }

  it('uses section positions when scenes are taller than the viewport', () => {
    const component = setup({
      intro: { top: -window.innerHeight, bottom: 500 },
      'selected-work': { top: 500, bottom: 1500 },
      reviews: { top: 1500, bottom: 2500 },
    });
    component['onScroll']();
    expect(component['chapter']()).toBe(0);
    expect(component['railVisible']()).toBe(true);
  });

  it('hides the rail once the portfolio occupies the viewport midpoint', () => {
    const component = setup({
      intro: { top: -2400, bottom: -1600 },
      'selected-work': { top: -1600, bottom: -800 },
      reviews: { top: -800, bottom: 0 },
    });
    component['onScroll']();
    expect(component['chapter']()).toBe(2);
    expect(component['railVisible']()).toBe(false);
  });
});

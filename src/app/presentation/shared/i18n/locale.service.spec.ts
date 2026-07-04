import { TestBed } from '@angular/core/testing';
import { LocaleService } from './locale.service';

describe('LocaleService', () => {
  let service: LocaleService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaleService);
  });

  it('should start with a valid locale', () => {
    expect(['es', 'en']).toContain(service.locale());
  });

  it('should translate known keys for the active locale', () => {
    service.setLocale('es');
    expect(service.t('hero.greeting')).toBe('Hola, soy');
    expect(service.t('hero.eyebrow')).toBe('Software Engineer');
  });

  it('should toggle between es and en', () => {
    service.setLocale('es');
    service.toggle();
    expect(service.locale()).toBe('en');
    service.toggle();
    expect(service.locale()).toBe('es');
  });

  it('should interpolate params in translation strings', () => {
    service.setLocale('en');
    expect(service.t('projects.openAria', { title: 'Demo' })).toBe(
      'Open Demo in a new tab',
    );
  });
});

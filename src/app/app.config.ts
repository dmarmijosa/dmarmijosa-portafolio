import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { PortfolioRepository } from './core/domain/repositories/portfolio.repository';
import { InMemoryPortfolioRepository } from './core/infrastructure/repositories/in-memory-portfolio.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Dependency Inversion: bind the domain port to its infrastructure impl.
    { provide: PortfolioRepository, useClass: InMemoryPortfolioRepository },
  ],
};

import { inject, Injectable } from '@angular/core';
import { PortfolioRepository } from '../../domain/repositories/portfolio.repository';
import { MobileApp } from '../../domain/entities';
import { Locale } from '../../domain/value-objects/locale';

/** Returns the published mobile applications. */
@Injectable({ providedIn: 'root' })
export class GetMobileAppsUseCase {
  private readonly repo = inject(PortfolioRepository);

  execute(locale: Locale): readonly MobileApp[] {
    return this.repo.getMobileApps(locale);
  }
}

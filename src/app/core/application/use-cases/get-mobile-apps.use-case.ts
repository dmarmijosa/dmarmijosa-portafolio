import { inject, Injectable } from '@angular/core';
import { PortfolioRepository } from '../../domain/repositories/portfolio.repository';
import { MobileApp } from '../../domain/entities';

/** Returns the published mobile applications. */
@Injectable({ providedIn: 'root' })
export class GetMobileAppsUseCase {
  private readonly repo = inject(PortfolioRepository);

  execute(): readonly MobileApp[] {
    return this.repo.getMobileApps();
  }
}

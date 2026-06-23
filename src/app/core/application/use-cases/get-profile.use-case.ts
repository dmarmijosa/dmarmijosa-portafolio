import { inject, Injectable } from '@angular/core';
import { PortfolioRepository } from '../../domain/repositories/portfolio.repository';
import { Profile, Stat } from '../../domain/entities';
import { Locale } from '../../domain/value-objects/locale';

/** Returns the portfolio owner's profile and headline stats. */
@Injectable({ providedIn: 'root' })
export class GetProfileUseCase {
  private readonly repo = inject(PortfolioRepository);

  profile(locale: Locale): Profile {
    return this.repo.getProfile(locale);
  }

  stats(locale: Locale): readonly Stat[] {
    return this.repo.getStats(locale);
  }
}

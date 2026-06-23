import { inject, Injectable } from '@angular/core';
import { PortfolioRepository } from '../../domain/repositories/portfolio.repository';
import { SkillGroup } from '../../domain/entities';
import { Locale } from '../../domain/value-objects/locale';

/** Returns the grouped technical skills. */
@Injectable({ providedIn: 'root' })
export class GetSkillsUseCase {
  private readonly repo = inject(PortfolioRepository);

  execute(locale: Locale): readonly SkillGroup[] {
    return this.repo.getSkillGroups(locale);
  }
}

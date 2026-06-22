import { inject, Injectable } from '@angular/core';
import { PortfolioRepository } from '../../domain/repositories/portfolio.repository';
import { SkillGroup } from '../../domain/entities';

/** Returns the grouped technical skills. */
@Injectable({ providedIn: 'root' })
export class GetSkillsUseCase {
  private readonly repo = inject(PortfolioRepository);

  execute(): readonly SkillGroup[] {
    return this.repo.getSkillGroups();
  }
}

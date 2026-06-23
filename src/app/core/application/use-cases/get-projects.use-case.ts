import { inject, Injectable } from '@angular/core';
import { PortfolioRepository } from '../../domain/repositories/portfolio.repository';
import { Project, ProjectCategory } from '../../domain/entities';
import { Locale } from '../../domain/value-objects/locale';

export type ProjectFilter = ProjectCategory | 'Todos';

/** Retrieves and filters web projects, surfacing featured ones first. */
@Injectable({ providedIn: 'root' })
export class GetProjectsUseCase {
  private readonly repo = inject(PortfolioRepository);

  all(locale: Locale): readonly Project[] {
    return this.featuredFirst(this.repo.getProjects(locale));
  }

  byCategory(filter: ProjectFilter, locale: Locale): readonly Project[] {
    const projects = this.repo.getProjects(locale);
    const list = filter === 'Todos' ? projects : projects.filter((p) => p.category === filter);
    return this.featuredFirst(list);
  }

  private featuredFirst(list: readonly Project[]): readonly Project[] {
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../i18n/locale.service';
import {
  LegalDocument,
  VERBDUEL_SUPPORT_EMAIL,
} from '../../pages/verbduel/verbduel-legal.content';

/**
 * Standalone, readable layout for legal pages (privacy policy, account
 * deletion). Uses the portfolio's paper palette and typography, with a
 * readable measure (~70ch) and no animations, so store reviewers and users
 * get a plain, accessible web page.
 */
@Component({
  selector: 'app-legal-document',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="legal-shell">
      <header class="legal-topbar">
        <a routerLink="/" class="legal-home" [attr.aria-label]="loc.t('legal.home')">
          <span aria-hidden="true">←</span>
          <span class="font-display font-semibold"><span class="text-gradient">DA</span>.</span>
          <span class="legal-home-name">Danny Armijos</span>
        </a>
        <button type="button" class="legal-lang" (click)="loc.toggle()" [attr.aria-label]="loc.t('lang.label')">
          <span aria-hidden="true">🌐</span> {{ loc.t('lang.toggle') }}
        </button>
      </header>

      <main id="main" class="legal-main">
        <p class="eyebrow-label">{{ doc().eyebrow }}</p>
        <h1 class="legal-title">
          {{ doc().titleLead }} <span class="text-gradient">{{ doc().titleAccent }}</span>
        </h1>
        <p class="legal-updated">{{ doc().updated }}</p>
        <p class="legal-intro">{{ doc().intro }}</p>

        @for (section of doc().sections; track $index) {
          <section class="legal-section">
            <h2 class="legal-h2" [id]="'legal-h-' + $index">{{ section.heading }}</h2>

            @if (section.steps; as steps) {
              <ol class="legal-steps">
                @for (step of steps; track $index) {
                  <li>{{ step }}</li>
                }
              </ol>
            }

            @if (section.table; as table) {
              <div class="legal-table-wrap" role="region" [attr.aria-label]="section.heading + ' — ' + loc.t('legal.table')" tabindex="0">
                <table class="legal-table">
                  <thead>
                    <tr>
                      @for (h of table.head; track $index) {
                        <th scope="col">{{ h }}</th>
                      }
                    </tr>
                  </thead>
                  <tbody>
                    @for (row of table.rows; track $index) {
                      <tr>
                        @for (cell of row; track $index) {
                          <td>{{ cell }}</td>
                        }
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }

            @for (p of section.paragraphs ?? []; track $index) {
              <p class="legal-p">{{ p }}</p>
            }

            @if (section.bullets; as bullets) {
              <ul class="legal-list">
                @for (b of bullets; track $index) {
                  <li>{{ b }}</li>
                }
              </ul>
            }
          </section>
        }

        <aside class="legal-contact glass" aria-labelledby="legal-contact-h">
          <h2 id="legal-contact-h" class="legal-h2">{{ doc().contactHeading }}</h2>
          <p class="legal-p">{{ doc().contactText }}</p>
          <a class="legal-mail" [href]="'mailto:' + email">{{ email }}</a>
        </aside>
      </main>

      <footer class="legal-footer">
        <span>© 2026 Danny Armijos · VerbDuel</span>
        <nav class="legal-footer-nav" [attr.aria-label]="loc.t('legal.related')">
          <a routerLink="/verbduel/privacy">{{ loc.t('legal.privacy') }}</a>
          <a routerLink="/verbduel/delete-account">{{ loc.t('legal.delete') }}</a>
        </nav>
      </footer>
    </div>
  `,
  styles: `
    :host { display: block; background: var(--page-bg); color: var(--text); min-height: 100vh; }
    .legal-shell { max-width: 46rem; margin: 0 auto; padding: 0 clamp(16px, 5vw, 32px); }
    .legal-topbar {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      padding: 20px 0; border-bottom: 1px solid var(--line);
    }
    .legal-home {
      display: inline-flex; align-items: center; gap: 8px; min-height: 44px;
      text-decoration: none; font-size: 15px; color: var(--text);
    }
    .legal-home:hover .legal-home-name { text-decoration: underline; }
    .legal-lang {
      display: inline-flex; align-items: center; gap: 6px; min-height: 44px;
      padding: 0 14px; border-radius: 12px; border: 1px solid var(--line);
      background: var(--surface); color: var(--text); font-size: 14px; font-weight: 600;
    }
    .legal-lang:hover { background: var(--surface-strong); }
    .legal-main { padding: 40px 0 24px; }
    .legal-title {
      margin: 12px 0 8px; font-family: var(--font-display); font-weight: 700;
      font-size: clamp(2rem, 6vw, 3rem); line-height: 1.1; letter-spacing: -0.01em; color: var(--text);
    }
    .legal-updated { margin: 0; font-family: var(--font-mono); font-size: 13px; color: var(--text-soft); }
    .legal-intro { margin: 24px 0 8px; font-size: 18px; line-height: 1.65; color: var(--text); }
    .legal-section { padding-top: 28px; }
    .legal-h2 { margin: 0 0 10px; font-family: var(--font-display); font-size: 1.3rem; font-weight: 600; color: var(--text); }
    .legal-p { margin: 0 0 12px; color: var(--text-muted); line-height: 1.7; }
    .legal-list, .legal-steps { margin: 0 0 12px; padding-left: 1.4rem; color: var(--text-muted); line-height: 1.7; }
    .legal-list { list-style: disc; }
    .legal-steps { list-style: decimal; }
    .legal-list li::marker { color: #9c3928; }
    .legal-list li, .legal-steps li { margin-bottom: 6px; }
    .legal-steps li::marker { color: #9c3928; font-weight: 600; }
    .legal-table-wrap { overflow-x: auto; margin: 4px 0 14px; border: 1px solid var(--line); border-radius: 12px; background: var(--surface-strong); }
    .legal-table-wrap:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
    .legal-table { width: 100%; border-collapse: collapse; font-size: 15px; }
    .legal-table th {
      text-align: left; padding: 12px 14px; background: var(--surface-soft); color: var(--text);
      font-family: var(--font-mono); font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase;
    }
    .legal-table td { padding: 12px 14px; border-top: 1px solid var(--line); color: var(--text-muted); vertical-align: top; line-height: 1.55; }
    .legal-table td:first-child { color: var(--text); font-weight: 500; min-width: 12rem; }
    .legal-contact { margin-top: 36px; padding: 22px 24px; }
    .legal-mail { display: inline-flex; align-items: center; min-height: 44px; color: #9c3928; font-weight: 600; overflow-wrap: anywhere; }
    .legal-footer {
      display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 4px 12px;
      padding: 20px 0 32px; border-top: 1px solid var(--line); font-size: 14px; color: var(--text-soft);
    }
    .legal-footer-nav { display: flex; gap: 16px; flex-wrap: wrap; }
    .legal-footer-nav a { color: var(--text-muted); min-height: 44px; display: inline-flex; align-items: center; }
    @media (max-width: 480px) {
      .legal-home-name { display: none; }
      .legal-intro { font-size: 17px; }
      .legal-table td:first-child { min-width: 9rem; }
    }
  `,
})
export class LegalDocumentComponent {
  protected readonly loc = inject(LocaleService);
  readonly doc = input.required<LegalDocument>();
  protected readonly email = VERBDUEL_SUPPORT_EMAIL;
  private readonly title = inject(Title);

  constructor() {
    // Keep the browser tab title in the active language (route titles are static).
    effect(() => {
      const d = this.doc();
      this.title.setTitle(`${d.titleLead} ${d.titleAccent} — VerbDuel`.replace(/^./, (c) => c.toUpperCase()));
    });
  }
}

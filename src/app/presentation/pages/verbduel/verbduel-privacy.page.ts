import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LocaleService } from '../../shared/i18n/locale.service';
import { LegalDocumentComponent } from '../../shared/components/legal-document.component';
import { VERBDUEL_PRIVACY } from './verbduel-legal.content';

/** /verbduel/privacy — privacy policy linked from both app store listings. */
@Component({
  selector: 'app-verbduel-privacy-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LegalDocumentComponent],
  template: `<app-legal-document [doc]="doc()" />`,
})
export class VerbDuelPrivacyPage {
  private readonly loc = inject(LocaleService);
  protected readonly doc = computed(() => VERBDUEL_PRIVACY[this.loc.locale()]);
}

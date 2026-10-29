import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LocaleService } from '../../shared/i18n/locale.service';
import { LegalDocumentComponent } from '../../shared/components/legal-document.component';
import { VERBDUEL_DELETE_ACCOUNT } from './verbduel-legal.content';

/** /verbduel/delete-account — account deletion URL required by Google Play. */
@Component({
  selector: 'app-verbduel-delete-account-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LegalDocumentComponent],
  template: `<app-legal-document [doc]="doc()" />`,
})
export class VerbDuelDeleteAccountPage {
  private readonly loc = inject(LocaleService);
  protected readonly doc = computed(() => VERBDUEL_DELETE_ACCOUNT[this.loc.locale()]);
}

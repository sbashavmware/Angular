import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailComponent } from './patient-detail.component';
import { ProviderType, L10nConfig, TranslationModule } from 'angular-l10n';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('PatientDetailComponent', () => {
  let component: PatientDetailComponent;
  let fixture: ComponentFixture<PatientDetailComponent>;
  const l10nConfig: L10nConfig = {
    locale: {
      languages: [
        { code: 'en', dir: 'ltr' },
        { code: 'fr', dir: 'ltr' }
      ],
      defaultLocale: { languageCode: 'en', countryCode: 'US' },
      language: 'en'
    },
    translation: {
      providers: [
        { type: ProviderType.Static, prefix: './images/i18n/locale-' }
      ],
      caching: true
    }
  };
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule,TranslationModule.forRoot(l10nConfig),ClarityModule, HttpClientModule,
        HttpModule], 
      declarations: [ PatientDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create patient detail component', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});

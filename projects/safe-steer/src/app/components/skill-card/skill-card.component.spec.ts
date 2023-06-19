import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCardComponent } from './skill-card.component';
import { MaterialModule } from '../../material.module';
import { TruncatedTextComponent } from '../../shared/truncated-text/truncated-text.component';

describe('SkillCardComponent', () => {
  let component: SkillCardComponent;
  let fixture: ComponentFixture<SkillCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SkillCardComponent,
        TruncatedTextComponent
      ],
      imports: [
        MaterialModule
      ]
    });
    fixture = TestBed.createComponent(SkillCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

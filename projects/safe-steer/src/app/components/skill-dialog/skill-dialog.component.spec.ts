import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDialogComponent } from './skill-dialog.component';

describe('SkillDialogComponent', () => {
  let component: SkillDialogComponent;
  let fixture: ComponentFixture<SkillDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillDialogComponent]
    });
    fixture = TestBed.createComponent(SkillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

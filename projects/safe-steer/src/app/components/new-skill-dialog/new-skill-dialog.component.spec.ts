import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSkillDialogComponent } from './new-skill-dialog.component';

describe('NewSkillDialogComponent', () => {
  let component: NewSkillDialogComponent;
  let fixture: ComponentFixture<NewSkillDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSkillDialogComponent]
    });
    fixture = TestBed.createComponent(NewSkillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

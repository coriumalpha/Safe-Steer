import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSkillDialogComponent } from './new-skill-dialog.component';
import { MaterialModule } from '../../material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewSkillDialogComponent', () => {
  let component: NewSkillDialogComponent;
  let fixture: ComponentFixture<NewSkillDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSkillDialogComponent],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            skill: {
              id: 2,
              title: 'Test Skill',
              category: 'Electric Vehicles',
              imageName: 'engine',
              description: 'Test description'
            },
            categories: [
              {
                id: 1,
                title: 'Electric Vehicles'
              }
            ],
            imageNames: [
              'engine',
              'car-controls'
            ]
          }
        }
      ]
    });
    fixture = TestBed.createComponent(NewSkillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

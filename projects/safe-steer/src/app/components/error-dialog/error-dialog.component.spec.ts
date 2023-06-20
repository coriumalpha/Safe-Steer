import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDialogComponent } from './error-dialog.component';
import { MaterialModule } from '../../material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ErrorDialogComponent', () => {
  let component: ErrorDialogComponent;
  let fixture: ComponentFixture<ErrorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorDialogComponent],
      imports: [
        MaterialModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            message: 'Test message'
          }
        }
      ]
    });
    fixture = TestBed.createComponent(ErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

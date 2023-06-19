import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemCardComponent } from './new-item-card.component';
import { MaterialModule } from '../../material.module';

describe('NewItemCardComponent', () => {
  let component: NewItemCardComponent;
  let fixture: ComponentFixture<NewItemCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewItemCardComponent],
      imports: [
        MaterialModule
      ]
    });
    fixture = TestBed.createComponent(NewItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

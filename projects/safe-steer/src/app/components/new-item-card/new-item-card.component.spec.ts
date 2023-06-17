import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemCardComponent } from './new-item-card.component';

describe('NewItemCardComponent', () => {
  let component: NewItemCardComponent;
  let fixture: ComponentFixture<NewItemCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewItemCardComponent]
    });
    fixture = TestBed.createComponent(NewItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruncatedTextComponent } from './truncated-text.component';

describe('TruncatedTextComponent', () => {
  let component: TruncatedTextComponent;
  let fixture: ComponentFixture<TruncatedTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TruncatedTextComponent]
    });
    fixture = TestBed.createComponent(TruncatedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

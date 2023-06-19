import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DemoComponent } from './demo.component';
import { MaterialModule } from '../../material.module';
import { NewItemCardComponent } from '../../components/new-item-card/new-item-card.component';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DemoComponent,
        NewItemCardComponent
      ],
      imports: [
        HttpClientTestingModule,
        MaterialModule
      ],
    });
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

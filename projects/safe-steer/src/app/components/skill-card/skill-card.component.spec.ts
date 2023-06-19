import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../../material.module';
import { TruncatedTextComponent } from '../../shared/truncated-text/truncated-text.component';
import { SkillCardComponent } from './skill-card.component';

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
      ],
    });
    fixture = TestBed.createComponent(SkillCardComponent);
    component = fixture.componentInstance;

    component.skill = {
      id: 8,
      title: 'Test Skill',
      category: 'Test Category',
      imageName: 'test-image',
      description: 'Test description'
    };

    component.isInLearningPath = false;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit openDialogEvent when card is clicked', () => {
    spyOn(component.openDialogEvent, 'emit');
    fixture.debugElement.query(By.css('mat-card')).triggerEventHandler('click', null);
    expect(component.openDialogEvent.emit).toHaveBeenCalledWith(component.skill);
  });

  it('should emit addToPathEvent when add to path button is clicked', () => {
    component.isInLearningPath = false;
    fixture.detectChanges();
    spyOn(component.addToPathEvent, 'emit');
    let button = fixture.nativeElement.querySelector('.action');
    button.click();
    expect(component.addToPathEvent.emit).toHaveBeenCalledWith(component.skill);
  });

  it('should emit removeFromPathEvent when remove from path button is clicked', () => {
    component.isInLearningPath = true;
    fixture.detectChanges();
    spyOn(component.removeFromPathEvent, 'emit');
    let button = fixture.nativeElement.querySelector('.delete');
    button.click();
    expect(component.removeFromPathEvent.emit).toHaveBeenCalledWith(component.skill);
  });
});

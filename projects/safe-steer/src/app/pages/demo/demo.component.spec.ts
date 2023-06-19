import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Subject, of } from 'rxjs';
import { DemoComponent } from './demo.component';
import { MaterialModule } from '../../material.module';
import { NewItemCardComponent } from '../../components/new-item-card/new-item-card.component';
import { SkillService } from '../../services/skill.service';
import { LearningPathService } from '../../services/learning-path.service';
import { CategoryService } from '../../services/category.service';
import { testSkills, testLearningPaths, testCategories } from './demo.component.spec.data'; // Import data here
import { Skill } from '../../models/skill.model';
import { LearningPath } from '../../models/learning-path.model';
import { ComponentsModule } from '../../components/components.module';
import { SkillDialogComponent } from '../../components/skill-dialog/skill-dialog.component';
import { SkillStore } from '../../stores/skill.store';
import { SkillQuery } from '../../querys/skill.query';
import { Category } from '../../models/category.model';

class SkillServiceStub {
  get() { return of(testSkills); }
  add(skill: Skill) { return of(skill); }
  delete(skillId: number) { return of(null); }
}

class LearningPathServiceStub {
  get() { return of(testLearningPaths[0]); }
  addSkillToPath(learningPath: LearningPath, skillId: number) { return of(learningPath); }
  removeSkillFromPath(learningPath: LearningPath, skillId: number) { return of(learningPath); }
}

class CategoryServiceStub {
  get() { return of(testCategories); }
}

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DemoComponent,
        NewItemCardComponent,
      ],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        ComponentsModule
      ],
      providers: [
        { provide: SkillService, useClass: SkillServiceStub },
        { provide: LearningPathService, useClass: LearningPathServiceStub },
        { provide: CategoryService, useClass: CategoryServiceStub },
      ]
    });
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add skill when addSkill() is called', () => {
    const newSkill = { id: 6, title: 'New Skill', category: 'New Category', imageName: 'new-image', description: 'New Description' };

    const skillService = TestBed.inject(SkillService);
    const spy = spyOn(skillService, 'add').and.returnValue(of(newSkill));

    component.addSkill(newSkill);

    expect(spy).toHaveBeenCalledWith(newSkill);
  });

  it('should delete skill when deleteSkill() is called', () => {
    const skillService = TestBed.inject(SkillService);
    const spy = spyOn(skillService, 'delete').and.returnValue(of(undefined));

    component.deleteSkill(1);

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should add skill to learning path when addToLearningPath() is called', fakeAsync(() => {
    const skill: Skill = testSkills[0];
    const learningPathService = TestBed.inject(LearningPathService);
    const spy = spyOn(learningPathService, 'addSkillToPath').and.returnValue(of(testLearningPaths[0]));

    component.learningPath$ = of(testLearningPaths[0]);

    component.addToLearningPath(skill);

    tick();

    expect(spy).toHaveBeenCalled();
  }));

  it('should remove skill from learning path when removeFromLearningPath() is called', fakeAsync(() => {
    const skill: Skill = testSkills[0];
    const learningPathService = TestBed.inject(LearningPathService);
    const spy = spyOn(learningPathService, 'removeSkillFromPath').and.returnValue(of(testLearningPaths[0]));

    component.learningPath$ = of(testLearningPaths[0]);

    component.removeFromLearningPath(skill);

    tick();

    expect(spy).toHaveBeenCalled();
  }));

  it('should return true if skill is in learning path', () => {
    const skill: Skill = testSkills[0];

    component.learningPath$ = of({
      id: 1,
      skills: [skill.id],
    });

    expect(component.skillInLearningPath(skill)).toBeTrue();
  });

  it('should return false if skill is not in learning path', () => {
    const skill: Skill = testSkills[0];

    component.learningPath$ = of({
      id: 1,
      skills: [],
    });

    expect(component.skillInLearningPath(skill)).toBeFalse();
  });

  it('should show skill detail dialog when showSkillDetailDialog() is called', () => {
    const skill: Skill = testSkills[0];
    const dialog = TestBed.inject(MatDialog);
    const deleteSubject = new Subject<void>();
    const dialogRefSpy = { afterClosed: of({}), close: null, componentInstance: { delete: deleteSubject.asObservable() } };
    spyOn(dialog, 'open').and.returnValue(dialogRefSpy as unknown as MatDialogRef<SkillDialogComponent>);

    component.showSkillDetailDialog(skill);

    expect(dialog.open).toHaveBeenCalledWith(
      SkillDialogComponent,
      {
        width: '600px',
        data: skill
      }
    );
  });

  it('should update selected category when onCategorySelectionChange() is called', () => {
    const skillStore = TestBed.inject(SkillStore);
    const updateSpy = spyOn(skillStore, 'update');
    const category: Category = testCategories[1];
  
    component.onCategorySelectionChange(category);
  
    expect(updateSpy).toHaveBeenCalledWith({ ui: { selectedCategory: category } });
  });  

});

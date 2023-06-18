import { Component } from '@angular/core';
import { Observable, combineLatest, filter, of, switchMap, take, tap } from 'rxjs';
import { Skill } from '../../models/skill.model';
import { SkillService } from '../../services/skill.service';
import { SkillQuery } from '../../querys/skill.query';
import { SkillStore } from '../../stores/skill.store';
import { MatDialog } from '@angular/material/dialog';
import { SkillDialogComponent } from '../../components/skill-dialog/skill-dialog.component';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';
import { LearningPathService } from '../../services/learning-path.service';

import { LearningPathQuery } from '../../querys/learning-path.query';
import { LearningPath } from '../../models/learning-path.model';
import { NewSkillDialogComponent } from '../../components/new-skill-dialog/new-skill-dialog.component';
import { CategoryQuery } from '../../querys/category.query';
import { CategoryStore } from '../../stores/category.store';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})

export class DemoComponent {
  readonly imageNames = ['brake-discs', 'car-controls', 'engine', 'headlight', 'wave'];

  userLearningPath: number = 1;
  skills$!: Observable<Skill[]>;
  categories$!: Observable<Category[]>;
  selectedCategory$!: Observable<Category | null>;
  learningPath$!: Observable<LearningPath | undefined>;
  learningPathSkills$!: Observable<(Skill | undefined)[]>;

  constructor(
    private skillService: SkillService,
    private skillQuery: SkillQuery,
    private skillStore: SkillStore,
    private categoryService: CategoryService,
    private categoryQuery: CategoryQuery,
    private categoryStore: CategoryStore,
    private learningPathService: LearningPathService,
    private learningPathQuery: LearningPathQuery,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.skillService.get().subscribe(() => {
      this.skills$ = this.skillQuery.selectFilteredSkills$;
    });

    this.categoryService.get().subscribe(() => {
      this.categories$ = this.categoryQuery.selectAll();
      this.selectedCategory$ = this.skillQuery.selectCategory;
    });   

    this.learningPathService.get().subscribe(() => {
      this.learningPath$ = this.learningPathQuery.selectEntity(this.userLearningPath);
      this.updateLearningPathSkills();
    });

  }

  updateLearningPathSkills(): void {
    this.learningPathSkills$ = this.learningPath$.pipe(
      filter((learningPath): learningPath is LearningPath => learningPath !== undefined),
      switchMap(learningPath => {
        const skillObservables = learningPath.skills.map(skillId => {
          return this.skillQuery.selectEntity(skillId); // Obtener el skill de la consulta de Akita
        });
        return combineLatest(skillObservables);
      })
    );
  }

  onCategorySelectionChange(category: Category) {
    //TODO: Migrate to service
    this.skillQuery.selectCategory.pipe(take(1)).subscribe(selectedCategory => {
      this.skillStore.update({ ui: { selectedCategory: (selectedCategory === category) ? null : category } });
    });
  }

  showSkillDetailDialog(skill: Skill): void {
    const dialogRef = this.dialog.open(SkillDialogComponent, {
      width: '600px',
      data: skill
    });
  
    dialogRef.componentInstance.delete.subscribe({
      next: () => {
        this.skillService.delete(skill.id).subscribe({
          next: () => {
            console.log('Skill deleted successfully');
            dialogRef.close();
          },
          error: (error: any) => {
            console.error('Error deleting skill:', error);
          },
          complete: () => {
            console.log('Delete operation completed');
          }
        });
      },
      error: (error: any) => {
        console.error('Error in delete emitter:', error);
      }
    });
  }  

  createNewSkill(): void {
    this.categories$.pipe(take(1)).subscribe({
      next: (categories) => {
        const dialogRef = this.dialog.open(NewSkillDialogComponent, {
          width: '600px',
          data: {
            skill: { title: '', category: '', imageName: '', description: '' },
            categories: categories,
            imageNames: this.imageNames
          },
          disableClose: true  // Prevenir el cierre del diálogo haciendo click fuera de él o pulsando ESC
        });

        dialogRef.componentInstance.confirm.subscribe({
          next: (newSkill: Skill) => {
            this.skillService.add(newSkill).subscribe({
              next: () => {
                console.log('Skill added successfully');
                dialogRef.close();
              }
            });
          }
        });
      },
    });
  }

  addToLearningPath(skill: Skill): void {
    this.learningPath$.pipe(
      take(1),
      switchMap(learningPath => {
        if (learningPath) {
          return this.learningPathService.addSkillToPath(learningPath, skill.id);
        } else {
          return of(undefined);
        }
      })
    ).subscribe(() => {
      this.updateLearningPathSkills();
    });
  }

  removeFromLearningPath(skill: Skill): void {
    this.learningPath$.pipe(
      take(1),
      switchMap(learningPath => {
        if (learningPath) {
          return this.learningPathService.removeSkillFromPath(learningPath, skill.id);
        } else {
          return of(undefined);
        }
      })
    ).subscribe(() => {
      this.updateLearningPathSkills();
    });
  }


  skillInLearningPath(skill: Skill): boolean {
    let skillInPath = false;
    this.learningPath$?.pipe(take(1)).subscribe(learningPath => {
      if (learningPath) {
        skillInPath = learningPath.skills.includes(skill.id);
      }
    });
    return skillInPath;
  }

}

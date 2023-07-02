import { Component, ViewChild } from '@angular/core';
import { Observable, catchError, combineLatest, filter, forkJoin, of, switchMap, take, tap, throwError } from 'rxjs';
import { Skill } from '../../models/skill.model';
import { SkillService } from '../../services/skill.service';
import { SkillQuery } from '../../querys/skill.query';
import { SkillStore } from '../../stores/skill.store';
import { MatDialog } from '@angular/material/dialog';
import { SkillDialogComponent } from '../../components/skill-dialog/skill-dialog.component';
import { LearningPathService } from '../../services/learning-path.service';

import { LearningPathQuery } from '../../querys/learning-path.query';
import { LearningPath } from '../../models/learning-path.model';
import { NewSkillDialogComponent } from '../../components/new-skill-dialog/new-skill-dialog.component';
import { CategoryQuery } from '../../querys/category.query';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { LoadingService } from '../../services/loading.service';

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
  error: any = null;

  constructor(
    private skillService: SkillService,
    private skillQuery: SkillQuery,
    private skillStore: SkillStore,
    private categoryService: CategoryService,
    private categoryQuery: CategoryQuery,
    private learningPathService: LearningPathService,
    private learningPathQuery: LearningPathQuery,
    public dialog: MatDialog,
    public loadingService: LoadingService
  ) { }

  ngOnInit() {
    forkJoin([
      this.skillService.get(),
      this.categoryService.get(),
      this.learningPathService.get()
    ]).subscribe({
      next: ([skills, categories, learningPaths]) => {
        this.skills$ = this.skillQuery.selectFilteredSkills$;
        this.categories$ = this.categoryQuery.selectAll();
        this.selectedCategory$ = this.skillQuery.selectCategory;
        this.learningPath$ = this.learningPathQuery.selectEntity(this.userLearningPath);
        this.updateLearningPathSkills();
      },
      error: (err) => {
        this.error = err;
      }
    });
  }  

  updateLearningPathSkills(): void {
    this.learningPathSkills$ = this.learningPath$.pipe(
      filter((learningPath): learningPath is LearningPath => learningPath !== undefined),
      switchMap(learningPath => {
        const skillObservables = learningPath.skills.map(skillId => {
          return this.skillQuery.selectEntity(skillId);
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
        this.deleteSkill(skill.id).subscribe({
          next: () => {
            dialogRef.close();
          }
        });
      }
    });
  }  

  deleteSkill(id: number): Observable<void> {
    return this.skillService.delete(id).pipe(
      tap({
        error: (err) => {
          this.error = err;
        },
      })
    );
  }  

  createNewSkill(): void {
    this.categories$.pipe(
      take(1),
      switchMap((categories) => {
        const dialogRef = this.dialog.open(NewSkillDialogComponent, {
          width: '600px',
          data: {
            skill: { title: '', category: '', imageName: '', description: '' },
            categories: categories,
            imageNames: this.imageNames
          }
        });
  
        return dialogRef.componentInstance.confirm.pipe(
          take(1),
          switchMap((newSkill: Skill) => this.addSkill(newSkill)),
          tap(() => dialogRef.close())
        );
      })
    ).subscribe();
  }
  
  addSkill(skill: Skill): Observable<Skill> {
    return this.skillService.add(skill).pipe(
      catchError((error) => {
        this.error = error;
        return throwError(() => error);
      }),
    );
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
      }),
      catchError((error) => {
        this.error = error;
        return throwError(() => error);
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
      }),
      catchError((error) => {
        this.error = error;
        return throwError(() => error);
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

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

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})

export class DemoComponent {
  userLearningPath: number = 1;
  skills$!: Observable<Skill[]>;
  categories$!: Observable<string[]>;
  selectedCategory$!: Observable<string | null>;
  learningPath$!: Observable<LearningPath | undefined>;
  learningPathSkills$!: Observable<(Skill | undefined)[]>;

  constructor(private skillService: SkillService,
    private skillQuery: SkillQuery,
    private skillStore: SkillStore,
    private learningPathService: LearningPathService,
    private learningPathQuery: LearningPathQuery,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.skillService.get().subscribe();
    this.skills$ = this.skillQuery.selectFilteredSkills$;
    this.categories$ = this.skillQuery.selectLearningPaths$;
    this.selectedCategory$ = this.skillQuery.selectSelectedCategory$;

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
  
  onCategorySelectionChange(category: string) {
    //TODO: Migrate to service
    this.skillQuery.selectSelectedCategory$.pipe(take(1)).subscribe(selectedCategory => {
      this.skillStore.update({ ui: { selectedCategory: (selectedCategory === category) ? null : category } });
    });
  }

  openDialog(skill: Skill): void {
    this.dialog.open(SkillDialogComponent, {
      width: '600px',
      data: skill
    });
  }

  newLearningPath(): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '600px',
      data: 'This functionallity is not implemented yet.'
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

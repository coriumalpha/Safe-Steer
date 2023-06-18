import { Component } from '@angular/core';
import { Observable, combineLatest, filter, switchMap, take, tap } from 'rxjs';
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
import { filterNilValue } from '@datorama/akita';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})

export class DemoComponent {
  skills$!: Observable<Skill[]>;
  categories$!: Observable<string[]>;
  selectedCategory$!: Observable<string | null>;
  learningPath$!: Observable<LearningPath | undefined>;
  learningPathSkills$!: Observable<Skill[]>;

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
      this.learningPath$ = this.learningPathQuery.selectEntity(1);
      this.learningPathSkills$ = this.learningPath$.pipe(
        filter((learningPath): learningPath is LearningPath => learningPath !== undefined),
        switchMap(learningPath => {
          const skillObservables = learningPath.skills.map(skillId => {
            return this.skillService.getSkill(skillId);
          });
          return combineLatest(skillObservables);
        }),
      );
    });

  }

  onCategorySelectionChange(learningPath: string) {
    //TODO: Migrate to service
    this.skillQuery.selectSelectedCategory$.pipe(take(1)).subscribe(selectedLearningPath => {
      this.skillStore.update({ ui: { selectedLearningPath: (selectedLearningPath === learningPath) ? null : learningPath } });
    });
  }

  openDialog(skill: Skill): void {
    const dialogRef = this.dialog.open(SkillDialogComponent, {
      width: '600px',
      data: skill
    });

    dialogRef.afterClosed().subscribe(result => {
      //TODO: Remove if not needed
    });
  }

  addLearningPath(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '600px',
      data: 'This functionallity is not implemented yet.'
    });

    dialogRef.afterClosed().subscribe(result => {
      //TODO: Remove if not needed
    });
  }
}

import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Skill } from '../../models/skill.model';
import { SkillService } from '../../services/skill.service';
import { SkillQuery } from '../../querys/skill.query';
import { SkillStore } from '../../stores/skill.store';
import { MatDialog } from '@angular/material/dialog';
import { SkillDialogComponent } from '../../components/skill-dialog/skill-dialog.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})

export class DemoComponent {
  skills$!: Observable<Skill[]>;
  learningPaths$!: Observable<string[]>;
  selectedLearningPath$!: Observable<string | null>;

  constructor(private skillService: SkillService, private skillQuery: SkillQuery, private skillStore: SkillStore, public dialog: MatDialog) {}

  ngOnInit() {
    this.skillService.get().subscribe();
    this.skills$ = this.skillQuery.selectFilteredSkills$;
    this.learningPaths$ = this.skillQuery.selectLearningPaths$;
    this.selectedLearningPath$ = this.skillQuery.selectSelectedLearningPath$;
  }  

  onLearningPathSelectionChange(learningPath: string) {
    this.skillQuery.selectSelectedLearningPath$.pipe(take(1)).subscribe(selectedLearningPath => {
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
}

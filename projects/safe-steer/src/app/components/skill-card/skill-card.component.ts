import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Skill } from '../../models/skill.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss']
})
export class SkillCardComponent {
  constructor(private domSanitizer: DomSanitizer) {}
  
  @Input() skill!: Skill;
  @Input() isInLearningPath!: boolean;
  @Output() openDialogEvent = new EventEmitter<Skill>();
  @Output() addToPathEvent = new EventEmitter<Skill>();
  @Output() removeFromPathEvent = new EventEmitter<Skill>();

  getImagePath(imageName: string): string {
    return `assets/images/${imageName}.png`;
  }

  openDialog(event: Event): void {
    event.stopPropagation();
    this.openDialogEvent.emit(this.skill);
  }

  addToPath(event: Event): void {
    event.stopPropagation();
    this.addToPathEvent.emit(this.skill);
  }

  removeFromPath(event: Event): void {
    event.stopPropagation();
    this.removeFromPathEvent.emit(this.skill);
  }
}
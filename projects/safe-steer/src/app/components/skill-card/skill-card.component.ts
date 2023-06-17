import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Skill } from '../../models/skill.model';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss']
})
export class SkillCardComponent {
  constructor(private domSanitizer: DomSanitizer) {}
  
  @Input() skill!: Skill;

  getImagePath(imageName: string): string {
    return `assets/images/${imageName}.png`;
  }
}
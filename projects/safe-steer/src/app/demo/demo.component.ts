import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill.model';
import { SkillQuery } from '../querys/skill.query';
import { SkillService } from '../services/skill.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {
  skills$!: Observable<Skill[]>;

  constructor(private skillService: SkillService, private skillQuery: SkillQuery) {}

  ngOnInit() {
    this.skillService.get().subscribe();
    this.skills$ = this.skillQuery.selectAll();
  }
}

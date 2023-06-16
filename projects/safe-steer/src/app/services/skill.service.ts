
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ID } from '@datorama/akita';
import { Skill } from '../models/skill.model';
import { SkillStore } from '../stores/skill.store';

@Injectable({ providedIn: 'root' })
export class SkillService {
  constructor(private skillStore: SkillStore, private http: HttpClient) {}

  get() {
    return this.http.get<Skill[]>('http://localhost:3000/skills')
      .pipe(tap(entities => {
        this.skillStore.set(entities);
      }));
  }

  getSkill(id: ID) {
    return this.http.get<Skill>(`http://localhost:3000/skills/${id}`)
      .pipe(tap(entity => {
        this.skillStore.add(entity);
      }));
  }
}

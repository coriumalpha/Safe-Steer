import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { ID } from '@datorama/akita';
import { Skill } from '../models/skill.model';
import { SkillStore } from '../stores/skill.store';
import { environment } from '../../environments/environment';
import { LearningPathService } from './learning-path.service';
import { LearningPathQuery } from '../querys/learning-path.query';
import { forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SkillService {
  private api = environment.api;

  constructor(
    private skillStore: SkillStore,
    private http: HttpClient,
    private learningPathService: LearningPathService,
    private learningPathQuery: LearningPathQuery) { }

  get() {
    return this.http.get<Skill[]>(`${this.api}/skills`)
      .pipe(tap(entities => {
        this.skillStore.set(entities);
      }));
  }

  getSkill(id: ID) {
    return this.http.get<Skill>(`${this.api}/skills/${id}`)
      .pipe(tap(entity => {
        this.skillStore.add(entity);
      }));
  }

  add(skill: Skill) {
    return this.http.post<Skill>(`${this.api}/skills`, skill)
      .pipe(tap(newSkill => {
        this.skillStore.add(newSkill);
      }));
  }

  delete(skillId: number) {
    const pathsWithSkill = this.learningPathQuery.getAll().filter(path => path.skills.includes(skillId));
    const updateObservables = pathsWithSkill.map(path => this.learningPathService.removeSkillFromPath(path, skillId));
  
    return forkJoin(updateObservables).pipe(
      finalize(() => this.http.delete<Skill>(`${environment.api}/skills/${skillId}`).subscribe(() => {
        this.skillStore.remove(skillId);
      })),
      tap(() => {
        this.skillStore.remove(skillId);
      })
    );
  }  
  
}
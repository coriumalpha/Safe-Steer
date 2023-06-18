import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

export interface CategoryState extends EntityState<Category> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'category' })
export class CategoryStore extends EntityStore<CategoryState> {
  constructor() {
    super();
  }
}
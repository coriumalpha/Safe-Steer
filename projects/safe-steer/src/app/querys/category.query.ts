import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CategoryState, CategoryStore } from '../stores/category.store';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryQuery extends QueryEntity<CategoryState, Category> {
    constructor(store: CategoryStore) {
        super(store);
    }
}

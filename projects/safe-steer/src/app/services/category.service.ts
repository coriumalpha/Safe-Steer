import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CategoryStore } from '../stores/category.store';
import { Category } from '../models/category.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    constructor(private categoryStore: CategoryStore, private http: HttpClient) { }

    get() {
        return this.http.get<Category[]>(`${environment.api}/categories`)
            .pipe(tap(categories => {
                this.categoryStore.set(categories);
            }));
    }
}

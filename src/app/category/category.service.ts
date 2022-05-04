import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from './model/Category';
import { CATEGORY_DATA } from './model/mock-categories';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Console } from '@angular/compiler/src/util';
import { Game } from '../game/model/Game';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  game: Game;
  constructor(
    private http: HttpClient
    
  ) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:8080/category');
  }
  saveCategory(category: Category): Observable<Category> {
    let url = 'http://localhost:8080/category';
    if (category.id != null) url += '/' + category.id;

    return this.http.post<Category>(url, category);
  }

  deleteCategory(idCategory: number): Observable<any> {
    
    this.searhGameLoad(idCategory);
    this.searhCategoryGame(idCategory);
   
   
    return this.http.delete<void>('http://localhost:8080/category/' + idCategory);

  }  
  searhCategoryGame(categoryId?: number): void {
    let params = '';

    if (categoryId != null) {
      if (params != '') params += "&";
      params += "idCategory=" + categoryId;
    }

    let url = 'http://localhost:8080/game';

    if (params == '')  url;
    else  url + '?' + params;

    this.http.delete<void>(url);

    
  }
 
  searhGameLoad(gameId?: number): void {
    let params = '';

    if (gameId != null) {
      if (params != '') params += "&";
      params += "idGame=" + gameId;
    }

    let url = 'http://localhost:8080/load';

    if (params == '') url;
    else url + '?' + params;

    this.http.delete<void>(url);


  }
  }

 


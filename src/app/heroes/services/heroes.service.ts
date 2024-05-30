import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private _baseUrl: string = environment.baseUrl;

  constructor(public http: HttpClient) { }


  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this._baseUrl}/heroes`);
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(`${this._baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero>{
    if(!hero) throw Error('Hero id is required');
    return this.http.patch<Hero>(`${this._baseUrl}/heroes/${hero.id}`, hero );
  }

  deleteHeroById(id: string): Observable<boolean>{
    return this.http.delete(`${this._baseUrl}/heroes/${id}`)
    .pipe(
      map(resp => true),
      catchError(err => of(false))
    );
  }

  getHeroById(id: string): Observable<Hero|undefined>{
    return this.http.get<Hero>(`${this._baseUrl}/heroes/${id}`)
    .pipe(
      catchError(error => of(undefined))
    );
  }

  getSuggestions(query: string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this._baseUrl}/heroes?q=${query}&_limit=6`);
  }
}

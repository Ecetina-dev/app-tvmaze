import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, shareReplay } from 'rxjs';
import { Show, SearchResult } from '../models/show.model';

@Injectable({ providedIn: 'root' })
export class TvMazeService {
  private readonly API_URL = 'https://api.tvmaze.com';
  private readonly CACHE_TTL = 5 * 60 * 1000;

  private pageCache = new Map<number, { data: Show[]; timestamp: number }>();
  private searchCache = new Map<string, { data: SearchResult[]; timestamp: number }>();
  private detailCache = new Map<number, { data: Show; timestamp: number }>();

  constructor(private http: HttpClient) {}

  getShowsByPage(page: number): Observable<Show[]> {
    const cached = this.pageCache.get(page);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return new Observable(observer => {
        observer.next(cached.data);
        observer.complete();
      });
    }
    return this.http.get<Show[]>(`${this.API_URL}/shows?page=${page}`).pipe(
      tap(data => this.pageCache.set(page, { data, timestamp: Date.now() }))
    );
  }

  searchShows(q: string): Observable<SearchResult[]> {
    const cached = this.searchCache.get(q);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return new Observable(observer => {
        observer.next(cached.data);
        observer.complete();
      });
    }
    return this.http.get<SearchResult[]>(`${this.API_URL}/search/shows?q=${q}`).pipe(
      tap(data => this.searchCache.set(q, { data, timestamp: Date.now() }))
    );
  }

  getShowById(id: number): Observable<Show> {
    const cached = this.detailCache.get(id);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return new Observable(observer => {
        observer.next(cached.data);
        observer.complete();
      });
    }
    return this.http.get<Show>(`${this.API_URL}/shows/${id}`).pipe(
      tap(data => this.detailCache.set(id, { data, timestamp: Date.now() }))
    );
  }

  clearCache() {
    this.pageCache.clear();
    this.searchCache.clear();
    this.detailCache.clear();
  }
}
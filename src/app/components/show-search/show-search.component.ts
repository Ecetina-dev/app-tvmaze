import { Component, output, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Subject, debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-show-search',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  template: `
    <div class="search-container">
      <mat-form-field appearance="outline" class="search-field">
        <mat-label>Buscar series o películas...</mat-label>
        <input matInput [(ngModel)]="searchTerm" (ngModelChange)="onInputChange($event)" placeholder="Ej: Batman, Breaking Bad...">
        <mat-icon matSuffix>search</mat-icon>
        @if (searchTerm) {
          <button matSuffix mat-icon-button (click)="clear()">
            <mat-icon>close</mat-icon>
          </button>
        }
      </mat-form-field>
      <p class="mode-info">
        <small>Modo: <strong>API Endpoint</strong> | Búsqueda en servidor via TV Maze API</small>
      </p>
    </div>
  `,
  styles: [`
    .search-container { text-align: center; padding: 24px 16px 0; }
    .search-field { width: 100%; max-width: 600px; }
    .mode-info { color: #666; margin-top: 8px; }
  `]
})
export class ShowSearchComponent implements OnDestroy {
  searchTerm = '';
  buscar = output<string>();

  private inputSubject = new Subject<string>();
  private sub!: Subscription;

  constructor() {
    this.sub = this.inputSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(term => this.buscar.emit(term));
  }

  onInputChange(term: string) {
    this.inputSubject.next(term);
  }

  clear() {
    this.searchTerm = '';
    this.inputSubject.next('');
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
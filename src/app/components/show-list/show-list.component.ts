import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TvMazeService } from '../../services/tvmaze.service';
import { Show, SearchResult } from '../../models/show.model';
import { ShowSearchComponent } from '../show-search/show-search.component';
import { ShowCardComponent } from '../show-card/show-card.component';
import { ShowDetailComponent } from '../show-detail/show-detail.component';

@Component({
  selector: 'app-show-list',
  standalone: true,
  imports: [
    HttpClientModule, MatPaginatorModule, MatProgressSpinnerModule, MatToolbarModule,
    ShowSearchComponent, ShowCardComponent, ShowDetailComponent
  ],
  template: `
    <mat-toolbar color="primary">
      <span>TV Maze - Series y Películas</span>
    </mat-toolbar>

    <div class="container">
      <app-show-search (buscar)="onSearch($event)"></app-show-search>

      @if (loading()) {
        <div class="loading">
          <mat-spinner diameter="50"></mat-spinner>
          <p>Cargando series...</p>
        </div>
      } @else {
        <div class="shows-grid">
          @for (show of pagedShows(); track show.id) {
            <app-show-card [show]="show" (verDetalle)="openDetail($event)"></app-show-card>
          } @empty {
            <p class="no-results">No se encontraron series.</p>
          }
        </div>

        <mat-paginator
          [length]="totalItems()"
          [pageSize]="pageSize()"
          [pageSizeOptions]="[6, 12, 24]"
          [pageIndex]="currentPage() - 1"
          (page)="onPageChange($event)"
          showFirstLastButtons>
        </mat-paginator>
      }
    </div>
  `,
  styles: [`
    mat-toolbar { margin-bottom: 0; }
    .container { max-width: 1200px; margin: 0 auto; padding: 16px; }
    .loading { display: flex; flex-direction: column; align-items: center; margin: 48px 0; gap: 16px; }
    .shows-grid { display: flex; flex-wrap: wrap; justify-content: center; }
    .no-results { text-align: center; width: 100%; padding: 48px; color: #666; font-size: 1.2rem; }
    mat-paginator { margin-top: 24px; }
  `]
})
export class ShowListComponent implements OnInit {
  private tvService = inject(TvMazeService);
  private dialog = inject(MatDialog);

  shows = signal<Show[]>([]);
  loading = signal(false);
  searchTerm = signal('');

  currentPage = signal(1);
  pageSize = signal(6);
  totalItems = signal(0);

  pagedShows = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.shows().slice(start, start + this.pageSize());
  });

  ngOnInit() {
    this.loadShows(this.currentPage());
  }

  loadShows(page: number) {
    this.loading.set(true);
    this.tvService.getShowsByPage(page).subscribe({
      next: (data) => {
        this.shows.set(data);
        this.totalItems.set(data.length);
        this.loading.set(false);
      },
      error: () => { this.loading.set(false); }
    });
  }

  onSearch(term: string) {
    this.searchTerm.set(term);
    this.currentPage.set(1);
    if (!term.trim()) {
      this.loadShows(1);
      return;
    }
    this.loading.set(true);
    this.tvService.searchShows(term).subscribe({
      next: (results: SearchResult[]) => {
        this.shows.set(results.map(r => r.show));
        this.totalItems.set(results.length);
        this.loading.set(false);
      },
      error: () => { this.loading.set(false); }
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
  }

  openDetail(show: Show) {
    this.tvService.getShowById(show.id).subscribe({
      next: (fullShow) => {
        this.dialog.open(ShowDetailComponent, {
          data: fullShow,
          width: '550px',
          maxHeight: '90vh'
        });
      }
    });
  }
}
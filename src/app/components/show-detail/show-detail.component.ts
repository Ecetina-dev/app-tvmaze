import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Show } from '../../models/show.model';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatChipsModule, MatDividerModule],
  template: `
    <h2 mat-dialog-title>{{ data.name }}</h2>
    <mat-dialog-content>
      @if (data.image) {
        <img [src]="data.image.original || data.image.medium" [alt]="data.name" class="main-image">
      }
      <mat-chip-set class="chips">
        @for (genre of data.genres; track genre) {
          <mat-chip>{{ genre }}</mat-chip>
        }
      </mat-chip-set>

      @if (data.summary) {
        <div class="summary" [innerHTML]="cleanSummary"></div>
      }

      <mat-divider></mat-divider>

      <div class="specs-grid">
        <div class="spec-item">
          <mat-icon>schedule</mat-icon>
          <div>
            <small>Horario</small>
            <p>{{ data.schedule.time || 'N/A' }} - {{ data.schedule.days.join(', ') || 'N/A' }}</p>
          </div>
        </div>
        <div class="spec-item">
          <mat-icon>play_circle</mat-icon>
          <div>
            <small>Estado</small>
            <p>{{ data.status }}</p>
          </div>
        </div>
        <div class="spec-item">
          <mat-icon>translate</mat-icon>
          <div>
            <small>Idioma</small>
            <p>{{ data.language || 'N/A' }}</p>
          </div>
        </div>
        <div class="spec-item">
          <mat-icon>category</mat-icon>
          <div>
            <small>Tipo</small>
            <p>{{ data.type }}</p>
          </div>
        </div>
        <div class="spec-item">
          <mat-icon>date_range</mat-icon>
          <div>
            <small>Estreno</small>
            <p>{{ data.premiered || 'N/A' }}</p>
          </div>
        </div>
        <div class="spec-item">
          <mat-icon>date_range</mat-icon>
          <div>
            <small>Final</small>
            <p>{{ data.ended || 'En emisión' }}</p>
          </div>
        </div>
        <div class="spec-item">
          <mat-icon>timer</mat-icon>
          <div>
            <small>Duración</small>
            <p>{{ data.averageRuntime || data.runtime || 'N/A' }} min</p>
          </div>
        </div>
        <div class="spec-item">
          <mat-icon>tv</mat-icon>
          <div>
            <small>Cadena</small>
            <p>{{ data.network?.name || data.webChannel?.name || 'N/A' }}</p>
          </div>
        </div>
        @if (data.rating.average) {
          <div class="spec-item rating-item">
            <mat-icon>star</mat-icon>
            <div>
              <small>Rating</small>
              <p class="rating-value">{{ data.rating.average }}/10</p>
            </div>
          </div>
        }
      </div>

      @if (data.externals.imdb || data.externals.thetvdb) {
        <mat-divider></mat-divider>
        <div class="externals">
          <p class="externals-title">Referencias externas</p>
          @if (data.externals.imdb) {
            <span class="external-chip">IMDb: {{ data.externals.imdb }}</span>
          }
          @if (data.externals.thetvdb) {
            <span class="external-chip">TVDb: {{ data.externals.thetvdb }}</span>
          }
        </div>
      }
    </mat-dialog-content>
    <mat-dialog-actions>
      @if (data.officialSite) {
        <a mat-button [href]="data.officialSite" target="_blank" rel="noopener">
          <mat-icon>open_in_new</mat-icon> Sitio Oficial
        </a>
      }
      <button mat-button mat-dialog-close>Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    h2 { margin: 0 0 8px; }
    .main-image { width: 100%; max-height: 300px; object-fit: contain; border-radius: 8px; margin-bottom: 12px; }
    .chips { margin-bottom: 12px; }
    .summary { font-size: 0.95rem; line-height: 1.6; color: #444; margin-bottom: 16px; }
    mat-divider { margin: 12px 0; }
    .specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .spec-item { display: flex; align-items: flex-start; gap: 8px; }
    .spec-item mat-icon { font-size: 20px; width: 20px; height: 20px; color: #888; margin-top: 2px; }
    .spec-item small { color: #999; font-size: 0.75rem; }
    .spec-item p { margin: 2px 0 0; font-size: 0.9rem; }
    .rating-value { color: #ff9800; font-weight: bold; }
    .externals-title { color: #888; font-size: 0.8rem; margin-bottom: 8px; }
    .external-chip { display: inline-block; padding: 4px 8px; background: #f0f0f0; border-radius: 4px; font-size: 0.8rem; margin-right: 8px; }
    mat-dialog-actions { justify-content: flex-end; }
    mat-dialog-actions a { text-decoration: none; }
  `]
})
export class ShowDetailComponent {
  data = inject<Show>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ShowDetailComponent>);
  private sanitizer = inject(DomSanitizer);

  get cleanSummary(): SafeHtml {
    if (!this.data?.summary) return '';
    const clean = this.data.summary.replace(/<\/?p>/g, '');
    return this.sanitizer.bypassSecurityTrustHtml(clean);
  }
}
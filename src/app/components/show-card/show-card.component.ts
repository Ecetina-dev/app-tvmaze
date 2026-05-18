import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { Show } from '../../models/show.model';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatDividerModule],
  template: `
    <mat-card class="show-card">
        @if (show().image) {
        <img mat-card-image [src]="show().image!.medium" [alt]="show().name" loading="lazy">
      }
      <mat-card-content>
        <mat-chip-set>
          @for (genre of show().genres; track genre) {
            <mat-chip class="genre-chip">{{ genre }}</mat-chip>
          }
        </mat-chip-set>
        <h3>{{ show().name }}</h3>
        @if (show().rating.average) {
          <p class="rating">
            <mat-icon>star</mat-icon>
            {{ show().rating.average }}/10
          </p>
        }
        <p class="meta">
          <mat-icon>schedule</mat-icon>
          {{ show().network?.name || show().webChannel?.name || 'N/A' }}
          | {{ show().premiered ? show().premiered!.split('-')[0] : 'N/A' }}
        </p>
        <mat-divider></mat-divider>
        <p class="status">
          <mat-icon>{{ getStatusIcon(show().status) }}</mat-icon>
          {{ show().status }}
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button color="primary" (click)="verDetalle.emit(show())">
          <mat-icon>visibility</mat-icon> Ver Detalle
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .show-card { max-width: 300px; margin: 16px; }
    img { height: 350px; object-fit: cover; }
    .no-image { height: 350px; background: #f5f5f5; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #999; }
    .genre-chip { font-size: 0.7rem; height: 24px; }
    h3 { margin: 12px 0 8px; font-size: 1.05rem; line-height: 1.3; }
    .rating { display: flex; align-items: center; gap: 4px; color: #ff9800; font-weight: 500; }
    .meta { display: flex; align-items: center; gap: 4px; color: #666; font-size: 0.85rem; }
    mat-icon { font-size: 16px; width: 16px; height: 16px; }
    .status { display: flex; align-items: center; gap: 4px; color: #888; font-size: 0.85rem; }
    mat-divider { margin: 12px 0; }
    button { width: 100%; }
  `]
})
export class ShowCardComponent {
  show = input.required<Show>();
  verDetalle = output<Show>();

  getStatusIcon(status: string): string {
    const map: Record<string, string> = {
      'Running': 'play_circle', 'Ended': 'stop_circle', 'To Be Determined': 'pending'
    };
    return map[status] || 'info';
  }
}
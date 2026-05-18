import { Pipe, PipeTransform } from '@angular/core';
import { Show } from '../models/show.model';

@Pipe({
  name: 'filterShows',
  standalone: true
})
export class FilterShowsPipe implements PipeTransform {
  transform(shows: Show[], searchTerm: string): Show[] {
    if (!searchTerm || searchTerm.trim() === '') return shows;
    const term = searchTerm.toLowerCase();
    return shows.filter(s =>
      s.name.toLowerCase().includes(term) ||
      s.genres.some(g => g.toLowerCase().includes(term)) ||
      s.language?.toLowerCase().includes(term) ||
      s.network?.name.toLowerCase().includes(term)
    );
  }
}
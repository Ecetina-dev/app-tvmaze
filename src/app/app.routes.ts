import { Routes } from '@angular/router';
import { ShowListComponent } from './components/show-list/show-list.component';

export const routes: Routes = [
  { path: '', component: ShowListComponent },
  { path: '**', redirectTo: '' }
];

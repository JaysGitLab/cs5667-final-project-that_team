import { Routes } from '@angular/router';
import { ManageComponent } from './manage.component';

export const ManageRoutes: Routes = [{
  path: 'manage/:reservationid',
  component: ManageComponent
},
{
  path: 'manage',
  component: ManageComponent
}]

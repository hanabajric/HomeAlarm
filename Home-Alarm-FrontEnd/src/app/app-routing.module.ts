import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HistorijaComponent} from './historija/historija.component';
import {StatusComponent} from './status/status.component';


const routes: Routes = [
  {path: 'history', component: HistorijaComponent},
  {path: 'status' , component: StatusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
export const routingComponents = [
  HistorijaComponent,
  StatusComponent
]

import { ClientFormComponent } from './client-form/client-form.component';
import { ClientsComponent } from './clients/clients.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: '',component : ClientsComponent},
    {path: 'clients',component : ClientsComponent},
    {path: 'clientDetails/:id',component : ClientFormComponent},
    {path: 'createClient',component : ClientFormComponent},
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }

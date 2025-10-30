import {Routes} from '@angular/router';
import {ListaFacturaClienteComponent} from "./features/factura/lista/lista-factura-cliente.component";
import {ListaClienteComponent} from "./features/cliente/lista/lista-cliente.component";

export const routes: Routes = [
  {path: '', component: ListaClienteComponent},
  {path: 'facturas/cliente/:id', component: ListaFacturaClienteComponent}
];

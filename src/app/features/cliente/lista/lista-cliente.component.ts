import {Component, OnInit} from '@angular/core';
import {Table, TableModule} from "primeng/table";
import {ClienteService} from "../../../core/services/cliente.service";
import {Cliente} from "../../../core/models/cliente.model";
import {Button, ButtonDirective} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {TagModule} from "primeng/tag";
import {SliderModule} from "primeng/slider";
import {ProgressBarModule} from "primeng/progressbar";
import {DatePipe} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {MultiSelectModule} from "primeng/multiselect";
import {InputTextModule} from "primeng/inputtext";
import {TooltipModule} from "primeng/tooltip";
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-lista-cliente',
  standalone: true,
  imports: [
    TableModule,
    Button,
    DropdownModule,
    TagModule,
    SliderModule,
    ProgressBarModule,
    DatePipe,
    PaginatorModule,
    MultiSelectModule,
    InputTextModule,
    ButtonDirective,
    TooltipModule,
    RouterOutlet
  ],
  templateUrl: './lista-cliente.component.html',
  styleUrl: './lista-cliente.component.scss'
})
export class ListaClienteComponent implements OnInit {
  customers!: Cliente[];

  statuses!: any[];

  loading: boolean = true;

  searchValue: string | undefined;

  constructor(private clienteService: ClienteService, private router: Router) {
  }

  ngOnInit() {
    this.getCustomersLarge();

  }

  clear(table: Table) {
    table.clear();
    this.searchValue = ''
  }

  // @ts-ignore
  getSeverity(status: string) {
    switch (status) {
      case 'ACT':
        return 'success';

      case 'INAC':
        return 'danger';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return 'info';
    }
  }

  public verFacturas( customer: Cliente) {
    this.router.navigate(['/facturas/cliente/', customer.id]);
  }

  public getCustomersLarge() {
    this.clienteService.getClientes().then((customers) => {
      this.customers = customers;
      this.loading = false;
    });
  }
}

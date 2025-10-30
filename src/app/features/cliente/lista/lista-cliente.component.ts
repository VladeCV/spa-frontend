import {Component, OnInit} from '@angular/core';
import {Table, TableModule} from "primeng/table";
import {ClienteService} from "../../../core/services/cliente.service";
import {Cliente, Representative} from "../../../core/models/cliente.model";
import {Button, ButtonDirective} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {TagModule} from "primeng/tag";
import {SliderModule} from "primeng/slider";
import {ProgressBarModule} from "primeng/progressbar";
import {CurrencyPipe, DatePipe, NgClass} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {MultiSelectModule} from "primeng/multiselect";
import {InputTextModule} from "primeng/inputtext";
import {TooltipModule} from "primeng/tooltip";

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
    CurrencyPipe,
    PaginatorModule,
    MultiSelectModule,
    InputTextModule,
    ButtonDirective,
    TooltipModule
  ],
  templateUrl: './lista-cliente.component.html',
  styleUrl: './lista-cliente.component.scss'
})
export class ListaClienteComponent implements OnInit {
  customers!: Cliente[];

  representatives!: Representative[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  searchValue: string | undefined;

  constructor(private clienteService: ClienteService) {
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
    switch (status.toLowerCase()) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return 'info';
    }
  }

  verFacturas(customer: any) {

  }

  deleteCustomer(customer: any) {

  }

  public getCustomersLarge() {
    this.clienteService.getCustomersLarge().then((customers) => {
      this.customers = customers;
      this.loading = false;
      this.customers.forEach((customer) => (customer.date = new Date(<Date>customer.date)));
    });

    this.representatives = [
      {name: 'Amy Elsner', image: 'amyelsner.png'},
      {name: 'Anna Fali', image: 'annafali.png'},
      {name: 'Asiya Javayant', image: 'asiyajavayant.png'},
      {name: 'Bernardo Dominic', image: 'bernardodominic.png'},
      {name: 'Elwin Sharvill', image: 'elwinsharvill.png'},
      {name: 'Ioni Bowcher', image: 'ionibowcher.png'},
      {name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png'},
      {name: 'Onyama Limba', image: 'onyamalimba.png'},
      {name: 'Stephen Shaw', image: 'stephenshaw.png'},
      {name: 'Xuxue Feng', image: 'xuxuefeng.png'}
    ];

    this.statuses = [
      {label: 'Unqualified', value: 'unqualified'},
      {label: 'Qualified', value: 'qualified'},
      {label: 'New', value: 'new'},
      {label: 'Negotiation', value: 'negotiation'},
      {label: 'Renewal', value: 'renewal'},
      {label: 'Proposal', value: 'proposal'}
    ];
  }
}

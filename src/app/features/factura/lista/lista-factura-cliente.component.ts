import {Component, OnInit} from '@angular/core';
import {Factura} from "../../../core/models/factura.model";
import {FacturaService} from "../../../core/services/factura.service";
import {TableModule} from "primeng/table";
import {ButtonDirective} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-lista-factura-cliente',
  standalone: true,
  imports: [
    TableModule,
    ButtonDirective,
    TooltipModule
  ],
  templateUrl: './lista-factura-cliente.component.html',
  styleUrl: './lista-factura-cliente.component.scss'
})
export class ListaFacturaClienteComponent implements OnInit {

  facturas!: Factura[];


  constructor(private facturaService: FacturaService) {
  }

  ngOnInit() {
    this.facturas = this.getFacturasByClienteId(1);

  }

  public getFacturasByClienteId(clienteId: number): Factura[] {
    return this.facturaService.getFacturasByClienteId(clienteId);

  }

  verDetalle(factura: any) {

  }
}

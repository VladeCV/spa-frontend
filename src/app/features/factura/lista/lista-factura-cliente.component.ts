import {Component, OnInit} from '@angular/core';
import {Factura} from "../../../core/models/factura.model";
import {FacturaService} from "../../../core/services/factura.service";
import {TableModule} from "primeng/table";
import {Button, ButtonDirective} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {CurrencyPipe, Location, NgClass} from '@angular/common';
import {DialogModule} from "primeng/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {ConfirmPopupModule} from "primeng/confirmpopup";

@Component({
  selector: 'app-lista-factura-cliente',
  standalone: true,
  imports: [
    TableModule,
    ButtonDirective,
    TooltipModule,
    Button,
    NgClass,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    CurrencyPipe,
    ConfirmDialogModule,
    ToastModule,
    ConfirmPopupModule
  ],
  templateUrl: './lista-factura-cliente.component.html',
  styleUrl: './lista-factura-cliente.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class ListaFacturaClienteComponent implements OnInit {

  facturas!: Factura[];
  mostrarModalPago: boolean = false;
  mostrarModalDetalle: boolean = false;
  position: "top" | undefined;
  formPago: FormGroup = new FormGroup({});
  formValidPago: boolean = false;
  facturaSeleccionada: Factura | null = null;
  metodosPago: any[] = [
    {label: 'Tarjeta de Crédito', value: 'tarjeta_credito'},
    {label: 'Transferencia Bancaria', value: 'transferencia_bancaria'},
    {label: 'PayPal', value: 'paypal'},
    {label: 'Efectivo', value: 'efectivo'}
  ];

  constructor(private facturaService: FacturaService,
              private location: Location,
              private formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
    this.initForm();
  }

  ngOnInit() {
    this.facturas = this.getFacturasByClienteId(1);

  }

  public getFacturasByClienteId(clienteId: number): Factura[] {
    return this.facturaService.getFacturasByClienteId(clienteId);

  }

  initForm() {
    this.formPago = this.formBuilder.group({
      f_ini: ['', {validators: [Validators.required], disabled: false}],
      f_fin: ['', {validators: [Validators.required], disabled: false}],
      dias_vac_apl: ['', {validators: [Validators.required], disabled: false}],
      gestion: ['', {validators: [Validators.required], disabled: false}],
      dias: ['', {disabled: false}],
      meses: ['', {disabled: false}],
      anos: ['', {disabled: false}],
      f_presentacion: ['', {disabled: false}],
      nro_certificado: ['', {disabled: false}]
    });

    this.formValidPago = false;
  }

  resetForm() {
    this.formPago.reset();
    this.formValidPago = false;
  }

  validFormPago(): boolean {
    if (this.formPago.valid) {
      return true;
    }
    this.formValidPago = true;
    return false;
  }

  verDetalle(factura: any) {
    alert(`Detalle de la factura:\nNúmero: ${factura.numero}\nFecha: ${factura.fecha}\nMonto: ${factura.monto}`);
  }

  volver() {

    this.location.back();
  }

  verFactura(factura: any) {
    this.facturaSeleccionada = factura;
    this.mostrarModalDetalle = true;
  }

  showDialog(factura: Factura) {
    this.facturaSeleccionada = factura;
    this.position = "top";
    this.mostrarModalPago = true;
  }

  cerrarForm() {
    this.mostrarModalPago = false;
    this.resetForm();
  }

  pagarFactura(event: { target: any }) {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea pagar esta factura?',
      header: 'Confirmar Pago',
      icon: 'pi pi-exclamation-triangle',
      target: event.target,
      accept: () => {
        const facturaPagada = this.facturaService.pagarFactura(this.facturaSeleccionada!.id);
        if (facturaPagada) {
          this.facturas = this.getFacturasByClienteId(1);
          this.messageService.add({
            severity: 'success',
            summary: 'Pago Exitoso',
            detail: `La factura ${facturaPagada.nro} ha sido pagada correctamente.`
          });
          this.cerrarForm();
        }
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Pago Cancelado',
          detail: 'El pago de la factura ha sido cancelado.'
        });
      }
    });
  }

  cerrarModalDetalle() {
    this.mostrarModalDetalle = false;
  }
}

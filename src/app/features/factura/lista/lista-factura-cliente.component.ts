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
import {AvatarModule} from "primeng/avatar";
import {IconFieldModule} from "primeng/iconfield";
import {FieldsetModule} from "primeng/fieldset";
import {ActivatedRoute} from "@angular/router";

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
    ConfirmPopupModule,
    AvatarModule,
    IconFieldModule,
    FieldsetModule
  ],
  templateUrl: './lista-factura-cliente.component.html',
  styleUrl: './lista-factura-cliente.component.scss'
})
export class ListaFacturaClienteComponent implements OnInit {

  facturas!: Factura[];
  mostrarModalPago: boolean = false;
  mostrarModalDetalle: boolean = false;
  mostrarModalConfirmacion: boolean = false;
  position: "top" | undefined;
  formPago: FormGroup = new FormGroup({});
  formValidPago: boolean = false;
  facturaSeleccionada!: Factura;
  metodosPago: any[] = [
    {codigo: 'TC', valor: 'Tarjeta de Crédito'},
    {codigo: 'TB', valor: 'Transferencia Bancaria'},
    {codigo: 'PP', valor: 'PayPal'},
    {codigo: 'EF', valor: 'Efectivo'}
  ];

  constructor(private facturaService: FacturaService,
              private location: Location,
              private formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private _activatedRoute: ActivatedRoute) {
    this.initForm();
  }

  ngOnInit() {
    let id_cliente: string | null = this._activatedRoute.snapshot.paramMap.get("id");
    this.facturas = this.getFacturasByClienteId(id_cliente);
  }

  // @ts-ignore
  public getFacturasByClienteId(clienteId: string | null): Factura[] {
    this.facturaService.getFacturasByClienteIdAPI(clienteId).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Facturas obtenidas correctamente.'
          });
          this.facturas = data;
          return data;
        } else {
          this.messageService.add({
            severity: 'info',
            summary: 'Información',
            detail: 'No se encontraron facturas para este cliente.'
          });
          return [];
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener las facturas.'
        });
      }
    });
  }

  initForm() {
    this.formPago = this.formBuilder.group({
      nro: [{value: '', disabled: true}, Validators.required],
      servicio: [{value: '', disabled: true}, Validators.required],
      monto: [{value: '', disabled: true}, Validators.required],
      f_emision: [{value: '', disabled: true}, Validators.required],
      metodo_pago: ['', Validators.required]
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

  pagarFacturaAPI(event: { target: any }) {
    if (this.validFormPago()) {
      const dataSend = {
        id: this.facturaSeleccionada?.id,
        metodo_pago: this.formPago.get('metodo_pago')!.value
      }
      console.log('DATA', dataSend);
      this.confirmationService.confirm({
        message: '¿Está seguro que desea pagar esta factura?',
        header: 'Confirmar Pago',
        icon: 'pi pi-exclamation-triangle',
        target: event.target,
        accept: () => {
          this.facturaService.pagarFacturaAPI(dataSend).subscribe({
            next: (facturaPagada) => {
              this.facturaSeleccionada = facturaPagada;
              this.cerrarForm();
              this.mostrarModalConfirmacion = true;
            },
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al procesar el pago de la factura.'
              });
            }
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Pago Cancelado',
            detail: 'El pago de la factura ha sido cancelado.'
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario Incompleto',
        detail: 'Por favor, complete todos los campos requeridos.'
      });
    }
  }

  cerrarModalDetalle() {
    this.mostrarModalDetalle = false;
  }
}

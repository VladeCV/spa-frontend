import {Component} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {Ripple} from "primeng/ripple";
import {ConfirmationService, MessageService} from "primeng/api";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ClienteService} from "../../../../core/services/cliente.service";
import {Cliente} from "../../../../core/models/cliente.model";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-consulta-cliente',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonDirective,
    Ripple,
    ReactiveFormsModule,
    ConfirmPopupModule,
    ToastModule
  ],
  templateUrl: './consulta-cliente.component.html',
  styleUrl: './consulta-cliente.component.scss',
  providers: [MessageService,ConfirmationService]
})
export class ConsultaClienteComponent {
  loginForm: FormGroup = new FormGroup({});
  loginFormValid: boolean = false;
  cliente: Cliente | null = null;
  formValidConsulta: boolean = false;

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private clienteService: ClienteService
  ) {
    this.initFormLogin();
  }

  initFormLogin() {
    this.loginForm = this.formBuilder.group({
      nro: new FormControl({value: '', disabled: false}, [
        Validators.required,
        Validators.minLength(3),
      ]),

    });
    this.formValidConsulta = false;

  }

  resetFormValidFarmaVigExterno() {
    this.loginForm.reset();
  }

  validFormConsulta(): boolean {
    if (this.loginForm.valid) {
      return true;
    }
    this.formValidConsulta = true;
    return false;
  }

  async ingresar() {
    if (!this.validFormConsulta()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Formulario inválido.' });
      return;
    }

    const datos = this.loginForm.value;
    try {
      const dataCliente = await this.clienteService.getClienteByNroDocumento(datos.nro);
      console.log(dataCliente);
      if (dataCliente) {
        this.cliente = dataCliente;
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente encontrado.' });
        await this.router.navigate(['/facturas/cliente/', this.cliente.id]);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Cliente no encontrado.' });
      }
    } catch (err) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al buscar cliente.' });
    }
  }

}

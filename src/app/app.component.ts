import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonDirective } from "primeng/button";
import { ListaClienteComponent } from "./features/cliente/lista/lista-cliente.component";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmPopupModule } from "primeng/confirmpopup";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonDirective,
    ListaClienteComponent,
    ToastModule,
    ConfirmPopupModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AppComponent {
  title = 'sap-frontend';
}

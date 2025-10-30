import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  getData() {
    return [
      {
        id: '1f0b4e43-a106-65c4-ae51-e0be035fb029',
        nombre: 'María',
        apellido_paterno: 'Gonzales',
        apellido_materno: 'López',
        f_nacimiento: '1987-03-12',
        tel_celular: '+59171234567',
        nro_documento: '7851234',
        email_personal: 'maria.gonzales@example.com',
        estado: {codigo: 'ACT', valor: 'Activo'},
        activo: true
      },
      {
        id: '1f0b4e4f-b292-6188-bc8e-e0be035fb029',
        nombre: 'Carlos',
        apellido_paterno: 'Rojas',
        apellido_materno: 'Fernández',
        f_nacimiento: '1991-09-05',
        tel_celular: '+59176451234',
        nro_documento: '9238745',
        email_personal: 'carlos.rojas@example.com',
        estado: {codigo: 'ACT', valor: 'Activo'},
        activo: true
      }
    ]
  }

  constructor() {
  }

  getClientes() {
    return Promise.resolve(this.getData());
  }

}

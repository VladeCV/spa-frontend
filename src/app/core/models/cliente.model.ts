export interface Cliente {
  id: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  f_nacimiento: string;
  tel_celular: string;
  nro_documento: string;
  email_personal: string;
  estado: Estado;
  activo: boolean;
}

export interface Estado {
  codigo: string;
  valor: string;
}

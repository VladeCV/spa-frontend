export interface Estado {
  codigo: string;
  valor: string;
}

export interface Factura {
  id: number;
  cliente_id: number;
  nro: string;
  servicio: string;
  periodo: string;
  monto: number;
  estado: Estado;
  activo: boolean;
  fecha_emision: string;
  fecha_pago?: string | null;
}

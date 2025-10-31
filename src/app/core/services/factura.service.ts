import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Factura} from "../models/factura.model";

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  getDataFactura() {
    return [
      {
        id: 1,
        cliente_id: "1f0b4e43-a106-65c4-ae51-e0be035fb029",
        nro: "FAC-0001",
        servicio: "Agua Potable",
        periodo: "2025-05",
        monto: 48.75,
        estado: {codigo: "PEN", valor: "PENDIENTE"},
        activo: true,
        fecha_emision: "2025-05-10",
        fecha_pago: null,
        metodo_pago: null
      },
      {
        id: 2,
        cliente_id: "1f0b4e43-a106-65c4-ae51-e0be035fb029",
        nro: "FAC-0002",
        servicio: "Energía Eléctrica",
        periodo: "2025-06",
        monto: 125.50,
        estado: {codigo: "PAG", valor: "PAGADO"},
        activo: true,
        fecha_emision: "2025-06-10",
        fecha_pago: "2025-06-15",
        metodo_pago: "Tarjeta de Crédito"
      },
      {
        id: 3,
        cliente_id: "1f0b4e43-a106-65c4-ae51-e0be035fb029",
        nro: "FAC-0003",
        servicio: "Internet Hogar",
        periodo: "2025-07",
        monto: 210.90,
        estado: {codigo: "PEN", valor: "PENDIENTE"},
        activo: true,
        fecha_emision: "2025-07-05",
        fecha_pago: null,
        metodo_pago: null
      },
      {
        id: 4,
        cliente_id: "1f0b4e43-a106-65c4-ae51-e0be035fb029",
        nro: "FAC-0004",
        servicio: "Televisión por Cable",
        periodo: "2025-08",
        monto: 89.00,
        estado: {codigo: "PAG", valor: "PAGADO"},
        activo: true,
        fecha_emision: "2025-08-01",
        fecha_pago: "2025-08-10",
        metodo_pago: "Transferencia Bancaria"
      },
      {
        id: 5,
        cliente_id: "1f0b4e43-a106-65c4-ae51-e0be035fb029",
        nro: "FAC-0005",
        servicio: "Teléfono Fijo",
        periodo: "2025-09",
        monto: 33.20,
        estado: {codigo: "PEN", valor: "PENDIENTE"},
        activo: true,
        fecha_emision: "2025-09-10",
        fecha_pago: null,
        metodo_pago: null
      },
      {
        id: 6,
        cliente_id: "1f0b4e4f-b292-6188-bc8e-e0be035fb029",
        nro: "FAC-0101",
        servicio: "Internet Hogar",
        periodo: "2025-05",
        monto: 220.40,
        estado: {codigo: "PAG", valor: "PAGADO"},
        activo: true,
        fecha_emision: "2025-05-08",
        fecha_pago: "2025-05-12",
        metodo_pago: "Efectivo"
      },
      {
        id: 7,
        cliente_id: "1f0b4e4f-b292-6188-bc8e-e0be035fb029",
        nro: "FAC-0102",
        servicio: "Energía Eléctrica",
        periodo: "2025-06",
        monto: 142.80,
        estado: {codigo: "PEN", valor: "PENDIENTE"},
        activo: true,
        fecha_emision: "2025-06-10",
        fecha_pago: null,
        metodo_pago: null
      },
      {
        id: 8,
        cliente_id: "1f0b4e4f-b292-6188-bc8e-e0be035fb029",
        nro: "FAC-0103",
        servicio: "Agua Potable",
        periodo: "2025-07",
        monto: 57.10,
        estado: {codigo: "PAG", valor: "PAGADO"},
        activo: true,
        fecha_emision: "2025-07-03",
        fecha_pago: "2025-07-07",
        metodo_pago: "PayPal"
      },
      {
        id: 9,
        cliente_id: "1f0b4e4f-b292-6188-bc8e-e0be035fb029",
        nro: "FAC-0104",
        servicio: "Televisión por Cable",
        periodo: "2025-08",
        monto: 98.50,
        estado: {codigo: "PEN", valor: "PENDIENTE"},
        activo: true,
        fecha_emision: "2025-08-01",
        fecha_pago: null,
        metodo_pago: null
      },
      {
        id: 10,
        cliente_id: "1f0b4e4f-b292-6188-bc8e-e0be035fb029",
        nro: "FAC-0105",
        servicio: "Teléfono Fijo",
        periodo: "2025-09",
        monto: 30.00,
        estado: {codigo: "PAG", valor: "PAGADO"},
        activo: true,
        fecha_emision: "2025-09-05",
        fecha_pago: "2025-09-08",
        metodo_pago: "Tarjeta de Débito"
      }
    ];
  }

  private apiUrl = 'http://localhost:3000/facturas';

  constructor(private http: HttpClient) {
  }

  getFacturasByClienteIdAPI(clienteId: string | null): Observable<Factura[]> {
    return this.http.get<any[]>(`${this.apiUrl}` + `?cliente_id=${clienteId}`);
  }

  getFacturasByClienteId(clienteId: string | null) {
    const allFacturas = this.getDataFactura();
    return allFacturas.filter(factura => factura.cliente_id === clienteId);
  }

  pagarFacturaAPI(data: any): Observable<Factura> {
    const update = {
      estado: { codigo: 'PAG', valor: 'PAGADO' },
      fecha_pago: new Date().toISOString().split('T')[0],
      metodo_pago: {codigo: data.metodo_pago.codigo, valor: data.metodo_pago.valor }
    };
    return this.http.patch<Factura>(`${this.apiUrl}/${data.id}`, update);
  }

  pagarFactura(data: any) {
    const allFacturas = this.getDataFactura();
    const factura = allFacturas.find(f => f.id === data.id);
    if (factura && factura.estado.codigo === "PEN") {
      factura.estado = {codigo: "PAG", valor: "PAGADO"};
      factura.fecha_pago = new Date().toISOString().split('T')[0];
      // @ts-ignore
      factura.metodo_pago = {codigo: data.metodo_pago.codigo, valor: data.metodo_pago.valor };
    }
    return factura;
  }
}

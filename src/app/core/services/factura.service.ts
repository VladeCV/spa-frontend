import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  getDataFactura() {
    return [
      // 🧍 Client 1 - cliente_id = 1
      {
        id: 1,
        cliente_id: 1,
        nro: "FAC-0001",
        servicio: "Agua Potable",
        periodo: "2025-05",
        monto: 48.75,
        estado: {codigo: "PEN", valor: "PENDIENTE"},
        activo: true,
        fecha_emision: "2025-05-10",
        fecha_pago: null
      },
      {
        id: 2,
        cliente_id: 1,
        nro: "FAC-0002",
        servicio: "Energía Eléctrica",
        periodo: "2025-06",
        monto: 125.50,
        estado: {codigo: "PAG", valor: "PAGADO"},
        activo: true,
        fecha_emision: "2025-06-10",
        fecha_pago: "2025-06-15"
      },
      {
        id: 3,
        cliente_id: 1,
        nro: "FAC-0003",
        servicio: "Internet Hogar",
        periodo: "2025-07",
        monto: 210.90,
        estado: {codigo: "PEN", valor: "PENDIENTE"},
        activo: true,
        fecha_emision: "2025-07-05",
        fecha_pago: null
      },
      {
        id: 4,
        cliente_id: 1,
        nro: "FAC-0004",
        servicio: "Televisión por Cable",
        periodo: "2025-08",
        monto: 89.00,
        estado: {codigo: "PAG", valor: "PAGADO"},
        activo: true,
        fecha_emision: "2025-08-01",
        fecha_pago: "2025-08-10"
      },
      {
        id: 5,
        cliente_id: 1,
        nro: "FAC-0005",
        servicio: "Teléfono Fijo",
        periodo: "2025-09",
        monto: 33.20,
        estado: {codigo: "PEN", valor: "PENDIENTE"},
        activo: true,
        fecha_emision: "2025-09-10",
        fecha_pago: null
      },

      // 🧍 Client 2 - cliente_id = 2
      {
        id: 6,
        cliente_id: 2,
        nro: "FAC-0101",
        servicio: "Internet Hogar",
        periodo: "2025-05",
        monto: 220.40,
        estado: {codigo: "PAG", valor: "PAGADO"},
        activo: true,
        fecha_emision: "2025-05-08",
        fecha_pago: "2025-05-12"
      },
      {
        id: 7,
        cliente_id: 2,
        nro: "FAC-0102",
        servicio: "Energía Eléctrica",
        periodo: "2025-06",
        monto: 142.80,
        estado: {codigo: "PEN", valor: "PENDIENTE"},
        activo: true,
        fecha_emision: "2025-06-10",
        fecha_pago: null
      },
      {
        id: 8,
        cliente_id: 2,
        nro: "FAC-0103",
        servicio: "Agua Potable",
        periodo: "2025-07",
        monto: 57.10,
        estado: {codigo: "PAG", valor: "PAGADO"},
        activo: true,
        fecha_emision: "2025-07-03",
        fecha_pago: "2025-07-07"
      },
      {
        id: 9,
        cliente_id: 2,
        nro: "FAC-0104",
        servicio: "Televisión por Cable",
        periodo: "2025-08",
        monto: 98.50,
        estado: {codigo: "PEN", valor: "PENDIENTE"},
        activo: true,
        fecha_emision: "2025-08-01",
        fecha_pago: null
      },
      {
        id: 10,
        cliente_id: 2,
        nro: "FAC-0105",
        servicio: "Teléfono Fijo",
        periodo: "2025-09",
        monto: 30.00,
        estado: {codigo: "PAG", valor: "PAGADO"},
        activo: true,
        fecha_emision: "2025-09-05",
        fecha_pago: "2025-09-08"
      }
    ];
  }

  constructor() {
  }

  getFacturasByClienteId(clienteId: number) {
    const allFacturas = this.getDataFactura();
    return allFacturas.filter(factura => factura.cliente_id === clienteId);
  }

  pagarFactura(facturaId: number) {
    const allFacturas = this.getDataFactura();
    const factura = allFacturas.find(f => f.id === facturaId);
    if (factura && factura.estado.codigo === "PEN") {
      factura.estado = {codigo: "PAG", valor: "PAGADO"};
      factura.fecha_pago = new Date().toISOString().split('T')[0];
    }
    return factura;
  }
}

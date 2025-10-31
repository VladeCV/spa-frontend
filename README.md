# SapFrontend
Este proyecto es un sistema frontend desarrollado en Angular para la gestión de clientes y facturas.
Se utiliza JSON Server como backend mock para simular las APIs de clientes y facturas.
Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.
**Funcionalidades principales:**
- Consulta de clientes por número de documento.
- Visualización de facturas por cliente.
- Pago de facturas pendientes con distintos métodos.
- Notificaciones de éxito/error mediante **PrimeNG Toast**.
- Uso de **PrimeNG** para tablas, formularios y diálogos modales.
---

## Tecnologías utilizadas
- Angular 16+
- PrimeNG (UI Components)
- JSON Server (API Mock)
- TypeScript
- Node.js & NPM

---
## Instalación
1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
cd <nombre-del-proyecto>
```
2. Instalar dependencias de Angular:

```bash
npm install
```
3. Instalar JSON Server globalmente (si no lo tienes):

```bash
npm install -g json-server
```
4. Para levantar el JSON SERVER con el archivo db.json
```bash
npx json-server --watch db.json --port 3000
```
5. Ejecutar el proyecto
```bash
ng serve
```
## API Reference

#### Lista de clientes

```http
  GET /clientes
```
#### Obtener cliente por nro de documento

```http
  GET /clientes?nro_documento={valor}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `valor`      | `string` | **Requerido**. Nro. de documento del cliente |

#### Lista de facturas

```http
  GET /facturas

```
#### Obtener facturas por id cliente
```http
  GET /facturas?cliente_id={valor}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `valor`      | `string` | **Requerido**. Id cliente |

#### Pagar factura
```http
  PATCH /facturas/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Requerido**. Id factura |

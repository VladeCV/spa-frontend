# SapFrontend

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Ejecutar `ng serve` para dev server. Navegar a `http://localhost:4200/`. 

## Para cargar los datos instalar JSON SERVER

Ejecutar `npm install -g json-server` 

## Para levantar el JSON SERVER
Ejecutar `npx json-server --watch db.json --port 3000` 

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

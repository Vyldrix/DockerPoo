# Proyecto POO y Docker 28-04

### Integrantes:
- Loyola Lautaro
- Rivieri Lautaro

## Consignas:
- Desarrollar una app Front y Back dockerizada implementando en el backend el aeroplano.
- Crear un repo de Github
- Implementar un CRUD del Aeroplano
- 2 clases deben ser Composición y el resto Agregación.
- Subir el link del repo al excel: 

## Proyecto Aeroplano en Docker
Aplicación web de aeroplanos, implementando conceptos de Programación Orientada a Objetos (Composición y Agregación) con un CRUD funcional

## Estructura del proyecto
``` text
aeroplano-crud/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── Aeroplano.ts
│   │   │   ├── Turbina.ts (Composición)
│   │   │   ├── Cubierta.ts (Composición)
│   │   │   ├── Helice.ts (Agregación)
│   │   │   ├── TrenAterrizaje.ts (Agregación)
│   │   │   └── Alas.ts (Agregación)
│   │   ├── routes/
│   │   └── index.ts
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app.ts
│   │   └── styles.css
│   ├── index.html
│   └── Dockerfile
└── docker-compose.yml
```

Para la levantarlo solamente es requerido ejecutar Docker Compose:
```
docker-compose up --build
```

![docker compose](/images/image-1.png)

Para acceder a la aplicación:
- Frontend: http://localhost:8080
- Backend API: http://localhost:3000
![proyecto levantado](/images/image-2.png)

>[!IMPORTANT]
> **Cambios/errores notados**
> - Lógica turbina & hélice, pueden haber aviones que no se compongan de ambos sistemas de propulsión
> - Poder asignar o modificar el nombre del aeroplano
> - Eliminar el botón de "Agregar Hélice/Turbina" por motivos de redundancia (ya se indica la cantidad)

### [**Subir ⬆**](#proyecto-poo-y-docker-28-04)
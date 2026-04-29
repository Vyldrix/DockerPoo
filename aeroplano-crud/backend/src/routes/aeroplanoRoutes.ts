import { Router, Request, Response } from 'express';
import { Aeroplano } from '../models/Aeroplano';
import { Helice } from '../models/Helice';
import { Turbina } from '../models/Turbina';
import { TrenAterrizaje } from '../models/TrenAterrizaje';
import { Alas } from '../models/Alas';
import { Cubierta } from '../models/Cubierta';

const router = Router();
let aeroplanos: Aeroplano[] = [];
let nextId = 1;

// Inicializar con un aeroplano de ejemplo
const helice1 = new Helice(2);
const helice2 = new Helice(2);
const turbina1 = new Turbina(2);
const turbina2 = new Turbina(2);
const trenAterrizaje = new TrenAterrizaje(6, 4, true);
const alas = new Alas(2, 1);
const cubierta = new Cubierta(true, true, true, 6, 4);

const aeroplanoEjemplo = new Aeroplano(
    [helice1, helice2],
    [turbina1, turbina2],
    trenAterrizaje,
    alas,
    cubierta,
    (nextId++).toString()
);
aeroplanos.push(aeroplanoEjemplo);

// GET - Obtener todos los aeroplanos
router.get('/', (req: Request, res: Response) => {
    res.json(aeroplanos.map(a => a.toJSON()));
});

// GET - Obtener un aeroplano por ID
router.get('/:id', (req: Request, res: Response) => {
    const aeroplano = aeroplanos.find(a => a.getId() === req.params.id);
    if (aeroplano) {
        res.json(aeroplano.toJSON());
    } else {
        res.status(404).json({ error: 'Aeroplano no encontrado' });
    }
});

// POST - Crear un nuevo aeroplano
router.post('/', (req: Request, res: Response) => {
    try {
        const data = req.body;
        
        const helices = data.helices.map((h: any) => new Helice(h.numHelices));
        const turbinas = data.turbinas.map((t: any) => new Turbina(t.numTurbinas));
        const trenAterrizaje = new TrenAterrizaje(
            data.trenAterrizaje.numNeumaticos,
            data.trenAterrizaje.numAmortiguadores,
            data.trenAterrizaje.fijoRetractil
        );
        const alas = new Alas(data.alas.numAlasFrente, data.alas.numAlasCola);
        const cubierta = new Cubierta(
            data.cubierta.cabinaTripulacion,
            data.cubierta.cabinaVuelo,
            data.cubierta.sistemaEmergencia,
            data.cubierta.numTanquesCombustible,
            data.cubierta.numPuertasSalidas
        );
        
        const aeroplano = new Aeroplano(helices, turbinas, trenAterrizaje, alas, cubierta, (nextId++).toString());
        aeroplanos.push(aeroplano);
        res.status(201).json(aeroplano.toJSON());
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el aeroplano' });
    }
});

// PUT - Actualizar un aeroplano existente
router.put('/:id', (req: Request, res: Response) => {
    try {
        const index = aeroplanos.findIndex(a => a.getId() === req.params.id);
        if (index === -1) {
            res.status(404).json({ error: 'Aeroplano no encontrado' });
            return;
        }
        
        const data = req.body;
        const helices = data.helices.map((h: any) => new Helice(h.numHelices));
        const turbinas = data.turbinas.map((t: any) => new Turbina(t.numTurbinas));
        const trenAterrizaje = new TrenAterrizaje(
            data.trenAterrizaje.numNeumaticos,
            data.trenAterrizaje.numAmortiguadores,
            data.trenAterrizaje.fijoRetractil
        );
        const alas = new Alas(data.alas.numAlasFrente, data.alas.numAlasCola);
        const cubierta = new Cubierta(
            data.cubierta.cabinaTripulacion,
            data.cubierta.cabinaVuelo,
            data.cubierta.sistemaEmergencia,
            data.cubierta.numTanquesCombustible,
            data.cubierta.numPuertasSalidas
        );
        
        const aeroplanoActualizado = new Aeroplano(helices, turbinas, trenAterrizaje, alas, cubierta, req.params.id);
        aeroplanos[index] = aeroplanoActualizado;
        res.json(aeroplanoActualizado.toJSON());
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el aeroplano' });
    }
});

// DELETE - Eliminar un aeroplano
router.delete('/:id', (req: Request, res: Response) => {
    const index = aeroplanos.findIndex(a => a.getId() === req.params.id);
    if (index === -1) {
        res.status(404).json({ error: 'Aeroplano no encontrado' });
        return;
    }
    
    aeroplanos.splice(index, 1);
    res.status(204).send();
});

export default router;
import { Helice } from './Helice';
import { TrenAterrizaje } from './TrenAterrizaje';
import { Alas } from './Alas';
import { Cubierta } from './Cubierta';
import { Turbina } from './Turbina';

export class Aeroplano {
    private id?: string;
    private helices: Helice[];
    private turbinas: Turbina[];
    private trenAterrizaje: TrenAterrizaje;
    private alas: Alas;
    private cubierta: Cubierta;
    
    constructor(
        helices: Helice[],
        turbinas: Turbina[],
        trenAterrizaje: TrenAterrizaje,
        alas: Alas,
        cubierta: Cubierta,
        id?: string
    ) {
        this.helices = helices;
        this.turbinas = turbinas;
        this.trenAterrizaje = trenAterrizaje;
        this.alas = alas;
        this.cubierta = cubierta;
        this.id = id;
    }
    
    public toString(): string {
        let mensaje = "Aeroplano compuesto por:\n";
        mensaje += `- Hélice(s): ${this.helices.map(h => h.toString()).join(', ')}\n`;
        mensaje += `- Turbina(s): ${this.turbinas.map(t => t.toString()).join(', ')}\n`;
        mensaje += `- ${this.alas.toString()}\n`;
        mensaje += `- ${this.trenAterrizaje.toString()}\n`;
        mensaje += `- ${this.cubierta.toString()}`;
        return mensaje;
    }
    
    public getId(): string | undefined { return this.id; }
    public getHelices(): Helice[] { return this.helices; }
    public getTurbinas(): Turbina[] { return this.turbinas; }
    public getTrenAterrizaje(): TrenAterrizaje { return this.trenAterrizaje; }
    public getAlas(): Alas { return this.alas; }
    public getCubierta(): Cubierta { return this.cubierta; }
    
    public setHelices(helices: Helice[]): void { this.helices = helices; }
    public setTurbinas(turbinas: Turbina[]): void { this.turbinas = turbinas; }
    public setTrenAterrizaje(trenAterrizaje: TrenAterrizaje): void { this.trenAterrizaje = trenAterrizaje; }
    public setAlas(alas: Alas): void { this.alas = alas; }
    public setCubierta(cubierta: Cubierta): void { this.cubierta = cubierta; }
    
    public toJSON(): any {
        return {
            id: this.id,
            helices: this.helices.map(h => h.toJSON()),
            turbinas: this.turbinas.map(t => t.toJSON()),
            trenAterrizaje: this.trenAterrizaje.toJSON(),
            alas: this.alas.toJSON(),
            cubierta: this.cubierta.toJSON()
        };
    }
    
    public static fromJSON(json: any): Aeroplano {
        const helices = json.helices.map((h: any) => Helice.fromJSON(h));
        const turbinas = json.turbinas.map((t: any) => Turbina.fromJSON(t));
        const trenAterrizaje = TrenAterrizaje.fromJSON(json.trenAterrizaje);
        const alas = Alas.fromJSON(json.alas);
        const cubierta = Cubierta.fromJSON(json.cubierta);
        
        return new Aeroplano(helices, turbinas, trenAterrizaje, alas, cubierta, json.id);
    }
}
export class Cubierta {
    private cabinaTripulacion: boolean;
    private cabinaVuelo: boolean;
    private sistemaEmergencia: boolean;
    private numTanquesCombustible: number;
    private numPuertasSalidas: number;
    
    constructor(
        cabinaTripulacion: boolean,
        cabinaVuelo: boolean,
        sistemaEmergencia: boolean,
        numTanquesCombustible: number,
        numPuertasSalidas: number
    ) {
        this.cabinaTripulacion = cabinaTripulacion;
        this.cabinaVuelo = cabinaVuelo;
        this.sistemaEmergencia = sistemaEmergencia;
        this.numTanquesCombustible = numTanquesCombustible;
        this.numPuertasSalidas = numPuertasSalidas;
    }
    
    public toString(): string {
        let mensaje = "Cubierta compuesta de: ";
        if (this.cabinaVuelo) mensaje += "Cubierta de Vuelo, ";
        if (this.cabinaTripulacion) mensaje += "Cubierta de Tripulación, ";
        if (this.sistemaEmergencia) mensaje += "Sistema de Emergencia, ";
        mensaje += `${this.numTanquesCombustible} Tanques de Combustible, `;
        mensaje += `${this.numPuertasSalidas} Puertas de Salida.`;
        return mensaje;
    }
    
    public getCabinaTripulacion(): boolean { return this.cabinaTripulacion; }
    public getCabinaVuelo(): boolean { return this.cabinaVuelo; }
    public getSistemaEmergencia(): boolean { return this.sistemaEmergencia; }
    public getNumTanquesCombustible(): number { return this.numTanquesCombustible; }
    public getNumPuertasSalidas(): number { return this.numPuertasSalidas; }
    
    public setCabinaTripulacion(value: boolean): void { this.cabinaTripulacion = value; }
    public setCabinaVuelo(value: boolean): void { this.cabinaVuelo = value; }
    public setSistemaEmergencia(value: boolean): void { this.sistemaEmergencia = value; }
    public setNumTanquesCombustible(num: number): void { this.numTanquesCombustible = num; }
    public setNumPuertasSalidas(num: number): void { this.numPuertasSalidas = num; }
    
    public toJSON(): any {
        return {
            cabinaTripulacion: this.cabinaTripulacion,
            cabinaVuelo: this.cabinaVuelo,
            sistemaEmergencia: this.sistemaEmergencia,
            numTanquesCombustible: this.numTanquesCombustible,
            numPuertasSalidas: this.numPuertasSalidas
        };
    }
    
    public static fromJSON(json: any): Cubierta {
        return new Cubierta(
            json.cabinaTripulacion,
            json.cabinaVuelo,
            json.sistemaEmergencia,
            json.numTanquesCombustible,
            json.numPuertasSalidas
        );
    }
}
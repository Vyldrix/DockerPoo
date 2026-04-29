export class Alas {
    private numAlasFrente: number;
    private numAlasCola: number;
    
    constructor(numAlasFrente: number, numAlasCola: number) {
        this.numAlasFrente = numAlasFrente;
        this.numAlasCola = numAlasCola;
    }
    
    public toString(): string {
        return `Alas Frontales: ${this.numAlasFrente} Alas Posteriores: ${this.numAlasCola}`;
    }
    
    public getNumAlasFrente(): number { return this.numAlasFrente; }
    public getNumAlasCola(): number { return this.numAlasCola; }
    
    public setNumAlasFrente(num: number): void { this.numAlasFrente = num; }
    public setNumAlasCola(num: number): void { this.numAlasCola = num; }
    
    public toJSON(): any {
        return {
            numAlasFrente: this.numAlasFrente,
            numAlasCola: this.numAlasCola
        };
    }
    
    public static fromJSON(json: any): Alas {
        return new Alas(json.numAlasFrente, json.numAlasCola);
    }
}
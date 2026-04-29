export class Turbina {
    private numTurbinas: number;
    
    constructor(numTurbinas: number) {
        this.numTurbinas = numTurbinas;
    }
    
    public toString(): string {
        return `${this.numTurbinas} Turbina/s`;
    }
    
    public getNumTurbinas(): number {
        return this.numTurbinas;
    }
    
    public setNumTurbinas(num: number): void {
        this.numTurbinas = num;
    }
    
    public toJSON(): any {
        return {
            numTurbinas: this.numTurbinas
        };
    }
    
    public static fromJSON(json: any): Turbina {
        return new Turbina(json.numTurbinas);
    }
}
export class Helice {
    private numHelices: number;
    
    constructor(numHelices: number) {
        this.numHelices = numHelices;
    }
    
    public toString(): string {
        return `${this.numHelices} hélice/s`;
    }
    
    public getNumHelices(): number {
        return this.numHelices;
    }
    
    public setNumHelices(num: number): void {
        this.numHelices = num;
    }
    
    public toJSON(): any {
        return {
            numHelices: this.numHelices
        };
    }
    
    public static fromJSON(json: any): Helice {
        return new Helice(json.numHelices);
    }
}
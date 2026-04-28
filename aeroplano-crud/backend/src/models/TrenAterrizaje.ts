export class TrenAterrizaje {
        private numNeumaticos: number;
            private numAmortiguadores: number;
                private fijoRetractil: boolean;
                    
                        constructor(numNeumaticos: number, numAmortiguadores: number, fijoRetractil: boolean) {
                                this.numNeumaticos = numNeumaticos;
                                        this.numAmortiguadores = numAmortiguadores;
                                                this.fijoRetractil = fijoRetractil;
                                                    }
                                                        
                                                            public toString(): string {
                                                                    let mensaje = "Tren de Aterrizaje compuesto por: ";
                                                                            if (this.fijoRetractil) {
                                                                                        mensaje += "con Retractil fijo, ";
                                                                                                }
                                                                                                        mensaje += `${this.numNeumaticos} neumáticos, ${this.numAmortiguadores} amortiguadores`;
                                                                                                                return mensaje;
                                                                                                                    }
                                                                                                                        
                                                                                                                            public getNumNeumaticos(): number { return this.numNeumaticos; }
                                                                                                                                public getNumAmortiguadores(): number { return this.numAmortiguadores; }
                                                                                                                                    public isFijoRetractil(): boolean { return this.fijoRetractil; }
                                                                                                                                        
                                                                                                                                            public setNumNeumaticos(num: number): void { this.numNeumaticos = num; }
                                                                                                                                                public setNumAmortiguadores(num: number): void { this.numAmortiguadores = num; }
                                                                                                                                                    public setFijoRetractil(value: boolean): void { this.fijoRetractil = value; }
                                                                                                                                                        
                                                                                                                                                            public toJSON(): any {
                                                                                                                                                                    return {
                                                                                                                                                                                numNeumaticos: this.numNeumaticos,
                                                                                                                                                                                            numAmortiguadores: this.numAmortiguadores,
                                                                                                                                                                                                        fijoRetractil: this.fijoRetractil
                                                                                                                                                                                                                };
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                        
                                                                                                                                                                                                                            public static fromJSON(json: any): TrenAterrizaje {
                                                                                                                                                                                                                                    return new TrenAterrizaje(json.numNeumaticos, json.numAmortiguadores, json.fijoRetractil);
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                        }
}
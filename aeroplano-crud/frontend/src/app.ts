interface AeroplanoData {
    id?: string;
    helices: Array<{ numHelices: number }>;
    turbinas: Array<{ numTurbinas: number }>;
    trenAterrizaje: {
        numNeumaticos: number;
        numAmortiguadores: number;
        fijoRetractil: boolean;
    };
    alas: {
        numAlasFrente: number;
        numAlasCola: number;
    };
    cubierta: {
        cabinaTripulacion: boolean;
        cabinaVuelo: boolean;
        sistemaEmergencia: boolean;
        numTanquesCombustible: number;
        numPuertasSalidas: number;
    };
}

const API_URL = 'http://localhost:3000/api/aeroplanos';

class AeroplanoApp {
    private form: HTMLFormElement;
    private aeroplanosList: HTMLElement;
    private cancelBtn: HTMLButtonElement;
    private editingId: string | null = null;

    constructor() {
        this.form = document.getElementById('aeroplanoForm') as HTMLFormElement;
        this.aeroplanosList = document.getElementById('aeroplanosList') as HTMLElement;
        this.cancelBtn = document.getElementById('cancelEdit') as HTMLButtonElement;
        
        this.init();
    }

    private init(): void {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.cancelBtn.addEventListener('click', this.cancelEdit.bind(this));
        
        document.getElementById('addHelice')?.addEventListener('click', () => this.addHelice());
        document.getElementById('addTurbina')?.addEventListener('click', () => this.addTurbina());
        
        this.loadAeroplanos();
    }

    private addHelice(): void {
        const container = document.getElementById('helicesContainer');
        const div = document.createElement('div');
        div.className = 'helice-item';
        div.innerHTML = `
            <label>Número de hélices:</label>
            <input type="number" class="helice-input" required min="1">
            <button type="button" class="remove-helice">❌</button>
        `;
        div.querySelector('.remove-helice')?.addEventListener('click', () => div.remove());
        container?.appendChild(div);
    }

    private addTurbina(): void {
        const container = document.getElementById('turbinasContainer');
        const div = document.createElement('div');
        div.className = 'turbina-item';
        div.innerHTML = `
            <label>Número de turbinas:</label>
            <input type="number" class="turbina-input" required min="1">
            <button type="button" class="remove-turbina">❌</button>
        `;
        div.querySelector('.remove-turbina')?.addEventListener('click', () => div.remove());
        container?.appendChild(div);
    }

    private getFormData(): AeroplanoData {
        const helicesInputs = document.querySelectorAll('.helice-input');
        const helices = Array.from(helicesInputs).map(input => ({
            numHelices: parseInt((input as HTMLInputElement).value)
        }));

        const turbinasInputs = document.querySelectorAll('.turbina-input');
        const turbinas = Array.from(turbinasInputs).map(input => ({
            numTurbinas: parseInt((input as HTMLInputElement).value)
        }));

        return {
            helices,
            turbinas,
            trenAterrizaje: {
                numNeumaticos: parseInt((document.getElementById('numNeumaticos') as HTMLInputElement).value),
                numAmortiguadores: parseInt((document.getElementById('numAmortiguadores') as HTMLInputElement).value),
                fijoRetractil: (document.getElementById('fijoRetractil') as HTMLInputElement).checked
            },
            alas: {
                numAlasFrente: parseInt((document.getElementById('numAlasFrente') as HTMLInputElement).value),
                numAlasCola: parseInt((document.getElementById('numAlasCola') as HTMLInputElement).value)
            },
            cubierta: {
                cabinaTripulacion: (document.getElementById('cabinaTripulacion') as HTMLInputElement).checked,
                cabinaVuelo: (document.getElementById('cabinaVuelo') as HTMLInputElement).checked,
                sistemaEmergencia: (document.getElementById('sistemaEmergencia') as HTMLInputElement).checked,
                numTanquesCombustible: parseInt((document.getElementById('numTanquesCombustible') as HTMLInputElement).value),
                numPuertasSalidas: parseInt((document.getElementById('numPuertasSalidas') as HTMLInputElement).value)
            }
        };
    }

    private setFormData(data: AeroplanoData): void {
        // Limpiar contenedores
        const helicesContainer = document.getElementById('helicesContainer');
        const turbinasContainer = document.getElementById('turbinasContainer');
        if (helicesContainer) helicesContainer.innerHTML = '';
        if (turbinasContainer) turbinasContainer.innerHTML = '';

        // Agregar hélices
        data.helices.forEach(helice => {
            const div = document.createElement('div');
            div.className = 'helice-item';
            div.innerHTML = `
                <label>Número de hélices:</label>
                <input type="number" class="helice-input" value="${helice.numHelices}" required min="1">
                <button type="button" class="remove-helice">❌</button>
            `;
            div.querySelector('.remove-helice')?.addEventListener('click', () => div.remove());
            helicesContainer?.appendChild(div);
        });

        // Agregar turbinas
        data.turbinas.forEach(turbina => {
            const div = document.createElement('div');
            div.className = 'turbina-item';
            div.innerHTML = `
                <label>Número de turbinas:</label>
                <input type="number" class="turbina-input" value="${turbina.numTurbinas}" required min="1">
                <button type="button" class="remove-turbina">❌</button>
            `;
            div.querySelector('.remove-turbina')?.addEventListener('click', () => div.remove());
            turbinasContainer?.appendChild(div);
        });

        // Setear otros campos
        (document.getElementById('numNeumaticos') as HTMLInputElement).value = data.trenAterrizaje.numNeumaticos.toString();
        (document.getElementById('numAmortiguadores') as HTMLInputElement).value = data.trenAterrizaje.numAmortiguadores.toString();
        (document.getElementById('fijoRetractil') as HTMLInputElement).checked = data.trenAterrizaje.fijoRetractil;
        (document.getElementById('numAlasFrente') as HTMLInputElement).value = data.alas.numAlasFrente.toString();
        (document.getElementById('numAlasCola') as HTMLInputElement).value = data.alas.numAlasCola.toString();
        (document.getElementById('cabinaTripulacion') as HTMLInputElement).checked = data.cubierta.cabinaTripulacion;
        (document.getElementById('cabinaVuelo') as HTMLInputElement).checked = data.cubierta.cabinaVuelo;
        (document.getElementById('sistemaEmergencia') as HTMLInputElement).checked = data.cubierta.sistemaEmergencia;
        (document.getElementById('numTanquesCombustible') as HTMLInputElement).value = data.cubierta.numTanquesCombustible.toString();
        (document.getElementById('numPuertasSalidas') as HTMLInputElement).value = data.cubierta.numPuertasSalidas.toString();
    }

    private async handleSubmit(e: Event): Promise<void> {
        e.preventDefault();
        
        const formData = this.getFormData();
        
        try {
            let response;
            if (this.editingId) {
                response = await fetch(`${API_URL}/${this.editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            } else {
                response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }
            
            if (response.ok) {
                this.cancelEdit();
                this.loadAeroplanos();
                this.showMessage('Aeroplano guardado exitosamente', 'success');
            } else {
                this.showMessage('Error al guardar el aeroplano', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            this.showMessage('Error de conexión', 'error');
        }
    }

    private async loadAeroplanos(): Promise<void> {
        try {
            const response = await fetch(API_URL);
            const aeroplanos = await response.json();
            this.displayAeroplanos(aeroplanos);
        } catch (error) {
            console.error('Error loading aeroplanos:', error);
            this.showMessage('Error al cargar los aeroplanos', 'error');
        }
    }

    private displayAeroplanos(aeroplanos: any[]): void {
        if (aeroplanos.length === 0) {
            this.aeroplanosList.innerHTML = '<p>No hay aeroplanos registrados</p>';
            return;
        }
        
        this.aeroplanosList.innerHTML = aeroplanos.map(aeroplano => `
            <div class="aeroplano-card">
                <h3>✈️ Aeroplano #${aeroplano.id}</h3>
                <p><strong>Hélices:</strong> ${aeroplano.helices.map((h: any) => h.numHelices + ' hélices').join(', ')}</p>
                <p><strong>Turbinas:</strong> ${aeroplano.turbinas.map((t: any) => t.numTurbinas + ' turbinas').join(', ')}</p>
                <p><strong>Alas:</strong> ${aeroplano.alas.numAlasFrente} frontales, ${aeroplano.alas.numAlasCola} posteriores</p>
                <p><strong>Tren de aterrizaje:</strong> ${aeroplano.trenAterrizaje.numNeumaticos} neumáticos, ${aeroplano.trenAterrizaje.numAmortiguadores} amortiguadores, ${aeroplano.trenAterrizaje.fijoRetractil ? 'retráctil' : 'fijo'}</p>
                <p><strong>Cubierta:</strong> ${this.getCubiertaDescription(aeroplano.cubierta)}</p>
                <div class="card-buttons">
                    <button class="edit-btn" onclick="app.editAeroplano('${aeroplano.id}')">✏️ Editar</button>
                    <button class="delete-btn" onclick="app.deleteAeroplano('${aeroplano.id}')">🗑️ Eliminar</button>
                </div>
            </div>
        `).join('');
    }

    private getCubiertaDescription(cubierta: any): string {
        const parts = [];
        if (cubierta.cabinaVuelo) parts.push('cabina de vuelo');
        if (cubierta.cabinaTripulacion) parts.push('cabina de tripulación');
        if (cubierta.sistemaEmergencia) parts.push('sistema de emergencia');
        parts.push(`${cubierta.numTanquesCombustible} tanques`);
        parts.push(`${cubierta.numPuertasSalidas} puertas`);
        return parts.join(', ');
    }

    public async editAeroplano(id: string): Promise<void> {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            const aeroplano = await response.json();
            this.setFormData(aeroplano);
            this.editingId = id;
            (document.getElementById('aeroplanoId') as HTMLInputElement).value = id;
            this.form.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Error:', error);
            this.showMessage('Error al cargar el aeroplano para editar', 'error');
        }
    }

    public async deleteAeroplano(id: string): Promise<void> {
        if (confirm('¿Estás seguro de eliminar este aeroplano?')) {
            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    this.loadAeroplanos();
                    this.showMessage('Aeroplano eliminado exitosamente', 'success');
                } else {
                    this.showMessage('Error al eliminar el aeroplano', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                this.showMessage('Error de conexión', 'error');
            }
        }
    }

    private cancelEdit(): void {
        this.editingId = null;
        (document.getElementById('aeroplanoId') as HTMLInputElement).value = '';
        this.form.reset();
        
        // Limpiar y agregar una hélice y turbina por defecto
        const helicesContainer = document.getElementById('helicesContainer');
        const turbinasContainer = document.getElementById('turbinasContainer');
        if (helicesContainer) {
            helicesContainer.innerHTML = '';
            this.addHelice();
        }
        if (turbinasContainer) {
            turbinasContainer.innerHTML = '';
            this.addTurbina();
        }
    }

    private showMessage(message: string, type: 'success' | 'error'): void {
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'success' ? 'success' : 'error';
        messageDiv.textContent = message;
        this.form.insertAdjacentElement('beforebegin', messageDiv);
        setTimeout(() => messageDiv.remove(), 3000);
    }
}

interface Window {
    app: AeroplanoApp;
}

const app = new AeroplanoApp();
window.app = app;
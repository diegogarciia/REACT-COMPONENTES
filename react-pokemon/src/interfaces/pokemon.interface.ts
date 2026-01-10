export interface Pokemon {
    id: number;
    nombre: string;
    tipo: string[];
    habilidad: string[];
    sprites: {
        front: string;
    };
}
export interface Genplans {
    icon: string;
    id: number;
    order: number;
    title: string;
    type: string;
    pins: GenplanPins[];
}

export interface GenplanPins {
    icon: string;
    id: number;
    order: number;
    title: string;
    pins: {
        points: string[];
    }[];
    contents: {
        file: string;
        id: number;
        order: number;
        type: string;
        variants: {
            description: string;
            file: string;
            title: string;
        }[];
    }[];
}

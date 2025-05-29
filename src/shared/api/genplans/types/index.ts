export interface Genplans {
    icon: string;
    id: number;
    order: number;
    title: string;
    type: string;
    pins: {
        icon: string;
        id: number;
        order: number;
        title: string;
        pins: {
            points: string[];
        }[];
        contents: [];
    }[];
}

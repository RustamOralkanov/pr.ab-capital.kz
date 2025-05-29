export interface Location {
    icon: string;
    id: number;
    image: string;
    order: number;
    title: string;
    type: string;
    contents: {
        color: string;
        file: string;
        id: number;
        order: number;
        subtitle: string;
        title: string;
        points: number[];
    }[];
}

export interface About {
    description: string;
    id: number;
    image: string;
    subtitle: string;
    title: string;
}

export interface AboutSections {
    icon: string;
    id: number;
    title: string;
    type: string;
    contents: {
        description: string;
        file: string;
        id: number;
        image: string;
        link: string;
        order: number;
        title: string;
    }[];
}

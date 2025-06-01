export interface AboutPages {
    id: number;
    alias: string;
    order: number;
    icon: string;
    title: string;
    subtitle: string;
}

export interface AboutPagesSections {
    id: number;
    title: string;
    order: number;
    background_color: string;
    type: string;
    icon: string;
    page: {
        id: number;
        title: string;
    };
    contents: {
        order: number;
        title: string;
        image: string;
        description: string;
        youtube_link: string;
        file: string;
    }[];
}

export interface Carousels {
    icon: string;
    id: number;
    order: number;
    title: string;
    type: string;
}

export interface CarouselsContents {
    description: string;
    file: string;
    id: number;
    image: string;
    link: string;
    order: number;
    pr_project_carousel_id: number;
    title: string;
    variants: [];
    youtube_link: string;
}

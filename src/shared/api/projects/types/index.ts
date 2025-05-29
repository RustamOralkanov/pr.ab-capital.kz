export interface Projects {
    id: number;
    logo: string;
    api_id: number;
    alias: string;
    project_stage: string;
    project_class: string;
    date_completion: string;
    date_build: string;
    floor: number;
    flat_count: number;
    parking_count: number;
    block_count: number;
    title: string;
    description: string;
    latitude: string;
    longitude: string;
    images: {
        id: number;
        image: string;
    }[];
}

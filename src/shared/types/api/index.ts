export interface ApiParams {
    id?: string;
    alias?: string;
    lang?: string;
    publication_type?: string;
    project?: string;
    per_page?: number;
    menu_alias?: string;
    rooms?: string[];
    min_size?: number;
    max_size?: number;
    min_floor?: number;
    max_floor?: number;
    min_price_per_meter?: number;
    max_price_per_meter?: number;
    min_price?: number;
    max_price?: number;
}

export interface ApiWrapper<T> {
    data: T;
    message: string;
    success: boolean;
}

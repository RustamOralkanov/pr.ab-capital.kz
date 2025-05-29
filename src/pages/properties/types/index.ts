export interface PropertiesApi {
    properties: Properties;
}

export interface Properties {
    current_page: number;
    data: Daum[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

export interface Daum {
    id: number;
    number: string;
    rooms: number;
    floor: number;
    section: string;
    layout_type: string;
    facing: string;
    size: number;
    price: number;
    price_per_meter: number;
    project_logo: string;
    plans: Plan[];
    house: House;
    specialOffers: SpecialOffer[];
}

export interface Plan {
    id: number;
    image: string;
    tur_3d: string;
}

export interface House {
    id: number;
    title: string;
    check_in_year: number;
    check_in_quarter: number;
    facing: string;
}

export interface SpecialOffer {
    id: number;
    is_active: number;
    name: string;
    description: string;
    start_date: string;
    finish_date: string;
}

export interface Link {
    url?: string;
    label: string;
    active: boolean;
}

export interface PropertyFilters {
    filters: Filters;
}

export interface Filters {
    rooms: string[];
    houses: House[];
    min_floor: number;
    max_floor: number;
    min_size: number;
    max_size: number;
    min_price: number;
    max_price: number;
    min_price_per_meter: number;
    max_price_per_meter: number;
}

export interface House {
    id: number;
    title: string;
}

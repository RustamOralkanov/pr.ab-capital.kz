export interface PropertiesByID {
    property: Property;
    similarProperties: Property[];
}

export interface Property {
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

export interface House {
    id: number;
    title: string;
    check_in_year: number;
    check_in_quarter: number;
    facing: null;
}

export interface Plan {
    id: number;
    image: string;
    tur_3d: null;
}

export interface SpecialOffer {
    id: number;
    is_active: number;
    name: string;
    description: null;
    start_date: Date;
    finish_date: Date;
}

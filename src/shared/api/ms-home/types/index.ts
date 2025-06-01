export interface MsHome {
    banners: Banner[];
    banner_extras: BannerExtra[];
    finances: Finance[];
    news: Discount[];
    discounts: Discount[];
    request: Request;
}

export interface BannerExtra {
    id: number;
    alias: null;
    title: string;
    subtitle: string;
    btn_name: string;
    linked: Linked;
}

export interface Linked {
    type: string;
    alias: string;
    image: string;
    title: string;
    description: string;
    slug: string;
}

export interface Banner {
    id: number;
    alias: string;
    file_desktop: string;
    file_mobile: string;
    linked?: Linked;
}

export interface Discount {
    id: number;
    alias: string;
    order: number;
    date_published: string;
    cover_image?: string;
    image: string;
    title: string;
    description: string;
}

export interface Finance {
    id: number;
    alias: string;
    title: string;
    information: Information;
}

export interface Information {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    description: string;
}

export interface Request {
    id: number;
    title: string;
    subtitle: string;
    btn_name: string;
    description: string;
    hyperlink: null;
    forms: Form[];
}

export interface Form {
    order: number;
    type: string;
    name: string;
    is_required: number;
    hint: string;
    title: string;
    subtitle: string;
}

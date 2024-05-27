export interface ICategory {
    id: number;
    name: string;
}

export interface IApiResponseCategories {
    data: [number, string][];
}

export interface INewCategory {
    name: string;
}
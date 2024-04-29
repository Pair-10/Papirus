export interface Material {
    id: string;
    language: string;
    publicationDate: string;
    materialName: string;
    pageCount:number;
    quantity: number;
    status: boolean,
    isReturned?: boolean,
}
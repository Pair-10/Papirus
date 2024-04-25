import { Material } from "../material/material";

export interface Book extends Material {
    categoryId: string;
    isbn: string;
    materialId: string;
}
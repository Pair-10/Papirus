import { Material } from "../material/material";

export interface Book extends Material {
    categoryId: number;
    isbn: string;
}
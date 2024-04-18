import { Material } from "../material/material";

export interface Magazine extends Material {
    categoryId: number;
    issn: string; 
    issue: string; 
}
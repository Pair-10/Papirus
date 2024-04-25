import { Material } from "../material/material";

export interface Magazine extends Material {
    categoryId: string;
    issn: string; 
    issue: string;
    materialId:string 
}
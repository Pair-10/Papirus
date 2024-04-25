import { AddMaterialRequest } from "../../material/models/addMaterialRequest";

export interface addMagazineRequest extends AddMaterialRequest {
    categoryId: string;
    issn: string; 
    issue: string; 
}
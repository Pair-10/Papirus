import { AddMaterialRequest } from "../../material/models/addMaterialRequest";

export interface AddArticleRequest extends AddMaterialRequest {
    categoryId: string;
    publictionName:string;
}
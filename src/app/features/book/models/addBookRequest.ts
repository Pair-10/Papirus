import { AddMaterialRequest } from "../../material/models/addMaterialRequest";

export interface AddBookRequest extends AddMaterialRequest {
	categoryId: string;
	isbn: string;
}
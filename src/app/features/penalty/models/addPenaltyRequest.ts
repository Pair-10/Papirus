export interface addPenaltyRequest {
	
    id:string;
    userId:string;
    returnedId: string;
	penaltyPrice: number;
	totalPenaltyDays: number;
	penaltyStatus: boolean;
    materialID:string;
    materialName:string;
}
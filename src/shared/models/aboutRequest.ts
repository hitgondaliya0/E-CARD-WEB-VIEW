export class AboutRequest {
	id: number; //company id required while update
	cardId : number = 0 ; 
	userId: string; //required while create
	yearOfEstablishment: string;
	typeOfBusiness: string;
	aboutCompany: string;
}

export class ProfileRequest {
	id : string ; //company id required while update
	cardId : number = 0;
	userId:string = ''; //required while create
	name: string = '';
	cardUrl: string = '';
	companyLogo: string = '';
	phoneNo: string = '';
	website: string = '';
	address: string = '';
	whatsappNo: string = '';
	owner: Array<string> = [];
	facebookLink: string = '';
	linkedinLink: string = '';
	instagramLink: string = '';
	twitterLink: string = '';
	pinterestLink: string = '';
	youtubeLink: string = '';
	telegramLink: string = '';
	manualLink: string = '';
}

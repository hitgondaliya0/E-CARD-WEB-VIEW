export class PaymentRequests {
	id: number;
	userId: string;
	cardId : number = 0 ;
	paytmQrImage: string;
	paytmNumber: string;
	phonePeQrImage: string;
	phonePeNumber: string;
	googlePayQrImage: string;
	googlePayNumber: string;
	bankName: string;
	accountNumber: string;
	ifscCode: string;
	accountName: string;
	accountType: string;
}

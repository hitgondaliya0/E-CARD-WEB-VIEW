export class CompanyPaymentRequest {
	id: number;
	userId: number;
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
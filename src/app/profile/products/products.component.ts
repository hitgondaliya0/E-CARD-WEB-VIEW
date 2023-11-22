import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HideLoader, ShowLoader } from 'src/app/shared/show-hide-loader';
import { environment } from 'src/environments/environment';
import { CompanyserviceService } from 'src/service/companyservice.service';
import { ProductRequest } from 'src/shared/models/productRequest';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['../profile.component.css']
})
export class ProductComponent {
	@Input() product: any;
	@Output() updateTabName = new EventEmitter<any>();
	products = [
		{
			id: 0,
			image: '',
			name: '',
			description: ''
		}
	];
	userId: string = localStorage.getItem('userId')!;
	cardId : number = 0;
	companyId: number = parseInt(localStorage.getItem('companyId')!);
	isLogged: string = localStorage.getItem('isLogged')!;
	companyName: string = localStorage.getItem('CompanyName')!;

	constructor(
		private toastr: ToastrService,
		private companyService: CompanyserviceService
	) {}

	ngOnInit() {
		console.log('product', this.product);
		if (this.userId) this.getProductDetails();
	}

	uploadImage(files: FileList, index: number) {
		const imageFile = files[0];
		const reader = new FileReader();
		let rawImg;
		reader.onloadend = () => {
			rawImg = reader.result;
			this.products[index]['image'] = rawImg!.toString();
			console.log(rawImg);
		};
		reader.readAsDataURL(imageFile);
	}
	removePicture(index: number) {
		this.products[index]['image'] = '';
	}
	addProductField() {
		if (this.products[this.products.length - 1]['name'] == '') {
			this.toastr.error('Please add product name!');
			return;
		}
		this.products.push({
			id: 0,
			image: '',
			name: '',
			description: ''
		});
	}
	removeProductField(index: number) {
		this.products.splice(index, 1);
	}

	handleUpdateProductDetails() {
		if (!this.userId)
			if (this.products[this.products.length - 1]['name'] == '') {
				window.location.reload();
				return;
			}
		this.userId =  localStorage.getItem('userId')!;
		this.companyId = parseInt(localStorage.getItem('companyId')!);
		if (this.products[this.products.length - 1]['name'] == '') {
			this.toastr.error('Please add product name!');
			return;
		}
		ShowLoader();
		const model: ProductRequest = {
			id: this.companyId,
			cardId : this.cardId,
			userId: this.userId,
			products: this.products
		};
		this.companyService.updateProductDetails(model).subscribe((res) => {
			HideLoader();
			if (res.StatusCode == 1) {
				this.toastr.success(res.Message);
				this.updateTabName.emit();
				if (this.isLogged || this.companyName) {
					this.updateTabName.emit();
				} else {
					window.location.reload();
				}
			} else {
				this.toastr.error(res.Message);
			}
		});
	}

	getProductDetails() {
		if (this.product.length > 0) {
			this.products = [];
			for (let i of this.product) {
				const productOBJ = {
					id: i.Id,
					name: i.Name,
					description: i.Description,
					image:
						i.Image != null && i.Image != ''
							? environment.API_URL + i.Image
							: i.Image
				};
				this.products.push(productOBJ);
			}
		}
	}

	removeProductDetail(id: number) {
		ShowLoader();
		this.companyService.removeProductDetail(id).subscribe((res) => {
			HideLoader();
			if (res.StatusCode == 1) {
				this.toastr.success(res.Message);
				const objWithIdIndex = this.products.findIndex((obj) => obj.id === id);

				if (objWithIdIndex > -1) {
					this.products.splice(objWithIdIndex, 1);
				}
				// this.products.splice(this.products.indexOf(),1);
			} else {
				this.toastr.error(res.Message);
			}
		});
	}
}

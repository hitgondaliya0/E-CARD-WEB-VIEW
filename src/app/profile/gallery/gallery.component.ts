import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HideLoader, ShowLoader } from 'src/app/shared/show-hide-loader';
import { environment } from 'src/environments/environment';
import { CompanyserviceService } from 'src/service/companyservice.service';

@Component({
	selector: 'app-gallery',
	templateUrl: './gallery.component.html',
	styleUrls: ['../profile.component.css', './gallery.component.css']
})
export class GalleryComponent {
	API_URL: string = environment.API_URL;
	@Input() gallery: any = [];
	imageList: any = [];
	userId: string =  localStorage.getItem('userId')!;
	companyId: number = parseInt(localStorage.getItem('companyId')!);
	companyName: string = localStorage.getItem('CompanyName')!;
	cardId : number = 0 ;

	constructor(
		private toastr: ToastrService,
		private companyService: CompanyserviceService,
		private router: Router
	) {}

	ngOnInit() {
		if (this.userId) this.imageList = this.gallery;
		this.companyName = localStorage.getItem('CompanyName')!;
		console.log(this.userId);
	}

	uploadImage(files: FileList) {
		const totalfilesLength = files.length + this.imageList.length;
		if (totalfilesLength > 10) {
			this.toastr.warning('Maximum 10 pictures are allowed!');
			return;
		}
		for (let i = 0; i < files.length; i++) {
			const imageFile = files[i];
			const reader = new FileReader();
			let rawImg;
			reader.onloadend = () => {
				rawImg = reader.result;
				const imageObj = {
					Id: 0,
					ImagePath: rawImg!.toString()
				};
				this.imageList.push(imageObj);
			};
			reader.readAsDataURL(imageFile);
		}
	}

	deleteImage(index: number) {
		this.imageList.splice(index, 1);
	}

	UpdateGalleryImage() {
		if (!this.userId) {
			if (this.imageList.length == 0) {
				window.location.reload();
			}
		}
		this.userId =  localStorage.getItem('userId')!;
		this.companyId = parseInt(localStorage.getItem('companyId')!);
		this.companyName = localStorage.getItem('CompanyName')!;
		
		if (
			this.companyName === undefined ||
			this.companyName == '' ||
			this.companyName == null ||
			this.companyName == 'null'
		) {
			this.toastr.error('Please add all required details');
			return;
		}
		if (this.imageList.length == 0) {
			this.router.navigate(['/', this.companyName]);
			return;
		}
		const model = {
			Id: this.companyId,
			UserId: this.userId,
			cardId : this.cardId,
			GalleryImages: this.imageList
		};
		ShowLoader();
		this.companyService.updateGalleryDetails(model).subscribe((res) => {
			HideLoader();
			if (res.StatusCode == 1) {
				if (this.companyName && this.companyName != 'null' && this.userId) {
					this.toastr.success(res.Message);
					this.router.navigate(['/', this.companyName]);
				} else {
					this.toastr.error('Please add all required details');
					this.router.navigateByUrl('/');
				}
			} else {
				this.toastr.error(res.Message);
			}
		});
	}

	RemoveGalleryImage(id: string) {
		ShowLoader();
		this.companyService.removeGalleryImage(id).subscribe((res) => {
			HideLoader();
			if (res.StatusCode == 1) {
				this.imageList.splice(this.imageList.indexOf(id), 1);
				this.toastr.success(res.Message);
			} else {
				this.toastr.error(res.Message);
			}
		});
	}

	isCardUrlExist() {
		this.companyName = localStorage.getItem('CompanyName')!;
		if (
			this.companyName === undefined ||
			this.companyName == '' ||
			this.companyName == null ||
			this.companyName == 'null'
		) {
			return false;
		}
		return true;
	}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, AlertService } from 'src/app/services';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  productForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  birthDate: Date;
  urls = [];
  filesToUpload: Array<File> = [];
  currentFileUpload: File;
  private productValue: BehaviorSubject<Product>;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private productService: ProductService) { }

  ngOnInit(): void {

    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      companyName: ['', Validators.required],
      productType: ['', Validators.required],
      productSubType: ['', Validators.required],
      productDescription: ['', Validators.required],
      productImage: ['', Validators.required]
    });
  }

  get f() { return this.productForm.controls; }
  public get getProductObject(): Product {
    return this.productValue.value;
  }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.productForm.invalid) {
      return;
    }
    this.productValue = new BehaviorSubject<Product>(this.productForm.getRawValue());
    this.loading = true;
    var formData: any = new FormData();
    formData.append("productName", this.productForm.get('productName').value);
    formData.append("companyName", this.productForm.get('companyName').value);
    formData.append("productType", this.productForm.get('productType').value);
    formData.append("productSubType", this.productForm.get('productSubType').value);
    formData.append("productDescription", this.productForm.get('productDescription').value);

    const files: Array<File> = this.filesToUpload;

    for (let i = 0; i < files.length; i++) {
      formData.append("productImage", files[i], files[i]['productImage']);
    }
    console.log(formData);
    this.productService.addProduct(formData)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      this.filesToUpload = <Array<File>>event.target.files;
    }
  }
}
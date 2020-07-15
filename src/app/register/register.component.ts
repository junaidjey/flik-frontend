import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, AlertService } from '../services';
import { first } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  birthDate: Date;
  url = '';
  filesToUpload: File;
  private registrationValue: BehaviorSubject<User>;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      jobType: ['', Validators.required],
      profilePic : ['',],
      birthDate: ''
    });


    this.birthDate = new Date();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/registerstep2';
  }

  // convenience getter for easy access to form fields
  get f() { return this.registrationForm.controls; }
  public get getUserObject(): User {
    return this.registrationValue.value;
  }
  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.registrationForm.invalid) {
      return;
    }
    this.registrationValue = new BehaviorSubject<User>(this.registrationForm.getRawValue());
    this.loading = true;

    var formData: any = new FormData();
    formData.append("username", this.registrationForm.get('username').value);
    formData.append("firstName", this.registrationForm.get('firstName').value);
    formData.append("lastName", this.registrationForm.get('lastName').value);
    formData.append("email", this.registrationForm.get('email').value);
    formData.append("password", this.registrationForm.get('password').value);
    formData.append("phoneNumber", this.registrationForm.get('phoneNumber').value);
    formData.append("jobType", this.registrationForm.get('jobType').value);
    formData.append("birthDate", this.registrationForm.get('birthDate').value);

    const file: File = this.filesToUpload;

    formData.append("profilePic", file, file['profilePic']);

    this.authenticationService.registration(formData)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
          this.router.navigate(['/login']);
        });
  }


  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.filesToUpload = event.target.files[0];
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result as string;
      }
    }
  }
  public delete() {
    this.url = null;
  }
}
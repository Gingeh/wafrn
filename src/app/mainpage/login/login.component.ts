import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms'
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  captchaKey = environment.recaptchaPublic;
  loading = true;

  loginForm = new UntypedFormGroup({
    email:  new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [Validators.required]),
    captchaResponse:  new UntypedFormControl('', [])
  });



  constructor(
    private loginService: LoginService,
    private messages: MessageService,
    private router: Router,
    private recaptchaV3Service: ReCaptchaV3Service


  ) { }

  ngOnInit(): void {
    if(this.loginService.checkUserLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.loading = false;
    }
  }

  async onSubmit(){
    this.loading = true;
    this.loginForm.controls['captchaResponse'].patchValue(await this.recaptchaV3Service.execute('importantAction').toPromise());
    try {
      let login = await this.loginService.logIn(this.loginForm);
      if(!login) {
        this.messages.add({severity:'warn', summary:'Login failed', detail:'Check email, password, or if you recived the activation email!'});
      }
    } catch (exception) {
      console.log(exception);
      this.messages.add({severity:'error', summary:'Something failed!', detail:'Something has failed. Check your internet connection or try again later'});

    }
    this.loading = false;
  }

}

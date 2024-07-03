import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private storage: Storage) { 
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&/])[A-Za-z\d@$!%*?&/]{8,}$/)])]
    });
  }

  submit() {
    if (this.loginForm.valid) {
      const emailField = this.loginForm.value.email;
      const passwordField = this.loginForm.value.password;

      const formData = new FormData();
      formData.append('emailField', emailField);
      formData.append('passwordField', passwordField);

      const username = 'u21487279';
      const password = 'Fum5#Acts#huey';
      const credentials = btoa(`${username}:${password}`); // Encode the credentials

      const headers = new HttpHeaders({
        'Authorization': `Basic ${credentials}`
      });
      this.storage.create(); //create storage database to store api key :)
      this.http.post('https://wheatley.cs.up.ac.za/u21487279/validate-login.php', formData, { headers })
      // this.http.post('/u21487279/u21487279/validate-login.php', formData, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        })
      )
      .subscribe((response: any) => {
        if (response.success) {
          this.storage.set('api_key', response.apiKey);//STORES APIKEY !!!
          console.log('API Key stored:', response.apiKey);
          this.router.navigate(['/home']);
        } else { 
          console.error(response.error);
          alert('Password is incorrect. Please retry.');
        }
      });
    } else {
      //any errors ? :
      if (this.loginForm.controls['email'].invalid) {
        alert('Please enter a valid email address');
      } else if (this.loginForm.controls['password'].invalid) {
        alert('Please enter a valid password');
      }
    }
  }
  

  ngOnInit() {
  }

}

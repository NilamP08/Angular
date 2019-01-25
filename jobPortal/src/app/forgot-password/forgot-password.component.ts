import { CandidatesService } from './../candidates.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private s: CandidatesService,
    private t: ToastrService,
    private r: Router) { }
  forgotPasswordForm: FormGroup;

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
      
    })
  }

  sendMail() {

    this.s.sendMail(this.forgotPasswordForm.value).subscribe((res: any) => {
      if (res.status == false) {
        this.t.success('Sucessful Accept Request for reset password');       
        console.log("Email match and sending request for mail") ;
      } else {
        this.t.error('Email not match');       
        console.log("email not present in database");
      }
    });
  }



}

import { CandidatesService } from './../candidates.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  public email: string;
  public password: string;

  constructor(private fb: FormBuilder,
    private s: CandidatesService,
    private t: ToastrService,
    private r: Router,
    private Router: ActivatedRoute) { }
  resetForm: FormGroup;

  ngOnInit() {
    this.resetForm = this.fb.group({
      password: ['', Validators.required]
    }),
      this.Router.params.subscribe(params => {
        this.email = params['email'];
        console.log(this.email);
      })
  }

  changePassword() {
    this.password = this.resetForm.get('password').value;

    this.s.changePassword(this.email, this.password).subscribe((res: any) => {
      if (res.status == false) {

        this.t.success('Sucessfully Update Password');
        this.r.navigateByUrl('home/login');
      } else {
        this.t.error('Invalid Email');
        this.r.navigateByUrl('resetPassword');
      }

    });


  }

}

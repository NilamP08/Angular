import { AuthGuard } from './../auth.guard';
import { Component, OnInit } from '@angular/core';
import { CandidatesService } from './../candidates.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import{ToastrService } from 'ngx-toastr';
import{Router} from'@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 

  constructor(private fb: FormBuilder,
     private s: CandidatesService,
     private t:ToastrService,
     private r:Router,
     private a:AuthGuard) { }

  loginForm: FormGroup;

  ngOnInit() {

    this.loginForm=this.fb.group({
      username:['',[Validators.required,, Validators.pattern('^[a-z]*$')]],
      password:['',Validators.required ]
    })
  }

  addLogin(){
    //console.log(this.userForm.value);
    this.s.addLogin(this.loginForm.value).subscribe((res:any)=> { 
      console.log(res.status);
      if(res.status==false){       
    this.t.success('Sucessfully Login');
    this.r.navigateByUrl('dashboard');
    this.s.setLoggedIn(true);
    }else{
      this.t.error('Not valid username and Password');
      this.r.navigateByUrl('home/login');
        }
      })
  }

  cancel(){
    this.r.navigateByUrl('login');
  }



}

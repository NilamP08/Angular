import { CandidatesService } from './../candidates.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './password.validation';
import { State } from '../state';
import { Candidate } from '../candidate';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  states: State[];
  candidates: Candidate[];

  constructor(private fb: FormBuilder,
    private s: CandidatesService) { }
  userForm: FormGroup;




  ngOnInit() {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      hobby: [''],
      phoneNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern('^[a-z]*$')]]

    }, {
        validator: [MustMatch('password', 'confirmPassword'), this.uservalidate('username'), this.emailvadidate('email')]
      })

    this.List();
    this.Listcandidate();
  }

  List() {
    this.s.getList().subscribe((data: any) => {
    this.states = data.docs;
      console.log(data);


    });
  }


  Listcandidate() {
    this.s.getListcandidate().subscribe((data: any) => {
    this.candidates = data.docs;
      console.log(data);
      for (let val of this.candidates) {
        console.log(val);
      }
      //console.log(data.docs[0].username);    
      //console.log(this.candidates[0].username);    


    });
  }

  uservalidate(userName: string) {
    return (formGroup: FormGroup) => {
      const matchingControl = formGroup.controls[userName];
      var flag;
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      for (let entry of this.candidates) {
        console.log(entry.username + '==' + matchingControl.value)

        if (entry.username === matchingControl.value) {
          flag = 1;
          break;
        } else {
          flag = 0;
        }
      }
      if (flag === 1) {
        matchingControl.setErrors({ uservalid: true });
      }
      else {
        matchingControl.setErrors(null);
      }
    }
  }


  emailvadidate(email: string) {
    return (formGroup: FormGroup) => {
      const matchingControl = formGroup.controls[email];
      var flag;
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      for (let entry of this.candidates) {
        console.log(entry.email + '==' + matchingControl.value)

        if (entry.email === matchingControl.value) {
          flag = 1;
          break;
        } else {
          flag = 0;
        }
      }
      if (flag === 1) {
        matchingControl.setErrors({ emailvalid: true });
      }
      else {
        matchingControl.setErrors(null);
      }
    }
  }
  
  onClick() {
    console.log(this.userForm.value);
    this.s.add(this.userForm.value);
  }

}

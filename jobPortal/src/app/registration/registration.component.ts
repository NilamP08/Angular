//import { Routes } from '@angular/router';
import { CandidatesService } from './../candidates.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder,FormArray,FormControl, Validators } from '@angular/forms';
import { MustMatch } from './password.validation';
import { State } from '../state';
import { Candidate } from '../candidate';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import{map} from'rxjs/operators';



class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  constructor(public src: string, public file: File) { }
}



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  hobby= [
    { id: 1, genre: 'Cricket' },
    { id: 2, genre: 'Singing' },
    { id: 3, genre: 'Dancing' },
    { id: 4, genre: 'Acting' }
];




  selectedFile: ImageSnippet;

  states: State[];
  candidates: Candidate[];
  userForm: FormGroup;
  public path;
  public imageinput;

  constructor(private fb: FormBuilder,
    private s: CandidatesService,
    private t: ToastrService,
    private r: Router) {

      const formControls = this.hobby.map(control => new FormControl(false));
     }

  ngOnInit() {
    const formControls = this.hobby.map(control => new FormControl(false));

    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      hobby: new FormArray(formControls),
      phoneNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', [Validators.required,  Validators.pattern('^[0-9]*$'),Validators.minLength(6), Validators.maxLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern('^[a-z]*$')]],
      pic: ['', Validators.required]

    }, {
        validator: MustMatch('password', 'confirmPassword')
      })
    this.List();
  }

  List(){
    this.s.getList().subscribe((data: any) => {
      this.states = data.docs;
      console.log(data);
    });
  }
  
  Listcandidate(){
    this.s.getListcandidate().subscribe((data: any) => {
    this.candidates = data.docs;
      console.log(this.candidates);     
      //console.log(data.docs[0].username);    
      //console.log(this.candidates[0].username);    
    });
  }


  processFile(imageInput :any){
    //this.Image = imageInput;  
    const file : File = imageInput.files[0];
    const reader = new FileReader();
      reader.addEventListener('load',(event : any)=>{
   
     this.selectedFile = new ImageSnippet(event.target.result,file)
     this.s.uploadImage(this.selectedFile.file).subscribe(
       (res:any) => {

       // this.Path = res.status;
        if(res.status == true){
          this.t.success(res.message);
        }
        if(res.status == false){
          this.t.error(res.err)
        }
     
       },
       (err) => {
         console.log(err);
      
       })     
    });
    reader.readAsDataURL(file);
   
 } 


  add() {
    console.log(this.userForm.value);
    console.log(this.userForm.get('pic').value);

/////check box
    const selectedPreferences = this.userForm.value.hobby
    .map((checked, index) => checked ? this.hobby[index].genre : null);    
    this.userForm.controls['hobby'].patchValue(selectedPreferences);
    console.log(this.userForm.value);

//////////add other data
    this.s.add(this.userForm.value).subscribe((res: any) => {
      console.log("******",res);
      if (res.status == false) {
        this.t.error('Sorry..!! Email alredy in use');
        this.r.navigateByUrl('home/registration');
      } else if (res.status ==true) {
        this.t.error('Sorry..!! Username alredy in use');
        this.r.navigateByUrl('home/registration');
      } else {


        this.t.success('Sucessfully Registration done!');
        this.r.navigateByUrl('home/login');

      }
    })

      ///////////////
     
   
  }


  cancel() {
    this.r.navigateByUrl('home/registration');
  }


}

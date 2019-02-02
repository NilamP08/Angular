import { CandidatesService } from "./../candidates.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
  FormBuilder,
  FormArray,
  FormControl,
  Validators
} from "@angular/forms";
import { MustMatch } from "./password.validation";
import { State } from "../state";
import { Candidate } from "../candidate";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

class ImageSnippet {
  pending: boolean = false;
  status: string = "init";
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"]
})
export class UpdateComponent implements OnInit {
  selectedFile: ImageSnippet;

  hobby = [
    { id: 1, genre: "Cricket" },
    { id: 2, genre: "Singing" },
    { id: 3, genre: "Dancing" },
    { id: 4, genre: "Acting" }
  ];

  token;
  states: State[];
  candidates: Candidate[];
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private s: CandidatesService,
    private t: ToastrService,
    private r: Router
  ) {
    const formControls = this.hobby.map(control => new FormControl(false));
  }

  ngOnInit() {
    this.token = this.s.getToken();
    console.log(this.token);
    //const formControls = this.hobby.map(control => new FormControl(false));

    this.userForm = this.fb.group(
      {
        firstname: ["", Validators.required],
        lastname: ["", Validators.required],
        birthdate: ["", Validators.required],
        gender: ["", Validators.required],
        // hobby: new FormArray(formControls),
        phoneNo: [
          "",
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10)
          ]
        ],
        address: [""],
        city: ["", Validators.required],
        state: ["", Validators.required],
        zipcode: [
          "",
          [
            Validators.required,
            Validators.pattern("^[0-9]*$"),
            Validators.minLength(6),
            Validators.maxLength(6)
          ]
        ],
        email: ["", [Validators.required, Validators.email]],
        password: [
          "",
          [
            Validators.required,
            Validators.pattern(
              "^(?=.*[a-z])(?=.*[A-Z])(?=.*)(?=.*[#$^+=!*()@%&]).{4,8}$"
            ),
            Validators.minLength(3),
            Validators.maxLength(8)
          ]
        ],
        confirmPassword: ["", Validators.required],
        // username: ['', [Validators.required, Validators.pattern('^[a-z]*$')]],
        token: this.s.getToken()
        //pic: ['', Validators.required]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
    this.List();

    this.s.showinfo(this.token).subscribe((res: any) => {
      console.log("update original info:", res.user);
    });





  }

  processFile(imageInput: any) {
    //this.Image = imageInput;
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.s.uploadImage(this.selectedFile.file).subscribe(
        (res: any) => {
          // this.Path = res.status;
          if (res.status == true) {
            this.t.success(res.message);
          }
          if (res.status == false) {
            this.t.error(res.err);
          }
        },
        err => {
          console.log(err);
        }
      );
    });
    reader.readAsDataURL(file);
  }

  List() {
    this.s.getList().subscribe((data: any) => {
      this.states = data.docs;
      console.log(data);
    });
  }

  update() {
    console.log(this.userForm.value);
    //////////add other data
    this.s.update(this.userForm.value).subscribe((res: any) => {
      console.log("******", res);
      console.log(res.user);
      if (res.status == true) {
        this.t.success("Data Updated sucessfully");
        this.r.navigateByUrl("/dashboard");
        //this.r.navigateByUrl('home/login');
      } else {
        this.t.error("something wents wrong !!! Sorry");
        this.r.navigateByUrl("home/login");
      }
    });
  }
}

import { AuthGuard } from "./../auth.guard";
import { Component, OnInit } from "@angular/core";
import { CandidatesService } from "./../candidates.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private s: CandidatesService,
    private t: ToastrService,
    private r: Router,
    private a: AuthGuard
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.pattern("^[a-z]*$")]],
      password: ["", Validators.required]
    });
    if (this.s.isLoggednIn()) {
      this.r.navigate(["dashboard"]);
    }
  }

  addLogin() {
    //console.log(this.userForm.value);
    this.s.addLogin(this.loginForm.value).subscribe((res: any) => {
      console.log(res);
      if (this.loginForm.valid) {
        this.s.sendToken(res.token);
        console.log(res.token);
        //this.s.sendUser(res.username);
        //console.log(res.username);
      }

      if (res.status == true) {
        console.log(res.token);
        //console.log(res.alldata);
        this.r.navigate(["dashboard"]);
        this.t.success("Sucessfully Login");
      } else if (res.status == false) {
        this.t.error("Not valid username and Password");
        this.r.navigateByUrl("home/login");
      }
    });
  }

  cancel() {
    this.r.navigateByUrl("home/login");
  }
}

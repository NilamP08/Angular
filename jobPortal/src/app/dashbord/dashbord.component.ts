import { Component, OnInit } from '@angular/core';
import { CandidatesService } from './../candidates.service';
import { AuthGuard } from './../auth.guard';
import{ToastrService } from 'ngx-toastr';
import{Router} from'@angular/router';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor( private s: CandidatesService,
    private a:AuthGuard,
    private r:Router,
    private t:ToastrService) { }

  ngOnInit() {
  }
  checkm(){

    console.log("inside check()");
    this.r.navigateByUrl('/');
    this.s.setLoggedIn(true);  
    this.t.success('You are alredy Loged in !!');
    
  }


}

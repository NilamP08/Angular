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

  

  info;
  
  token;
  username;

  constructor( private s: CandidatesService,
    private a:AuthGuard,
    private r:Router,
    private t:ToastrService) { }

  ngOnInit() {  
    this.token=this.s.getToken();
   // this.username=this.s.getUser();
    console.log(this.token);   
    
    this.s.showinfo(this.token).subscribe((res:any)=> { 
      this.info=res.user;
      
       // console.log(res.user.username);
      console.log(res.user);
      console.log(this.info);
    });   
    
  }
  checkm(){
    console.log("inside check()");     
    this.t.success('You are alredy Loged in !!');    
  }

  updatecheck(){
    this.r.navigateByUrl('update');
    //this.t.success('Request Accepted for update !!');   

  }
  logout(){
    this.s.logout();
    this.r.navigateByUrl('home/login');
  }


}

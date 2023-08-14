import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { HimsServiceService } from './hims-service.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'; 
const helper=new JwtHelperService()

@Injectable({
  providedIn: 'root'
})
export class AuthService {
token:any
decode:any
userdata:any

  constructor(private http:HttpClient,private service:HimsServiceService,private router:Router) { 


  }
 
  
  public isExpired():boolean
  {
    debugger
   
   this.token=  localStorage.getItem('token');
   var dt=helper.getTokenExpirationDate(this.token);
   var c=helper.isTokenExpired(this.token)
   this.decode=helper.decodeToken<any>(this.token);
  
   return !!c
  }
  
  public isLoggedIn()
  {
    
    
   return !!localStorage.getItem('token');
  }

  
  public LoggedIn(user:any)
{
 // debugger;
 
 return  this.http.post<any>(this.service.Serverbaseurl+'api/Account/Login',user)
  .subscribe((result)=>{
 //debugger;
 if(result!=null)
 {
  this.userdata=result
let data=result; 
localStorage.setItem('token',data.token)
localStorage.setItem('organizationId',data.organization_Id)
localStorage.setItem('facility',data.facility_Name)
localStorage.setItem('organization',data.organization_Name)
localStorage.setItem('facilityId',data.facility_Id)

  
localStorage.setItem('name',data.user_Name)




this.decode=null;
this.decode=helper.decodeToken<any>(data.token);
localStorage.setItem('role',this.decode.role)
//let a:any
//var pathdata=this.service.GetPathList().subscribe((result : any)=>(a=result));;
debugger
if(this.decode.role=='Front Desk')
{
  this.router.navigateByUrl('/FrontDesk/OPD');
}else
if(this.decode.role=='Admin')
{
  
  //debugger
  this.router.navigateByUrl('/Admin/Add-User');
}
 }

},
  error=> {
    debugger
  // catch 4xx error here and do whatever you want to do with it. Below log code 
  // won't show it in red color though.
  // Write your code here to notify the user about error.
  localStorage.removeItem('token')
  // alert(error.message);
  Swal.fire('Invalid Credentials',error);
}
);
}
public getRole()
{
 return localStorage.getItem('role');
}
  public LoggedOut()
  {
    localStorage.removeItem('token');
    localStorage.clear();
  }


}

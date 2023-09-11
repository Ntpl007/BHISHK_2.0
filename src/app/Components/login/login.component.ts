import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Shared/auth.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HimsServiceService } from 'src/app/Shared/hims-service.service';
import { DialogcommunicationService } from 'src/app/Shared/dialogcommunication.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const helper=new JwtHelperService()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../../css/style.css'],
})
export class LoginComponent implements OnInit {
  loginForm:any
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds=3
  token:any
  decode:any
  userdata:any
 //declarations-----------------------------------------
 username:any;
 password:any;
 //---------------------------------------------------
 constructor(private service:AuthService,private _snackBar: MatSnackBar,
  private http:HttpClient,private service2:HimsServiceService,private router:Router,
    private dialog:MatDialog,private dialogService:DialogcommunicationService,
    private formbuilder:FormBuilder) {
      this.loginForm=this.formbuilder.group({

      })
     }
 
 //#region 
  Reset()
  {
    this.loginForm=this.formbuilder.group({
      UserName:['',[Validators.required]],
      Password:['',[Validators.required]]
    })
  }


 validateallformfields(formgroup:FormGroup)
 {
   debugger
  Object.keys(formgroup.controls).forEach(fields=>{
 const control=formgroup.get(fields)
 if(control instanceof FormControl)
 {
   control.markAsTouched({onlySelf:true})
 }else if(control instanceof FormGroup)
 {
   this.validateallformfields(control)
 }
 })
 }

Login(user:any)
{
 // this.service.openDialog();
 if (navigator.onLine) {
  debugger
 if(this.loginForm.invalid)
 {
  this.validateallformfields(this.loginForm)
 // this.service.closeAllDialogs()
 }else{

  this.service.LoggedIn(user) .subscribe((result)=>{
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
   
 //this.service.closeAllDialogs();
   },
   
   
   
     error=> {
       debugger
       if (error.status === 401) {
        this.router.navigate(['/login']);
        this._snackBar.open('Username or Password is invalid ','close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
     //   this.service.closeAllDialogs()
      

      }
      if (error.status === 0) {
        debugger
        this.router.navigate(['/login']);
        this._snackBar.open('Please check your Network Connection','close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
      
      }
     // this.service.closeAllDialogs()
      throw error;
       
     // catch 4xx error here and do whatever you want to do with it. Below log code 
     // won't show it in red color though.
     // Write your code here to notify the user about error. 
     
   }
   );
 }
} else {
  this._snackBar.open('Please check your Network connection','close', {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    duration: this.durationInSeconds * 1000,
  });
  if(this.loginForm.invalid)
 {
  this.validateallformfields(this.loginForm)
 // this.service.closeAllDialogs()
 }
}
 

}
//#endregion
 ngOnInit(): void {
 this.Reset();
 }

}

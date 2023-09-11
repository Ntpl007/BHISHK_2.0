import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { HimsServiceService } from './hims-service.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'; 
import { LoadingPopupComponent } from '../Components/PopUps/loading-popup/loading-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogcommunicationService } from './dialogcommunication.service';
const helper=new JwtHelperService()

@Injectable({
  providedIn: 'root'
})
export class AuthService {
token:any
decode:any
userdata:any

  constructor(private http:HttpClient,private service:HimsServiceService,private router:Router,
    private dialog:MatDialog,private dialogService:DialogcommunicationService,) { 


  }
 
  
  public isExpired():boolean
  {
    
   
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

  

  closeAllDialogs(): void {
    this.dialogService.closeAll();
  }

  openDialog(): void {
    this.dialogService.open(LoadingPopupComponent, {
      width: '150px', // Adjust the width as needed
     
     data:"Logging in....."
    });
  }
  public LoggedIn(user:any)
{
 // debugger;
 
 return  this.http.post<any>(this.service.Serverbaseurl+'api/Account/Login',user)
 
this.closeAllDialogs();
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

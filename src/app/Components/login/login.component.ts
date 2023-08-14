import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../../css/style.css']
})
export class LoginComponent implements OnInit {

 //declarations-----------------------------------------
 username:any;
 password:any;
 //---------------------------------------------------
 constructor(private service:AuthService) { }
 
 //#region 
Login(user:any)
{
 
 this.service.LoggedIn(user)


}
//#endregion
 ngOnInit(): void {
 }

}

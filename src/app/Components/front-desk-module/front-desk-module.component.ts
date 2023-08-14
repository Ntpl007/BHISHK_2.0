import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Shared/auth.service';
import Swal from 'sweetalert2';
export let browserRefresh = false;
@Component({
  selector: 'app-front-desk-module',
  templateUrl: './front-desk-module.component.html',
  styleUrls: ['./front-desk-module.component.css',"../../../css/style.css","../../../css/bootstrap.min.css"
  ,"../../../css/responsive.bootstrap4.min.css","../../../css/buttons.bootstrap4.min.css" ,
  "../../../css/dataTables.bootstrap4.min.css","../../../css/metisMenu.min.css"]
})
export class FrontDeskModuleComponent implements OnInit {

  name:any
  header:any
  now:any
  styled=""
  namei = 'Angular 14';
    facility: any;
    organization: any;
    myscriptelement:HTMLScriptElement;
    
    my2scriptelement:HTMLScriptElement | undefined
    
   // subscription: Subscription;
    constructor(private router:Router,private authservice:AuthService) {
    //  this.my2scriptelement=document.createElement('script');
   //   this.my2scriptelement.src='../../../assets//js/m.js';
    this.myscriptelement=document.createElement('script');
    this.myscriptelement.src='../../../assets//js/myapp.js';
    
   document.body.appendChild(this.myscriptelement)
   //document.body.appendChild(this.my2scriptelement)
       setInterval(() => {
       this.now = Date.now();
       this.header=localStorage.getItem('header')
  
     }, 1);
    //   this.subscription = router.events.subscribe((event) => {
    //     debugger
    //     if (event instanceof NavigationStart) {
    //       browserRefresh = router.navigated;
    //     }
    // });
     }
  bodyclass:any=""
  bodydivclass:any="main-content"
  date=new Date()
  datenow:any
  styles=""
    navButton()
    {
      if(this.bodyclass=="")
      {
        this.bodyclass="enlarge-menu"
        this.bodydivclass="main-content nav-closed"
        
  
      }else{
        this.bodyclass=""
        this.bodydivclass="main-content"
      }
  
    }
  
     getusername()
     {
      this.name=localStorage.getItem('name');
     }
     isselected:any=""
     isactive:any="active-menu"
     down:any="mdi mdi-chevron-down"
     isdisplay:any="display:none;"
     public sidenav()
     {
      
      if(this.isselected=="")
      {
        this.isselected="selected"
        this.isactive="active-menu"
        this.down="mdi mdi-chevron-down mdi-flip-v"
       this.styles="display: block"
        
     this.styled="style2"
      }
      else{
        this.styles="display: none"
     this.isselected=""
     this.isactive=""
     this.down="mdi mdi-chevron-down"
     
     
     this.styled="style1"
  
      }
  
  
     }
     displaydate()
    {
      let m=null;
      let d=null;
  
      if(this.date.getMonth().toString().length==1)
      {
         m="0"+this.date.getMonth()
      } else m=this.date.getMonth()
      if(this.date.getDate().toString().length==1)
      {
         d="0"+this.date.getDate()
      } else d=this.date.getDate()
      this.datenow=d+"-"+m+"-"+this.date.getFullYear();
    }
  
    
  
    Logout()
    {
     
      Swal.fire(
        {
          title:'Log out?',
          text:'Are you sure?',
          icon:'warning',
          showCancelButton:true,
          cancelButtonText:'Cancel',
          confirmButtonText:'Log out'
          
        }
      ).then((result=>{
        if(result.value)
        {
          //Swal.fire('Logged out','Logged out successfuly','success')
          localStorage.removeItem('token');
          localStorage.removeItem('name');
          this.router.navigateByUrl('/')
          
        }
        // else{
        //   Swal.fire('Cancelled',':)','error')
          
        // }
      }))
    }
    open:any=""
  fun()
  {
    if(this.open==""){
  
      this.open="open"
    }else 
    this.open=""
  }
    ngOnInit(): void {
           
      this.facility=localStorage.getItem('facility')
      this.organization=localStorage.getItem('organization')
      this.displaydate();
    this.getusername();
  
    }
  
  }
  
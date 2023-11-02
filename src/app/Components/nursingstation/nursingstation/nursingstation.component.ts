import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nursingstation',
  templateUrl: './nursingstation.component.html',
  styleUrls: ['./nursingstation.component.css']
})
export class NursingstationComponent implements OnInit {

  name:any
  header:any
  now:any
  styled=""
  namei = 'Angular 14';
  facility:any
  organization:any
  myscriptelement?:HTMLScriptElement
    constructor(private router:Router,private authservice:AuthService) {
      
   this.myscriptelement=document.createElement('script');
   this.myscriptelement.src='../../../assets//js/myapp.js';
   document.body.appendChild(this.myscriptelement)


       setInterval(() => {
       this.now = Date.now();
       this.header=localStorage.getItem('header')
  
      }, 1);
    
     }
  bodyclass:any=""
  bodydivclass:any="main-content"
  date=new Date()
  datenow:any
  styles=""
  bntStyle:any
  style(){
    this.bntStyle="sidebar-navigation ul li a"
  }
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

      let d=new Date();
      this.datenow=formatDate(d,'dd-MM-yyyy','en-U')
      
     // this.datenow=d+"-"+m+"-"+this.date.getFullYear();
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
      debugger
      localStorage.setItem('header','Home')
      this.name=localStorage.getItem('name')
      this.facility=localStorage.getItem('facility')
      this.organization=localStorage.getItem('organization')
    
      this.displaydate();


   
  
    }
  
  }
  

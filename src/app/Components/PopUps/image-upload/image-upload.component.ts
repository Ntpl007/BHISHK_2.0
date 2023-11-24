import { Component, OnInit, Input } from '@angular/core';
import { event } from 'jquery';
import Swal from 'sweetalert2';
import { read } from 'xlsx';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
// class imageSnippt{
//   constructor(public src: string, public file: File){}
// }
export class ImageUploadComponent implements OnInit {
  src?:string = '';
  file : any;
  
  constructor() { }

  ngOnInit(): void {
    debugger;
    if(localStorage.getItem('imagepath')!='')
    {
      let imagestring = localStorage.getItem('imagepath')?.toString();
      imagestring = imagestring?.substring(0, imagestring.length-1);
      // let imagestring = localStorage.getItem('imagepath');
      // imagestring = imagestring.substring(0, imagestring.length - 1);
      this.src =   imagestring;
    } 
  }
  
  processFile(imageInput: any)
  {
    debugger;
    const file:File = imageInput.files[0];
    const reader = new FileReader();
    if(file.type == "image/jpeg" || file.type == "image/png")
    {
      let img = new Image()
      img.src = window.URL.createObjectURL(imageInput.files[0])
      img.onload = () => {
        if(img.width === 198 && img.height === 58)
        {
          reader.addEventListener('load',(event) =>{
            debugger;
            this.src = event.target?.result?.toString();
            this.file = file;
          });
          reader.readAsDataURL(file);
        } 
        else 
        {
            Swal.fire(`Sorry, this image doesn't look like the size we wanted. It's 
            ${img.width} x ${img.height} but we require 198 x 58 size image.`,'','info');
            (<HTMLInputElement>document.getElementById('idimage')).value = '';
            (<HTMLInputElement>document.getElementById('image_src')).style.backgroundImage = '';
        }                
      }
    }
    else
    {
      Swal.fire('Please select Image files only','','info');
      (<HTMLInputElement>document.getElementById('idimage')).value = '';
      (<HTMLInputElement>document.getElementById('image_src')).style.backgroundImage = '';
    }
    
  }
}

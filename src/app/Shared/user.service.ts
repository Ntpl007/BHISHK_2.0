import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

   private UserName= localStorage.getItem('name');
  
   private OrganizationName=localStorage.getItem('organization');
  
   private FacilityName=localStorage.getItem('facility');
  
   private OrganizationId=localStorage.getItem('organizationId');
  
   private FacilityId=localStorage.getItem('facilityId');

  // setUserName(value: string) {
  //   this.UserName = value;
  // }
  
  // setOrganizationName(value: string) {
  //   this.OrganizationName = value;
  // }
  
  // setFacilityName(value: string) {
  //   this.FacilityName = value;
  // }
  
  // setOrganizationId(value: number) {
  //   this.OrganizationId = value;
  // }
  
  // setFacilityId(value: number) {
  //   this.FacilityId = value;
  // }

  getUserName(): any {
    return this.UserName;
  }

  getOrganizationName(): any {
    return this.OrganizationName;
  }

  
  getFacilityName(): any {
    return this.FacilityName;
  }

  
  getOrganizationId(): any {
    return this.OrganizationId;
  }

  
  getFacilityId(): any {
    return this.FacilityId;
  }

  

}

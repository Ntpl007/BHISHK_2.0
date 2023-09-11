import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nationality } from '../Model/Nationality';
import { Occupation } from '../Model/Occupation';
import { Religion } from '../Model/Religion';
import { Doctors } from '../Model/Doctors';
import { RefDoctor } from '../Model/RefDoctor';
import { Corporate } from '../Model/Corporate';
import { Speciality } from '../Model/Speciality';
import { PatientRelation } from '../Model/PatientRelation';
import { Area } from '../Model/Area';
import { Roles } from '../Model/Roles';
import { Fecility } from '../Model/Fecility';
import { Organization } from '../Model/Organization';
import { AuthService } from './auth.service';
import { TotalFacilities } from '../Model/TotalFacilities';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class HimsServiceService {

  constructor(private http:HttpClient) { }
//base url's


 // readonly Serverbaseurl="https://localhost:44385/";  //With microservice ocelot api gateway +webapi core
 //readonly Serverbaseurl="https://localhost:44336/";    //With webapi core 
 //readonly Serverbaseurl="https://10.10.20.25/HIMS_WebAPI/";
 //readonly Serverbaseurl="http://10.10.20.25:88/"
 readonly Serverbaseurl2="https://localhost:44336/";  
 readonly Serverbaseurl="http://10.10.20.25:81/"
 
readonly securityBaseUrl="http://10.10.20.25:84/";
 //readonly securityBaseUrl="https://localhost:44335/";
 
 //readonly abdmBaseUrl="http://10.10.20.25:83/"  // api url
 
 readonly abdmBaseUrl2="http://10.10.20.25:81/"  //ocelot url


 readonly abdmBaseUrl="https://localhost:44323/" //device
//------------------
  

public GetDoctorbyspeciality(id:any) : Observable<any> {
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetDoctorsByspaciality?Id='+id);
}

public GetSchedulartypes() : Observable<RefDoctor[]> {
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetScheduleTypes');
}

  public getDoctors() : Observable<Doctors[]> {
    return this.http.get<Doctors[]>(this.Serverbaseurl+'FetchMasterData/GetDoctor');
  }

    public getReligion() : Observable<Religion[]> {
      return this.http.get<Religion[]>(this.Serverbaseurl+'FetchMasterData/GetReligion');
    
}

public GetOccupation() : Observable<Occupation[]> {
  return this.http.get<Occupation[]>(this.Serverbaseurl+'FetchMasterData/GetOccupation');
}

public GetChargeGroups(Id:any):Observable<any>{
  return this.http.get<Occupation[]>(this.Serverbaseurl+'FetchMasterData/GetChargeGroups?Id='+Id);
}


public getNationality() : Observable<Nationality[]> {
  return this.http.get<Nationality[]>(this.Serverbaseurl+'FetchMasterData/GetNationality');
}


public getArea() : Observable<Area[]> {
  return this.http.get<Area[]>(this.Serverbaseurl+'FetchMasterData/GetArea');
}

public GetRefDoctor() : Observable<RefDoctor[]> {
  return this.http.get<RefDoctor[]>(this.Serverbaseurl+'FetchMasterData/GetRefDoctors');
}


public GetRefDoctorbyspeciality(id:any) : Observable<RefDoctor[]> {
  return this.http.get<RefDoctor[]>(this.Serverbaseurl+'FetchMasterData/GetRefDoctorsbySpeciality?Id='+id);
}

public getCorporate(Id:any) : Observable<Corporate[]> {
  return this.http.get<Corporate[]>(this.Serverbaseurl+'FetchMasterData/GetCorporate?Id='+Id);
}


public getSpeciality() : Observable<Speciality[]> {
  return this.http.get<Speciality[]>(this.Serverbaseurl+'FetchMasterData/GetSpeciality');
}

public getPatientRelation() : Observable<PatientRelation[]> {
  return this.http.get<PatientRelation[]>(this.Serverbaseurl+'FetchMasterData/GetPatientRelation');
}


public GetChargeItems(Id:any) : Observable<any> {
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetChargeItems?Id='+Id);
}

public GetRoles() : Observable<Roles[]> {
  return this.http.get<Roles[]>(this.Serverbaseurl+'FetchMasterData/GetRoles');
}


public SearchPatients(Dates:any) : Observable<any> {
  debugger
  
  return this.http.post<any>(this.Serverbaseurl+'api/Home/SearchPatients',Dates);
}

public SearchPatientstbytoday() : Observable<any> {
  debugger
  
  return this.http.get<any>(this.Serverbaseurl+'api/Home/GetSearchPatientToday');
}


public GetStates() : Observable<any> {
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetStates');
}


public GetUsers(organizationName:any) : Observable<any> {
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetUserList?organization='+organizationName);
}


public GetDistricts(Id:any) : Observable<any> {
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetDistricts?Id='+Id);
}
public checkAadhaarValid(aadhaar:any):Observable<any>
{
  debugger
   return this.http.get<any>(this.Serverbaseurl+ 'api/Home/CheckAadhaarValid?Aadhaar='+aadhaar)
}
public GetFecility(id:any) : Observable<Fecility[]> {
  debugger
  return this.http.get<Fecility[]>(this.Serverbaseurl+'FetchMasterData/GetFecility?id='+id);
}

public GetOrganization() : Observable<Organization[]> {
  return this.http.get<Organization[]>(this.Serverbaseurl+'FetchMasterData/GetOrganizations');
}
public SaveUser(User:any) : Observable<any> {
  User.CreatedBy=localStorage.getItem('name')
  debugger
  return this.http.post<any>(this.Serverbaseurl+'api/Account/Register',User);
}

public GetabhaStatus(obj:any)
{
 return this.http.get<any>(this.Serverbaseurl+'api/M1_2/LoginSearchByHealthID?healthID='+obj.healthID)
}
public GetPathList()
{
  debugger
  var Role =localStorage.getItem('role');
 var d= this.http.get(this.Serverbaseurl+"api/Account/GetPathList?Role="+Role)
 return d;
}
public GetTotalFecilities() : Observable<TotalFacilities[]> {
  return this.http.get<TotalFacilities[]>(this.Serverbaseurl+'FetchMasterData/GetTotalFecility');
}


public SaveAppointments(Data:any):Observable<any>
{ return this.http.post<any>(this.Serverbaseurl+'api/Appointments/SaveAppointment',Data)

}


public CancelAppointments(Data:any):Observable<any>
{ 
  debugger
  return this.http.get<any>(this.Serverbaseurl+'api/Appointments/CancelAppointment?AppointmentId='+Data)

}


public SendOtp(Number:any) : Observable<any> {
 
  let a=Number.Number
  if(a.length >10)
  {
    return this.http.get<any>(this.Serverbaseurl+'api/M1_2/GenerateAdhaarOtpForForgotABHANo?adhaarNo='+a);

  }
  else{
    return this.http.get<any>(this.Serverbaseurl+'api/M1_2/GenerateMobileOtpForForgotABHANo?mobileNo='+Number)

  }
  
}
public VerifyForgotenAbhaAdhaarotp(otp:any,txnId:any):Observable<any>
{ return this.http.get<any>(this.Serverbaseurl+'api/M1_2/GetAbhaNoByAdhaarOtp?otp='+otp+'&txnId='+txnId)

}
public SendOtptocreateAbhabyaadhaar(Aadhaar:any):Observable<any>
{ return this.http.get<any>(this.Serverbaseurl+'api/ABHA_M1/GenerateAadhaarOTP?AadharNumber='+Aadhaar)

}


public VerifyOtptocreateAbhabyaadhaar(Otp:any,txnId:any):Observable<any>
{ return this.http.get<any>(this.Serverbaseurl+'api/ABHA_M1/VerifyAadhaarOTP?Otp='+Otp+'&transactionId='+txnId)

}

public SendOtpCheckMobileforCreateabha(Mobile:any,txnId:any):Observable<any>
{ return this.http.get<any>(this.Serverbaseurl+'api/M1_2/checkAndGenerateMobileOTP?Mobile='+Mobile+'&txnId='+txnId)

}

public CreateABHA(obj:any):Observable<any>
{ 
  return this.http.post<any>(this.Serverbaseurl+'api/ABHA_M1/CreateHealthIdUsingAadhaar',obj)
}

public getAdminDashboard():Observable<any>
{ return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetTotalPatientcount')

}


public GetAppointments(Data:any):Observable<any>
{ return this.http.post<any>(this.Serverbaseurl+'FetchMasterData/GetAppointments',Data)

}

public GetAppointmentsToday():Observable<any>
{ return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetAppointmentsToday')

}


public GetAppointmentsStatus():Observable<any>
{ return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetAppointmentsStatus')

}


public GetPaymentCategory():Observable<any>
{ return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetPaymentCategory')

}


public GetPaymentMode():Observable<any>
{ return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetPaymentMode')

}

public GetEditAppointmentdetails(Id:any):Observable<any>
{ return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetEditAppointmentdetails?AppointmentId='+Id)

}


public UpdateAppointment(Appointment:any):Observable<any>
{ return this.http.post<any>(this.Serverbaseurl+'api/Appointments/UpdateAppointment',Appointment)

}

public RescheduleAppointment(Appointment:any):Observable<any>
{ return this.http.post<any>(this.Serverbaseurl+'api/Appointments/RescheduleAppointment',Appointment)

}
public TransferAppointment(Appointment:any):Observable<any>
{
return this.http.post<any>(this.Serverbaseurl+'api/Appointments/TransferAppointment',Appointment)
}
public CheckUsernameIsExisted(username:any,OrganizationId:any):Observable<any>
{
return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/IsUsernameValid?UserName='+username+'&OrganizationId='+OrganizationId)
}

public GetTimeSlotsForTimePicker(AppointmentDate:any,TimeInterval:any):Observable<any>
{
return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetTimeSlotsForTimePicker?_Date='+AppointmentDate+'&TimeInterval='+TimeInterval)
}



//-----------------------------------

isValidNumber(event:any)
{
  var charCode = (event.which) ? event.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57))
    return false;
  return true;
  
}


onKeyDown(event: KeyboardEvent) {
  // Allow numbers, backspace, and delete keys
  if (
    [46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 ||
    // Allow Ctrl+A
    (event.keyCode === 65 && event.ctrlKey === true) ||
    // Allow Ctrl+C
    (event.keyCode === 67 && event.ctrlKey === true) ||
    // Allow Ctrl+V
    (event.keyCode === 86 && event.ctrlKey === true) ||
    // Allow Ctrl+X
    (event.keyCode === 88 && event.ctrlKey === true) ||
    // Allow home, end, left, right arrow keys
    (event.keyCode >= 35 && event.keyCode <= 39)
  ) {
    return;
  }
  // Allow only numeric input
  if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) {
    event.preventDefault();
  }}
//-----------------------------------

}

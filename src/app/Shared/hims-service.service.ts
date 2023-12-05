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
import { ScheduleTemplate } from '../Model/ScheduleTemplate';
import { ListofDates } from '../Model/ListofDates';


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
  

// public GetDoctorbyspeciality(id:any) : Observable<any> {
//   return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetDoctorsByspaciality?Id='+id);
// }

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


// public GetRefDoctorbyspeciality(id:any) : Observable<RefDoctor[]> {
//   return this.http.get<RefDoctor[]>(this.Serverbaseurl+'FetchMasterData/GetRefDoctorsbySpeciality?Id='+id);
// }

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
  Dates.OrganizationId=localStorage.getItem('organizationId')
  Dates.FacilityId=localStorage.getItem('facilityId')
  return this.http.post<any>(this.Serverbaseurl+'api/Home/SearchPatients',Dates);
}
public SearchRegistrationPatients(Dates:any) : Observable<any> {
  debugger
  Dates.OrganizationId=localStorage.getItem('organizationId')
  Dates.FacilityId=localStorage.getItem('facilityId')
  return this.http.post<any>(this.Serverbaseurl+'api/Home/SearchRegistrationPatients',Dates);
}



public GetSearchRegisterPatientToday() : Observable<any> {
  debugger
  let OrgId=localStorage.getItem('organizationId')
  let FId=localStorage.getItem('facilityId')
  return this.http.get<any>(this.Serverbaseurl+'api/Home/GetSearchRegisterPatientToday?OrganizationId='+OrgId+'&FacilityId='+FId);
}
public SearchPatientstbytoday() : Observable<any> {
  debugger
  let OrgId=localStorage.getItem('organizationId')
  let FId=localStorage.getItem('facilityId')
  return this.http.get<any>(this.Serverbaseurl+'api/Home/GetSearchPatientToday?OrganizationId='+OrgId+'&FacilityId='+FId);
}


public GetStates() : Observable<any> {
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetStates');
}


public GetUsers(Data:any) : Observable<any> {
  return this.http.post<any>(this.Serverbaseurl+'FetchMasterData/GetUserList',Data);
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
// public SaveUser(User:any) : Observable<any> {
//   User.CreatedBy=localStorage.getItem('name')
//   debugger
//   return this.http.post<any>(this.Serverbaseurl+'api/Account/Register',User);
// }

public SaveUser(User:any,commaSeparatedValues:any) : Observable<any> {
  User.CreatedBy=localStorage.getItem('name')
  debugger
  User.facilitylist=commaSeparatedValues;
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
 
  let a=Number
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
{
  let orgId=localStorage.getItem('organizationId');
  let fid=localStorage.getItem('facilityId');
  Data.OrganizationId=orgId;
  Data.FacilityId=fid;
  debugger
   return this.http.post<any>(this.Serverbaseurl+'FetchMasterData/GetAppointments',Data)

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

public SaveAppointmentSchedule(ScheduleTemplateData:ScheduleTemplate[]):Observable<any>
{ 
  return  this.http.post<any>(this.Serverbaseurl+'api/Appointments/SaveScheduleTemplate',ScheduleTemplateData);
  //this.http.post<any>('https://localhost:44341/'+'api/Appointments/SaveAppointment',Data)

}

public GetProviderScheduleTeamplateData(providerId:any) : Observable<any> {
  return this.http.get<any>(this.Serverbaseurl+'api/Appointments/GetProviderScheduleTeamplateData?providerId='+providerId);
  //return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetUserList?providerId='+providerId);
}

public GetScheduleTemplatePeriodData(scheduleTemplateId:any) : Observable<any> {
  return this.http.get<any>(this.Serverbaseurl+'api/Appointments/GetScheduleTemplatePeriodData?scheduleTemplateId='+scheduleTemplateId);
  //return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetUserList?providerId='+providerId);
}


public RemoveScheduleTemplatePeriodDataByUsingScheduleTemplatePeriodId(scheduleTemplatePeriodId:any):Observable<any>
{ 
  return this.http.get<any>(this.Serverbaseurl+'api/Appointments/RemoveScheduleTemplatePeriodDataByUsingScheduleTemplatePeriodId?scheduleTemplatePeriodId='+scheduleTemplatePeriodId);
}

public BlockScheduleTemplatePeriod(scheduleTemplatePeriodId:any):Observable<any>
{ 
  return this.http.get<any>(this.Serverbaseurl+'api/Appointments/BlockScheduleTemplatePeriod?scheduleTemplatePeriodId='+scheduleTemplatePeriodId);
}
public UnBlockScheduleTemplatePeriod(scheduleTemplatePeriodId:any):Observable<any>
{ 
  return this.http.get<any>(this.Serverbaseurl+'api/Appointments/UnBlockScheduleTemplatePeriod?scheduleTemplatePeriodId='+scheduleTemplatePeriodId);
}


public GetVitalSigns():Observable<any>
{
return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetVitalSigns')
}


public GetVitalSignsDetails(Id:any):Observable<any>
{
return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetVitalSignsDetails?Id='+Id)
}


public AddVitalSignsToSpeciality(Obj:any):Observable<any>
{
  return this.http.post<any>(this.Serverbaseurl+'api/Home/AddVitalsTosepciality',Obj)
}


public LoadVitalsignsData(obj:any):Observable<any>
{
  return this.http.post<any>(this.Serverbaseurl+'FetchMasterData/LoadVitalSignsData',obj)
}

public RemoveVitalsignForSpeciality(obj:any):Observable<any>
{
  return this.http.get<any>(this.Serverbaseurl+'api/Home/RemoveVitalsignForSpeciality?Id='+obj)
}

public UpdateVitalsignsOrder(obj:any):Observable<any>
{
  return this.http.post<any>(this.Serverbaseurl+'api/Home/UpdateVitalsignOrder',obj)
}

public SavePatientVitalSigns(obj:any):Observable<any>
{
  return this.http.post<any>(this.Serverbaseurl+'api/Home/SavePatientVitalSigns',obj)
}
public SaveOrganizationsbySuperAdmin(Data:any):Observable<any>
{
  
 return this.http.post<any>(this.Serverbaseurl+'api/Account/AddOrganizations',Data)
}

public GetOrganizationAddress(Id:any):Observable<any>
{
  
 return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetOrganizationAddress?Id='+Id)
}
public GetorganizationMappedData():Observable<any>
{
  
 return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetorganizationMappedData')
}

public UpdateOrganization(Data:any):Observable<any>
{
  
 return this.http.post<any>(this.Serverbaseurl+'api/Account/UpdateOrganization',Data)
}

public GetFacilitiesList(Id:number):Observable<any>
{
  
 return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetFacilitiesList?Id='+Id)
}


public UpdateFacility(Data:any):Observable<any>
{
  
 return this.http.post<any>(this.Serverbaseurl+'api/Account/UpdateFacility',Data)
}


public OpNurseStation(Dates:any) : Observable<any> {
  debugger
  
  return this.http.post<any>(this.Serverbaseurl+'api/Home/OpNurseStation',Dates);
}

public GetUserById(Id:any) : Observable<any> {
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetUserListDetailsbyId?UserId='+Id);
}
public GetOrganizationDataById(Id:any): Observable<any>
{
 return this.http.get(this.Serverbaseurl+'FetchMasterData/GetOrganizationData?Id='+Id)
}
public UpdateUser(Data:any):Observable<any>
{
  
 return this.http.post<any>(this.Serverbaseurl+'api/Account/UpdateUser',Data)
}

public GetDoctorbyspeciality(id:any) : Observable<any> {
  let orgId=localStorage.getItem('organizationId');
  let fid=localStorage.getItem('facilityId');
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetDoctorList?OrgnizationId='+orgId+'&FacilityId='+fid+'&SpecialityId='+id);
}

public GetSelectedAppointmentdetails(AppntDate:any, starttime: any,providerId: any, facilityId: any):Observable<any>
{
  debugger
   return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetSelectedAppointmentdetails?AppointmentDate='+AppntDate+'&startTime='+starttime+'&providerId='+providerId+'&facilityId='+facilityId)

}

public GetScheduledTime(selectedDate: any,providerId: any, facilityId: any) : Observable<any> {

  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetScheduledTime?selectedDate='+selectedDate+'&ProviderId='+providerId+'&FacilityId='+facilityId);
}

public GetBookedAppointments(selectedDate: any,providerId: any, facilityId: any) : Observable<any> {

  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetBookedAppointments?selectedDate='+selectedDate+'&ProviderId='+providerId+'&FacilityId='+facilityId);
}
public GetPatientName(rescheduleappointmetid : any, providerId: any):Observable<any>
{
  let fid=localStorage.getItem('facilityId');
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetPatientName?Rescheduleappointmetid='+rescheduleappointmetid)
}


public GetDoctorDashboardData() : Observable<any> {
let uid=localStorage.getItem('userid');
let orgId=localStorage.getItem('organizationId');
let fid=localStorage.getItem('facilityId');
debugger
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetDoctorDashBoardData?OrgId='+orgId+'&FacId='+fid+'&DoctorId='+uid);
}


// public GetRefDoctorbyspeciality(id:any) : Observable<RefDoctor[]> {
//   return this.http.get<RefDoctor[]>(this.Serverbaseurl+'FetchMasterData/GetRefDoctorsbySpeciality?Id='+id);
// }
public GetRefDoctorbyspeciality(Id:any) : Observable<any> {
 // let uid=localStorage.getItem('userid');
  let orgId=localStorage.getItem('organizationId');
  let fid=localStorage.getItem('facilityId');
  debugger
    return this.http.get<RefDoctor[]>(this.Serverbaseurl+'FetchMasterData/GetRefDoctorsbyFacility?SpecialityId='+Id+'&OrganizationId='+orgId+'&FacilityId='+fid);
  }

public GetFrontdeskDashboardData() : Observable<any> {
  let orgId=localStorage.getItem('organizationId');
  let fid=localStorage.getItem('facilityId');
  debugger
    return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetFrontDeskDashBoardCount?OrganizationId='+orgId+'&FacilityId='+fid);
  }

ToCapital(text: string): string {
  return text
    .split(' ') // Split the text into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(' '); // Join the words back into a single string
}

public ValidationOfEffictiveandExpiryDate(providerId:any, effectiveDate:any, expirationDate:any) : Observable<any> {
  return this.http.get<any>(this.Serverbaseurl+'api/Appointments/ValidationOfEffictiveandExpiryDate?providerId='+providerId+'&effectiveDate='+effectiveDate+'&expirationDate='+expirationDate);
  //return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetUserList?providerId='+providerId);
}
public UpdateScheduleTemplate(ScheduleTemplateData:ScheduleTemplate[]):Observable<any>
{ 
  return  this.http.post<any>(this.Serverbaseurl+'api/Appointments/UpdateScheduleTemplate',ScheduleTemplateData);
  //this.http.post<any>('https://localhost:44341/'+'api/Appointments/SaveAppointment',Data)
  //return  this.http.post<any>(this.Serverbaseurl+'api/Appointments/SaveScheduleTemplate',ScheduleTemplateData);
  //this.http.post<any>('https://localhost:44341/'+'api/Appointments/SaveAppointment',Data)
}
public GetProviderScheduleDates(scheduletemplateperiodid:any, fromdate:any, todate:any) : Observable<any> {
  return this.http.get<any>(this.Serverbaseurl+'api/Appointments/GetProviderScheduleDates?scheduletemplateperiodid='+scheduletemplateperiodid+'&fromdate='+fromdate+'&todate='+todate);
  //return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetUserList?providerId='+providerId);
}
public BlockScheduleTemplateDateWise(ListofDates:ListofDates[]):Observable<any>
{ 
  
  return  this.http.post<any>(this.Serverbaseurl+'api/Appointments/BlockScheduleTemplateDateWise',ListofDates);
  //this.http.post<any>('https://localhost:44341/'+'api/Appointments/SaveAppointment',Data)
  //return  this.http.post<any>(this.Serverbaseurl+'api/Appointments/SaveScheduleTemplate',ScheduleTemplateData);
  //this.http.post<any>('https://localhost:44341/'+'api/Appointments/SaveAppointment',Data)
}
public GetProviderBlockedScheduleDates(scheduletemplateperiodid:any, fromdate:any, todate:any) : Observable<any> {
  return this.http.get<any>(this.Serverbaseurl+'api/Appointments/GetProviderBlockedScheduleDates?scheduletemplateperiodid='+scheduletemplateperiodid+'&fromdate='+fromdate+'&todate='+todate);
  //return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetUserList?providerId='+providerId);
}
public UnBlockScheduleTemplateDateWise(ListofDates:ListofDates[]):Observable<any>
{ 
 
  return  this.http.post<any>(this.Serverbaseurl+'api/Appointments/UnBlockScheduleTemplateDateWise',ListofDates);
  //this.http.post<any>('https://localhost:44341/'+'api/Appointments/SaveAppointment',Data)
  //return  this.http.post<any>(this.Serverbaseurl+'api/Appointments/SaveScheduleTemplate',ScheduleTemplateData);
  //this.http.post<any>('https://localhost:44341/'+'api/Appointments/SaveAppointment',Data)
}
public GetResechduleslotsData(selectedDate: any,providerId: any, facilityId: any) : Observable<any> {
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetResechduleslotsData?selectedDate='+selectedDate+'&ProviderId='+providerId+'&FacilityId='+facilityId);
}

public UpdateUserFacilitiesbyEditUser(Facilities:any,UserId:any,DefaultFid:any):Observable<any>
{ 
 debugger
  return  this.http.get<any>(this.Serverbaseurl+'api/Account/UpdateUserFacilities?Facilities='+Facilities+'&UserId='+UserId+'&DefaultFid='+DefaultFid);
}


public getuserbyfacilitylist(userid:any): Observable<any> {
  debugger
    return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/userlistbyfacilitylist?userid='+userid);
  }
  
public UpdateUserFacilities(FList:any):Observable<any>
{
 
 return this.http.post<any>(this.Serverbaseurl+'api/Account/UpdateFacilitiesForUser',FList)
 
}
//ravindhra
public RemoveFacilityTariffChargeId(obj:any):Observable<any>
{
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/RemoveFacilityTariffChargeId?Id='+obj)
}
public GetChargeItemList():Observable<any>
{
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetChargeItemDeatils')
}
public GetFecilityTariffDetails(OrganizationId:any,FacilityId:any) : Observable<Fecility[]> {
  debugger
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetFaciltyTarifffDetails?OrganizationId='+OrganizationId+'&FacilityId='+FacilityId);
}
public SaveFacilityTariffDetails(Data:any):Observable<any>
{
  
 return this.http.post<any>(this.Serverbaseurl+'FetchMasterData/SaveFacilityTariffDetails',Data)
}
public UpdateFacilityTariffDetails(Data:any):Observable<any>
{
  
 return this.http.post<any>(this.Serverbaseurl+'FetchMasterData/UpdateFacilityTariffDetails',Data)
}
public GetExtraReScheduleDates(selectedDate: any,providerId: any, facilityId: any) : Observable<any> {
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetExtraReScheduleDates?selectedDate='+selectedDate+'&ProviderId='+providerId+'&FacilityId='+facilityId);
}
public RemoveDoctorFacilityTariffChargeId(obj:any):Observable<any>
{
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/RemoveDoctorFacilityTariffChargeId?Id='+obj)
}
public UpdateDoctorFacilityTariffDetails(Data:any):Observable<any>
{
  
 return this.http.post<any>(this.Serverbaseurl+'FetchMasterData/UpdateDoctorFacilityTariffDetails',Data)
}
public SaveDoctorFacilityTariffDetails(Data:any):Observable<any>
{
  
 return this.http.post<any>(this.Serverbaseurl+'FetchMasterData/SaveDoctorFacilityTariffDetails',Data)
}
public GetOrganisationDoctorDetails(OrganizationId:any) : Observable<Fecility[]> {
  debugger
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetDoctorByOrganisationId?OrganisationId='+OrganizationId);
}
public GetFecilityDoctorTariffDetails(OrganizationId:any,FacilityId:any) : Observable<Fecility[]> {
  debugger
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetFaciltyDoctorTarifffDetails?OrganizationId='+OrganizationId+'&FacilityId='+FacilityId);
}
//Vijay start region
//#region Billing
public GetPatientDetailsById(patientId:any):Observable<any>
{
   //return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetEditAppointmentdetails?AppointmentId='+Id)
   return this.http.get<any>(this.Serverbaseurl+'api/Payments/GetPatientDetailsById?PatientId='+patientId)
}

public GetChargeItemDetails():Observable<any>
{
  let OrganizationId=localStorage.getItem('organizationId')
 let FacilityId=localStorage.getItem('facilityId')
   //return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetEditAppointmentdetails?AppointmentId='+Id)
   return this.http.get<any>(this.Serverbaseurl+'api/Payments/GetAllChargeItemDetails?OrganizationId='+OrganizationId+'&FacilityId='+FacilityId)
}
public saveBillingDetails(obj:any):Observable<any>
{
   //return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetEditAppointmentdetails?AppointmentId='+Id)
   return this.http.post<any>(this.Serverbaseurl+'api/Payments/saveBillingPayments',obj)
}

public SearchBillingsbytoday() : Observable<any> {
  debugger
 let OrgId=localStorage.getItem('organizationId')
 let FId=localStorage.getItem('facilityId')
  //return this.http.get<any>(this.Serverbaseurl+'api/Home/GetSearchBillingToday');
  return this.http.get<any>(this.Serverbaseurl+'api/Payments/GetSearchBillingToday?OrganizationId='+OrgId+'&FacilityId='+FId);
}
public SearchBillings(Dates:any) : Observable<any> {
  debugger
  Dates.OrganizationId=localStorage.getItem('organizationId')
 Dates.FacilityId=localStorage.getItem('facilityId')
  // return this.http.post<any>(this.Serverbaseurl+'api/Home/SearchBillingDetails',Dates);
  return this.http.post<any>(this.Serverbaseurl+'api/Payments/SearchBillingDetails',Dates);
}
public GetBillChargeItemDetails(billId:any,encounterId:any):Observable<any>
{
   //return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetEditAppointmentdetails?AppointmentId='+Id)
   return this.http.get<any>(this.Serverbaseurl+'api/Payments/GetAllBillEntryDetails?BillId='+billId+'&EncounterId='+encounterId );
}
public GetBillPriceDetails(BillId:any):Observable<any>
{
   //return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetEditAppointmentdetails?AppointmentId='+Id)
   return this.http.get<any>(this.Serverbaseurl+'api/Payments/GetBillEntryPriceDetails?BillId='+BillId);
}
public GetBillSummaryDetails(BillId:any):Observable<any>
{
   //return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetEditAppointmentdetails?AppointmentId='+Id)
   return this.http.get<any>(this.Serverbaseurl+'api/Payments/GetBillSummaryDetails?BillId='+BillId);
}
public GetBillingDetailsByEncounterId(EncounterId:any):Observable<any>
{
   //return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetEditAppointmentdetails?AppointmentId='+Id)
   return this.http.get<any>(this.Serverbaseurl+'api/Payments/GetBillingDetailsByEncounterId?encounterId='+EncounterId)
}
public GetBillingDetails(EncounterId:any):Observable<any>
{
   //return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetEditAppointmentdetails?AppointmentId='+Id)
   return this.http.get<any>(this.Serverbaseurl+'api/Payments/GetBillinDetails?EncounterId='+EncounterId)
}
public deleteBillServiceDetails(BillId:any,chargeItemId:any):Observable<any>
{
   //return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetEditAppointmentdetails?AppointmentId='+Id)
   return this.http.get<any>(this.Serverbaseurl+'api/Payments/DeleteBillServiceDetails?BillId='+BillId+'&ChargeItemId='+chargeItemId );
}
public GetDoctorChargePriceDetails(ChargeItemId:any,DoctorId:any):Observable<any>
{
  let OrganizationId=localStorage.getItem('organizationId')
  let FacilityId=localStorage.getItem('facilityId')
  
   //return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetEditAppointmentdetails?AppointmentId='+Id)
   return this.http.get<any>(this.Serverbaseurl+'api/Payments/GetDoctorChargeItemDetails?DoctorId='+DoctorId+'&ChargeItemId='+ChargeItemId+'&OrganizationId='+OrganizationId+'&FacilityId='+FacilityId);
}
//#endregion
//vijay end region

public GetPatientDetailsByAppointmentId(PatientTempId:any):Observable<any>
{
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetPatientDatabyPatientTempID?PatientTempId='+PatientTempId)
  // return this.http.get<any>(this.Serverbaseurl+'api/Payments/GetDoctorChargeItemDetails?DoctorId='+DoctorId+'&ChargeItemId='+ChargeItemId+'&OrganizationId='+OrganizationId+'&FacilityId='+FacilityId);
}
public GetConsultationAmount(DoctorId:any,OrgId:any,Fid:any,ChargeitemId:any):Observable<any> 
{
  //int DoctorId,int Organizationd,int FacilityId,int ChargeItemId
  return this.http.get<any>(this.Serverbaseurl+'FetchMasterData/GetConsultationAmount?DoctorId='+DoctorId+'&Organizationd='+OrgId+'&FacilityId='+Fid+'&ChargeItemId='+ChargeitemId)
  // return this.http.get<any>(this.Serverbaseurl+'api/Payments/GetDoctorChargeItemDetails?DoctorId='+DoctorId+'&ChargeItemId='+ChargeItemId+'&OrganizationId='+OrganizationId+'&FacilityId='+FacilityId);
}

public UpdatePatientIdInPatientTemp(PatientTempId:any,PatientId:any):Observable<any>
{
  //int DoctorId,int Organizationd,int FacilityId,int ChargeItemId
  return this.http.get<any>(this.Serverbaseurl+'api/Home/UpdatePatientIdInPatientTemp?PatientTempId='+PatientTempId+'&PatientId='+PatientId)
  // return this.http.get<any>(this.Serverbaseurl+'api/Payments/GetDoctorChargeItemDetails?DoctorId='+DoctorId+'&ChargeItemId='+ChargeItemId+'&OrganizationId='+OrganizationId+'&FacilityId='+FacilityId);
}

}

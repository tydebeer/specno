import { OfficeColorKey } from "../config/uiConfig";

export interface OfficeData {
  officeName: string;
  physicalAddress: string;
  emailAddress: string;
  phoneNumber: string;
  maximumCapacity: string;
  officeColor: OfficeColorKey;
}
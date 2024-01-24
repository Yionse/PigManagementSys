/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export interface PigOptions {
  pigId: number;
  breed: string | null;
  gender: string | null;
  birthDate: string | null;
  entryDate: string | null;
  exitDate: string | null;
  otherInfo: string | null;
  pigstyId: number | null;
}

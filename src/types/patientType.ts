// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { Diagnosis } from './diagnosesType';
interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}
export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
interface Discharge {
    date: string;
    criteria: string;
}
interface SickLeave {
    startDate: string;
    endDate: string;
}
interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}
interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}
interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}
export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string
    occupation: string,
    entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}
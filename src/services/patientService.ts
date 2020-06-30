/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import patientData from '../patientData';
import { Patient, PublicPatient, NewPatient, Gender, Entry, HealthCheckRating, NewEntry, NewHealthCheckEntry, NewHospitalCheckEntry, Discharge, NewOccupationalHealthcareEntry, SickLeave } from '../types/patientType';

const getPatients = (): Array<PublicPatient> => {
    return patientData;
};
const getPatientById = (id: string): Patient => {
    return patientData.find(p => p.id === id) as Patient;
};

const getPublicPatient = (): PublicPatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name: ${name}`);
    }
    return name;
};
const parseDateOfBirth = (dob: any): string => {
    if (!dob || !isString(dob) || !isDate(dob)) {
        throw new Error(`Incorrect or missing date of birth: ${dob}`);
    }
    return dob;
};
const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing ssn: ${ssn}`);
    }
    return ssn;
};
const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect or missing occupation: ${occupation}`);
    }
    return occupation;
};
const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};
const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};
const parseDischarge = (info: Discharge): Discharge => {
    if (!info) {
        throw new Error(`Incorrect or missing discharge information`);
    }
    return info;
};
const parseSickLeave = (info: SickLeave): SickLeave => {
    if (!info) {
        throw new Error(`Incorrect or missing discharge information`);
    }
    return info;
};
const isHealthCheckRating = (check: any): check is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(check);
};
const parseHealthCheckRating = (check: any): HealthCheckRating => {
    if (!check || !isHealthCheckRating(check)) {
        throw new Error(`Incorrect or missing health check rating: ${check}`);
    }
    return check;
};
const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error(`Incorrect or missing specialist: ${specialist}`);
    }
    return specialist;
};
// const parseType = (object: any): Entry => {
//     if (!object.type || !isString(object.type)) {
//         throw new Error(`Incorrect or missing type: ${object.type}`);
//     }
//     return object.type;
// };
const parseDescription = (desc: any): string => {
    if (!desc || !isString(desc)) {
        throw new Error(`Incorrect or missing description: ${desc}`);
    }
    return desc;
};
const parseEmployerName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing employer name: ${name}`);
    }
    return name;
};
const assertNever = (type: string): never => {
    console.log(type);
    throw new Error("Didn't expect to get here");
};
const toNewOccupationalHealthcareCheck = (object: any): NewOccupationalHealthcareEntry => {
    return {
        type: object.type,
        description: parseDescription(object.description),
        date: parseDateOfBirth(object.date),
        specialist: parseSpecialist(object.specialist),
        sickLeave: parseSickLeave(object),
        employerName: parseEmployerName(object)
    };
};
const toNewHealthCheck = (object: any): NewHealthCheckEntry => {
    return {
        type: object.type,
        description: parseDescription(object.description),
        date: parseDateOfBirth(object.date),
        specialist: parseSpecialist(object.specialist),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
    };
};
const toNewHospitalCheck = (object: any): NewHospitalCheckEntry => {
    return {
        type: object.type,
        description: parseDescription(object.description),
        date: parseDateOfBirth(object.date),
        specialist: parseSpecialist(object.specialist),
        discharge: parseDischarge(object)
    };
};
const toNewEntry = (object: any): NewEntry => {
    switch (object.type) {
        case "HealthCheck":
            return toNewHealthCheck(object);
        case "Hospital":
            return toNewHospitalCheck(object);
        case "OccupationalHealthcare":
            return toNewOccupationalHealthcareCheck(object);
        default:
            return assertNever(object);
    }
};

const addEntryForPatient = (patId: string, entryToAdd: any): Entry => {
    const patient = patientData.find(p => p.id === patId);
    const newEntry: Entry = {
        ...entryToAdd,
    };
    patient?.entries.push(entryToAdd);
    return newEntry;
};

const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
    };
};
const addPatient = (patientToAdd: Patient): Patient => {
    const newPatient: Patient = {
        ...patientToAdd
    };
    patientData.push(patientToAdd);
    return newPatient;
};

export default {
    getPatients,
    getPatientById,
    getPublicPatient,
    addPatient,
    toNewPatient,
    toNewEntry,
    addEntryForPatient
};

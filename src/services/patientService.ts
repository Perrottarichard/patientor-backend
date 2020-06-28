/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import patientData from '../../data/patients.json';
import { Patient, NoSocial, NewPatient, Gender } from '../types/patientType';

const getPatients = (): Array<Patient> => {
    return patientData;
};

const getNoSocial = (): NoSocial[] => {
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

const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
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
    getNoSocial,
    addPatient,
    toNewPatient
};


import patientData from '../../data/patients.json';
import { Patient, NoSocial } from '../types/patientType';

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
    addPatient
};

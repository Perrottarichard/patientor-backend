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

export default {
    getPatients,
    getNoSocial
};

import diagnosesData from '../../data/diagnoses.json';
import { Diagnosis } from '../types/diagnosesType';

const getDiagnoses = (): Array<Diagnosis> => {
    return diagnosesData;
};

export default {
    getDiagnoses
};

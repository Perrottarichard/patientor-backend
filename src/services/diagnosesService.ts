import diagnosesData from '../../data/diagnoses.json';
import { Diagnose } from '../types/diagnosesType';

const getDiagnoses = (): Array<Diagnose> => {
    return diagnosesData;
};

export default {
    getDiagnoses
};

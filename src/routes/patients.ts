/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import shortid from 'shortid';
import pService from '../services/patientService';

const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const id: any = shortid.generate();
    const patientToAdd = {
        id: id,
        name: name,
        dateOfBirth: dateOfBirth,
        ssn: ssn,
        gender: gender,
        occupation: occupation
    };
    res.json(pService.addPatient(patientToAdd));
});

router.get('/', (_req, res) => {
    res.send(pService.getNoSocial());
});

export default router;
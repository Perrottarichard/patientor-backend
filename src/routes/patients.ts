/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';
import shortid from 'shortid';
import pService from '../services/patientService';

const router = express.Router();

router.post('/', (req, res) => {
    const id: string = shortid.generate();
    try {
        const patientToAdd = pService.toNewPatient(req.body);
        const addedEntry = pService.addPatient({ id: id, ...patientToAdd });
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/', (_req, res) => {
    res.send(pService.getPatients());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(pService.getPatientById(id));
});

export default router;
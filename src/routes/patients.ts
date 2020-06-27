import express from 'express';
import pService from '../services/patientService';

const router = express.Router();

// router.get('/', (_req, res) => {
//     res.send(pService.getPatients());
// });
router.get('/', (_req, res) => {
    res.send(pService.getNoSocial());
});

export default router;
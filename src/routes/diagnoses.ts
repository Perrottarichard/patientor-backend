import express from 'express';
import dService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(dService.getDiagnoses());
});

export default router;
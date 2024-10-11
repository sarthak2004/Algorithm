// routes/formRoutes.js
import express from 'express';
import { submitFormData } from '../controllers/formController.js';
import { home } from '../controllers/home.js';
import { getOngoingProjects } from '../controllers/ProjectController.js';
import { getCoreMembers } from '../controllers/coreMemberController.js';

const router = express.Router();

// get
router.get('/', home)


// post
router.post('/form', submitFormData);


export default router;

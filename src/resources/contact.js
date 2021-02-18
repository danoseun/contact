import Contact from '../controllers/contact';
import { verifyToken } from '../middlewares';
import { validateContact } from '../validations/contact';

import express from 'express';

export const contactRouter = express.Router();


contactRouter.post('/contact/createContact', verifyToken, validateContact, Contact.createContact);
contactRouter.get('/contact/getAllContact', verifyToken, Contact.getAllContact);
contactRouter.get('/contact/getAContact/:_id', verifyToken, Contact.getAContact);
contactRouter.put('/contact/updateContact/:_id', verifyToken, Contact.updateContact);
contactRouter.delete('/contact/removeContact/:_id', verifyToken, Contact.removeContact);

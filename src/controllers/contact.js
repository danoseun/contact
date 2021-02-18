import Contact from '../entities/contact';
import logger from '../utils/logger';
import BaseService from '../services/baseservice';
import { successResponse, successResponseWithData, errorResponse } from '../utils/response';
import { statusCodes } from '../utils/statuscode';
import { messages } from '../utils/message';

const ContactService = new BaseService(Contact);

/**
 * A simple CRUD controller for contacts
 * Create the necessary controller methods 
 */


export const createContact = async (req, res) => {
	try {
        const user = req.authData.payload._id;
        const contactObj = {
            user,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            companyName: req.body.companyName,
            houseAddress: req.body.houseAddress,
            emailAddress: req.body.emailAddress,
            mobile: req.body.mobile
        }
		const newContact = await ContactService.create(contactObj);
		successResponseWithData(res, statusCodes.created, messages.created, newContact);
        return;
	  } catch (error) {
		errorResponse(res, statusCodes.serverError, error.message);
		return;
	  }
};

/**
 * Fetch all contacts belonging
 * to a user
 */
export const getAllContact = async(req, res) => {

    const id = req.authData.payload._id

	try {
        const contacts = await ContactService.index({user: id});
        successResponseWithData(res, statusCodes.success, messages.success, contacts);
        return;
      } catch(error){
        errorResponse(res, statusCodes.serverError, error.message);
        return;
      }
};

/**
 * Fetch single contact
 * of a user
 */
export const getAContact = async(req, res) => {

    const id = req.authData.payload._id
    const contactId = req.params._id;

	try {
        const contact = await ContactService.findOne({user: id, _id:contactId});
        successResponseWithData(res, statusCodes.success, messages.success, contact);
        return;
      } catch(error){
        errorResponse(res, statusCodes.serverError, error.message);
        return;
      }
};

/**
 * update contact of 
 * a particular user
 */
export const updateContact = async(req, res) => {
    const id = req.authData.payload._id
    const contactId = req.params._id;

	try {
        const contact = await ContactService.findOne({user: id, _id:contactId});
        if(contact){
            const updatedContact = await ContactService.update(contact._id, req.body);
           return successResponseWithData(res, statusCodes.success, messages.success, updatedContact);
        }
        return errorResponse(res, statusCodes.notFound, messages.notFound);
      } catch(error){
        errorResponse(res, statusCodes.serverError, error.message);
        return;
      }
};

/**
 * removeContact
 */

export const removeContact = async(req, res) => {
    const id = req.authData.payload._id
    const contactId = req.params._id;

	try {
        const contact = await ContactService.findOne({user: id, _id:contactId});
        if(contact){
           await ContactService.remove({_id: contactId});
           return successResponse(res, statusCodes.deleted, messages.deleted);
        }
        return errorResponse(res, statusCodes.notFound, messages.notFound);
      } catch(error){
        errorResponse(res, statusCodes.serverError, error.message);
        return;
      }
};

export default {
    createContact,
    getAllContact,
    getAContact,
    updateContact,
    removeContact
}
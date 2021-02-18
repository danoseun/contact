import { errorResponse } from '../utils/response';
import { statusCodes } from '../utils/statuscode';
import { messages } from '../utils/message';


const validateContact = (req, res, next) => {

    console.log('HERE1', req.body);
    try{
         const { firstname, lastname, companyName, houseAddress, emailAddress, mobile } = req.body;
            if (!firstname || !lastname || !companyName || !houseAddress || !emailAddress || !mobile) {
                return errorResponse(res, statusCodes.badRequest, messages.error);
            }
    }   catch(error){
        return errorResponse(res, statusCodes.serverError, error.message);
    }
    
    next();
  };
  export { validateContact };
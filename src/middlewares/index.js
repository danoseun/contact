import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { statusCodes } from '../utils/statuscode';
import { messages } from '../utils/message';
import { errorResponse } from '../utils/response';


dotenv.config();

export const createToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.SECRET_KEY);
  return `Bearer ${token}`;
};

/**
 * This function verifies
 * that user token is valid
 * */
export const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    errorResponse(res, statusCodes.forbidden, messages.noToken);
    return;
  }
  token = token.split(' ')[1];
     
    jwt.verify(token, process.env.SECRET_KEY, (error, authData) => {

      if (error) {
        if (error.message.includes('signature')) {
            return errorResponse(res, statusCodes.forbidden, messages.tokenError);
        }
        return errorResponse(res, statusCodes.forbidden, messages.tokenError);
      }
      req.authData = authData;
      return next();
    }); 
};
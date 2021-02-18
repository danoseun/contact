import User from '../entities/user';
import BaseService from '../services/baseservice';
import { errorResponse } from '../utils/response';
import { statusCodes } from '../utils/statuscode';
import { messages } from '../utils/message';
import { comparePassword } from '../utils/password';

const AuthService = new BaseService(User);


const validateUserSignup = async (req, res, next) => {

    try {
        const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
        errorResponse(res, statusCodes.badRequest, messages.error);
        return;
    }
    const emailExist = await User.findOne({email});
    
    const usernameExist = await User.findOne({username});
    
    if(emailExist || usernameExist){
        errorResponse(res, statusCodes.conflict, messages.conflict);
        return;
     }
    } catch (error) {
        return errorResponse(res, statusCodes.serverError, error.message);
    }
    next();
  };


  
  const validateUserSignin = async (req, res, next) => {
    let { username, password } = req.body;
    if (!username || !password) {
        errorResponse(res, statusCodes.unauthorized, messages.error);
        return;
    }
    username = username.toLowerCase().trim();

    let foundUser;
    try {
       foundUser = await User.findOne({ username });

      if (!foundUser) {
        return errorResponse(res, statusCodes.unauthorized, messages.unAuthorized);
      }
      const compare = comparePassword(password, foundUser.password);
      
      if(!compare){
        return errorResponse(res, statusCodes.unauthorized, messages.unAuthorized);
      }
    } catch (error) {
        return errorResponse(res, statusCodes.serverError, error.message);
    }
    
    req.body = foundUser;
    next();
  };
  
  export { validateUserSignup, validateUserSignin };
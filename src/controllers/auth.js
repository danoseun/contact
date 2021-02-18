import User from '../entities/user';
import logger from '../utils/logger';
import BaseService from '../services/baseservice'
import { successResponse, successResponseWithData, errorResponse } from '../utils/response';
import { statusCodes } from '../utils/statuscode';
import { messages } from '../utils/message';
import { hashPassword } from '../utils/password';
import { createToken } from '../middlewares';


const AuthService = new BaseService(User);

/**
 * Given a json request 
 * {"username": "<...>", "password": "<...>"}
 * Verify the user is valid and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const login = (req, res) => {
	try {
		const token = createToken(req.body);
		successResponseWithData(res, statusCodes.success, messages.loggedIn, token);
		return;
	  } catch (error) {
		errorResponse(res, statusCodes.serverError, error.message);
		return;
	  }
};
/**
 * Given a json request 
 * {"username": "<...>", "password": "<...>"}
 * Create a new user and return some authentication token 
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const signup = async(req, res) => {
	let { password } = req.body;
	let hash = hashPassword(password);
	password = hash;

	try {
		const user = await AuthService.create(req.body);
		const token = createToken(user);
		let userObj = {user, token};
        successResponseWithData(res, statusCodes.created, messages.created, userObj);
        return;
      } catch(error){
        errorResponse(res, statusCodes.serverError, error.message);
        return;
      }
};
/**
 * Implement a way to recover user accounts
 */
export const forgotPassword = (req, res) => {
	let user = await ContactService.findOne({email: req.body.email});

    try {
        if(!user){
            errorResponse(res, statusCodes.notFound, messages.notFound);
        }
        const token = useUserDetailToMakeToken(user);
        const url = getPasswordResetURL(req, token);
        const emailSent = passwordResetEmailTemplate(user, url);
        Transporter(emailSent, res);
        redisClient.set(user.email, url, 'EX', 1200);
    }
    catch(err){
		return errorResponse(res, statusCodes.serverError, error.message);
	}
};

/**
 * receives new password
 * and sets it in the db
 */
export const receiveNewPassword = async(req, res) => {
	const { token } = req.params;
    const { password, confirmpassword } = req.body;
    if((password.trim() !== confirmpassword.trim()) || (password.trim()&&confirmpassword.trim() === '')) {
        return errorResponse(res, statusCodes.badRequest, messages.error);
    }

    if(!checkPassword(password)) {
        return errorResponse(res, statusCodes.badRequest, messages.error);
    }
    

    else {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        try {
            redisClient.get(payload.user.email, async(err, result) => {
                if(err){
                    return res.status(500).json({
                        error: err.message
                    });
                }
                if(result !== null){
                    let hash = hashPassword(password);

                    await updatePassword(password,hash, payload.user.email);
                
                    return successResponseWithData(res, statusCodes.success, messages.success);
                }
                else {
                    return errorResponse(res, statusCodes.notFound, messages.notFound);
                }
            })
                
        } catch(err){
            return errorResponse(res, statusCodes.serverError, error.message);
        }
    }
}

export default {
	login,
	signup,
	forgotPassword,
	receiveNewPassword
}









// class TodoController { 
//   static async createTodo(req, res) {
//       try {
//         const todoResource = await TodoService.create(req.body);
//         successResponseWithData(res, statusCodes.created, messages.created, todoResource);
//         return;
//       } catch(error){
//         errorResponse(res, statusCodes.serverError, error.message);
//         return;
//       }
//   }

//   static async showTodo(req, res) {
//      try {
//         const todo = await TodoService.show({id: req.params.id});
//         todo ?  successResponseWithData(res, statusCodes.success, messages.success, todo) : errorResponse(res, statusCodes.notFound, messages.notFound);
//      } catch(error){
//         errorResponse(res, statusCodes.serverError, error.message);
//         return;
//      }     
//   }

//   static async updateTodo(req, res) {
//     try {
//         const updatedTodo = await TodoService.update({id: req.params.id}, req.body);
//         updatedTodo ? 
//         successResponseWithData(res, statusCodes.success, messages.success, updatedTodo) : 
//         errorResponse(res, statusCodes.notFound, messages.notFound);
//     } catch(error){
//         errorResponse(res, statusCodes.serverError, error.message);
//         return;
//     }
//   }

//   static async destroyTodo(req, res) {
//     try {
//         await TodoService.destroy(id, req.params.id);
//         errorResponse(res, statusCodes.notFound, messages.notFound);
//     } catch(error){
//         errorResponse(res, statusCodes.serverError, error.message);
//         return;
//     }
//   }

//   static async allTodos(req, res){
//       try {
//         const todos = await TodoService.index(options);
//         todos.length > 0 ?  successResponseWithData(res, statusCodes.success, messages.success, todos) : errorResponse(res, statusCodes.notFound, messages.notFound);
//         return;  
//       } catch(error){
//         errorResponse(res, statusCodes.serverError, error.message);
//         return;
//       }
//   }
// }

// export default TodoController
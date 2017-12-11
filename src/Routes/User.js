import SuccessResponse from "../Responses/SuccessResponse";
import NotFoundResponse from "../Responses/NotFoundResponse";
import {NotFoundException} from "../Exceptions/NotFoundException";
import {GetUserController} from "../Controllers/User/GetUserController";
import {UpdateUserController} from "../Controllers/User/UpdateUserController";
import {RemoveUserController} from "../Controllers/User/RemoveUserController";
import InternalServerErrorResponse from "../Responses/InternalServerErrorResponse";
import {CreateNewUserController} from "../Controllers/User/CreateNewUserController";

/**
 * Exporting module
 * @param server
 */
module.exports = (server) => {

    /**
     * Create New User
     */
    server.post('/user/create', async (req, res) => {
        try {
            const result = await new CreateNewUserController(req.body).createUser();

            SuccessResponse(res, "Successfully create new user!", result);
        } catch (exception) {
            InternalServerErrorResponse(res, exception.message);
        }
    });

    /**
     * Get List Users
     */
    server.get('/user/list', async (req, res) => {
        try {
            const result = await new GetUserController().all();

            SuccessResponse(res, "Successfully get list users!", result);
        } catch (exception) {
            InternalServerErrorResponse(res, exception.message);
        }
    });

    /**
     * Get Detail User
     */
    server.get('/user/detail/:userId', async (req, res) => {
        try {
            const result = await new GetUserController().detailUser(req.params.userId);

            SuccessResponse(res, "Successfully get user detail!", result);
        } catch (exception) {
            if (exception instanceof NotFoundException) {
                NotFoundResponse(res, exception.message);
            } else {
                InternalServerErrorResponse(res, exception.message);
            }
        }
    });

    /**
     * Update User
     */
    server.post('/user/update/:userId', async (req, res) => {
        try {
            /**
             * Remove _id if key is exist
             */
            if (typeof req.body._id === 'string') delete req.body._id;

            const result = await new UpdateUserController(req.params.userId, req.body).update();

            SuccessResponse(res, "Successfully update user data!", result);
        } catch (exception) {
            if (exception instanceof NotFoundException) {
                NotFoundResponse(res, exception.message);
            } else {
                InternalServerErrorResponse(res, exception.message);
            }
        }
    });

    /**
     * Remove User
     */
    server.post('/user/remove', async (req, res) => {
        try {
            const result = await new RemoveUserController(req.body.userId).removeUser();

            SuccessResponse(res, "Successfully remove user!", result);
        } catch (exception) {
            if (exception instanceof NotFoundException) {
                NotFoundResponse(res, exception.message);
            } else {
                InternalServerErrorResponse(res, exception.message);
            }
        }
    });
};
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { envConfig } from '../../common/config';
import { HandleError } from "../../Errors/handler.error";
import { RouterCallbackFunc } from "../../Server/Server.types";
import { commonJSONResponseHeaders } from '../../utils/network';
import { IUser } from "./User.model";
import { createUser, getUser } from "./User.service";

export const userRegistration: RouterCallbackFunc = async (req, res) => {
    let data = '';
    req.on('data', (chunk) => data += chunk);
    req.on('end', async () => {
        try {
            const { firstName, lastName, email, password } = JSON.parse(data);

            if (!(email && password && firstName && lastName)) {
                const STATUS_MESSAGE = 'All fields are required';
                res.writeHead(400, STATUS_MESSAGE);
                res.end(STATUS_MESSAGE);
                return;
            }
    
            const isUserExist: IUser | undefined = getUser(email);
            if (isUserExist) {
                const STATUS_MESSAGE = 'The User already exist';
                res.writeHead(409, STATUS_MESSAGE)
                res.end(STATUS_MESSAGE);
                return;
            }
    
            const encryptedPassword = await bcrypt.hash(password, 10);
          
            const user: IUser = createUser({
                firstName,
                lastName,
                email,
                password: encryptedPassword,
            })
    
            user.token = jwt.sign(
                {
                    userId: user.id,
                    email
                },
                envConfig.TOKEN_KEY,
                {
                    expiresIn: '1d'
                }
            );
    
            res.writeHead(201, commonJSONResponseHeaders);
            res.end(JSON.stringify(user));
        } catch (err) {
            HandleError(req, res, err);
        }
    });
};

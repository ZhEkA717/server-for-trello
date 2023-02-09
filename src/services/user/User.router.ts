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
    req.on('data', (chunk) => data += chunk)
    .on('end', async () => {
        try {
            const { firstName, lastName, email, password } = JSON.parse(data);

            if (!(email && password && firstName && lastName)) {
                res.writeHead(400, 'All fields are required');
                res.end();
            }
    
            const isUserExist: IUser | undefined = getUser(email);
            if (isUserExist) {
                res.writeHead(409, "The User already exist")
                res.end();
            }
    
            console.log('isUserExist', isUserExist)
    
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
    })
};

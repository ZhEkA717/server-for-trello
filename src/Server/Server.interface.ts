import http from "http";
import { IUser } from '../services/user/User.model';

export interface IRequest extends http.IncomingMessage {
  params?: any;
  body?: any;
  user?: IUser;
}
import http from 'http';
import { IRequest } from './Server.interface';

export type RouterCallbackFunc = (req: IRequest, res: http.ServerResponse, err?: any) => void;
export type MethodType = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'OPTIONS';

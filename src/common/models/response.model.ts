import { RESPONSE_SUCCESS_CODE, RESPONSE_SUCCESS_MESSAGE } from "src/constants/response.constant";

export class ResponseModel<T = any>{
    success: boolean;
    status: number;
    error?: string;
    data?: T;
    message: string;
    timestamp: string;
    path: string;

    constructor(success: boolean, status: number, message: string, path: string, data?: T, error?: string) {
        this.success = success;
        this.status = status;
        this.data = data;
        this.error = error;
        this.message = message;
        this.timestamp = new Date().toISOString();
        this.path = path;

    }

    static success<T>(status: number, message: string = RESPONSE_SUCCESS_MESSAGE, path: string) {
        return new ResponseModel(true, status, message, path);
    }

    static error(status: number, message: string, path: string, error: string) {
        return new ResponseModel(false, status, message, path, undefined, error);
    }
}

export class TreeResult<T> {
    id: string;
    parentId: number;
    children: TreeResult<T>[];
}
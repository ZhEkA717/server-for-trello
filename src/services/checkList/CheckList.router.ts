import {searchTask,searchTasks } from "../task/Task.service";
import { searchCheckbox, searchCheckLists, createNewCheckbox, deleteCheckboxByID, updateCheckboxById } from "./CheckList.service";
import { validate as validateUUID } from 'uuid';
import { RouterCallbackFunc } from "../../Server/Server.types";
import { HandleError } from "../../Errors/HandlerError";
import { CHECKBOX_URL, CHECKBOX_URL_ID } from "../../utils/constants";
import { NotFoundError } from "../../Errors/CustomErrors";
import { commonJSONResponseHeaders } from "../../utils/network";

export const getCheckBoxByID: RouterCallbackFunc = async (req, res) => {
    console.log('checkboxId');
    try {
        const url = req.url;
        const checkboxId = url?.substring(`/${CHECKBOX_URL_ID}`.length);
        const currentCheckbox = searchCheckbox(checkboxId as string);
        res.writeHead(200, commonJSONResponseHeaders);
        res.end(JSON.stringify(currentCheckbox));
    } catch (err) {
        HandleError(req, res, err);
    }
}

export const getAllCheckBoxesByIDS: RouterCallbackFunc = async (req, res) => {
        try {
            const url = req.url;
            const taskId = url?.substring(`/${CHECKBOX_URL}`.length);
            const checkLists = searchCheckLists(taskId as string);
            res.writeHead(200, commonJSONResponseHeaders);
            res.end(JSON.stringify(checkLists));
        } catch (err) {
            HandleError(req, res, err);
        }
};

export const createCheckbox: RouterCallbackFunc = async (req, res) => {
    if (!req.url?.startsWith(CHECKBOX_URL)) throw new NotFoundError();
    console.log(req.bodyData);
    if (!req.bodyData) throw new NotFoundError();

    let data = req.bodyData;
    let checkboxData;
    const taskId = req.url?.substring(`/${CHECKBOX_URL}`.length);
    console.log(taskId);
    try {
        checkboxData = JSON.parse(data);
        const newCheckbox = await createNewCheckbox(checkboxData,taskId);
        res.writeHead(200, commonJSONResponseHeaders);
        res.end(JSON.stringify(newCheckbox));
    } catch (err) {
        HandleError(req, res, err);
    }
}

export const deleteCheckbox: RouterCallbackFunc = async (req, res) => {
    try {
        const url = req.url;
        const checkboxId = url?.substring(`/${CHECKBOX_URL}`.length);
        await deleteCheckboxByID(checkboxId as string);
        res.writeHead(204, commonJSONResponseHeaders);
        res.end();
    } catch (err) {
        HandleError(req, res, err);
    }
}

export const updateCheckbox: RouterCallbackFunc = async (req, res) => {
    if (!req.bodyData) throw new NotFoundError();

    let data = req.bodyData;
    let checkboxData;

    try {
        checkboxData = JSON.parse(data);
        const url = req.url;
        const checkboxId = url?.substring(`/${CHECKBOX_URL}`.length);
        await updateCheckboxById(checkboxId as string, checkboxData);
        res.writeHead(200, commonJSONResponseHeaders);
        res.end(JSON.stringify(checkboxData));
    } catch (err) {
        HandleError(req, res, err);
    }
}
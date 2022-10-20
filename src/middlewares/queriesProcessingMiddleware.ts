import {NextFunction, Request, Response} from "express";
import {QueryParams} from "../types/types";
const defaults: QueryParams = {
    searchNameTerm: null,
    pageNumber: 1,
    pageSize: 1,
    sortBy: 'createdAt',
    sortDirection: -1,
}

export const queriesProcessingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const queryParams:QueryParams = {
    }
    queryParams.pageNumber = req.query.pageNumber? Number(req.query.pageNumber) : defaults.pageNumber
    next()
}
import { Request } from "express";
import {QueryParams} from "../types/types";

const defaults: QueryParams = {
    searchNameTerm: '/*',
    pageNumber: 1,
    pageSize: 1,
    sortBy: 'createdAt',
    sortDirection: -1,
}

export function queryProcessing (req: Request){
    const queryParams:QueryParams = {
    }
    queryParams.searchNameTerm = req.query.searchNameTerm ? String(req.query.searchNameTerm) : defaults.searchNameTerm
    queryParams.pageNumber = req.query.pageNumber? Number(req.query.pageNumber) : defaults.pageNumber
    queryParams.pageSize = req.query.pageSize ? Number(req.query.pageSize) : defaults.pageSize
    queryParams.sortBy = req.query.sortBy ? String(req.query.sortBy) : defaults.sortBy
    queryParams.sortDirection = req.query.sortDirection === 'asc' ? 1 : defaults.sortDirection
    return queryParams
}
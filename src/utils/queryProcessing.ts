import { Request } from "express";
import {QueryParams} from "../types/types";

export function queryProcessing (req: Request){
    let queryParams:QueryParams = {
        searchNameTerm: '/*',
        searchEmailTerm: '/*',
        searchLoginTerm: '/*',
        pageNumber: 1,
        pageSize: 1,
        sortBy: 'createdAt',
        sortDirection: -1
    }
    queryParams.searchNameTerm = req.query.searchNameTerm ? String(req.query.searchNameTerm) : queryParams.searchNameTerm
    queryParams.searchLoginTerm = req.query.searchLoginTerm ? String(req.query.searchLoginTerm) : queryParams.searchLoginTerm
    queryParams.searchEmailTerm = req.query.searchEmailTerm ? String(req.query.searchEmailTerm) : queryParams.searchEmailTerm
    queryParams.pageNumber = req.query.pageNumber? Number(req.query.pageNumber) : queryParams.pageNumber
    queryParams.pageSize = req.query.pageSize ? Number(req.query.pageSize) : queryParams.pageSize
    queryParams.sortBy = req.query.sortBy ? String(req.query.sortBy) : queryParams.sortBy
    queryParams.sortDirection = req.query.sortDirection === 'asc' ? 1 : queryParams.sortDirection
    return queryParams
}
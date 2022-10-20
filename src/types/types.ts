export type QueryParams = {
    searchNameTerm?: string,
    pageNumber?: number,
    pageSize?: number,
    sortBy?: string,
    sortDirection?: number
}

export type BlogsType = {
    id: string,
    name: string,
    youtubeUrl: string,
    createdAt: string
}

export type PostType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export type ResponseType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: BlogsType[] | PostType[]
}



export type QueryParams = {
    searchNameTerm: string,
    searchLoginTerm: string,
    searchEmailTerm: string,
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: -1 | 1
}

export type BlogsType = {
    id: string,
    name: string,
    websiteUrl: string,
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
    items: BlogsType[] | PostType[] | UsersType[]
}

export type UsersType = {
    id: string,
    login: string,
    email: string,
    salt: string,
    passHash?: string,
    createdAt: string,
    isConfirmed: boolean,
    emailConfirmation: {
        confirmationCode: string,
        expirationDate: Date
    }
    refreshTokens: {
        token?: string,
        isValid?: boolean
    }
}

export type CommentsType = {
    id: string,
    content: string,
    userId: string,
    userLogin: string,
    postId: string,
    createdAt: string
}
export type Job = {
    title: string,
    description: string,
    contactNumber: string,
    expireDate: string | Date,
    link?: string | undefined
}

export type JobResponse = {
    data: Job[],
    meta: {
        total: number
        page: number,
        limit: number,
    }
}
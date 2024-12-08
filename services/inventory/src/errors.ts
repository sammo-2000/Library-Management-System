// errors.ts
export class ApiError extends Error {
    public statusCode: number;
    
    constructor(message: string) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = 500;
    }
}

export class BadRequestError extends ApiError {
    
    constructor(message: string) {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = 400;
    }
}

export class NotFoundError extends ApiError {

    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}


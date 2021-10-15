export interface ErrorResponse {
    timestamp: Date;
    status: number;
    error: string;
    path: string;
    code: string;
    message: string;
    data: any;
}

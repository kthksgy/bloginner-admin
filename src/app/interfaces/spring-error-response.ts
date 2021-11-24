export interface SpringErrorResponse {
    timestamp: Date;
    status: number;
    error: string;
    message: string;
    path: string;
}

// Tipos gerais da API
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    status?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
}

export interface ApiError {
    status: number;
    message: string;
    details?: Record<string, unknown>;
    timestamp: string;
}

export interface ApiConfig {
    baseURL: string;
    timeout: number;
    headers: Record<string, string>;
}

// Tipo para dados desconhecidos com assinatura de índice
export type UnknownData = Record<string, unknown>;
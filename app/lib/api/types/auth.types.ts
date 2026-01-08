// Tipos para autenticação
export interface LoginCredentials {
    username: string;
    password: string;
    [key: string]: unknown; // Adicionar assinatura de índice
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    [key: string]: unknown; // Adicionar assinatura de índice
}

export interface AuthResponse {
    message: string;
    access_token: string;
    refresh_token: string;
    user: {
        id: number;
        username: string;
        email: string;
        is_active: boolean;
        is_admin: boolean;
        created_at: string;
        updated_at: string;
        [key: string]: unknown; // Adicionar assinatura de índice
    };
}

export interface TokenPayload {
    sub: number; // user id
    username: string;
    email: string;
    is_admin: boolean;
    exp: number;
    iat: number;
    role?: UserRole;
    [key: string]: unknown; // Adicionar assinatura de índice
}

export type UserRole = 'doador' | 'beneficiario' | 'admin';
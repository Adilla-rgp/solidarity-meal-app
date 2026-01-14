const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface LoginData {
    email: string;
    senha: string;
}

export interface RegisterData {
    email: string;
    senha: string;
    tipo: 'doador' | 'beneficiario';
    nome: string;
    telefone?: string;
    estabelecimento?: string;
    localizacao?: string;
    endereco?: string;
    necessidade?: string;
}

export interface AuthUser {
    id: number;
    email: string;
    tipo: 'doador' | 'beneficiario';
    nome?: string;
    telefone?: string;
    estabelecimento?: string;
    localizacao?: string;
    endereco?: string;
    necessidade?: string;
}

export interface AuthResponse {
    success: boolean;
    access_token?: string;
    user?: AuthUser;
    error?: string;
    message?: string;
}

class AuthService {
    private tokenKey = 'auth_token';
    private userKey = 'auth_user';

    async login(credentials: LoginData): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include' as RequestCredentials,
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            
            if (!response.ok) {
                return {
                    success: false,
                    error: data.error || 'Erro no login'
                };
            }

            if (data.success && data.access_token) {
                this.setToken(data.access_token);
                this.setUser(data.user);
                return {
                    success: true,
                    access_token: data.access_token,
                    user: data.user
                };
            }

            return {
                success: false,
                error: 'Resposta inválida do servidor'
            };

        } catch (error) {
            console.error('Erro no login:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Erro de conexão'
            };
        }
    }

    async register(userData: RegisterData): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include' as RequestCredentials,
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            
            if (!response.ok) {
                return {
                    success: false,
                    error: data.error || 'Erro no cadastro'
                };
            }

            if (data.success && data.access_token) {
                this.setToken(data.access_token);
                this.setUser(data.user);
                return {
                    success: true,
                    access_token: data.access_token,
                    user: data.user
                };
            }

            return {
                success: false,
                error: 'Resposta inválida do servidor'
            };

        } catch (error) {
            console.error('Erro no cadastro:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Erro de conexão'
            };
        }
    }

    async me(): Promise<AuthUser | null> {
        const token = this.getToken();
        if (!token) return null;

        try {
            const response = await fetch(`${API_URL}/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                credentials: 'include' as RequestCredentials
            });

            if (!response.ok) return null;
            
            const data = await response.json();
            if (data.success && data.user) {
                this.setUser(data.user);
                return data.user;
            }
            return null;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            return null;
        }
    }

    async logout(): Promise<void> {
        const token = this.getToken();
        if (token) {
            try {
                await fetch(`${API_URL}/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    },
                    credentials: 'include' as RequestCredentials
                });
            } catch (error) {
                console.error('Erro no logout:', error);
            }
        }
        this.removeToken();
        this.removeUser();
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            // Verificar se o token JWT não está expirado
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 > Date.now();
        } catch (error) {
            console.error('Erro ao verificar token:', error);
            return false;
        }
    }

    getToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(this.tokenKey);
    }

    getUser(): AuthUser | null {
        if (typeof window === 'undefined') return null;
        const userStr = localStorage.getItem(this.userKey);
        return userStr ? JSON.parse(userStr) : null;
    }

    private setToken(token: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.tokenKey, token);
        }
    }

    private setUser(user: AuthUser): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.userKey, JSON.stringify(user));
        }
    }

    private removeToken(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.tokenKey);
        }
    }

    private removeUser(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.userKey);
        }
    }
}

export const authService = new AuthService();
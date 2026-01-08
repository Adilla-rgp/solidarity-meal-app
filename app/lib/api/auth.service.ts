import { apiClient } from './client';
import { 
    LoginCredentials, 
    AuthResponse, 
    RegisterData,
    TokenPayload,
    UserRole 
} from './types/auth.types';
import { 
    RegisterDoadorData, 
    RegisterBeneficiarioData,
    Doador,
    Beneficiario
} from './types/user.types';
import { ApiResponse, UnknownData } from './types/api.types';

class AuthService {
    private readonly TOKEN_KEY = 'access_token';
    private readonly REFRESH_TOKEN_KEY = 'refresh_token';
    private readonly USER_KEY = 'user';

    // Login básico (para seu sistema atual)
    async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
        // Usar postTyped para dados tipados
        const response = await apiClient.postTyped<AuthResponse, LoginCredentials>('/login', credentials);
        
        if (response.success && response.data) {
            this.saveAuthData(response.data);
        }
        
        return response;
    }

    // Registro básico
    async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
        // Usar postTyped para dados tipados
        const response = await apiClient.postTyped<AuthResponse, RegisterData>('/register', data);
        
        if (response.success && response.data) {
            this.saveAuthData(response.data);
        }
        
        return response;
    }

    // Registro de doador (adaptado para seu sistema)
    async registerDoador(data: Omit<RegisterDoadorData, 'tipo'>): Promise<ApiResponse<Doador>> {
        // Primeiro registro básico
        const registerResponse = await this.register({
            username: data.username,
            email: data.email,
            password: data.password,
        });

        if (!registerResponse.success) {
            return {
                success: false,
                error: registerResponse.error,
                status: registerResponse.status,
                message: registerResponse.message,
            };
        }

        // Depois criar perfil de doador
        const doadorData: UnknownData = {
            user_id: registerResponse.data?.user.id,
            estabelecimento: data.estabelecimento,
            localizacao: data.localizacao,
            telefone: data.telefone,
            tipo: 'doador'
        };

        // Você precisará criar este endpoint no backend
        return await apiClient.post<Doador>('/users/doador', doadorData);
    }

    // Registro de beneficiário (adaptado para seu sistema)
    async registerBeneficiario(data: Omit<RegisterBeneficiarioData, 'tipo'>): Promise<ApiResponse<Beneficiario>> {
        // Primeiro registro básico
        const registerResponse = await this.register({
            username: data.username,
            email: data.email,
            password: data.password,
        });

        if (!registerResponse.success) {
            return {
                success: false,
                error: registerResponse.error,
                status: registerResponse.status,
                message: registerResponse.message,
            };
        }

        // Depois criar perfil de beneficiário
        const beneficiarioData: UnknownData = {
            user_id: registerResponse.data?.user.id,
            endereco: data.endereco,
            necessidade: data.necessidade,
            telefone: data.telefone,
            tipo: 'beneficiario'
        };

        // Você precisará criar este endpoint no backend
        return await apiClient.post<Beneficiario>('/users/beneficiario', beneficiarioData);
    }

    // Logout
    async logout(): Promise<void> {
        try {
            await apiClient.post('/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            this.clearAuthData();
        }
    }

    // Obter perfil do usuário atual
    async getCurrentUser(): Promise<ApiResponse<UnknownData>> {
        return await apiClient.get<UnknownData>('/me');
    }

    // Validar token
    async validateToken(): Promise<ApiResponse<{ valid: boolean }>> {
        return await apiClient.get<{ valid: boolean }>('/validate-token');
    }

    // Refresh token
    async refreshToken(): Promise<ApiResponse<{ access_token: string }>> {
        const refreshToken = this.getRefreshToken();
        
        if (!refreshToken) {
            return {
                success: false,
                error: 'Refresh token não encontrado'
            };
        }

        const response = await apiClient.post<{ access_token: string }>(
            '/refresh',
            {},
            {
                headers: {
                    'Authorization': `Bearer ${refreshToken}`
                }
            }
        );

        if (response.success && response.data) {
            this.setToken(response.data.access_token);
        }

        return response;
    }

    // Getters e Setters
    getToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(this.TOKEN_KEY);
    }

    setToken(token: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.TOKEN_KEY, token);
            apiClient.setAuthToken(token);
        }
    }

    getRefreshToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    setRefreshToken(token: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
        }
    }

    getUser(): UnknownData | null {
        if (typeof window === 'undefined') return null;
        const userStr = localStorage.getItem(this.USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    }

    setUser(user: UnknownData): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        }
    }

    // Verificar se está autenticado
    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;

        // Verificar se token não expirou
        try {
            const payload = this.decodeToken(token);
            return payload.exp > Date.now() / 1000;
        } catch {
            return false;
        }
    }

    // Decodificar token JWT
    decodeToken(token: string): TokenPayload {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    }

    // Métodos privados
    private saveAuthData(authData: AuthResponse): void {
        this.setToken(authData.access_token);
        this.setRefreshToken(authData.refresh_token);
        this.setUser(authData.user);
    }

    private clearAuthData(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.TOKEN_KEY);
            localStorage.removeItem(this.REFRESH_TOKEN_KEY);
            localStorage.removeItem(this.USER_KEY);
            apiClient.clearAuth();
        }
    }

    // Método para obter tipo de usuário do token
    getUserRole(): UserRole | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            const payload = this.decodeToken(token);
            // Você pode adicionar role no token no backend
            return (payload as TokenPayload & { role?: UserRole }).role || 'doador';
        } catch {
            return null;
        }
    }
}

// Exportar instância singleton
export const authService = new AuthService();
import { authService } from './auth.service';

// Definir URL da API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    [key: string]: unknown;
}

export interface Doacao {
    id: string;
    nome: string;
    doador: string;
    tipo: string;
    quantidade: number;
    validade: string;
    distancia: string;
    urgente?: boolean;
    imagem: string;
    status: "ativa" | "reservada" | "entregue";
    descricao?: string;
    unidade?: string;
    doador_estabelecimento?: string;
    created_at?: string;
}

export interface Reserva {
    id: string;
    beneficiario_id: number;
    doacao_id: string;
    status: "ativa" | "cancelada" | "concluida";
    data_reserva: string;
    data_conclusao?: string;
    doacao?: Doacao;
}

export interface Estatisticas {
    total_doacoes?: number;
    doacoes_ativas?: number;
    doacoes_reservadas?: number;
    doacoes_entregues?: number;
    doacoes_recentes?: number;
    total_reservas?: number;
    reservas_ativas?: number;
    reservas_concluidas?: number;
    reservas_canceladas?: number;
}

interface MockData {
    tiposAlimento: Array<{value: string, label: string}>;
    unidades: Array<{value: string, label: string}>;
}

interface DoacoesResponse {
    doacoes: Doacao[];
    total?: number;
}

interface ReservasResponse {
    reservas: Reserva[];
    total?: number;
}

interface EstatisticasResponse {
    estatisticas: Estatisticas;
}

interface GraficoResponse {
    dados: Array<{mes: string, quantidade: number}>;
}

class ApiClient {
    private async request<T>(
        endpoint: string, 
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const token = authService.getToken();
        
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers as Record<string, string>
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                headers,
                credentials: 'include' as RequestCredentials
            });
            
            let data: unknown = {};
            try {
                data = await response.json();
            } catch {
                // Se não conseguir parsear JSON, usar resposta vazia
            }
            
            if (!response.ok) {
                // Se token expirou, fazer logout
                if (response.status === 401) {
                    await authService.logout();
                }
                
                return {
                    success: false,
                    error: (data as {error?: string})?.error || `Erro ${response.status}: ${response.statusText}`
                };
            }
            
            return {
                success: true,
                data: data as T
            } as ApiResponse<T>;

            
        } catch (error) {
            console.error(`Erro na requisição ${endpoint}:`, error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Erro de conexão'
            };
        }
    }
    
    async get<T = unknown>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'GET' });
    }
    
    async post<T = unknown>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined
        });
    }
    
    async put<T = unknown>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: body ? JSON.stringify(body) : undefined
        });
    }
    
    async delete<T = unknown>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
    
    // Métodos específicos para doações
    async listarDoacoes(): Promise<ApiResponse<DoacoesResponse>> {
        return this.get<DoacoesResponse>('/doacoes');
    }
    
    async criarDoacao(doacaoData: Omit<Doacao, "id" | "doador" | "doador_estabelecimento" | "created_at">): Promise<ApiResponse<{doacao: Doacao}>> {
        return this.post<{doacao: Doacao}>('/doacoes', doacaoData);
    }
    
    async minhasDoacoes(): Promise<ApiResponse<DoacoesResponse>> {
        return this.get<DoacoesResponse>('/minhas-doacoes');
    }
    
    // Métodos específicos para reservas
    async criarReserva(doacaoId: string): Promise<ApiResponse<{reserva: Reserva}>> {
        return this.post<{reserva: Reserva}>('/reservas', { doacao_id: doacaoId });
    }
    
    async minhasReservas(): Promise<ApiResponse<ReservasResponse>> {
        return this.get<ReservasResponse>('/minhas-reservas');
    }
    
    async cancelarReserva(reservaId: string): Promise<ApiResponse> {
        return this.post(`/reservas/${reservaId}/cancelar`);
    }
    
    async concluirReserva(reservaId: string): Promise<ApiResponse> {
        return this.post(`/reservas/${reservaId}/concluir`);
    }
    
    // Métodos para estatísticas
    async getEstatisticas(): Promise<ApiResponse<EstatisticasResponse>> {
        return this.get<EstatisticasResponse>('/estatisticas');
    }
    
    async getGraficoMensal(): Promise<ApiResponse<GraficoResponse>> {
        return this.get<GraficoResponse>('/grafico-mensal');
    }
    
    // Métodos para mocks
    async getMocks(): Promise<ApiResponse<MockData>> {
        return this.get<MockData>('/mocks');
    }
}

export const apiClient = new ApiClient();
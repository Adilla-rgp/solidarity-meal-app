// Tipos para usuários do sistema
export interface BaseUser {
    id: number;
    username: string;
    email: string;
    telefone?: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
}

export interface Doador extends BaseUser {
    tipo: 'doador';
    estabelecimento: string;
    localizacao: string;
    cnpj?: string;
    endereco?: string;
}

export interface Beneficiario extends BaseUser {
    tipo: 'beneficiario';
    necessidade: string;
    situacao?: string;
    dependentes?: number;
    endereco?: string;
}

export type User = Doador | Beneficiario;

// Dados para registro
export interface RegisterDoadorData {
    username: string;
    email: string;
    password: string;
    telefone: string;
    estabelecimento: string;
    localizacao: string;
    tipo: 'doador';
}

export interface RegisterBeneficiarioData {
    username: string;
    email: string;
    password: string;
    telefone: string;
    endereco: string;
    necessidade: string;
    tipo: 'beneficiario';
}

export type RegisterUserData = RegisterDoadorData | RegisterBeneficiarioData;

// Resposta da API para usuário
export interface UserResponse {
    user: BaseUser & Partial<Doador> & Partial<Beneficiario>;
}
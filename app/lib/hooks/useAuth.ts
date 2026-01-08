import { useState, useCallback } from 'react';
import { authService } from '../api/auth.service';
import { LoginCredentials, RegisterData } from '../api/types/auth.types';

interface AuthOperationResult<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
}

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = useCallback(async (credentials: LoginCredentials): Promise<AuthOperationResult> => {
        setLoading(true);
        setError(null);

        try {
            const response = await authService.login(credentials);
            
            if (!response.success) {
                setError(response.error || 'Erro no login');
                return { success: false, error: response.error };
            }

            return { success: true, data: response.data };

        } catch (err) {
            const message = err instanceof Error ? err.message : 'Erro desconhecido';
            setError(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (data: RegisterData): Promise<AuthOperationResult> => {
        setLoading(true);
        setError(null);

        try {
            const response = await authService.register(data);
            
            if (!response.success) {
                setError(response.error || 'Erro no registro');
                return { success: false, error: response.error };
            }

            return { success: true, data: response.data };

        } catch (err) {
            const message = err instanceof Error ? err.message : 'Erro desconhecido';
            setError(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async (): Promise<void> => {
        await authService.logout();
    }, []);

    const isAuthenticated = useCallback((): boolean => {
        return authService.isAuthenticated();
    }, []);

    const getCurrentUser = useCallback(() => {
        return authService.getUser();
    }, []);

    return {
        login,
        register,
        logout,
        isAuthenticated,
        getCurrentUser,
        loading,
        error,
        clearError: () => setError(null),
    };
} 
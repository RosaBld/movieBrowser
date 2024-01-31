import { useContext } from 'react';
import { LoginSessionContext } from './LogginProvider';

export function useLoginSession() {
    const context = useContext(LoginSessionContext);
    if (!context) {
        throw new Error('useLoginSession must be used within a LoginSessionProvider');
    }
    return context;
}
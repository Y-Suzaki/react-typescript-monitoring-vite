import { useContext } from 'react';
import { AuthContext } from '../providers/UseAuthProvider';
import { AuthContextType } from '../types/AuthContextType';

export const useAuth = (): AuthContextType => useContext(AuthContext);

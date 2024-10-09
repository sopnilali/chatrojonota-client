import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

export const useAuth = () => {
    const all = useContext(AuthContext)
    return all;
};
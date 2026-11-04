export enum Rol { Admin = 'admin', User = 'user' }

export interface Usuario { id: string; nombre: string; email: string; rol: Rol; }
export interface AuthResponse { token: string; user: Usuario; }
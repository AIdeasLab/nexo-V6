export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  description?: string;
  activeProjects: number;
  completedProjects: number;
}
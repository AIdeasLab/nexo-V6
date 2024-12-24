import { supabase } from './supabase';
import { Client } from '../types';
import { Project } from '../types';

export async function getClients() {
  const { data: clients, error } = await supabase
    .from('clients')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching clients:', error);
    return [];
  }

  const { data: projects } = await supabase
    .from('projects')
    .select('client_id, status')
    .not('client_id', 'is', null);

  const projectCounts = projects?.reduce((acc: Record<string, { active: number, completed: number }>, project) => {
    if (!project.client_id) return acc;
    
    if (!acc[project.client_id]) {
      acc[project.client_id] = { active: 0, completed: 0 };
    }
    
    if (project.status === 'active') {
      acc[project.client_id].active++;
    } else if (project.status === 'completed') {
      acc[project.client_id].completed++;
    }
    
    return acc;
  }, {});

  return clients.map(client => ({
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    description: client.description,
    activeProjects: projectCounts?.[client.id]?.active || 0,
    completedProjects: projectCounts?.[client.id]?.completed || 0
  }));
}

export async function getClientProjects(clientId: string): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('client_id', clientId)
    .eq('category', 'events')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching client projects:', error);
    return [];
  }

  return data;
}

export async function createClient(client: Omit<Client, 'id' | 'activeProjects' | 'completedProjects'>) {
  const { data, error } = await supabase
    .from('clients')
    .insert([{
      name: client.name,
      email: client.email,
      phone: client.phone,
      description: client.description
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateClient(id: string, updates: Partial<Client>) {
  const { data, error } = await supabase
    .from('clients')
    .update({
      name: updates.name,
      email: updates.email,
      phone: updates.phone,
      description: updates.description
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteClient(id: string) {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
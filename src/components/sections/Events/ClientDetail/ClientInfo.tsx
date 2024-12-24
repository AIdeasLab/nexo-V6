import React from 'react';
import { Mail, Phone, Calendar, FileText } from 'lucide-react';
import { Client } from '../../../../types';

interface ClientInfoProps {
  client: Client;
}

export default function ClientInfo({ client }: ClientInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Informações do Cliente</h2>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <FileText className="h-5 w-5 text-gray-400 mr-3 mt-1" />
          <div>
            <p className="text-sm font-medium text-gray-900">Descrição</p>
            <p className="text-sm text-gray-500">{client.description || 'Sem descrição'}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Mail className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900">Email</p>
            <p className="text-sm text-gray-500">{client.email || 'Não informado'}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Phone className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900">Telefone</p>
            <p className="text-sm text-gray-500">{client.phone || 'Não informado'}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900">Projetos</p>
            <p className="text-sm text-gray-500">
              {client.activeProjects} ativos · {client.completedProjects} concluídos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
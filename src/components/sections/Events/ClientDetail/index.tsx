import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ProjectList from './ProjectList';
import ClientInfo from './ClientInfo';
import { Client } from '../../../../types';

interface ClientDetailProps {
  client: Client;
  onBack: () => void;
}

export default function ClientDetail({ client, onBack }: ClientDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
          <p className="text-sm text-gray-500">Detalhes do Cliente</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ClientInfo client={client} />
        </div>
        <div className="lg:col-span-2">
          <ProjectList clientId={client.id} />
        </div>
      </div>
    </div>
  );
}
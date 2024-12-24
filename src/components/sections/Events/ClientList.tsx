import React from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { getClients, deleteClient } from '../../../lib/clients';
import ClientForm from './ClientForm';
import ClientDetail from './ClientDetail';
import { Client } from '../../../types';

export default function ClientList() {
  const [clients, setClients] = React.useState<Client[]>([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editingClient, setEditingClient] = React.useState<Client | null>(null);
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(null);

  async function loadClients() {
    const clientList = await getClients();
    setClients(clientList);
  }

  React.useEffect(() => {
    loadClients();
  }, []);

  async function handleDelete(clientId: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await deleteClient(clientId);
        await loadClients();
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('Erro ao excluir cliente. Por favor, tente novamente.');
      }
    }
  }

  if (selectedClient) {
    return (
      <ClientDetail
        client={selectedClient}
        onBack={() => setSelectedClient(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Clientes</h2>
        <button
          onClick={() => {
            setEditingClient(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-5 w-5 mr-1" />
          Novo Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedClient(client)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{client.name}</h3>
                <p className="text-sm text-gray-500">{client.email}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingClient(client);
                    setShowForm(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => handleDelete(client.id, e)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {client.description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{client.description}</p>
            )}

            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Telefone:</span> {client.phone}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Projetos Ativos:</span> {client.activeProjects}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Projetos Concluídos:</span> {client.completedProjects}
              </p>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <ClientForm
          client={editingClient}
          onClose={() => {
            setShowForm(false);
            setEditingClient(null);
          }}
          onSave={() => {
            loadClients();
            setShowForm(false);
            setEditingClient(null);
          }}
        />
      )}
    </div>
  );
}
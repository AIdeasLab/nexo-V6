import React from 'react';
import ClientList from './ClientList';

export default function Events() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Eventos</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gestão de Clientes e Eventos
        </p>
      </div>

      <ClientList />
    </div>
  );
}
import React from 'react';
import { Plus } from 'lucide-react';
import { getClientProjects } from '../../../../lib/clients';
import { Project } from '../../../../types';
import ProjectCard from './ProjectCard';
import ProjectForm from '../../../ProjectForm';

interface ProjectListProps {
  clientId: string;
}

export default function ProjectList({ clientId }: ProjectListProps) {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [showForm, setShowForm] = React.useState(false);

  async function loadProjects() {
    const projectList = await getClientProjects(clientId);
    setProjects(projectList);
  }

  React.useEffect(() => {
    loadProjects();
  }, [clientId]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Projetos</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-5 w-5 mr-1" />
          Novo Projeto
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project}
            onUpdate={loadProjects}
          />
        ))}
        
        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum projeto encontrado.
          </div>
        )}
      </div>

      {showForm && (
        <ProjectForm
          category="events"
          clientId={clientId}
          onClose={() => setShowForm(false)}
          onProjectCreated={() => {
            loadProjects();
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}
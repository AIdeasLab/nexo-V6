import React from 'react';
import { Calendar, MapPin, CheckSquare, Trash2, Edit2 } from 'lucide-react';
import { Project } from '../../../../types';
import { deleteProject } from '../../../../lib/projects';
import ProjectForm from '../../../ProjectForm';

interface ProjectCardProps {
  project: Project;
  onUpdate: () => void;
}

export default function ProjectCard({ project, onUpdate }: ProjectCardProps) {
  const [showEditForm, setShowEditForm] = React.useState(false);

  async function handleDelete() {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      try {
        await deleteProject(project.id);
        onUpdate();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Erro ao excluir projeto. Por favor, tente novamente.');
      }
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
            <p className="text-sm text-gray-500">{project.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowEditForm(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            Prazo: {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'Não definido'}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {project.location || 'Local não definido'}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CheckSquare className="h-4 w-4 mr-2" />
            {project.completedTasks} de {project.totalTasks} tarefas concluídas
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 rounded-full h-2 transition-all duration-500"
              style={{ width: `${(project.completedTasks || 0) / (project.totalTasks || 1) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {showEditForm && (
        <ProjectForm
          project={project}
          category="events"
          clientId={project.clientId}
          onClose={() => setShowEditForm(false)}
          onProjectCreated={() => {
            onUpdate();
            setShowEditForm(false);
          }}
        />
      )}
    </>
  );
}
import { useState } from 'react'
import { Edit, Trash2, Plus } from 'lucide-react'
import useProjects from '../hooks/useProjects'
import EditModal from '../components/EditModal'
import CreateModal from '../components/CreateModal'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

function ProjectList() {
    const {
    projects,
    stats,
    loading,
    error,
    handleDelete,
    handleEditSubmit,
    handleCreate,
    } = useProjects()

    const [selected, setSelected] = useState(null)
    const [showCreateModal, setShowCreateModal] = useState(false)

    const chartData = stats
    ? [
        { estado: 'Finalizados', cantidad: stats.finalizados },
        { estado: 'En proceso', cantidad: stats.enProceso },
        ]
    : [];

    if (loading) return <p className="text-blue-600">Cargando proyectos...</p>
    if (error) return <p className="text-red-500">Error: {error.message}</p>
    return (
    <div className="p-6 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-3 mb-6 md:flex-row md:justify-between">
            <h1 className="text-3xl font-bold text-blue-900">Proyectos</h1>
            <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
            <Plus size={18} /> Crear nuevo proyecto
            </button>
        </div>

        {stats && (
            <div className="mb-8 bg-white p-4 rounded shadow max-w-xl mx-auto">
            <h2 className="text-lg font-semibold mb-4 text-center">Proyectos por Estado</h2>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="estado" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#3b82f6" />
                </BarChart>
            </ResponsiveContainer>
            </div>
        )}

        <ul className="space-y-6">
            {projects.map((p) => (
            <li
                key={p.id}
                className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-200 flex justify-between items-center"
            >
                <div className="space-y-1">
                <p className="text-xl font-semibold text-gray-800">{p.nombre}</p>
                <p className="text-sm text-gray-600">{p.descripcion}</p>
                <p className="text-sm text-gray-600">
                    <strong>Inicio:</strong> {p.fechaInicio?.split('T')[0]}
                </p>
                <p className="text-sm text-gray-600">
                    <strong>Fin:</strong> {p.fechaFin?.split('T')[0]}
                </p>
                <p
                    className={`text-sm font-medium ${
                    p.estado ? 'text-green-600' : 'text-yellow-600'
                    }`}
                >
                    {p.estado ? '✅ Finalizado' : '🕒 En proceso'}
                </p>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2 ml-5">
                <button
                    onClick={() => setSelected(p)}
                    className="text-yellow-600 hover:text-yellow-800"
                    title="Editar"
                >
                    <Edit size={20} />
                </button>
                <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Eliminar"
                >
                    <Trash2 size={20} />
                </button>
                </div>
            </li>
            ))}
        </ul>

        {selected && (
            <EditModal
            project={selected}
            onClose={() => setSelected(null)}
            onSubmit={handleEditSubmit}
            />
        )}

        {showCreateModal && (
            <CreateModal
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreate}
            />
        )}
        </div>
    </div>
    )
}

export default ProjectList

import { useState, useEffect } from 'react'

function EditModal({ project, onClose, onSubmit }) {
const [form, setForm] = useState({
    nombre: project.nombre || '',
    descripcion: project.descripcion || '',
    fechaInicio: project.fechaInicio?.split('T')[0] || '',
    fechaFin: project.fechaFin?.split('T')[0] || '',
    estado: project.estado || false,
    });

    const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
    }));
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(project.id, form)
    onClose();
    };

  // Cierre con Escape o clic fuera
    useEffect(() => {
    const listener = (e) => {
        if (e.key === 'Escape') onClose()
    };
    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
    }, [onClose]);

    return (
    <div
    className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={onClose}
>
        <div
        className="bg-white p-6 rounded shadow-md w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()}
        >
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Editar Proyecto</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
            </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full border rounded p-2"
            />
            <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            className="w-full border rounded p-2"
            />
            <input
            type="date"
            name="fechaInicio"
            value={form.fechaInicio}
            onChange={handleChange}
            className="w-full border rounded p-2"
            />
            <input
            type="date"
            name="fechaFin"
            value={form.fechaFin}
            onChange={handleChange}
            className="w-full border rounded p-2"
            />
            <label className="flex items-center space-x-2">
            <input
                type="checkbox"
                name="estado"
                checked={form.estado}
                onChange={handleChange}
            />
            <span>{form.estado ? 'Finalizado' : 'En proceso'}</span>
            </label>
            <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
            Guardar Cambios
            </button>
        </form>
        </div>
    </div>
    );
}

export default EditModal

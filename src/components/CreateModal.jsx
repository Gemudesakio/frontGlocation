import { useState, useEffect } from 'react';

    function CreateModal({ onClose, onSubmit }) {
    const [form, setForm] = useState({
        nombre: '',
        descripcion: '',
        fechaInicio: '',
        fechaFin: '',
        estado: false,
    });

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev || ''; };
    }, []);

    useEffect(() => {
        const onEsc = (e) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', onEsc);
        return () => document.removeEventListener('keydown', onEsc);
    }, [onClose]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        onClose();
    };

    return (
        <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
        role="dialog" aria-modal="true"
        >
        <div className="flex h-full w-full items-end sm:items-center sm:justify-center">
            <div
            className="w-full sm:w-auto sm:max-w-md bg-white shadow-xl
                        rounded-t-2xl sm:rounded-xl
                        mx-0 sm:mx-4
                        max-h-[80svh] sm:max-h-[85vh]
                        overflow-y-auto overflow-x-hidden
                        p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
            >
        
            <div className="sm:hidden mx-auto mb-3 h-1.5 w-12 rounded-full bg-gray-300" />

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Crear Proyecto</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="w-full min-w-0 border rounded p-2"
                />
                <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Descripción"
                className="w-full min-w-0 border rounded p-2 min-h-[96px]"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                    type="date"
                    name="fechaInicio"
                    value={form.fechaInicio}
                    onChange={handleChange}
                    className="w-full min-w-0 border rounded p-2"
                />
                <input
                    type="date"
                    name="fechaFin"
                    value={form.fechaFin}
                    onChange={handleChange}
                    className="w-full min-w-0 border rounded p-2"
                />
                </div>

                <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="estado"
                    checked={form.estado}
                    onChange={handleChange}
                />
                <span>{form.estado ? 'Finalizado' : 'En proceso'}</span>
                </label>

                <div className="flex justify-end">
                <button
                    type="submit"
                    className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Crear Proyecto
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
    }

    export default CreateModal;

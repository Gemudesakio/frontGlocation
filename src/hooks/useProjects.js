import { useEffect, useState } from 'react'
import {getAllProjects, deleteProject, updateProject, createProject,getProjectStats, getSummary} from '../services/projectService'
import ReactMarkdown from 'react-markdown'

const useProjects = () => {
    const [projects, setProjects] = useState([])
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchProjects = () => {
    setLoading(true);
    getAllProjects()
        .then(setProjects)
        .catch(setError)
        .finally(() => setLoading(false))
    };
        const fetchStats = async () => {
    try {
        const res = await getProjectStats()
        setStats(res);
    } catch (err) {
        console.error('Error al obtener estadísticas:', err)
    }
    };

    useEffect(() => {
    fetchProjects()
        fetchStats()
    }, []);

    const handleDelete = async (id) => {
    try {
        await deleteProject(id);
        setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
        setError(err)
    }
    };

const handleEditSubmit = async (id, newData) => {
    try {
    const updated = await updateProject(id, newData);
    setProjects((prev) =>
    prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    await fetchStats()
    } catch (err) {
    setError(err)
    }
};


const handleCreate = async (data) => {
    try {
    const newProject = await createProject(data)

    setProjects((prev) => [...prev, newProject])
    await fetchStats()
    } catch (err) {
    console.error('Error al crear proyecto:', err)
    }
};
const useProjectSummary = () => {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    getSummary()
        .then(setSummary)
        .catch(setError)
        .finally(() => setLoading(false));
    }, []);

    return { summary, loading, error };
};



    return { projects, stats, loading, error, handleDelete, handleEditSubmit, handleCreate, useProjectSummary }
};

export default useProjects

import { api } from '@/lib/axios'
import type {
 Task,
 PaginatedTasks,
 ListTasksParams,
 CreateTaskData,
 UpdateTaskData
} from '@jungle/types'

export async function getTasks(params: Partial<ListTasksParams>) {
 const { data } = await api.get<PaginatedTasks>('/tasks', { params })
 return data
}

export async function getTaskById(id: string) {
 const { data } = await api.get<Task>(`/tasks/${id}`)
 return data
}

export async function createTask(payload: CreateTaskData) {
 const { data } = await api.post<Task>('/tasks', payload)
 return data
}

export async function updateTask(id: string, payload: UpdateTaskData) {
 const { data } = await api.put<Task>(`/tasks/${id}`, payload)
 return data
}

export async function deleteTask(id: string) {
 await api.delete(`/tasks/${id}`)
}



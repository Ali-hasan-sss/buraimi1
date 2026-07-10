'use server'

import dbConnect from '@/lib/dbConnect';
import { Project } from '@/models/Project';
import { revalidatePath } from 'next/cache';

// CREATE
export async function createProject(formData: FormData) {
    await dbConnect();
    const rawData = {
        title: formData.get('title'),
        description: formData.get('description'),
    };
    await Project.create(rawData);
    revalidatePath('/projects'); // Refresh the UI automatically
}

// UPDATE
export async function updateProjectStatus(id: string, status: string) {
    await dbConnect();
    await Project.findByIdAndUpdate(id, { status });
    revalidatePath('/projects');
}

// DELETE
export async function deleteProject(id: string) {
    await dbConnect();
    await Project.findByIdAndDelete(id);
    revalidatePath('/projects');
}
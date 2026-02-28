'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function submitPlaceAction(formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const city = formData.get('city') as string;
    const category = formData.get('category') as string;
    const halalStatus = formData.get('halalStatus') as string;

    // TODO: Add proper validation using Zod
    if (!name || !description || !city || !category || !halalStatus) {
        throw new Error('All fields are required.');
    }

    // TODO: Get actual logged in user ID
    // For MVP, we will use the admin user ID or a hardcoded one if no auth yet
    const user = await prisma.user.findFirst();
    if (!user) {
        throw new Error('No user found to associate submission.');
    }

    try {
        await prisma.restaurant.create({
            data: {
                name,
                description,
                city,
                category,
                halalStatus,
                verified: false, // Pending approval
                createdBy: user.id,
            },
        });
    } catch (error) {
        console.error('Failed to submit place:', error);
        throw new Error('Failed to submit place. Please try again.');
    }

    redirect('/explore?submitted=true');
}

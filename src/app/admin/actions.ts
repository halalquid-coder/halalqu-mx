'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function approveRestaurantAction(id: string) {
    // TODO: Add Auth check to ensure user is ADMIN

    try {
        await prisma.restaurant.update({
            where: { id },
            data: { verified: true },
        });
        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        console.error('Failed to approve restaurant:', error);
        return { error: 'Failed to approve.' };
    }
}

export async function rejectRestaurantAction(id: string) {
    // TODO: Add Auth check to ensure user is ADMIN

    try {
        await prisma.restaurant.delete({
            where: { id },
        });
        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        console.error('Failed to reject restaurant:', error);
        return { error: 'Failed to reject.' };
    }
}

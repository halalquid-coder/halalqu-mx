import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10)

    // Create an admin user if not exists
    const admin = await prisma.user.upsert({
        where: { email: 'admin@halalqu.com' },
        update: {},
        create: {
            email: 'admin@halalqu.com',
            name: 'Admin Halalqu',
            password: hashedPassword,
            role: 'ADMIN',
        },
    })

    console.log({ admin })

    // Seed initial restaurants
    const places = [
        {
            name: 'Wong Solo',
            description: 'Authentic Indonesian grilled chicken with special sambal from Solo.',
            city: 'Jakarta',
            category: 'Restaurant',
            halalStatus: 'Certified',
            verified: true,
            createdBy: admin.id,
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1000',
            latitude: -6.2088,
            longitude: 106.8456,
        },
        {
            name: 'Sari Ratu',
            description: 'Premium Nasi Padang with comfortable seating and excellent service.',
            city: 'Jakarta',
            category: 'Restaurant',
            halalStatus: 'Certified',
            verified: true,
            createdBy: admin.id,
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000',
            latitude: -6.2250,
            longitude: 106.8200,
        },
        {
            name: 'Warung Steak & Shake',
            description: 'Affordable steaks and milkshakes, perfect for students and families.',
            city: 'Bandung',
            category: 'Restaurant',
            halalStatus: 'Certified',
            verified: true,
            createdBy: admin.id,
            image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=1000',
            latitude: -6.8950,
            longitude: 107.6150,
        },
        {
            name: 'Kopi Kenangan (Dipatiukur)',
            description: 'Popular coffee chain serving signature milk coffee with palm sugar.',
            city: 'Bandung',
            category: 'Cafe',
            halalStatus: 'Certified',
            verified: true,
            createdBy: admin.id,
            image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1000',
            latitude: -6.8900,
            longitude: 107.6160,
        },
        {
            name: 'Sate Maranggi Haji Yetty',
            description: 'Legendary beef satay marinated in special sweet soy sauce and spices.',
            city: 'Purwakarta',
            category: 'Street Food',
            halalStatus: 'MuslimOwned',
            verified: true,
            createdBy: admin.id,
            image: 'https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?auto=format&fit=crop&q=80&w=1000',
            latitude: -6.5568,
            longitude: 107.4439,
        },
        {
            name: 'Sushi Tei (Plaza Senayan)',
            description: 'Premium Japanese cuisine with fresh ingredients and authentic taste.',
            city: 'Jakarta',
            category: 'Restaurant',
            halalStatus: 'Certified',
            verified: true,
            createdBy: admin.id,
            image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=1000',
            latitude: -6.2250,
            longitude: 106.7990,
        }
    ]

    for (const place of places) {
        const createdPlace = await prisma.restaurant.create({
            data: place
        })
        console.log(`Created place: ${createdPlace.name}`)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

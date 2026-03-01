import prisma from '@/lib/prisma';

export const dynamic = "force-dynamic";

export default async function TestPage() {
    try {
        const users = await prisma.user.findMany({ take: 1 });
        return <pre>DB Success: {JSON.stringify(users, null, 2)}</pre>;
    } catch (e: any) {
        return <pre>DB Error: {e.message || e.toString()}</pre>;
    }
}

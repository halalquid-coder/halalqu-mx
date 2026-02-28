import { Badge } from '@/components/ui/badge';

type HalalStatus = 'Certified' | 'Community' | 'MuslimOwned' | 'SelfClaimed';

interface HalalBadgeProps {
    status: HalalStatus;
}

export function HalalBadge({ status }: HalalBadgeProps) {
    switch (status) {
        case 'Certified':
            return (
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80 border-emerald-200">
                    MUI Certified
                </Badge>
            );
        case 'Community':
            return (
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100/80 border-blue-200">
                    Community Verified
                </Badge>
            );
        case 'MuslimOwned':
            return (
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100/80 border-purple-200">
                    Muslim Owned
                </Badge>
            );
        case 'SelfClaimed':
            return (
                <Badge variant="outline" className="text-amber-700 border-amber-300 bg-amber-50 hover:bg-amber-50/80">
                    Self Claimed
                </Badge>
            );
        default:
            return null;
    }
}

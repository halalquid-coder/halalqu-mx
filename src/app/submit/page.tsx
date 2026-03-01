import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { submitPlaceAction } from './actions';

export const dynamic = "force-dynamic";

export default function SubmitPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Add a Halal Place</h1>
                <p className="text-muted-foreground">
                    Found a great halal spot? Share it with the community. All submissions will be reviewed before appearing publicly.
                </p>
            </div>

            <div className="bg-white dark:bg-zinc-950 p-6 md:p-8 rounded-2xl shadow-sm border">
                <form action={submitPlaceAction} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Business Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="e.g. Sate Maranggi Haji Yetty"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="What makes this place special?"
                            rows={4}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                name="city"
                                placeholder="e.g. Jakarta, Bandung"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <select
                                id="category"
                                name="category"
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="Restaurant">Restaurant</option>
                                <option value="Cafe">Cafe</option>
                                <option value="Street Food">Street Food</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="halalStatus">Halal Status Claim</Label>
                        <select
                            id="halalStatus"
                            name="halalStatus"
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                        >
                            <option value="">Select status</option>
                            <option value="Certified">MUI Certified</option>
                            <option value="MuslimOwned">Muslim Owned</option>
                            <option value="Community">Community Verified</option>
                            <option value="SelfClaimed">Self Claimed</option>
                        </select>
                        <p className="text-xs text-muted-foreground mt-1">
                            Please provide the most accurate status you know. Our team will verify this claim.
                        </p>
                    </div>

                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                        Submit for Review
                    </Button>
                </form>
            </div>
        </div>
    );
}

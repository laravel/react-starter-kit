import { useState, ChangeEvent, FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ProfileWizardProps {
    onComplete?: () => void;
}

const ProfileWizard = ({ onComplete }: ProfileWizardProps) => {
    const [step, setStep] = useState(1);

    // ✅ All form fields are now in a single `useForm` hook.
    const { data, setData, post, processing, errors } = useForm({
        phone: '',
        address: '',
    });

    // ✅ Simplified change handler for all inputs.
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('profile.complete'), {
            onSuccess: () => {
                if (onComplete) {
                    onComplete();
                }
            },
        });
    };

    return (
        // ✅ The component now returns a single form element.
        <form onSubmit={handleSubmit}>
            {step === 1 && (
                <div>
                    <h2 className="text-xl font-bold mb-4">Step 1: Personal Information</h2>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        {/* ✅ Input is correctly bound to `data.phone` */}
                        <Input
                            id="phone"
                            name="phone"
                            placeholder="e.g., +1234567890"
                            value={data.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                    </div>
                    {/* ✅ "Next" button has type="button" to prevent form submission */}
                    <Button type="button" onClick={nextStep} className="mt-4" disabled={processing}>
                        Next
                    </Button>
                </div>
            )}
            {step === 2 && (
                <div>
                    <h2 className="text-xl font-bold mb-4">Step 2: Address Information</h2>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        {/* ✅ Input is correctly bound to `data.address` */}
                        <Input
                            id="address"
                            name="address"
                            placeholder="123 Main St, Anytown, USA"
                            value={data.address}
                            onChange={handleChange}
                        />
                        {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
                    </div>
                    <div className="flex gap-2 mt-4">
                        <Button type="button" variant="secondary" onClick={prevStep} disabled={processing}>
                            Back
                        </Button>
                        {/* ✅ "Finish" button has type="submit" */}
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Finishing...' : 'Finish'}
                        </Button>
                    </div>
                </div>
            )}
        </form>
    );
};

export default ProfileWizard;

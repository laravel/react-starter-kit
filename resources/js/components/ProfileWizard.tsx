import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Building, MapPin, User, Info } from 'lucide-react';

interface ProfileWizardProps {
    onComplete?: () => void;
}

// --- Options (Moved outside for cleanliness) ---
const companyTypeOptions = [
    { value: 'service', label: 'خدمي (Service)' },
    { value: 'industrial', label: 'صناعي (Industrial)' },
    { value: 'commercial', label: 'تجاري (Commercial)' },
];

const regionOptions = [
    { value: 'central', label: 'Central Region (المنطقة الوسطى)' },
    { value: 'eastern', label: 'Eastern Region (المنطقة الشرقية)' },
    { value: 'western', label: 'Western Region (المنطقة الغربية)' },
    { value: 'northern', label: 'Northern Region (المنطقة الشمالية)' },
    { value: 'southern', label: 'Southern Region (المنطقة الجنوبية)' },
];

const employeeTypeOptions = [
    { value: 'owner', label: 'المالك (Owner)' },
    { value: 'chairman', label: 'رئيس مجلس الاداره (Chairman)' },
    { value: 'gm', label: 'المدير العام (General Manager)' },
    { value: 'ceo', label: 'المدير التنفيذي (CEO)' },
    { value: 'manager', label: 'مدير اداره (Department Manager)' },
    { value: 'head', label: 'رئيس قسم (Head of Department)' },
    { value: 'employee', label: 'موظف مفوض (Authorized Employee)' },
];

// --- Wizard Step Component ---
interface StepProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

const WizardStep = ({ title, description, icon, children }: StepProps) => (
    <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {icon}
                </div>
                <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="space-y-6">{children}</CardContent>
    </Card>
);

const ProfileWizard = ({ onComplete }: ProfileWizardProps) => {
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    const { data, setData, post, processing, errors } = useForm({
        company_name_ar: '',
        company_name_en: '',
        company_type: '',
        region: '',
        city: '',
        employee_name_ar: '',
        employee_name_en: '',
        employee_type: '',
        phone: '',
        website: '',
        notes: '',
        how_did_you_hear: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('profile.complete'), {
            onSuccess: () => {
                if (onComplete) onComplete();
            },
        });
    };

    const progress = (step / totalSteps) * 100;

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
            {/* Progress Bar */}
            <div className="space-y-2">
                <Progress value={progress} />
                <p className="text-sm text-muted-foreground text-center">Step {step} of {totalSteps}</p>
            </div>

            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <WizardStep title="Company Information" description="Tell us about your company." icon={<Building/>}>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="company_name_ar">Company Name (Arabic)</Label>
                                <Input id="company_name_ar" name="company_name_ar" value={data.company_name_ar} onChange={handleChange} />
                                {errors.company_name_ar && <p className="text-sm text-red-500">{errors.company_name_ar}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company_name_en">Company Name (English)</Label>
                                <Input id="company_name_en" name="company_name_en" value={data.company_name_en} onChange={handleChange} />
                                {errors.company_name_en && <p className="text-sm text-red-500">{errors.company_name_en}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company_type">Company Type</Label>
                            <Select value={data.company_type} onValueChange={(value) => setData('company_type', value)}>
                                <SelectTrigger id="company_type"><SelectValue placeholder="Select type..." /></SelectTrigger>
                                <SelectContent>{companyTypeOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
                            </Select>
                            {errors.company_type && <p className="text-sm text-red-500">{errors.company_type}</p>}
                        </div>
                    </WizardStep>
                )}

                {step === 2 && (
                    <WizardStep title="Location Details" description="Where is your company based?" icon={<MapPin/>}>
                        <div className="space-y-2">
                            <Label htmlFor="region">Region</Label>
                            <Select value={data.region} onValueChange={(value) => setData('region', value)}>
                                <SelectTrigger id="region"><SelectValue placeholder="Select region..." /></SelectTrigger>
                                <SelectContent>{regionOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
                            </Select>
                            {errors.region && <p className="text-sm text-red-500">{errors.region}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" name="city" value={data.city} onChange={handleChange} />
                            {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                        </div>
                    </WizardStep>
                )}

                {step === 3 && (
                    <WizardStep title="Contact Person" description="Who should we get in touch with?" icon={<User/>}>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="employee_name_ar">Full Name (Arabic)</Label>
                                <Input id="employee_name_ar" name="employee_name_ar" value={data.employee_name_ar} onChange={handleChange} />
                                {errors.employee_name_ar && <p className="text-sm text-red-500">{errors.employee_name_ar}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="employee_name_en">Full Name (English)</Label>
                                <Input id="employee_name_en" name="employee_name_en" value={data.employee_name_en} onChange={handleChange} />
                                {errors.employee_name_en && <p className="text-sm text-red-500">{errors.employee_name_en}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="employee_type">Job Title / Role</Label>
                            <Select value={data.employee_type} onValueChange={(value) => setData('employee_type', value)}>
                                <SelectTrigger id="employee_type"><SelectValue placeholder="Select role..." /></SelectTrigger>
                                <SelectContent>{employeeTypeOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
                            </Select>
                            {errors.employee_type && <p className="text-sm text-red-500">{errors.employee_type}</p>}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" name="phone" value={data.phone} onChange={handleChange} />
                                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="website">Website (Optional)</Label>
                                <Input id="website" name="website" value={data.website} onChange={handleChange} />
                                {errors.website && <p className="text-sm text-red-500">{errors.website}</p>}
                            </div>
                        </div>
                    </WizardStep>
                )}

                {step === 4 && (
                    <WizardStep title="Final Details" description="Just a couple more things." icon={<Info/>}>
                        <div className="space-y-2">
                            <Label htmlFor="how_did_you_hear">How did you hear about us?</Label>
                            <Input id="how_did_you_hear" name="how_did_you_hear" value={data.how_did_you_hear} onChange={handleChange} />
                            {errors.how_did_you_hear && <p className="text-sm text-red-500">{errors.how_did_you_hear}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="notes">Additional Notes (Optional)</Label>
                            <Textarea id="notes" name="notes" value={data.notes} onChange={handleChange} />
                            {errors.notes && <p className="text-sm text-red-500">{errors.notes}</p>}
                        </div>
                    </WizardStep>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
                    <Button type="button" variant="ghost" onClick={prevStep} disabled={step === 1 || processing}>
                        Back
                    </Button>
                    {step < totalSteps && (
                        <Button type="button" onClick={nextStep} disabled={processing}>
                            Next
                        </Button>
                    )}
                    {step === totalSteps && (
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Finishing...' : 'Finish'}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProfileWizard;

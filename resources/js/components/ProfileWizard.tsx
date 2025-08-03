import { useState } from 'react';
import { useState, ChangeEvent, FormEvent } from 'react';
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

interface ProfileWizardProps {
  onComplete?: () => void;
}

const companyTypeOptions = [
  { value: '1', label: 'خدمي (Service)' },
  { value: '2', label: 'صناعي (Industrial)' },
  { value: '3', label: 'تجاري (Commercial)' },
];

const regionOptions = [
  { value: 'central', label: 'Central Region (المنطقة الوسطى)' },
  { value: 'eastern', label: 'Eastern Region (المنطقة الشرقية)' },
  { value: 'western', label: 'Western Region (المنطقة الغربية)' },
  { value: 'northern', label: 'Northern Region (المنطقة الشمالية)' },
  { value: 'southern', label: 'Southern Region (المنطقة الجنوبية)' },
];

const employeeTypeOptions = [
  { value: '1', label: 'المالك' },
  { value: '2', label: 'رئيس مجلس الاداره' },
  { value: '3', label: 'المدير العام' },
  { value: '4', label: 'المدير التنفيذي' },
  { value: '5', label: 'مدير اداره' },
  { value: '6', label: 'رئيس قسم' },
  { value: '7', label: 'موضف مفوض' },
];

const ProfileWizard = ({ onComplete }: ProfileWizardProps) => {
  const [step, setStep] = useState(1);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData(name as keyof typeof data, value);
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    post(route('profile.complete'), {
      onSuccess: () => {
        if (onComplete) onComplete();
      },
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Step 1: Company Information</h2>
          <Label htmlFor="company_type" className="mb-2 block">
            Company Type
          </Label>
          <Select
            value={data.company_type}
            onValueChange={(value) => setData('company_type', value)}
          >
            <SelectTrigger id="company_type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {companyTypeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.company_type && (
            <div className="text-red-500 text-sm mt-1">
              {errors.company_type}
            </div>
          )}

          <Label htmlFor="company_name_ar" className="mt-4 mb-2 block">
            Company Name (AR)
          </Label>
          <Input
            id="company_name_ar"
            name="company_name_ar"
            value={data.company_name_ar}
            onChange={handleChange}
          />
          {errors.company_name_ar && (
            <div className="text-red-500 text-sm mt-1">
              {errors.company_name_ar}
            </div>
          )}

          <Label htmlFor="company_name_en" className="mt-4 mb-2 block">
            Company Name (EN)
          </Label>
          <Input
            id="company_name_en"
            name="company_name_en"
            value={data.company_name_en}
            onChange={handleChange}
          />
          {errors.company_name_en && (
            <div className="text-red-500 text-sm mt-1">
              {errors.company_name_en}
            </div>
          )}

          <Button onClick={nextStep} className="mt-4" disabled={processing}>
            Next
          </Button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Step 2: Location</h2>
          <Label htmlFor="region" className="mb-2 block">
            Region
          </Label>
          <Select
            value={data.region}
            onValueChange={(value) => setData('region', value)}
          >
            <SelectTrigger id="region">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {regionOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.region && (
            <div className="text-red-500 text-sm mt-1">{errors.region}</div>
          )}

          <Label htmlFor="city" className="mt-4 mb-2 block">
            City
          </Label>
          <Input id="city" name="city" value={data.city} onChange={handleChange} />
          {errors.city && (
            <div className="text-red-500 text-sm mt-1">{errors.city}</div>
          )}

          <div className="flex gap-2 mt-4">
            <Button variant="secondary" onClick={prevStep} disabled={processing}>
              Back
            </Button>
            <Button onClick={nextStep} disabled={processing}>
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Step 3: Contact</h2>
          <Label htmlFor="employee_name_ar" className="mb-2 block">
            Employee Name (AR)
          </Label>
          <Input
            id="employee_name_ar"
            name="employee_name_ar"
            value={data.employee_name_ar}
            onChange={handleChange}
          />
          {errors.employee_name_ar && (
            <div className="text-red-500 text-sm mt-1">
              {errors.employee_name_ar}
            </div>
          )}

          <Label htmlFor="employee_name_en" className="mt-4 mb-2 block">
            Employee Name (EN)
          </Label>
          <Input
            id="employee_name_en"
            name="employee_name_en"
            value={data.employee_name_en}
            onChange={handleChange}
          />
          {errors.employee_name_en && (
            <div className="text-red-500 text-sm mt-1">
              {errors.employee_name_en}
            </div>
          )}

          <Label htmlFor="employee_type" className="mt-4 mb-2 block">
            Employee Type
          </Label>
          <Select
            value={data.employee_type}
            onValueChange={(value) => setData('employee_type', value)}
          >
            <SelectTrigger id="employee_type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {employeeTypeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.employee_type && (
            <div className="text-red-500 text-sm mt-1">
              {errors.employee_type}
            </div>
          )}

          <Label htmlFor="phone" className="mt-4 mb-2 block">
            Phone Number
          </Label>
          <Input id="phone" name="phone" value={data.phone} onChange={handleChange} />
          {errors.phone && (
            <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
          )}

          <Label htmlFor="website" className="mt-4 mb-2 block">
            Website
          </Label>
          <Input
            id="website"
            name="website"
            value={data.website}
            onChange={handleChange}
          />
          {errors.website && (
            <div className="text-red-500 text-sm mt-1">{errors.website}</div>
          )}

          <div className="flex gap-2 mt-4">
            <Button variant="secondary" onClick={prevStep} disabled={processing}>
              Back
            </Button>
            <Button onClick={nextStep} disabled={processing}>
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Step 4: Additional Information</h2>
          <Label htmlFor="notes" className="mb-2 block">
            Notes
          </Label>
          <Textarea
            id="notes"
            name="notes"
            value={data.notes}
            onChange={handleChange}
          />
          {errors.notes && (
            <div className="text-red-500 text-sm mt-1">{errors.notes}</div>
          )}

          <Label htmlFor="how_did_you_hear" className="mt-4 mb-2 block">
            How did you hear about us?
          </Label>
          <Input
            id="how_did_you_hear"
            name="how_did_you_hear"
            value={data.how_did_you_hear}
            onChange={handleChange}
          />
          {errors.how_did_you_hear && (
            <div className="text-red-500 text-sm mt-1">
              {errors.how_did_you_hear}
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <Button variant="secondary" onClick={prevStep} disabled={processing}>
              Back
            </Button>
            <Button onClick={handleSubmit} disabled={processing}>
              Finish
            </Button>
          </div>
        </div>
      )}
    </div>
  );

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

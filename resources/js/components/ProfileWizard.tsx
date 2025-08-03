import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ProfileWizardProps {
  onComplete?: () => void;
}

const ProfileWizard = ({ onComplete }: ProfileWizardProps) => {
  const [step, setStep] = useState(1);
  const { data, setData, post, processing, errors } = useForm({
    phone: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(name as 'phone' | 'address', value);
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
    <div>
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Step 1: Personal Information</h2>
          <Label htmlFor="phone" className="mb-2 block">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="Phone Number"
            value={data.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
          <Button onClick={nextStep} className="mt-4" disabled={processing}>
            Next
          </Button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Step 2: Address Information</h2>
          <Label htmlFor="address" className="mb-2 block">Address</Label>
          <Input
            id="address"
            name="address"
            placeholder="Address"
            value={data.address}
            onChange={handleChange}
          />
          {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
          <div className="flex gap-2 mt-4">
            <Button variant="secondary" onClick={prevStep} disabled={processing}>
              Back
            </Button>
            <Button onClick={handleSubmit} disabled={processing}>Finish</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileWizard;

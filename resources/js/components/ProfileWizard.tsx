import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ProfileWizardProps {
  onComplete?: () => void;
}

const ProfileWizard = ({ onComplete }: ProfileWizardProps) => {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    phoneNumber: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log(profileData);
    if (onComplete) onComplete();
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Step 1: Personal Information</h2>
          <Label htmlFor="phoneNumber" className="mb-2 block">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
            value={profileData.phoneNumber}
            onChange={handleChange}
          />
          <Button onClick={nextStep} className="mt-4">
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
            value={profileData.address}
            onChange={handleChange}
          />
          <div className="flex gap-2 mt-4">
            <Button variant="secondary" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={handleSubmit}>Finish</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileWizard;

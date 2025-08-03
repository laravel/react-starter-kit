import ProfileWizard from '@/components/ProfileWizard';
import { Head } from '@inertiajs/react';

export default function ProfileWizardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Head title="Complete Profile" />
      <ProfileWizard />
    </div>
  );
}

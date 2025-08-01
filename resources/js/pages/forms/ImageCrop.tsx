import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import ReferenceHeader from '@/components/ReferenceHeader';
import ImageCropPlugin from '@/sections/forms/ImageCropPlugin';

// =============================|| IMAGE CROPPER - FORMS IMAGE CROP ||============================== //

export default function ImageCropPage() {
  return (
    <>
      <AppLayout>
        <Head title="Image cropper" />
        <ReferenceHeader
          caption="JavaScript image cropper for image or canvas element for cropping"
          link="https://fengyuanchen.github.io/cropperjs/"
        />
        <ImageCropPlugin />
      </AppLayout>
    </>
  );
}

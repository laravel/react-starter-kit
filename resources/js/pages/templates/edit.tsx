import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import * as templates from '@/routes/templates';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Apple, ArrowLeft, Smartphone } from 'lucide-react';
import { PassTemplate, PassField } from '@/types/pass';
import { PassPreview } from '@/components/pass-preview';
import { PassFieldEditor } from '@/components/pass-field-editor';
import { ColorPicker } from '@/components/color-picker';
import { ImageUploader } from '@/components/image-uploader';

interface TemplatesEditProps {
  template: PassTemplate;
}

const transitTypes = [
  { value: 'PKTransitTypeAir', label: 'Air' },
  { value: 'PKTransitTypeTrain', label: 'Train' },
  { value: 'PKTransitTypeBus', label: 'Bus' },
  { value: 'PKTransitTypeBoat', label: 'Boat' },
  { value: 'PKTransitTypeGeneric', label: 'Generic' },
];

export default function TemplatesEdit({ template }: TemplatesEditProps) {
  const { data, setData, put, processing, errors } = useForm({
    name: template.name,
    design_data: template.design_data,
    images: template.images || {},
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(templates.update({ template: template.id }).url);
  };

  return (
    <AppLayout
      title="Edit Template"
      header={
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={templates.index().url}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div>
            <h2 className="text-xl font-semibold">Edit Template</h2>
            <p className="text-sm text-muted-foreground">{template.name}</p>
          </div>
        </div>
      }
    >
      <Head title="Edit Template" />

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column: Form */}
          <div className="space-y-6">
            {/* Template Name */}
            <Card>
              <CardHeader>
                <CardTitle>Template Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Template Name *</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="e.g., My Event Ticket Design"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label>Platform</Label>
                  <div className="flex items-center gap-2 mt-2">
                    {template.platform === 'apple' ? (
                      <>
                        <Apple className="h-4 w-4" />
                        <span>Apple Wallet</span>
                      </>
                    ) : (
                      <>
                        <Smartphone className="h-4 w-4" />
                        <span>Google Wallet</span>
                      </>
                    )}
                    <Badge variant="secondary" className="ml-2">Read-only</Badge>
                  </div>
                </div>

                <div>
                  <Label>Pass Type</Label>
                  <p className="mt-2 capitalize">
                    {template.pass_type.replace(/([A-Z])/g, ' $1').trim()}
                    <Badge variant="secondary" className="ml-2">Read-only</Badge>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Input
                    id="description"
                    value={data.design_data.description}
                    onChange={(e) =>
                      setData('design_data', {
                        ...data.design_data,
                        description: e.target.value,
                      })
                    }
                    placeholder="Concert Ticket"
                  />
                  {errors['design_data.description'] && (
                    <p className="text-sm text-destructive">
                      {errors['design_data.description']}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name *</Label>
                  <Input
                    id="organizationName"
                    value={data.design_data.organizationName}
                    onChange={(e) =>
                      setData('design_data', {
                        ...data.design_data,
                        organizationName: e.target.value,
                      })
                    }
                    placeholder="Acme Inc."
                  />
                  {errors['design_data.organizationName'] && (
                    <p className="text-sm text-destructive">
                      {errors['design_data.organizationName']}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoText">Logo Text</Label>
                  <Input
                    id="logoText"
                    value={data.design_data.logoText}
                    onChange={(e) =>
                      setData('design_data', {
                        ...data.design_data,
                        logoText: e.target.value,
                      })
                    }
                    placeholder="ACME"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Colors</CardTitle>
                <CardDescription>Customize the appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ColorPicker
                  label="Background Color"
                  value={data.design_data.backgroundColor}
                  onChange={(color) =>
                    setData('design_data', {
                      ...data.design_data,
                      backgroundColor: color,
                    })
                  }
                />
                <ColorPicker
                  label="Foreground Color"
                  value={data.design_data.foregroundColor}
                  onChange={(color) =>
                    setData('design_data', {
                      ...data.design_data,
                      foregroundColor: color,
                    })
                  }
                />
                <ColorPicker
                  label="Label Color"
                  value={data.design_data.labelColor}
                  onChange={(color) =>
                    setData('design_data', {
                      ...data.design_data,
                      labelColor: color,
                    })
                  }
                />
              </CardContent>
            </Card>

            {/* Pass Fields */}
            <Card>
              <CardHeader>
                <CardTitle>Pass Fields</CardTitle>
                <CardDescription>Manage default field layout</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Header Fields</Label>
                  <PassFieldEditor
                    fields={data.design_data.headerFields}
                    onChange={(fields) =>
                      setData('design_data', {
                        ...data.design_data,
                        headerFields: fields,
                      })
                    }
                    maxFields={3}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Primary Fields</Label>
                  <PassFieldEditor
                    fields={data.design_data.primaryFields}
                    onChange={(fields) =>
                      setData('design_data', {
                        ...data.design_data,
                        primaryFields: fields,
                      })
                    }
                    maxFields={3}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Secondary Fields</Label>
                  <PassFieldEditor
                    fields={data.design_data.secondaryFields}
                    onChange={(fields) =>
                      setData('design_data', {
                        ...data.design_data,
                        secondaryFields: fields,
                      })
                    }
                    maxFields={4}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Auxiliary Fields</Label>
                  <PassFieldEditor
                    fields={data.design_data.auxiliaryFields}
                    onChange={(fields) =>
                      setData('design_data', {
                        ...data.design_data,
                        auxiliaryFields: fields,
                      })
                    }
                    maxFields={4}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Back Fields</Label>
                  <PassFieldEditor
                    fields={data.design_data.backFields}
                    onChange={(fields) =>
                      setData('design_data', {
                        ...data.design_data,
                        backFields: fields,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Transit Type */}
            {template.pass_type === 'boardingPass' && (
              <Card>
                <CardHeader>
                  <CardTitle>Transit Type</CardTitle>
                  <CardDescription>
                    Default transit type for boarding passes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select
                    value={data.design_data.transitType}
                    onValueChange={(value) =>
                      setData('design_data', {
                        ...data.design_data,
                        transitType: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select transit type" />
                    </SelectTrigger>
                    <SelectContent>
                      {transitTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Template Images</CardTitle>
                <CardDescription>
                  Update default images for this template
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <ImageUploader
                    label="Icon"
                    description="29x29 pixels"
                    value={data.images['icon.png']}
                    onChange={(file) =>
                      setData('images', { ...data.images, 'icon.png': file })
                    }
                  />
                  <ImageUploader
                    label="Logo"
                    description="160x50 pixels"
                    value={data.images['logo.png']}
                    onChange={(file) =>
                      setData('images', { ...data.images, 'logo.png': file })
                    }
                  />
                  <ImageUploader
                    label="Background"
                    description="180x220 pixels"
                    value={data.images['background.png']}
                    onChange={(file) =>
                      setData('images', { ...data.images, 'background.png': file })
                    }
                  />
                  <ImageUploader
                    label="Strip"
                    description="375x123 pixels"
                    value={data.images['strip.png']}
                    onChange={(file) =>
                      setData('images', { ...data.images, 'strip.png': file })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Preview */}
          <div className="lg:sticky lg:top-6 lg:h-fit space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <PassPreview
                  passData={data.design_data}
                  platform={template.platform}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-3">
                <Button type="submit" className="w-full" disabled={processing}>
                  {processing ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <Link href={templates.index().url}>Cancel</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </AppLayout>
  );
}

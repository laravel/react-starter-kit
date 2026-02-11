import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import * as templates from '@/routes/templates';
import { Button } from '@/components/ui/button';
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
import { Apple, ArrowLeft, Check, Smartphone } from 'lucide-react';
import { PassPlatform, PassType, PassField } from '@/types/pass';
import { PassPreview } from '@/components/pass-preview';
import { PassFieldEditor } from '@/components/pass-field-editor';
import { ColorPicker } from '@/components/color-picker';
import { ImageUploader } from '@/components/image-uploader';
import { cn } from '@/lib/utils';

const passTypes: { value: PassType; label: string; description: string }[] = [
  { value: 'generic', label: 'Generic', description: 'General purpose pass' },
  { value: 'coupon', label: 'Coupon', description: 'Discounts and offers' },
  { value: 'eventTicket', label: 'Event Ticket', description: 'Concert, movie, or event entry' },
  { value: 'boardingPass', label: 'Boarding Pass', description: 'Flight, train, or bus ticket' },
  { value: 'storeCard', label: 'Store Card', description: 'Membership or account card' },
  { value: 'loyalty', label: 'Loyalty Card', description: 'Points and rewards program' },
  { value: 'stampCard', label: 'Stamp Card', description: 'Punch card for purchases' },
  { value: 'offer', label: 'Offer', description: 'Special promotions' },
  { value: 'transit', label: 'Transit Card', description: 'Public transportation' },
];

const transitTypes = [
  { value: 'PKTransitTypeAir', label: 'Air' },
  { value: 'PKTransitTypeTrain', label: 'Train' },
  { value: 'PKTransitTypeBus', label: 'Bus' },
  { value: 'PKTransitTypeBoat', label: 'Boat' },
  { value: 'PKTransitTypeGeneric', label: 'Generic' },
];

export default function TemplatesCreate() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    platforms: [] as PassPlatform[],
    pass_type: '' as PassType | '',
    design_data: {
      description: '',
      organizationName: '',
      logoText: '',
      backgroundColor: '#ffffff',
      foregroundColor: '#000000',
      labelColor: '#000000',
      headerFields: [] as PassField[],
      primaryFields: [] as PassField[],
      secondaryFields: [] as PassField[],
      auxiliaryFields: [] as PassField[],
      backFields: [] as PassField[],
      transitType: '' as string,
    },
    images: {},
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(templates.store().url);
  };

  return (
    <AppLayout
      title="Create Template"
      header={
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={templates.index().url}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div>
            <h2 className="text-xl font-semibold">Create Template</h2>
            <p className="text-sm text-muted-foreground">
              Design a reusable pass template
            </p>
          </div>
        </div>
      }
    >
      <Head title="Create Template" />

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
              </CardContent>
            </Card>

            {/* Platform Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Platforms *</CardTitle>
                <CardDescription>
                  Choose your target platforms (select one or both)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card
                    className={cn(
                      'cursor-pointer transition-colors hover:border-primary relative',
                      data.platforms.includes('apple') && 'border-primary bg-primary/5'
                    )}
                    onClick={() => {
                      const platforms = data.platforms.includes('apple')
                        ? data.platforms.filter((p) => p !== 'apple')
                        : [...data.platforms, 'apple' as PassPlatform];
                      setData('platforms', platforms);
                    }}
                  >
                    {data.platforms.includes('apple') && (
                      <div className="absolute top-3 right-3 rounded-full bg-primary p-1">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <Apple className="h-12 w-12 mb-4" />
                      <h3 className="font-semibold mb-1">Apple Wallet</h3>
                    </CardContent>
                  </Card>

                  <Card
                    className={cn(
                      'cursor-pointer transition-colors hover:border-primary relative',
                      data.platforms.includes('google') && 'border-primary bg-primary/5'
                    )}
                    onClick={() => {
                      const platforms = data.platforms.includes('google')
                        ? data.platforms.filter((p) => p !== 'google')
                        : [...data.platforms, 'google' as PassPlatform];
                      setData('platforms', platforms);
                    }}
                  >
                    {data.platforms.includes('google') && (
                      <div className="absolute top-3 right-3 rounded-full bg-primary p-1">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <Smartphone className="h-12 w-12 mb-4" />
                      <h3 className="font-semibold mb-1">Google Wallet</h3>
                    </CardContent>
                  </Card>
                </div>
                {errors.platforms && (
                  <p className="text-sm text-destructive mt-2">{errors.platforms}</p>
                )}
              </CardContent>
            </Card>

            {/* Pass Type */}
            <Card>
              <CardHeader>
                <CardTitle>Pass Type *</CardTitle>
                <CardDescription>
                  Select the type of pass
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-3">
                  {passTypes.map((type) => (
                    <Card
                      key={type.value}
                      className={cn(
                        'cursor-pointer transition-colors hover:border-primary',
                        data.pass_type === type.value && 'border-primary bg-primary/5'
                      )}
                      onClick={() => setData('pass_type', type.value)}
                    >
                      <CardHeader>
                        <CardTitle className="text-base">{type.label}</CardTitle>
                        <CardDescription className="text-xs">
                          {type.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
                {errors.pass_type && (
                  <p className="text-sm text-destructive mt-2">{errors.pass_type}</p>
                )}
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
                <CardDescription>Add default field layout</CardDescription>
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
            {data.pass_type === 'boardingPass' && (
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
                  Upload default images for this template
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
                {data.platforms.length > 0 ? (
                  <PassPreview
                    passData={data.design_data}
                    platform={data.platforms[0]}
                  />
                ) : (
                  <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Select a platform to see preview
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-3">
                <Button type="submit" className="w-full" disabled={processing}>
                  {processing ? 'Creating...' : 'Create Template'}
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

import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import * as passes from '@/routes/passes';
import { Badge } from '@/components/ui/badge';
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
import { Switch } from '@/components/ui/switch';
import { Apple, ArrowLeft, Smartphone } from 'lucide-react';
import { Pass, PassField } from '@/types/pass';
import { PassPreview } from '@/components/pass-preview';
import { PassFieldEditor } from '@/components/pass-field-editor';
import { ColorPicker } from '@/components/color-picker';
import { ImageUploader } from '@/components/image-uploader';

interface PassesEditProps {
  pass: Pass;
}

const transitTypes = [
  { value: 'PKTransitTypeAir', label: 'Air' },
  { value: 'PKTransitTypeTrain', label: 'Train' },
  { value: 'PKTransitTypeBus', label: 'Bus' },
  { value: 'PKTransitTypeBoat', label: 'Boat' },
  { value: 'PKTransitTypeGeneric', label: 'Generic' },
];

const barcodeFormats = [
  { value: 'PKBarcodeFormatQR', label: 'QR Code' },
  { value: 'PKBarcodeFormatPDF417', label: 'PDF417' },
  { value: 'PKBarcodeFormatAztec', label: 'Aztec' },
  { value: 'PKBarcodeFormatCode128', label: 'Code 128' },
];

export default function PassesEdit({ pass }: PassesEditProps) {
  const { data, setData, put, processing, errors } = useForm({
    pass_data: pass.pass_data,
    barcode_data: pass.barcode_data || {
      message: '',
      format: 'PKBarcodeFormatQR',
      altText: '',
    },
    has_barcode: !!pass.barcode_data?.message,
    images: pass.images || {},
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(passes.update({ pass: pass.id }).url);
  };

  return (
    <AppLayout
      title="Edit Pass"
      header={
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={passes.show({ pass: pass.id }).url}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div>
            <h2 className="text-xl font-semibold">Edit Pass</h2>
            <p className="text-sm text-muted-foreground">
              {pass.pass_data.description || 'Untitled Pass'}
            </p>
          </div>
        </div>
      }
    >
      <Head title="Edit Pass" />

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column: Form */}
          <div className="space-y-6">
            {/* Platform & Type (Read-only) */}
            <Card>
              <CardHeader>
                <CardTitle>Pass Type</CardTitle>
                <CardDescription>
                  Platform and type cannot be changed after creation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Platforms</Label>
                  <div className="flex items-center gap-2 mt-2">
                    {pass.platforms.includes('apple') && (
                      <div className="flex items-center gap-1">
                        <Apple className="h-4 w-4" />
                        <span>Apple Wallet</span>
                      </div>
                    )}
                    {pass.platforms.length === 2 && <span className="text-muted-foreground">+</span>}
                    {pass.platforms.includes('google') && (
                      <div className="flex items-center gap-1">
                        <Smartphone className="h-4 w-4" />
                        <span>Google Wallet</span>
                      </div>
                    )}
                    <Badge variant="secondary" className="ml-2">Read-only</Badge>
                  </div>
                </div>

                <div>
                  <Label>Pass Type</Label>
                  <p className="mt-2 capitalize">
                    {pass.pass_type.replace(/([A-Z])/g, ' $1').trim()}
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
                    value={data.pass_data.description}
                    onChange={(e) =>
                      setData('pass_data', {
                        ...data.pass_data,
                        description: e.target.value,
                      })
                    }
                    placeholder="Concert Ticket"
                  />
                  {errors['pass_data.description'] && (
                    <p className="text-sm text-destructive">
                      {errors['pass_data.description']}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name *</Label>
                  <Input
                    id="organizationName"
                    value={data.pass_data.organizationName}
                    onChange={(e) =>
                      setData('pass_data', {
                        ...data.pass_data,
                        organizationName: e.target.value,
                      })
                    }
                    placeholder="Acme Inc."
                  />
                  {errors['pass_data.organizationName'] && (
                    <p className="text-sm text-destructive">
                      {errors['pass_data.organizationName']}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoText">Logo Text</Label>
                  <Input
                    id="logoText"
                    value={data.pass_data.logoText}
                    onChange={(e) =>
                      setData('pass_data', {
                        ...data.pass_data,
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
                <CardDescription>Customize your pass appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ColorPicker
                  label="Background Color"
                  value={data.pass_data.backgroundColor}
                  onChange={(color) =>
                    setData('pass_data', {
                      ...data.pass_data,
                      backgroundColor: color,
                    })
                  }
                />
                <ColorPicker
                  label="Foreground Color"
                  value={data.pass_data.foregroundColor}
                  onChange={(color) =>
                    setData('pass_data', {
                      ...data.pass_data,
                      foregroundColor: color,
                    })
                  }
                />
                <ColorPicker
                  label="Label Color"
                  value={data.pass_data.labelColor}
                  onChange={(color) =>
                    setData('pass_data', {
                      ...data.pass_data,
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
                <CardDescription>Manage content displayed on your pass</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Header Fields</Label>
                  <PassFieldEditor
                    fields={data.pass_data.headerFields}
                    onChange={(fields) =>
                      setData('pass_data', {
                        ...data.pass_data,
                        headerFields: fields,
                      })
                    }
                    maxFields={3}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Primary Fields</Label>
                  <PassFieldEditor
                    fields={data.pass_data.primaryFields}
                    onChange={(fields) =>
                      setData('pass_data', {
                        ...data.pass_data,
                        primaryFields: fields,
                      })
                    }
                    maxFields={3}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Secondary Fields</Label>
                  <PassFieldEditor
                    fields={data.pass_data.secondaryFields}
                    onChange={(fields) =>
                      setData('pass_data', {
                        ...data.pass_data,
                        secondaryFields: fields,
                      })
                    }
                    maxFields={4}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Auxiliary Fields</Label>
                  <PassFieldEditor
                    fields={data.pass_data.auxiliaryFields}
                    onChange={(fields) =>
                      setData('pass_data', {
                        ...data.pass_data,
                        auxiliaryFields: fields,
                      })
                    }
                    maxFields={4}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Back Fields</Label>
                  <PassFieldEditor
                    fields={data.pass_data.backFields}
                    onChange={(fields) =>
                      setData('pass_data', {
                        ...data.pass_data,
                        backFields: fields,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Transit Type for Boarding Passes */}
            {pass.pass_type === 'boardingPass' && (
              <Card>
                <CardHeader>
                  <CardTitle>Transit Type</CardTitle>
                  <CardDescription>
                    Specify the type of transportation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select
                    value={data.pass_data.transitType}
                    onValueChange={(value) =>
                      setData('pass_data', {
                        ...data.pass_data,
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

            {/* Barcode */}
            <Card>
              <CardHeader>
                <CardTitle>Barcode Configuration</CardTitle>
                <CardDescription>
                  Add a scannable barcode to your pass (optional)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="has-barcode">Enable Barcode</Label>
                    <p className="text-sm text-muted-foreground">
                      Add a QR code or other barcode format
                    </p>
                  </div>
                  <Switch
                    id="has-barcode"
                    checked={data.has_barcode}
                    onCheckedChange={(checked) => setData('has_barcode', checked)}
                  />
                </div>

                {data.has_barcode && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="barcode-format">Barcode Format</Label>
                      <Select
                        value={data.barcode_data.format}
                        onValueChange={(value) =>
                          setData('barcode_data', {
                            ...data.barcode_data,
                            format: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {barcodeFormats.map((format) => (
                            <SelectItem key={format.value} value={format.value}>
                              {format.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="barcode-message">Barcode Message *</Label>
                      <Input
                        id="barcode-message"
                        value={data.barcode_data.message}
                        onChange={(e) =>
                          setData('barcode_data', {
                            ...data.barcode_data,
                            message: e.target.value,
                          })
                        }
                        placeholder="123456789"
                      />
                      <p className="text-xs text-muted-foreground">
                        The data encoded in the barcode
                      </p>
                      {errors['barcode_data.message'] && (
                        <p className="text-sm text-destructive">
                          {errors['barcode_data.message']}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="barcode-altText">Alternative Text</Label>
                      <Input
                        id="barcode-altText"
                        value={data.barcode_data.altText}
                        onChange={(e) =>
                          setData('barcode_data', {
                            ...data.barcode_data,
                            altText: e.target.value,
                          })
                        }
                        placeholder="Order #123456789"
                      />
                      <p className="text-xs text-muted-foreground">
                        Text displayed near the barcode
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Pass Images</CardTitle>
                <CardDescription>
                  Update images for your pass (all images are optional)
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
                    label="Icon @2x"
                    description="58x58 pixels"
                    value={data.images['icon@2x.png']}
                    onChange={(file) =>
                      setData('images', { ...data.images, 'icon@2x.png': file })
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
                    label="Logo @2x"
                    description="320x100 pixels"
                    value={data.images['logo@2x.png']}
                    onChange={(file) =>
                      setData('images', { ...data.images, 'logo@2x.png': file })
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
                  passData={data.pass_data}
                  barcodeData={data.has_barcode ? data.barcode_data : undefined}
                  platform={pass.platforms[0] || 'apple'}
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
                  <Link href={passes.show({ pass: pass.id }).url}>Cancel</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </AppLayout>
  );
}

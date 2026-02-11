import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import * as passes from '@/routes/passes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Apple, ArrowLeft, ArrowRight, Check, Smartphone } from 'lucide-react';
import { PassPlatform, PassType, PassTemplate, PassField } from '@/types/pass';
import { PassPreview } from '@/components/pass-preview';
import { PassFieldEditor } from '@/components/pass-field-editor';
import { ColorPicker } from '@/components/color-picker';
import { ImageUploader } from '@/components/image-uploader';
import { cn } from '@/lib/utils';

interface PassesCreateProps {
  templates: PassTemplate[];
}

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

const barcodeFormats = [
  { value: 'PKBarcodeFormatQR', label: 'QR Code' },
  { value: 'PKBarcodeFormatPDF417', label: 'PDF417' },
  { value: 'PKBarcodeFormatAztec', label: 'Aztec' },
  { value: 'PKBarcodeFormatCode128', label: 'Code 128' },
];

export default function PassesCreate({ templates }: PassesCreateProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const { data, setData, post, processing, errors } = useForm({
    platforms: [] as PassPlatform[],
    pass_type: '' as PassType | '',
    pass_template_id: '',
    pass_data: {
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
    barcode_data: {
      message: '',
      format: 'PKBarcodeFormatQR',
      altText: '',
    },
    has_barcode: false,
    images: {},
  });

  const handlePlatformToggle = (platform: PassPlatform) => {
    const current = data.platforms;
    if (current.includes(platform)) {
      setData('platforms', current.filter(p => p !== platform));
    } else {
      setData('platforms', [...current, platform]);
    }
  };

  const handlePassTypeSelect = (passType: PassType) => {
    setData('pass_type', passType);
  };

  const handleTemplateSelect = (templateId: string) => {
    if (!templateId || templateId === 'none') {
      setData('pass_template_id', '');
      return;
    }

    const template = templates.find((t) => t.id === parseInt(templateId));
    if (template) {
      setData({
        ...data,
        pass_template_id: templateId,
        platforms: template.platforms,
        pass_type: template.pass_type,
        pass_data: template.design_data,
        images: template.images,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(passes.store().url);
  };

  const canProceed = () => {
    if (step === 1) return data.platforms.length > 0 && data.pass_type;
    if (step === 2) return data.pass_data.description && data.pass_data.organizationName;
    return true;
  };

  const steps = [
    { number: 1, label: 'Platform & Type' },
    { number: 2, label: 'Design' },
    { number: 3, label: 'Barcode' },
    { number: 4, label: 'Images' },
    { number: 5, label: 'Review' },
  ];

  return (
    <AppLayout
      title="Create Pass"
      header={
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={passes.index().url}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div>
            <h2 className="text-xl font-semibold">Create Pass</h2>
            <p className="text-sm text-muted-foreground">
              Step {step} of {totalSteps}: {steps[step - 1].label}
            </p>
          </div>
        </div>
      }
    >
      <Head title="Create Pass" />

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Step Indicator */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              {steps.map((s, index) => (
                <div key={s.number} className="flex items-center">
                  <div
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors',
                      step === s.number
                        ? 'border-primary bg-primary text-primary-foreground'
                        : step > s.number
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted-foreground/30 text-muted-foreground'
                    )}
                  >
                    {step > s.number ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span>{s.number}</span>
                    )}
                  </div>
                  <div className="ml-3">
                    <p
                      className={cn(
                        'text-sm font-medium',
                        step >= s.number ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {s.label}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'w-16 h-0.5 mx-4',
                        step > s.number ? 'bg-primary' : 'bg-muted-foreground/30'
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Platform & Type */}
          {step === 1 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Platforms</CardTitle>
                  <CardDescription>
                    Choose one or both wallet platforms for this pass
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card
                      className={cn(
                        'cursor-pointer transition-colors hover:border-primary',
                        data.platforms.includes('apple') && 'border-primary bg-primary/5'
                      )}
                      onClick={() => handlePlatformToggle('apple')}
                    >
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <div className="relative">
                          <Apple className="h-12 w-12 mb-4" />
                          {data.platforms.includes('apple') && (
                            <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold mb-1">Apple Wallet</h3>
                        <p className="text-sm text-muted-foreground text-center">
                          For iPhone and Apple Watch users
                        </p>
                      </CardContent>
                    </Card>

                    <Card
                      className={cn(
                        'cursor-pointer transition-colors hover:border-primary',
                        data.platforms.includes('google') && 'border-primary bg-primary/5'
                      )}
                      onClick={() => handlePlatformToggle('google')}
                    >
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <div className="relative">
                          <Smartphone className="h-12 w-12 mb-4" />
                          {data.platforms.includes('google') && (
                            <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold mb-1">Google Wallet</h3>
                        <p className="text-sm text-muted-foreground text-center">
                          For Android device users
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  {data.platforms.length === 2 && (
                    <p className="text-sm text-primary mt-3 flex items-center gap-1">
                      <Check className="h-4 w-4" />
                      Both platforms selected — this pass will be available on Apple and Google Wallet
                    </p>
                  )}
                  {errors.platforms && (
                    <p className="text-sm text-destructive mt-2">{errors.platforms}</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Select Pass Type</CardTitle>
                  <CardDescription>
                    Choose the type of pass you want to create
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
                        onClick={() => handlePassTypeSelect(type.value)}
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

              <Card>
                <CardHeader>
                  <CardTitle>Use Template (Optional)</CardTitle>
                  <CardDescription>
                    Start from a pre-existing template
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select
                    value={data.pass_template_id}
                    onValueChange={handleTemplateSelect}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None - Start from scratch</SelectItem>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id.toString()}>
                          {template.name} ({template.pass_type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Design */}
          {step === 2 && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-6">
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

                <Card>
                  <CardHeader>
                    <CardTitle>Pass Fields</CardTitle>
                    <CardDescription>Add content to your pass</CardDescription>
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

                {data.pass_type === 'boardingPass' && (
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
              </div>

              <div className="lg:sticky lg:top-6 lg:h-fit">
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>Live preview of your pass</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PassPreview
                      passData={data.pass_data}
                      barcodeData={data.has_barcode ? data.barcode_data : undefined}
                      platform={data.platforms[0] || 'apple'}
                    />}
          {step === 3 && (
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
          )}

          {/* Step 4: Images */}
          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Pass Images</CardTitle>
                <CardDescription>
                  Upload images for your pass (all images are optional)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <ImageUploader
                    label="Icon"
                    description="29x29 pixels, required for Apple Wallet"
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
                    label="Icon @3x"
                    description="87x87 pixels"
                    value={data.images['icon@3x.png']}
                    onChange={(file) =>
                      setData('images', { ...data.images, 'icon@3x.png': file })
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
                    label="Logo @3x"
                    description="480x150 pixels"
                    value={data.images['logo@3x.png']}
                    onChange={(file) =>
                      setData('images', { ...data.images, 'logo@3x.png': file })
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
                    label="Background @2x"
                    description="360x440 pixels"
                    value={data.images['background@2x.png']}
                    onChange={(file) =>
                      setData('images', { ...data.images, 'background@2x.png': file })
                    }
                  />
                  <ImageUploader
                    label="Background @3x"
                    description="540x660 pixels"
                    value={data.images['background@3x.png']}
                    onChange={(file) =>
                      setData('images', { ...data.images, 'background@3x.png': file })
                    }
                  />
                  <ImageUploader
                    label="Strip"
                    description="375x123 pixels for event/coupon passes"
                    value={data.images['strip.png']}
                    onChange={(file) =>
                      setData('images', { ...data.images, 'strip.png': file })
                    }
                  />
                  <ImageUploader
                    label="Strip @2x"
                    description="750x246 pixels"
                    value={data.images['strip@2x.png']}
                    onChange={(file) =>
                      setData('images', { ...data.images, 'strip@2x.png': file })
                    }
                  />
                  <ImageUploader
                    label="Strip @3x"
                    description="1125x369 pixels"
                    value={data.images['strip@3x.png']}
                    onChange={(file) =>
                      setData('images', { ...data.images, 'strip@3x.png': file })
                    }
                  />
                  <ImageUploader
                    label="Thumbnail"
                    description="90x90 pixels"
                    value={data.images['thumbnail.png']}
                    onChange={(file) =>
                      setData('images', { ...data.images, 'thumbnail.png': file })
                    }
                  />
                  <ImageUploader
                    label="Thumbnail @2x"
                    description="180x180 pixels"
                    value={data.images['thumbnail@2x.png']}
                    onChange={(file) =>
                      setData('images', { ...data.images, 'thumbnail@2x.png': file })
                    }
                  />
                  <ImageUploader
                    label="Thumbnail @3x"
                    description="270x270 pixels"
                    value={data.images['thumbnail@3x.png']}
                    onChange={(file) =>
                      setData('images', { ...data.images, 'thumbnail@3x.png': file })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pass Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-muted-foreground">Platforms</Label>
                      <div className="flex items-center gap-2 mt-1">
                        {data.platforms.includes('apple') && (
                          <div className="flex items-center gap-1">
                            <Apple className="h-4 w-4" />
                            <span>Apple Wallet</span>
                          </div>
                        )}
                        {data.platforms.length === 2 && <span className="text-muted-foreground">+</span>}
                        {data.platforms.includes('google') && (
                          <div className="flex items-center gap-1">
                            <Smartphone className="h-4 w-4" />
                            <span>Google Wallet</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-muted-foreground">Pass Type</Label>
                      <p className="mt-1 capitalize">
                        {data.pass_type.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                    </div>

                    <div>
                      <Label className="text-muted-foreground">Description</Label>
                      <p className="mt-1">{data.pass_data.description}</p>
                    </div>

                    <div>
                      <Label className="text-muted-foreground">Organization</Label>
                      <p className="mt-1">{data.pass_data.organizationName}</p>
                    </div>

                    <div>
                      <Label className="text-muted-foreground">Barcode</Label>
                      <Badge variant={data.has_barcode ? 'default' : 'secondary'}>
                        {data.has_barcode ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>

                    <div>
                      <Label className="text-muted-foreground">Images</Label>
                      <p className="mt-1">
                        {Object.keys(data.images).length} image(s) uploaded
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>JSON Data</CardTitle>
                    <CardDescription>Pass configuration (for debugging)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto max-h-96">
                      {JSON.stringify(
                        {
                          platforms: data.platforms,
                          pass_type: data.pass_type,
                          pass_data: data.pass_data,
                          barcode_data: data.has_barcode ? data.barcode_data : null,
                        },
                        null,
                        2
                      )}
                    </pre>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:sticky lg:top-6 lg:h-fit">
                <Card>
                  <CardHeader>
                    <CardTitle>Final Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PassPreview
                      passData={data.pass_data}
                      barcodeData={data.has_barcode ? data.barcode_data : undefined}
                      platform={data.platforms[0] || 'apple'}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Navigation */}
          <Card>
            <CardContent className="flex items-center justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <div className="text-sm text-muted-foreground">
                Step {step} of {totalSteps}
              </div>

              {step < totalSteps ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={processing}>
                  {processing ? 'Creating...' : 'Create Pass'}
                </Button>
              )}
            </CardContent>
          </Card>
        </form>
      </div>
    </AppLayout>
  );
}

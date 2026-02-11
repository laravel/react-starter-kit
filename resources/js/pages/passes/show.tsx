import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import * as passes from '@/routes/passes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Apple, ArrowLeft, Check, Chrome, Copy, Download, Edit, ExternalLink, QrCode, Trash2 } from 'lucide-react';
import { Pass, PassStatus } from '@/types/pass';
import { PassPreview } from '@/components/pass-preview';
import { format } from 'date-fns';
import { useClipboard } from '@/hooks/use-clipboard';

interface PassesShowProps {
  pass: Pass;
  publicUrl: string;
}

export default function PassesShow({ pass, publicUrl }: PassesShowProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [googleLink, setGoogleLink] = useState(pass.google_save_url);
  const { copy, copied } = useClipboard();
  const { post: postDownload, processing: downloading } = useForm();
  const { post: postGenerate, processing: generating } = useForm();
  const { delete: deletePass, processing: deleting } = useForm();

  const handleDownloadApple = () => {
    postDownload(passes.download.apple({ pass: pass.id }).url, {
      onSuccess: () => {
        // Download handled by response
      },
    });
  };

  const handleGenerateGoogleLink = () => {
    postGenerate(passes.generate.google({ pass: pass.id }).url, {
      onSuccess: (page) => {
        if (page.props.googleSaveUrl) {
          setGoogleLink(page.props.googleSaveUrl as string);
        }
      },
    });
  };

  const handleDelete = () => {
    deletePass(passes.destroy({ pass: pass.id }).url, {
      onSuccess: () => {
        router.visit(passes.index().url);
      },
    });
  };

  const getStatusBadge = (status: PassStatus) => {
    const variants: Record<PassStatus, 'default' | 'secondary' | 'destructive'> = {
      active: 'default',
      voided: 'destructive',
      expired: 'secondary',
    };

    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <AppLayout
      title="Pass Details"
      header={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href={passes.index().url}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <div>
              <h2 className="text-xl font-semibold">Pass Details</h2>
              <p className="text-sm text-muted-foreground">
                {pass.pass_data.description || 'Untitled Pass'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={passes.edit({ pass: pass.id }).url}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      }
    >
      <Head title={`Pass: ${pass.serial_number}`} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Preview */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <PassPreview
                passData={pass.pass_data}
                barcodeData={pass.barcode_data}
                platform={pass.platforms[0] || 'apple'}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pass Information */}
          <Card>
            <CardHeader>
              <CardTitle>Pass Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">Platforms</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {pass.platforms.includes('apple') && (
                      <div className="flex items-center gap-1">
                        <Apple className="h-4 w-4" />
                        <span>Apple Wallet</span>
                      </div>
                    )}
                    {pass.platforms.length === 2 && <span className="text-muted-foreground">+</span>}
                    {pass.platforms.includes('google') && (
                      <div className="flex items-center gap-1">
                        <Chrome className="h-4 w-4" />
                        <span>Google Wallet</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="mt-1">{getStatusBadge(pass.status)}</div>
                </div>

                <div>
                  <Label className="text-muted-foreground">Pass Type</Label>
                  <p className="mt-1 capitalize">
                    {pass.pass_type.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Serial Number</Label>
                  <code className="block mt-1 text-sm">{pass.serial_number}</code>
                </div>

                <div>
                  <Label className="text-muted-foreground">Created</Label>
                  <p className="mt-1 text-sm">
                    {format(new Date(pass.created_at), 'PPp')}
                  </p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Last Updated</Label>
                  <p className="mt-1 text-sm">
                    {format(new Date(pass.updated_at), 'PPp')}
                  </p>
                </div>

                {pass.last_generated_at && (
                  <div className="md:col-span-2">
                    <Label className="text-muted-foreground">Last Generated</Label>
                    <p className="mt-1 text-sm">
                      {format(new Date(pass.last_generated_at), 'PPp')}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Download/Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Download & Distribution</CardTitle>
              <CardDescription>
                Download the pass or generate distribution links
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pass.platforms.includes('apple') && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Apple Wallet Pass</h4>
                      <p className="text-sm text-muted-foreground">
                        Download .pkpass file to add to Apple Wallet
                      </p>
                    </div>
                    <Button
                      onClick={handleDownloadApple}
                      disabled={downloading}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {downloading ? 'Downloading...' : 'Download'}
                    </Button>
                  </div>
                  {pass.pkpass_path && (
                    <p className="text-xs text-muted-foreground">
                      File: {pass.pkpass_path}
                    </p>
                  )}
                </div>
              )}

              {pass.platforms.includes('google') && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Google Wallet Link</h4>
                      <p className="text-sm text-muted-foreground">
                        Generate a save link for Google Wallet
                      </p>
                    </div>
                    <Button
                      onClick={handleGenerateGoogleLink}
                      disabled={generating}
                    >
                      {generating ? 'Generating...' : googleLink ? 'Regenerate' : 'Generate Link'}
                    </Button>
                  </div>
                  {googleLink && (
                    <div className="space-y-2">
                      <Button
                        asChild
                        className="w-full"
                        variant="outline"
                      >
                        <a href={googleLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Add to Google Wallet
                        </a>
                      </Button>
                      <p className="text-xs text-muted-foreground break-all">
                        {googleLink}
                      </p>
                    </div>
                  )}
                  {pass.google_class_id && (
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Class ID: {pass.google_class_id}</p>
                      <p>Object ID: {pass.google_object_id}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Public Sharing */}
          <Card>
            <CardHeader>
              <CardTitle>Public Sharing</CardTitle>
              <CardDescription>
                Share this pass with others using a public link
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Public URL</Label>
                <div className="flex gap-2">
                  <Input value={publicUrl} readOnly className="font-mono text-sm" />
                  <Button
                    variant="outline"
                    onClick={() => copy(publicUrl)}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Anyone with this link can view and download the pass
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="outline" asChild>
                  <a href={publicUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Public Page
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(publicUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    View QR Code
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pass Data */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Details</CardTitle>
              <CardDescription>Raw pass configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto max-h-96">
                {JSON.stringify(
                  {
                    pass_data: pass.pass_data,
                    barcode_data: pass.barcode_data,
                    images: Object.keys(pass.images || {}),
                  },
                  null,
                  2
                )}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the pass "{pass.pass_data.description || pass.serial_number}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? 'Deleting...' : 'Delete Pass'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}

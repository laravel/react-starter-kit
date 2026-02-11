import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import * as templatesRoute from '@/routes/templates';
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
import { Apple, Edit, Layers, Plus, Smartphone, Trash2 } from 'lucide-react';
import { PassTemplate, PassPlatform } from '@/types/pass';
import { PaginatedData } from '@/types';
import { PassPreview } from '@/components/pass-preview';

interface TemplatesIndexProps {
  templates: PaginatedData<PassTemplate>;
}

export default function TemplatesIndex({ templates }: TemplatesIndexProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<PassTemplate | null>(null);

  const handleDelete = () => {
    if (templateToDelete) {
      router.delete(templatesRoute.destroy({ template: templateToDelete.id }).url, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setTemplateToDelete(null);
        },
      });
    }
  };

  const openDeleteDialog = (template: PassTemplate) => {
    setTemplateToDelete(template);
    setDeleteDialogOpen(true);
  };

  const getPlatformIcons = (platforms: PassPlatform[]) => {
    return (
      <div className="flex items-center gap-1">
        {platforms.includes('apple') && <Apple className="h-4 w-4" />}
        {platforms.includes('google') && <Smartphone className="h-4 w-4" />}
      </div>
    );
  };

  return (
    <AppLayout
      title="Pass Templates"
      header={
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Pass Templates</h2>
            <p className="text-sm text-muted-foreground">
              Reusable designs for quick pass creation
            </p>
          </div>
          <Button asChild>
            <Link href={templatesRoute.create().url}>
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Link>
          </Button>
        </div>
      }
    >
      <Head title="Pass Templates" />

      <div className="space-y-6">
        {templates.data.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Layers className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No templates yet</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Create reusable templates to speed up pass creation. Templates save your
                design choices so you can quickly create multiple passes with the same look.
              </p>
              <Button asChild>
                <Link href={templatesRoute.create().url}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Template
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.data.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {template.passes_count || 0} pass(es) created
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      {getPlatformIcons(template.platforms)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="capitalize">
                      {template.pass_type.replace(/([A-Z])/g, ' $1').trim()}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Preview */}
                  <div className="rounded-lg overflow-hidden bg-muted/30 p-3">
                    <div className="transform scale-75 origin-top-left w-[133%]">
                      <PassPreview
                        passData={template.design_data}
                        platform={template.platforms[0] || 'apple'}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <Link href={passes.create({ query: { template: template.id } }).url}>
                        Use Template
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => router.visit(templatesRoute.edit({ template: template.id }).url)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openDeleteDialog(template)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Template?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the template "{templateToDelete?.name}"?
              This will not affect passes already created from this template.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Template
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}

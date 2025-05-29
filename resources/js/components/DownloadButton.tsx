import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2, FileText, CheckCircle } from 'lucide-react';

interface DownloadButtonProps {
    assessmentId: number;
    reportType?: 'basic' | 'comprehensive' | 'guest';
    isGuest?: boolean;
    disabled?: boolean;
    variant?: 'outline' | 'default';
    size?: 'sm' | 'default' | 'lg';
    className?: string;
}

export function DownloadButton({
                                   assessmentId,
                                   reportType = 'basic',
                                   isGuest = false,
                                   disabled = false,
                                   variant = 'outline',
                                   size = 'default',
                                   className = ''
                               }: DownloadButtonProps) {
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadComplete, setDownloadComplete] = useState(false);

    const handleDownload = async () => {
        if (isDownloading || disabled) return;

        setIsDownloading(true);
        setDownloadComplete(false);

        try {
            // Determine the correct route
            const routeName = isGuest ? 'guest.assessments.report.download' : 'assessments.report.download';
            const downloadUrl = route(routeName, assessmentId);

            // Create a temporary link element to force download
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.style.display = 'none';

            // Add download attribute to force download instead of preview
            const filename = `Assessment_Report_${assessmentId}_${new Date().toISOString().split('T')[0]}.pdf`;
            link.download = filename;

            // Add to DOM, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Show success state briefly
            setTimeout(() => {
                setDownloadComplete(true);
                setTimeout(() => {
                    setDownloadComplete(false);
                }, 2000);
            }, 1000);

        } catch (error) {
            console.error('Download failed:', error);
            // You might want to show an error toast here
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <Button
            onClick={handleDownload}
            disabled={disabled || isDownloading}
            variant={variant}
            size={size}
            className={className}
        >
            {isDownloading ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating PDF...
                </>
            ) : downloadComplete ? (
                <>
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Downloaded!
                </>
            ) : (
                <>
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                </>
            )}
        </Button>
    );
}

// Usage in your components:
// Replace the Link with this component

// For authenticated users:
// <DownloadButton
//     assessmentId={assessment.id}
//     reportType="basic"
//     variant="outline"
// />

// For guest users:
// <DownloadButton
//     assessmentId={assessment.id}
//     reportType="guest"
//     isGuest={true}
//     variant="outline"
// />

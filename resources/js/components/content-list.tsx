import { DocumentIcon, TrashIcon } from "@heroicons/react/24/outline";
import { router, usePage } from "@inertiajs/react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import {
    Alert,
    AlertActions,
    AlertBody,
    AlertDescription,
    AlertTitle,
} from "./catalyst/alert";
import { Button } from "./catalyst/button";

interface FileUpload {
    id: number;
    original_filename: string;
    status: "uploaded" | "processing" | "processed";
    created_at: string;
    url: string;
    mime_type: string;
    size: number;
    user_id: number;
}

interface PageProps {
    files: FileUpload[];
    auth: {
        user: {
            id: number;
        };
    };
}

export function ContentList() {
    const { files, auth } = usePage().props as unknown as PageProps;
    const currentUserId = auth.user.id;
    const [fileToDelete, setFileToDelete] = useState<FileUpload | null>(null);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    // Function to truncate filename
    const truncateFilename = (
        filename: string,
        maxLength: number = 40,
    ): string => {
        if (filename.length <= maxLength) return filename;

        const extension = filename.split(".").pop() || "";
        const nameWithoutExt = filename.substring(
            0,
            filename.length - extension.length - 1,
        );

        const truncatedName =
            nameWithoutExt.substring(0, maxLength - extension.length - 3) +
            "...";
        return `${truncatedName}.${extension}`;
    };

    // Function to open the delete confirmation alert
    const confirmDelete = (file: FileUpload) => {
        setFileToDelete(file);
        setShowDeleteAlert(true);
    };

    // Function to handle file deletion after confirmation
    const handleDelete = () => {
        if (!fileToDelete) return;

        router.delete(route("content.destroy", fileToDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                setShowDeleteAlert(false);
                setFileToDelete(null);
            },
        });
    };

    // Function to format file size
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    // Function to get status badge color
    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case "uploaded":
                return "bg-blue-100 text-blue-800";
            case "processing":
                return "bg-yellow-100 text-yellow-800";
            case "processed":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <>
            <div>
                <div className="mt-4 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            {files && files.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                                            >
                                                Filename
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Size
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Uploaded
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="relative py-3.5 pr-4 pl-3 sm:pr-3"
                                            >
                                                <span className="sr-only">
                                                    Actions
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {files.map((file) => (
                                            <tr
                                                key={file.id}
                                                className="even:bg-gray-50"
                                            >
                                                <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-3">
                                                    <div className="flex items-center">
                                                        <DocumentIcon className="h-5 w-5 mr-2 flex-shrink-0 text-gray-400" />
                                                        <a
                                                            href={file.url}
                                                            className="hover:text-indigo-600 hover:underline cursor-pointer"
                                                            title={
                                                                file.original_filename
                                                            }
                                                        >
                                                            {truncateFilename(
                                                                file.original_filename,
                                                            )}
                                                        </a>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-500">
                                                    {formatFileSize(file.size)}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-500">
                                                    {formatDistanceToNow(
                                                        new Date(
                                                            file.created_at,
                                                        ),
                                                        { addSuffix: true },
                                                    )}
                                                </td>
                                                <td className="px-3 py-4 text-sm">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeColor(file.status)}`}
                                                    >
                                                        {file.status}
                                                    </span>
                                                </td>
                                                <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium">
                                                    <button
                                                        onClick={() =>
                                                            confirmDelete(file)
                                                        }
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                        <span className="sr-only">
                                                            Delete{" "}
                                                            {
                                                                file.original_filename
                                                            }
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center py-12">
                                    <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-semibold text-gray-900">
                                        No files uploaded
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Click the upload button to add files.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Alert */}
            <Alert
                open={showDeleteAlert}
                onClose={() => setShowDeleteAlert(false)}
            >
                <AlertTitle>Delete File</AlertTitle>
                <AlertDescription className="break-words">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold break-all">
                        {fileToDelete?.original_filename}
                    </span>
                    ? This action cannot be undone.
                </AlertDescription>
                <AlertActions>
                    <Button outline onClick={() => setShowDeleteAlert(false)}>
                        Cancel
                    </Button>
                    <Button
                        color="red"
                        onClick={handleDelete}
                        data-testid="confirm-delete-button"
                    >
                        Delete
                    </Button>
                </AlertActions>
            </Alert>
        </>
    );
}

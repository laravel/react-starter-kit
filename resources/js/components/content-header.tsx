import { ArrowUpCircleIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Button } from "./catalyst/button";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Dialog } from "@headlessui/react";

export function ContentHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, progress, errors, processing, reset } =
        useForm({
            file: null as File | null,
        });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData("file", e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("content.upload"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
            },
        });
    };

    return (
        <div className="lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
                <nav aria-label="Breadcrumb" className="flex">
                    <ol role="list" className="flex items-center space-x-4">
                        <li>
                            <div className="flex">
                                <a
                                    href="/dashboard"
                                    className="text-sm font-medium text-gray-500 hover:text-gray-700"
                                >
                                    Dashboard
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <ChevronRightIcon
                                    aria-hidden="true"
                                    className="size-5 shrink-0 text-gray-400"
                                />
                                <a
                                    href="#"
                                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                >
                                    Content
                                </a>
                            </div>
                        </li>
                    </ol>
                </nav>
                <h2 className="mt-2 text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Content Files
                </h2>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4">
                <span className="sm:ml-3">
                    <Button onClick={() => setIsModalOpen(true)}>
                        <ArrowUpCircleIcon className="mr-1.5 -ml-0.5 size-5" />
                        Upload
                    </Button>
                </span>
            </div>

            {/* File Upload Modal */}
            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                            Upload File
                        </Dialog.Title>

                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Select File
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="sr-only"
                                        id="file-upload"
                                        required
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer w-full transition duration-150 ease-in-out"
                                    >
                                        {data.file ? (
                                            <span className="truncate">
                                                {data.file.name}
                                            </span>
                                        ) : (
                                            <>
                                                <ArrowUpCircleIcon className="h-5 w-5 mr-2 text-gray-400" />
                                                <span>Choose a file...</span>
                                            </>
                                        )}
                                    </label>
                                </div>
                                {errors.file && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.file}
                                    </p>
                                )}
                            </div>

                            {progress && (
                                <div className="mb-4">
                                    <div className="h-2 bg-gray-200 rounded">
                                        <div
                                            className="h-full bg-indigo-600 rounded"
                                            style={{
                                                width: `${progress.percentage}%`,
                                            }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {progress.percentage}% uploaded
                                    </p>
                                </div>
                            )}

                            <div className="mt-5 flex justify-end space-x-3">
                                <Button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    color="white"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing || !data.file}
                                >
                                    Upload
                                </Button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}

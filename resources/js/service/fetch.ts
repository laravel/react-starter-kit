export function GalleryService() {
    const result = fetch('/api/v1/gallery').then((response) => response.json());

    return result;
}

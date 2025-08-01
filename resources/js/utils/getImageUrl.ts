export enum ImagePath {
  LANDING = 'landing',
  USER = 'user',
  ECOMMERCE = 'e-commerce',
  PROFILE = 'profile'
}

// ==============================|| UTIL - GET IMAGE URL ||============================== //

export function getImageUrl(name: string, path: string) {
  return new URL(`../../assets/images/${path}/${name}`, import.meta.url).href;
}
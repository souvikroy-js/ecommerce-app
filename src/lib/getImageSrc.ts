export function getImageSrc(img: string | null) {
  if (!img) return null;
  if (img.startsWith("http") || img.startsWith("/")) return img;
  return `/upload/products/${img}`;
}

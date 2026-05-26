import { ImageLoaderProps } from "next/image";

/**
 * Cloudinary Custom Loader for Next.js Image Component
 * This leverages Cloudinary's powerful on-the-fly image optimization APIs (f_auto, q_auto, resizing)
 * instead of running high-overhead local image optimization on Vercel.
 */
export const cloudinaryLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (!src || !src.includes("cloudinary.com")) {
    return src;
  }

  // Split to inject transformations
  const parts = src.split("/image/upload/");
  if (parts.length !== 2) {
    return src;
  }

  // Remove existing transformation sub-folder if present (e.g. /upload/w_400/v123...)
  let cleanPath = parts[1];
  const urlPathSegments = cleanPath.split("/");
  
  // If the first segment is not a version string (doesn't start with 'v' followed by numbers)
  // and does not end with a file extension, it might be a legacy transformation segment.
  if (
    urlPathSegments[0] && 
    !/^v\d+$/.test(urlPathSegments[0]) && 
    !urlPathSegments[0].includes(".") && 
    urlPathSegments.length > 1
  ) {
    // Drop the transformation segment
    urlPathSegments.shift();
    cleanPath = urlPathSegments.join("/");
  }

  const q = quality || "auto";
  const params = [`f_auto`, `q_${q}`, `w_${width}`, `c_fill`, `g_auto`, `e_sharpen:30`].join(",");

  return `${parts[0]}/image/upload/${params}/${cleanPath}`;
};

/**
 * Direct Cloudinary URL generator (useful for CSS backgrounds, etc.)
 */
export function getCloudinaryUrl(
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: string | number;
    format?: string;
    crop?: string;
  } = {}
) {
  if (!src || !src.includes("cloudinary.com")) {
    return src;
  }

  const parts = src.split("/image/upload/");
  if (parts.length !== 2) {
    return src;
  }

  let cleanPath = parts[1];
  const urlPathSegments = cleanPath.split("/");
  if (
    urlPathSegments[0] && 
    !/^v\d+$/.test(urlPathSegments[0]) && 
    !urlPathSegments[0].includes(".") && 
    urlPathSegments.length > 1
  ) {
    urlPathSegments.shift();
    cleanPath = urlPathSegments.join("/");
  }

  const transformations: string[] = [];
  transformations.push(`f_${options.format || "auto"}`);
  transformations.push(`q_${options.quality || "auto"}`);
  
  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.crop || (options.width && options.height)) {
    transformations.push(options.crop || "c_fill");
  } else {
    transformations.push("c_limit");
  }

  const transformStr = transformations.join(",");
  return `${parts[0]}/image/upload/${transformStr}/${cleanPath}`;
}

"use client";

import Image, { type ImageProps, type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import fallbackImage from "/public/recipe_icon.png";

import { cn } from "@/lib/utils";

interface ImageContainerProps extends ImageProps {
  fallback?: StaticImageData;
}

export default function ImageContainer({
  fallback = fallbackImage,
  alt,
  src,
  ...props
}: ImageContainerProps) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={() => setError(true)}
      src={error ? fallbackImage : src}
      {...props}
      className={cn(
        props.className,
        error ? "filter grayscale opacity-20" : "filter-none",
      )}
    />
  );
}

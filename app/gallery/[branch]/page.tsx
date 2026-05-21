"use client";

import React, { use } from "react";
import { GalleryContent } from "../page";

export default function GalleryBranchPage({ params }: { params: Promise<{ branch: string }> }) {
  const { branch } = use(params);
  
  // Normalize and validate category
  const normalizedCategory = branch?.toLowerCase();
  const activeType = 
    normalizedCategory === "tattoos" || 
    normalizedCategory === "piercings" || 
    normalizedCategory === "nail-art" || 
    normalizedCategory === "removal"
      ? (normalizedCategory as "tattoos" | "piercings" | "nail-art" | "removal") 
      : "tattoos";

  return <GalleryContent initialType={activeType} />;
}

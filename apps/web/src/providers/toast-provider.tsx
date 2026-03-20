"use client";
import { Toaster } from "@/components/ui/sonner";
export default function ToastProvider() {
  
  return (
    <Toaster
      duration={3000}
      position="top-right"
      closeButton
      expand
      richColors
      theme="light"
    />
  )
}

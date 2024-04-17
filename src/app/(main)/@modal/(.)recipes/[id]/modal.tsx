"use client";

import { useRouter } from "next/navigation";
import { type ElementRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="modal-backdrop">
      <dialog
        ref={dialogRef}
        className="modal bg-transparent"
        onClose={onDismiss}
      >
        <ModalContainer onClick={onDismiss}>{children}</ModalContainer>
      </dialog>
    </div>,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    document.getElementById("modal-root")!,
  );
}

function ModalContainer({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div className="sm:w-[32rem] overflow-hidden bg-white rounded-xl shadow-lg">
      <div className="flex justify-end bg-teal-600 py-2 px-3 text-xl font-semibold uppercase tracking-wider text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={onClick}
          onKeyDown={onClick}
        >
          <title>Close</title>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div className="space-y-4 px-8 pt-4 pb-10">{children}</div>
    </div>
  );
}

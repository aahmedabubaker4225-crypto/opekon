"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
};

export default function Modal({
  open,
  title,
  description,
  children,
  footer,
  onClose,
}: ModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0B0B0B] shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-white/10 p-6">
          <div>
            <h2 id="modal-title" className="text-xl font-semibold text-white">
              {title}
            </h2>

            {description && (
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="ml-4 rounded-lg px-3 py-2 text-zinc-400 transition hover:bg-white/5 hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="p-6">{children}</div>

        {footer && (
          <div className="flex justify-end gap-3 border-t border-white/10 p-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
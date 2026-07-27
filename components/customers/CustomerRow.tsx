"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";

import {
  Badge,
  TableCell,
  TableRow,
} from "@/components/ui";

import type { Customer } from "./CustomerTable";

type CustomerRowProps = {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
};

type MenuPosition = {
  top: number;
  left: number;
};

function formatPhoneNumber(
  phone?: string | null
) {
  if (!phone) {
    return "—";
  }

  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10) {
    return `(${digits.slice(
      0,
      3
    )}) ${digits.slice(
      3,
      6
    )}-${digits.slice(6)}`;
  }

  if (
    digits.length === 11 &&
    digits.startsWith("1")
  ) {
    return `+1 (${digits.slice(
      1,
      4
    )}) ${digits.slice(
      4,
      7
    )}-${digits.slice(7)}`;
  }

  return phone;
}

function getPhoneHref(
  phone?: string | null
) {
  if (!phone) {
    return null;
  }

  const digits = phone.replace(/\D/g, "");

  return digits ? `tel:${digits}` : null;
}

export default function CustomerRow({
  customer,
  onEdit,
  onDelete,
}: CustomerRowProps) {
  const phoneHref = getPhoneHref(
    customer.phone
  );

  const buttonRef =
    useRef<HTMLButtonElement | null>(null);

  const menuRef =
    useRef<HTMLDivElement | null>(null);

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [isMounted, setIsMounted] =
    useState(false);

  const [menuPosition, setMenuPosition] =
    useState<MenuPosition>({
      top: 0,
      left: 0,
    });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function updateMenuPosition() {
    const button = buttonRef.current;

    if (!button) {
      return;
    }

    const rect =
      button.getBoundingClientRect();

    const menuWidth = 170;
    const screenPadding = 12;

    const left = Math.min(
      window.innerWidth -
        menuWidth -
        screenPadding,
      Math.max(
        screenPadding,
        rect.right - menuWidth
      )
    );

    setMenuPosition({
      top: rect.bottom + 8,
      left,
    });
  }

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      return;
    }

    updateMenuPosition();
    setIsMenuOpen(true);
  }

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handleOutsideClick(
      event: MouseEvent
    ) {
      const target =
        event.target as Node;

      if (
        buttonRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }

      setIsMenuOpen(false);
    }

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    function closeMenu() {
      setIsMenuOpen(false);
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "resize",
      closeMenu
    );

    window.addEventListener(
      "scroll",
      closeMenu,
      true
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "resize",
        closeMenu
      );

      window.removeEventListener(
        "scroll",
        closeMenu,
        true
      );
    };
  }, [isMenuOpen]);

  return (
    <TableRow
      className="cursor-pointer transition hover:bg-white/[0.035]"
      onClick={() => onEdit(customer)}
    >
      <TableCell className="py-5 align-middle">
        <p className="text-base font-semibold text-white">
          {customer.name}
        </p>
      </TableCell>

      <TableCell className="py-5 align-middle">
        {customer.address ||
        customer.city ? (
          <div className="space-y-1.5">
            {customer.address && (
              <p
                className="max-w-[260px] truncate text-sm font-medium text-zinc-100"
                title={customer.address}
              >
                {customer.address}
              </p>
            )}

            {customer.city && (
              <p className="text-sm text-zinc-400">
                {customer.city}
              </p>
            )}
          </div>
        ) : (
          <span className="text-sm text-zinc-500">
            No address
          </span>
        )}
      </TableCell>

      <TableCell className="py-5 align-middle">
        <div className="space-y-1.5">
          {phoneHref ? (
            <a
              href={phoneHref}
              className="block text-sm font-medium text-zinc-100 transition hover:text-white"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              {formatPhoneNumber(
                customer.phone
              )}
            </a>
          ) : (
            <span className="block text-sm text-zinc-500">
              No phone
            </span>
          )}

          {customer.email ? (
            <a
              href={`mailto:${customer.email}`}
              className="block max-w-[290px] truncate text-sm text-zinc-300 transition hover:text-white"
              title={customer.email}
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              {customer.email}
            </a>
          ) : (
            <span className="block text-sm text-zinc-500">
              No email
            </span>
          )}
        </div>
      </TableCell>

      <TableCell className="py-5 align-middle">
        <Badge
          className="px-3 py-1 text-xs font-semibold"
          variant={
            customer.status === "inactive"
              ? "default"
              : "success"
          }
        >
          {customer.status === "inactive"
            ? "Inactive"
            : "Active"}
        </Badge>
      </TableCell>

      <TableCell className="py-5 align-middle">
        <div className="flex justify-end">
          <button
            ref={buttonRef}
            type="button"
            aria-label={`Actions for ${customer.name}`}
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-xl leading-none text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            onClick={(event) => {
              event.stopPropagation();
              toggleMenu();
            }}
          >
            ⋮
          </button>
        </div>

        {isMounted &&
          isMenuOpen &&
          createPortal(
            <div
              ref={menuRef}
              role="menu"
              style={{
                top: menuPosition.top,
                left: menuPosition.left,
              }}
              className="fixed z-[9999] w-[170px] overflow-hidden rounded-xl border border-white/10 bg-zinc-950 p-1.5 shadow-2xl"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <button
                type="button"
                role="menuitem"
                className="flex w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-200 transition hover:bg-white/[0.07] hover:text-white"
                onClick={() => {
                  setIsMenuOpen(false);
                  onEdit(customer);
                }}
              >
                Edit customer
              </button>

              <button
                type="button"
                role="menuitem"
                className="flex w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                onClick={() => {
                  setIsMenuOpen(false);
                  onDelete(customer);
                }}
              >
                Delete customer
              </button>
            </div>,
            document.body
          )}
      </TableCell>
    </TableRow>
  );
}
"use client";

import { useState } from "react";

import {
  Button,
  Card,
  Input,
  Select,
  Textarea,
} from "@/components/ui";

export type CustomerFormData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  city: string;
  status: "active" | "inactive";
};

type CustomerFormProps = {
  initialValues?: Partial<CustomerFormData>;
  submitLabel?: string;
  onSubmit?: (
    customer: CustomerFormData
  ) => boolean | Promise<boolean>;
};

type FormErrors = {
  name?: string;
  phone?: string;
  email?: string;
};

function normalizePhoneNumber(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "";
  }

  const digits = trimmedValue.replace(/\D/g, "");

  if (digits.length === 10) {
    return digits;
  }

  if (
    digits.length === 11 &&
    digits.startsWith("1")
  ) {
    return digits;
  }

  return trimmedValue;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value
  );
}

export default function CustomerForm({
  initialValues,
  submitLabel = "Save Customer",
  onSubmit,
}: CustomerFormProps) {
  const [name, setName] = useState(
    initialValues?.name ?? ""
  );

  const [phone, setPhone] = useState(
    initialValues?.phone ?? ""
  );

  const [email, setEmail] = useState(
    initialValues?.email ?? ""
  );

  const [address, setAddress] = useState(
    initialValues?.address ?? ""
  );

  const [notes, setNotes] = useState(
    initialValues?.notes ?? ""
  );

  const [city, setCity] = useState(
    initialValues?.city ?? ""
  );

  const [status, setStatus] = useState<
    "active" | "inactive"
  >(initialValues?.status ?? "active");

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  function validateForm() {
    const nextErrors: FormErrors = {};

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const phoneDigits = phone.replace(/\D/g, "");

    if (!trimmedName) {
      nextErrors.name =
        "Customer name is required.";
    }

    if (
      trimmedEmail &&
      !isValidEmail(trimmedEmail)
    ) {
      nextErrors.email =
        "Enter a valid email address.";
    }

    if (
      phone.trim() &&
      phoneDigits.length !== 10 &&
      !(
        phoneDigits.length === 11 &&
        phoneDigits.startsWith("1")
      )
    ) {
      nextErrors.phone =
        "Enter a valid 10-digit phone number.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function clearForm() {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setNotes("");
    setCity("");
    setStatus("active");
    setErrors({});
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const wasSuccessful = await onSubmit?.({
        name: name.trim(),
        phone: normalizePhoneNumber(phone),
        email: email.trim().toLowerCase(),
        address: address.trim(),
        notes: notes.trim(),
        city: city.trim(),
        status,
      });

      if (wasSuccessful) {
        clearForm();
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        noValidate
      >
        <div className="space-y-2">
          <Input
            label="Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);

              if (errors.name) {
                setErrors((currentErrors) => ({
                  ...currentErrors,
                  name: undefined,
                }));
              }
            }}
            placeholder="John Smith"
            required
            autoComplete="name"
          />

          {errors.name && (
            <p className="text-sm text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Input
              label="Phone"
              type="tel"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);

                if (errors.phone) {
                  setErrors(
                    (currentErrors) => ({
                      ...currentErrors,
                      phone: undefined,
                    })
                  );
                }
              }}
              placeholder="403-555-0123"
              autoComplete="tel"
            />

            {errors.phone && (
              <p className="text-sm text-red-400">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);

                if (errors.email) {
                  setErrors(
                    (currentErrors) => ({
                      ...currentErrors,
                      email: undefined,
                    })
                  );
                }
              }}
              placeholder="john@example.com"
              autoComplete="email"
            />

            {errors.email && (
              <p className="text-sm text-red-400">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <Input
          label="Address"
          value={address}
          onChange={(event) =>
            setAddress(event.target.value)
          }
          placeholder="123 Main Street"
          autoComplete="street-address"
        />

        <Input
          label="City"
          value={city}
          onChange={(event) =>
            setCity(event.target.value)
          }
          placeholder="Calgary"
          autoComplete="address-level2"
        />

        <Textarea
          label="Notes"
          value={notes}
          onChange={(event) =>
            setNotes(event.target.value)
          }
          placeholder="Additional customer details"
          rows={4}
        />

        <Select
          label="Status"
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value as
                | "active"
                | "inactive"
            )
          }
        >
          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>
        </Select>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={
              isSubmitting || !name.trim()
            }
          >
            {isSubmitting
              ? "Saving..."
              : submitLabel}
          </Button>
        </div>
      </form>
    </Card>
  );
}
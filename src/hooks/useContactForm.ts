import { useCallback, useState, type FormEvent } from "react";
import { sendContactMessage } from "../services/messageService";
import type { ContactFormStatus } from "../types";
import {
  hasContactErrors,
  validateContactField,
  validateContactForm,
  type ContactFieldErrors,
  type ContactFieldName,
  type ContactFormValues,
} from "../utils/contactValidation";

const INITIAL_VALUES: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactFieldName, boolean>>>(
    {}
  );
  const [status, setStatus] = useState<ContactFormStatus>({ type: "idle" });

  const isSubmitting = status.type === "loading";

  const setFieldValue = useCallback((field: ContactFieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (status.type === "error") {
      setStatus({ type: "idle" });
    }
  }, [status.type]);

  const blurField = useCallback(
    (field: ContactFieldName) => {
      setTouched((current) => ({ ...current, [field]: true }));
      const fieldError = validateContactField(field, values);
      setErrors((current) => {
        const next = { ...current };
        if (fieldError) next[field] = fieldError;
        else delete next[field];
        return next;
      });
    },
    [values]
  );

  const resetForm = useCallback(() => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setTouched({});
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const nextErrors = validateContactForm(values);
      setErrors(nextErrors);
      setTouched({ name: true, email: true, message: true });

      if (hasContactErrors(nextErrors)) {
        setStatus({
          type: "error",
          message: "Please fix the highlighted fields before sending.",
        });
        return;
      }

      setStatus({ type: "loading" });

      try {
        await sendContactMessage(values);
        setStatus({
          type: "success",
          message: "Message sent — I'll get back to you soon.",
        });
        resetForm();
      } catch (error) {
        setStatus({
          type: "error",
          message:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
        });
      }
    },
    [resetForm, values]
  );

  const visibleError = useCallback(
    (field: ContactFieldName) => (touched[field] ? errors[field] : undefined),
    [errors, touched]
  );

  return {
    values,
    errors,
    touched,
    status,
    isSubmitting,
    setFieldValue,
    blurField,
    handleSubmit,
    visibleError,
  };
}

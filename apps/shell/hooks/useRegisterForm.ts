import { useState, useCallback } from "react";
import { FormValidator } from "../services/validation";

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = useCallback(
    (field: keyof RegisterFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const validateForm = useCallback(() => {
    const validationErrors = FormValidator.validateRegisterForm(
      formData.name,
      formData.email,
      formData.password
    );
    setErrors(validationErrors);
    return FormValidator.isFormValid(validationErrors);
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({ name: "", email: "", password: "" });
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    updateField,
    validateForm,
    resetForm,
    isValid:
      FormValidator.isFormValid(errors) &&
      formData.name &&
      formData.email &&
      formData.password,
  };
};

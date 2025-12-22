import { useState, useCallback } from "react";
import { FormValidator } from "../services/validation";

export interface LoginFormData {
  email: string;
  password: string;
}

export const useLoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = useCallback(
    (field: keyof LoginFormData, value: string) => {
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
    const validationErrors = FormValidator.validateLoginForm(
      formData.email,
      formData.password
    );
    setErrors(validationErrors);
    return FormValidator.isFormValid(validationErrors);
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({ email: "", password: "" });
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    updateField,
    validateForm,
    resetForm,
    isValid:
      FormValidator.isFormValid(errors) && formData.email && formData.password,
  };
};

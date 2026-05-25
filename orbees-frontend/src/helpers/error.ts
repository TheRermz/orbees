import { AxiosError } from "axios";

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
  title?: string;
}

export const getErrorMessage = (err: unknown, fallback: string): string => {
  if (err instanceof AxiosError) {
    const data = err.response?.data as ApiErrorResponse | undefined;

    if (!data) return fallback;

    // formato { message: "..." }
    if (data.message) return data.message;

    // formato validation errors { errors: { Field: ["msg"] } }
    if (data.errors) {
      const messages = Object.values(data.errors).flat();
      if (messages.length > 0) return messages.join(" ");
    }

    // formato { title: "..." }
    if (data.title) return data.title;

    return fallback;
  }

  return fallback;
};

import { AxiosError } from "axios";

export const getErrorMessage = (err: unknown, fallback: string): string => {
  if (err instanceof AxiosError) {
    return err.response?.data?.message ?? fallback;
  }
  return fallback;
};

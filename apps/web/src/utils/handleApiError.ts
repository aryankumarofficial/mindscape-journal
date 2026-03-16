import axios from "axios";

export function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? "Request failed";
  }

  return "Unexpected error occurred";
}
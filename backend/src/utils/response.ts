export function formatResponse<T>(success: boolean, data?: T, message?: string) {
  return { success, data, message };
}

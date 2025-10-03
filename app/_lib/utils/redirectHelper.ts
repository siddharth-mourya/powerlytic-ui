export function redirectToLogin() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  }
}

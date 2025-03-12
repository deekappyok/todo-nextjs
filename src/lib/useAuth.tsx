// lib/useAuth.ts
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Custom hook to protect routes by requiring authentication
 * @param redirectUrl The URL to redirect to if not authenticated
 * @returns Object containing session and loading state
 */
export function useAuth(redirectUrl = "/auth/login") {
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";
  const authenticated = status === "authenticated";
  const unauthenticated = status === "unauthenticated";

  useEffect(() => {
    // If the user is not authenticated and the status is not loading
    if (unauthenticated && !loading) {
      // Note: With App Router, we can't pass query parameters the same way
      // We'll need to construct the URL manually
      const returnUrl = encodeURIComponent(window.location.pathname);
      router.push(`${redirectUrl}?returnUrl=${returnUrl}`);
    }
  }, [unauthenticated, loading, router, redirectUrl]);

  return { session, loading, authenticated };
}

export default useAuth;

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth(redirectUrl = "/auth/login") {
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";
  const authenticated = status === "authenticated";
  const unauthenticated = status === "unauthenticated";

  useEffect(() => {
    if (unauthenticated && !loading) {
      const returnUrl = encodeURIComponent(window.location.pathname);
      router.push(`${redirectUrl}?returnUrl=${returnUrl}`);
    }
  }, [unauthenticated, loading, router, redirectUrl]);

  return { session, loading, authenticated };
}

export default useAuth;

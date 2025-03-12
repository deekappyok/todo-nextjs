"use client";
import { signOut } from "next-auth/react";
import { useAuth } from "../lib/useAuth";

export default function ProtectedPage() {
  const { session, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, the hook will redirect, so we don't need to handle that case here

  // If authenticated, show the protected content
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
      <p>Welcome, {session?.user?.email}!</p>
      <p>This is a protected page. Only authenticated users can see this content.</p>
      <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
}

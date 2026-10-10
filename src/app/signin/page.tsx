"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const GithubIcon = () => (
  <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    setLoading(true);
    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });
    setLoading(false);

    if (data) toast.success("Sign In Successfully");
    if (error) toast.error(error.message as string);
  };

  const handleSignWithGoogle = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
  };

  const handleGithubSignIn = async () => {
    await authClient.signIn.social({ provider: "github", callbackURL: "/" });
  };

  return (
    <main className="min-h-screen bg-[#eef3ee] px-4 py-10">
      <div className="mx-auto max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">সাইন ইন</h2>
        <p className="mt-2 mb-6 text-center text-sm text-gray-600">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>

        <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm">
          <form onSubmit={onSubmit}>
            <fieldset className="fieldset w-full gap-1">
              <label className="label text-sm font-medium text-gray-800">ইমেইল</label>
              <input
                name="email"
                type="email"
                required
                className="input w-full bg-white"
                placeholder="you@example.com"
              />

              <label className="label mt-2 text-sm font-medium text-gray-800">পাসওয়ার্ড</label>
              <input
                name="password"
                type="password"
                required
                className="input w-full bg-white"
                placeholder="কমপক্ষে ৮ অক্ষর"
              />

              <button
                type="submit"
                disabled={loading}
                className="btn mt-5 w-full border-0 bg-[#0a8a3f] text-white shadow-md shadow-green-900/20 hover:bg-[#087535] disabled:opacity-60"
              >
                {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
              </button>
            </fieldset>
          </form>

          <div className="divider my-3 text-xs text-gray-500">অথবা</div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleSignWithGoogle}
              className="btn btn-outline border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
            >
              Google দিয়ে চালিয়ে যান
            </button>
            <button
              type="button"
              onClick={handleGithubSignIn}
              className="btn btn-outline gap-2 border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
            >
              <GithubIcon /> GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-700">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="font-medium text-[#0a8a3f] hover:underline">
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">← হোম পেজে ফিরে যান</Link>
        </p>
      </div>
    </main>
  );
};

export default SignIn;
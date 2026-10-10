"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [githubLoading, setGithubLoading] = useState<boolean>(false);

  const busy = loading || googleLoading || githubLoading;

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

  //   const handleSignWithGoogle = async () => {
  //     await authClient.signIn.social({ provider: "google", callbackURL: "/" });
  //   };

  //   const handleSignWithGitHub = async () => {
  //     await authClient.signIn.social({ provider: "github", callbackURL: "/" });
  //   };

  const handleSignWithGoogle = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google দিয়ে সাইন ইন ব্যর্থ হয়েছে");
        return;
      }

      toast.success("Google দিয়ে সাইন ইন শুরু হচ্ছে!");
    } catch {
      toast.error("আবার চেষ্টা করুন।");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSignWithGitHub = async () => {
    setGithubLoading(true);
    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "GitHub দিয়ে সাইন ইন ব্যর্থ হয়েছে");
        return;
      }

      toast.success("GitHub দিয়ে সাইন ইন শুরু হচ্ছে!");
    } catch {
      toast.error("আবার চেষ্টা করুন।");
    } finally {
      setGithubLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#eef3ee] px-4 py-10">
      <div className="mx-auto max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          সাইন ইন
        </h2>
        <p className="mt-2 mb-6 text-center text-sm text-gray-600">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>

        <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm">
          <form onSubmit={onSubmit}>
            <fieldset className="fieldset w-full gap-1">
              <label className="label text-sm font-medium text-gray-800">
                ইমেইল
              </label>
              <input
                name="email"
                type="email"
                required
                className="input w-full bg-white"
                placeholder="you@example.com"
              />

              <label className="label mt-2 text-sm font-medium text-gray-800">
                পাসওয়ার্ড
              </label>
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
              disabled={busy}
              className="btn btn-outline flex w-full items-center justify-center border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed"
            >
              <Image
                src="/google.png"
                alt="Google logo"
                width={15}
                height={15}
              />
              <span>
                {googleLoading ? "অপেক্ষা করুন..." : "Google দিয়ে চালিয়ে যান"}
              </span>
            </button>

            <button
              type="button"
              onClick={handleSignWithGitHub}
              disabled={busy}
              className="btn btn-outline flex w-full items-center justify-center border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed"
            >
              <Image
                src="/github-logo.png"
                alt="GitHub logo"
                width={15}
                height={15}
              />
              <span>
                {githubLoading ? "অপেক্ষা করুন..." : "GitHub দিয়ে চালিয়ে যান"}
              </span>
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-700">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#0a8a3f] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            ← হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignIn;

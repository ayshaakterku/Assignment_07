"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";



const SignUp = () => {
  const router = useRouter();

  const [errorps, setErrorps] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [githubLoading, setGithubLoading] = useState<boolean>(false);

  const busy = loading || googleLoading || githubLoading;

  // Email Signup
  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const confirm = String(formData.get("confirm") ?? "");

    if (password.length < 8) {
      setErrorps("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে")
      return;
    }

    if (password !== confirm) {
      setErrorps("পাসওয়ার্ড দুটি মিলছে না");
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে")
      return;
    }

    setErrorps("");
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message ?? "সাইন আপ ব্যর্থ হয়েছে");
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
  const handleSignWithGoogle = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      if (error) {
        toast.error(error.message ?? "Google দিয়ে সাইন আপ ব্যর্থ হয়েছে");
        setGoogleLoading(false);
      }
      // on success the browser redirects, so the loading state stays on
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setGoogleLoading(false);
    }
  };

  // GitHub Signup
  const handleSignWithGitHub = async () => {
    setGithubLoading(true);
    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
      if (error) {
        toast.error(error.message ?? "GitHub দিয়ে সাইন আপ ব্যর্থ হয়েছে");
        setGithubLoading(false);
      }
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setGithubLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#eef3ee] px-4 py-10">
      <div className="mx-auto max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          অ্যাকাউন্ট তৈরি করুন
        </h2>

        <p className="mt-2 mb-6 text-center text-sm text-gray-600">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>

        <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm">
          <form onSubmit={onSubmit}>
            <fieldset className="fieldset w-full gap-1">
              <label className="label text-sm font-medium text-gray-800">নাম</label>
              <input
                name="name"
                type="text"
                required
                className="input w-full bg-white"
                placeholder="যেমন: রহিম উদ্দিন"
              />

              <label className="label mt-2 text-sm font-medium text-gray-800">ইমেইল</label>
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
                // minLength={8}
                className="input w-full bg-white"
                placeholder="কমপক্ষে ৮ অক্ষর"
              />

              <label className="label mt-2 text-sm font-medium text-gray-800">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                name="confirm"
                type="password"
                required
                // minLength={8}
                className="input w-full bg-white"
                placeholder="আবার লিখুন"
              />

              {errorps && <p className="mt-2 text-sm text-red-600">{errorps}</p>}

              <button
                type="submit"
                disabled={busy}
                className="btn mt-5 w-full border-0 bg-[#0a8a3f] text-white shadow-md shadow-green-900/20 hover:bg-[#087535] disabled:opacity-60"
              >
                {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
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
              <Image src="/google.png" alt="Google logo" width={15} height={15} />
              <span>{googleLoading ? "অপেক্ষা করুন..." : "Google দিয়ে চালিয়ে যান"}</span>
            </button>

            <button
              type="button"
              onClick={handleSignWithGitHub}
              disabled={busy}
              className="btn btn-outline flex w-full items-center justify-center border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed"
            >
              <Image src="/github-logo.png" alt="GitHub logo" width={15} height={15} />
              <span>{githubLoading ? "অপেক্ষা করুন..." : "GitHub দিয়ে চালিয়ে যান"}</span>
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-700">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="font-medium text-[#0a8a3f] hover:underline">
              সাইন ইন করুন
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

export default SignUp;
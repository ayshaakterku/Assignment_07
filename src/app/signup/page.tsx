"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SignUp = () => {
  const [errorps, setErrorps] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Email Signup
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      confirm: string;
    };

    if (user.password.length < 8) {
      setErrorps("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (user.password !== user.confirm) {
      setErrorps("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setErrorps("");
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: user.name,
        email: user.email,
        password: user.password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

      // Navigate after successful signup
      window.location.href = "/";
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
  const handleSignWithGoogle = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message);
    }
  };
  //   const handleSignWithGoogle = async () => {
  //     setGoogleLoading(true);

  //     try {
  //       const { error } = await authClient.signIn.social({
  //         provider: "google",
  //         callbackURL: "/",
  //       });

  //       if (error) {
  //         toast.error(error.message);
  //         setGoogleLoading(false);
  //       }
  //     } catch {
  //       toast.error("Google দিয়ে সাইন আপ করা যায়নি। আবার চেষ্টা করুন।");
  //       setGoogleLoading(false);
  //     }
  //   };

  // GitHub Signup
  const handleSignWithGitHub = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
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
              <label className="label text-sm font-medium text-gray-800">
                নাম
              </label>

              <input
                name="name"
                type="text"
                required
                className="input w-full bg-white"
                placeholder="যেমন: রহিম উদ্দিন"
              />

              <label className="label mt-2 text-sm font-medium text-gray-800">
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
                minLength={8}
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
                minLength={8}
                className="input w-full bg-white"
                placeholder="আবার লিখুন"
              />

              {errorps && (
                <p className="mt-2 text-sm text-red-600">{errorps}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn mt-5 w-full border-0 bg-[#0a8a3f] text-white shadow-md shadow-green-900/20 hover:bg-[#087535]"
              >
                {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
              </button>
            </fieldset>
          </form>

          <div className="divider my-3 text-xs text-gray-500">অথবা</div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleSignWithGoogle}
              disabled={googleLoading}
              className="btn btn-outline border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
            >
              {googleLoading ? "অপেক্ষা করুন..." : "Google দিয়ে চালিয়ে যান"}
            </button>

            <button
              type="button"
              onClick={handleSignWithGitHub}
              className="btn btn-outline border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
            >
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-700">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-medium text-[#0a8a3f] hover:underline"
            >
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

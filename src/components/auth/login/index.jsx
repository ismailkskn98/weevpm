"use client";
import React from "react";
import LoginForm from "./loginForm";
import { Link } from "@/i18n/navigation";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export default function Login() {
  const t = useTranslations("Auth.login");

  return (
    <motion.main
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeInOut", delay: 0.4 }}
      className="w-full flex flex-col items-center justify-center text-white gap-4"
    >
      <article className="flex flex-col items-center justify-center gap-3 mb-2">
        <h1 className="text-3xl 2xl:text-4xl 3xl:text-5xl font-bold text-white">{t("title")}</h1>
        <p className="text-sm text-white/80">{t("subtitle")}</p>
      </article>
      <LoginForm />
      <article className="flex items-center gap-2 mt-2">
        <p className="text-xs sm:text-sm text-white/80">{t("noAccount")}</p>
        <Link href="/auth/register" className="text-sm text-white/80 underline">
          {t("registerLink")}
        </Link>
      </article>
    </motion.main>
  );
}

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(formData: FormData) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  if (!ADMIN_PASSWORD) {
    return { error: "Password admin belum dikonfigurasi di server." };
  }

  const password = formData.get("password") as string;

  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_token", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    redirect("/admin");
  } else {
    return { error: "Password salah!" };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  redirect("/admin/login");
}

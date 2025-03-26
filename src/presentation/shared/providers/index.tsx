"use client";

import type { ThemeProviderProps } from "next-themes";

import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";

type ProvidersProps = {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
};

declare module "@react-types/shared" {
  type RouterConfig = {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  };
}

export const Providers = ({ children, themeProps }: ProvidersProps) => {
  const router = useRouter();
  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <Toaster position="bottom-right" closeButton richColors />
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
};

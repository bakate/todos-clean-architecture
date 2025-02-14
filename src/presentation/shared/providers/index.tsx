"use client";

import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";

import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";

type ProvidersProps = {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
};

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
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

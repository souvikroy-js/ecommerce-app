import ThemeProvider from "@/components/Providers/ThemeProvider";
import { geistMono, geistSans, interHeading } from "@/lib/fonts";
import { PageLayoutProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import "./globals.css";

const RootLayout = ({ children }: PageLayoutProps) => {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        interHeading.variable,
      )}
      suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="dark"
          enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;

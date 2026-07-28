import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import type { NgfSiteContent } from "@/lib/ngf";

type PageChromeProps = {
  children: React.ReactNode;
  content: NgfSiteContent;
};

export function PageChrome({ children, content }: PageChromeProps) {
  return (
    <>
      <Navbar content={content} />
      <main id="main-content">{children}</main>
      <Footer content={content} />
    </>
  );
}

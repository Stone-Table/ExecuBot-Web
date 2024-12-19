import { Suspense } from "react";
import { getCurrentUser } from "@saasfly/auth";

import { ModalProvider } from "~/components/modal-provider";
import { NavBar } from "~/components/navbar";
import { SiteFooter } from "~/components/site-footer";
import { getMarketingConfig } from "~/config/ui/marketing";
import { getDictionary } from "~/lib/get-dictionary";
import IndexPage from './[lang]/(marketing)/page';

export default async function RootPage() {
  const dict = await getDictionary('en');
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback="...">
        <NavBar
          items={(await getMarketingConfig({ params: { lang: 'en' } })).mainNav}
          params={{ lang: 'en' }}
          scroll={true}
          marketing={dict.marketing}
          dropdown={dict.dropdown}
        />
      </Suspense>
      <ModalProvider dict={dict.login} />
      <main className="flex-1">
        <IndexPage params={{ lang: 'en' }} />
      </main>
      <SiteFooter
        className="border-t border-border"
        params={{ lang: 'en' }}
        dict={dict.common}
      />
    </div>
  );
} 
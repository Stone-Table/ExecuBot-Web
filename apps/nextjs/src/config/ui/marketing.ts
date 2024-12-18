import type { Locale } from "~/config/i18n-config";
import { getDictionary } from "~/lib/get-dictionary";
import type { MarketingConfig } from "~/types";

export const getMarketingConfig = async ({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}): Promise<MarketingConfig> => {
  return {
    mainNav: [
      // {
      //   title: "Features",
      //   href: "/features",
      // },
      // {
      //   title: "Pricing",
      //   href: "/pricing",
      // },
      {
        title: "Blog",
        href: "/blog",
      },
      // {
      //   title: "Documentation",
      //   href: "/docs",
      // },
    ],
  };
};

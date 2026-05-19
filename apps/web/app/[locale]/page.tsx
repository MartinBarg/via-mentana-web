import { getClientConfig } from "@/lib/config";
import { loc } from "@/lib/utils";
import type { NavCtaConfig } from "@/components/Navbar";
import PageBody from "@/components/PageBody";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const config = await getClientConfig();

  const heroProperties = config.properties.slice(
    0,
    config.heroToursCount ?? config.properties.length
  );

  let navCta: NavCtaConfig | undefined;
  if (config.hero) {
    if (config.hero.ctaSingle) {
      navCta = { type: "single", label: loc(config.hero.ctaLabel, locale), url: config.hero.ctaSingle.url };
    } else {
      const items = heroProperties
        .filter((p) => p.hero.ctaUrl ?? p.airbnbUrl)
        .map((p) => ({
          label: p.hero.ctaLabel ? loc(p.hero.ctaLabel, locale) : loc(p.hero.title, locale),
          url: (p.hero.ctaUrl ?? p.airbnbUrl) as string,
        }));
      if (items.length > 0) {
        navCta = { type: "dropdown", label: loc(config.hero.ctaLabel, locale), items };
      }
    }
  }

  return <PageBody config={config} heroProperties={heroProperties} locale={locale} navCta={navCta} />;
}

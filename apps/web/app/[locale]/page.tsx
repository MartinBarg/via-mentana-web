import { getClientConfig } from "@/lib/config";
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

  return <PageBody config={config} heroProperties={heroProperties} locale={locale} />;
}

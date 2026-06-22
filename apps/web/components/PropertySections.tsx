import type { PropertyConfig, ClientReviewsConfig } from "@/lib/types/client";
import DescriptionSection from "./DescriptionSection";
import LocationSection from "./LocationSection";
import ReviewsSection from "./ReviewsSection";

interface PropertySectionsProps {
  property: PropertyConfig;
  locale: string;
  backgroundImageUrl?: string;
  clientReviews?: ClientReviewsConfig;
}

export default function PropertySections({ property, locale, backgroundImageUrl, clientReviews }: PropertySectionsProps) {
  return (
    <div id={property.id}>
      <DescriptionSection property={property} locale={locale} backgroundImageUrl={backgroundImageUrl} />
      <LocationSection property={property} locale={locale} />
      <ReviewsSection property={property} locale={locale} clientReviews={clientReviews} />
    </div>
  );
}

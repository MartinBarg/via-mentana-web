import type { PropertyConfig } from "@/lib/types/client";
import DescriptionSection from "./DescriptionSection";
import LocationSection from "./LocationSection";
import ReviewsSection from "./ReviewsSection";

interface PropertySectionsProps {
  property: PropertyConfig;
  locale: string;
}

export default function PropertySections({ property, locale }: PropertySectionsProps) {
  return (
    <div id={property.id}>
      <DescriptionSection property={property} locale={locale} />
      <LocationSection property={property} locale={locale} />
      <ReviewsSection property={property} locale={locale} />
    </div>
  );
}

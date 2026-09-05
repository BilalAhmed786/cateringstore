// app/(frontend)/(pages)/(Home)/components/StructuredData.tsx
export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: 'Catering Store',
    image: 'https://cateringstore.vercel.app/icon.png',
    '@id': 'https://cateringstore.vercel.app',
    url: 'https://cateringstore.vercel.app',
    telephone: '+92-300-0000000',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lane # 15 near Fazia colony',
      addressLocality: 'Islamabad',
      addressCountry: 'PK',
    },
    servesCuisine: 'Event Catering, Gift Hampers, Party Menus',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
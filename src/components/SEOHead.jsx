import { Helmet } from "react-helmet-async";

export default function SEOHead({ title, description, canonical, image }) {
  const siteName = "BrightSmile Dental Clinic";
  const baseUrl = "https://brightsmile-dental.vercel.app";
  const defaultImage = baseUrl + "/og-image.jpg";
  const fullTitle = title ? title + " | " + siteName : siteName + " — Award-Winning Dentistry in London";
  const fullCanonical = baseUrl + (canonical || "");
  const fullImage = image || defaultImage;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullCanonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#1A6B8A" />
    </Helmet>
  );
}
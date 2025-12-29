
import React from 'react';
import { allProjects } from '../data';
import { translations } from '../translations';

export const SchemaMarkup: React.FC = () => {
  const services = translations.ru.services.items;
  
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "name": "Портфолио Kutsev Studio",
        "description": "Список реализованных проектов в области веб-разработки и дизайна",
        "numberOfItems": allProjects.length,
        "itemListElement": allProjects.map((project, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": project.category.toLowerCase().includes('app') || project.category.toLowerCase().includes('platform') ? "SoftwareApplication" : "CreativeWork",
            "name": project.title,
            "description": project.fullDescription || project.description,
            "image": {
              "@type": "ImageObject",
              "url": project.imageUrl,
              "caption": project.title,
              "author": "Kutsev Studio"
            },
            "genre": project.category,
            "datePublished": project.year,
            "author": {
              "@type": "Organization",
              "name": "Kutsev Studio",
              "url": "https://kutsev.studio"
            },
            "mainEntityOfPage": `https://kutsev.studio/#project-${project.id}`,
            "abstract": project.headline,
            "keywords": project.technologies?.join(', '),
            "publisher": {
              "@type": "Organization",
              "name": "Kutsev Studio",
              "logo": {
                "@type": "ImageObject",
                "url": "https://kutsev.studio/logo.png"
              }
            },
            ...(project.category.toLowerCase().includes('app') || project.category.toLowerCase().includes('platform') ? {
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Web"
            } : {})
          }
        }))
      },
      {
        "@type": "Service",
        "serviceType": "Web Development",
        "provider": {
          "@type": "Organization",
          "name": "Kutsev Studio"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Услуги студии",
          "itemListElement": Object.values(services).map((service) => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": service.title,
              "description": service.desc
            }
          }))
        }
      }
    ]
  };

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
    />
  );
};

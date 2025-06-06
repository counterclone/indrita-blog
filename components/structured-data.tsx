import Script from 'next/script'

// Helper function to create absolute image URLs
function getAbsoluteImageUrl(imageUrl: string): string {
  // If the URL is already absolute, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it's a relative URL, prepend the domain
  const baseUrl = 'https://www.akhilhanda.com';
  return `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
}

export function PersonStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Akhil Handa",
    "alternateName": "Akhil Handa",
    "description": "Former President & Chief Digital Officer | JPMorgan, Bank of Baroda, digital banking expert, fintech innovation leader, and AI banking pioneer",
    "url": "https://www.akhilhanda.com",
    "image": {
      "@type": "ImageObject",
      "url": "https://www.akhilhanda.com/akhil-handa-profile.jpg",
      "width": 800,
      "height": 800
    },
    "sameAs": [
      "https://www.linkedin.com/in/akhilhanda",
      "https://twitter.com/akhilhanda",
      "https://www.akhilhanda.com"
    ],
    "jobTitle": "Former President & Chief Digital Officer",
    "worksFor": {
      "@type": "Organization",
      "name": "JPMorgan, Bank of Baroda",
      "url": "https://www.bankofbaroda.in"
    },
    "alumniOf": {
      "@type": "Organization", 
      "name": "Indian Institute of Technology Delhi",
      "url": "https://home.iitd.ac.in"
    },
    "knowsAbout": [
      "Digital Banking",
      "Fintech Innovation", 
      "AI in Banking",
      "Digital Transformation",
      "Financial Technology",
      "Mobile Banking",
      "Digital Payments",
      "Open Banking",
      "Conversational Banking",
      "Digital Lending"
    ],
    "award": [
      "Visionary Leader of the Year - Financial Express",
      "Best Chief Digital Officer - Indian Express BFSI Tech Awards",
      "Top AI Leader in India - Analytics India Magazine",
      "Best Fintech Innovator - Business Today | KPMG",
      "Best Digital Banking Product - Economic Times BFSI Innovation Awards"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": " Board, Director, President & Chief Digital Officer",
      "description": "Leading digital transformation initiatives in banking and financial services",
      "occupationLocation": {
        "@type": "Country",
        "name": "India"
      }
    }
  }

  return (
    <Script
      id="person-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FirstHand by Akhil Handa",
    "alternateName": "FirstHand",
    "description": "Digital banking insights and fintech innovation chronicles by Akhil Handa, former President & CDO of Bank of Baroda",
    "url": "https://www.akhilhanda.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.akhilhanda.com/firsthand-logo.png",
      "width": 600,
      "height": 600
    },
    "founder": {
      "@type": "Person",
      "name": "Akhil Handa"
    },
    "sameAs": [
      "https://www.linkedin.com/in/akhilhanda",
      "https://twitter.com/akhilhanda"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "url": "https://www.akhilhanda.com/contact"
    }
  }

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FirstHand by Akhil Handa",
    "alternateName": "FirstHand",
    "description": "Digital banking evolution chronicles and fintech insights by Akhil Handa",
    "url": "https://www.akhilhanda.com",
    "author": {
      "@type": "Person",
      "name": "Akhil Handa"
    },
    "publisher": {
      "@type": "Person",
      "name": "Akhil Handa"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.akhilhanda.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

interface ArticleStructuredDataProps {
  title: string
  description: string
  image: string
  datePublished: string
  dateModified: string
  slug: string
  author?: string
  category?: string[]
}

export function ArticleStructuredData({
  title,
  description,
  image,
  datePublished,
  dateModified,
  slug,
  author = "Akhil Handa",
  category = []
}: ArticleStructuredDataProps) {
  // Get absolute image URL for structured data
  const absoluteImageUrl = getAbsoluteImageUrl(image);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": {
      "@type": "ImageObject",
      "url": absoluteImageUrl,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "name": author,
      "url": "https://www.akhilhanda.com/about",
      "jobTitle": "Former President & Chief Digital Officer | JPMorgan, Bank of Baroda",
      "worksFor": {
        "@type": "Organization",
        "name": "JPMorgan, Bank of Baroda",
        "url": "https://www.jpmorgan.com"
      },
      "alumniOf": {
        "@type": "Organization",
        "name": "Indian Institute of Technology Delhi"
      },
      "expertise": [
        "Digital Banking",
        "Banking Modernization", 
        "Legacy System Migration",
        "Financial Technology",
        "Banking Cybersecurity"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "FirstHand by Akhil Handa",
      "url": "https://www.akhilhanda.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.akhilhanda.com/firsthand-logo.png"
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified,
    "url": `https://www.akhilhanda.com/article-content/${slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.akhilhanda.com/article-content/${slug}`
    },
    "articleSection": category.length > 0 ? category[0] : "Digital Banking",
    "keywords": category.concat([
      "legacy systems banking",
      "outdated software risks",
      "banking modernization",
      "software modernization banking", 
      "legacy system security risks",
      "COBOL modernization",
      "banking digital transformation",
      "digital banking",
      "fintech",
      "Akhil Handa",
      "JPMorgan",
      "Bank of Baroda",
      "Chief Digital Officer",
      "digital banking expert",
      "financial technology security"
    ]).join(", "),
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "genre": ["Technology", "Banking", "Digital Transformation"],
    "audience": {
      "@type": "Audience",
      "audienceType": "Banking Professionals, CIOs, CTOs, Digital Transformation Leaders"
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Legacy System Modernization",
        "description": "The process of updating outdated software systems in banking"
      },
      {
        "@type": "Thing", 
        "name": "Banking Security Risks",
        "description": "Cybersecurity vulnerabilities in outdated banking software"
      },
      {
        "@type": "Thing",
        "name": "Digital Banking Transformation", 
        "description": "Evolution from traditional to modern digital banking platforms"
      }
    ],
    "mentions": [
      {
        "@type": "Organization",
        "name": "Satyam Computer Services",
        "description": "Case study of accounting fraud involving outdated systems"
      },
      {
        "@type": "Organization", 
        "name": "DHFL",
        "description": "Housing finance company fraud case involving FoxPro systems"
      },
      {
        "@type": "SoftwareApplication",
        "name": "COBOL",
        "description": "Legacy programming language still used in banking"
      },
      {
        "@type": "SoftwareApplication",
        "name": "FoxPro", 
        "description": "Outdated database system used in DHFL fraud case"
      }
    ]
  }

  return (
    <Script
      id="article-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
} 
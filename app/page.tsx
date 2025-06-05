import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FeaturedArticle } from "@/components/featured-article"
import { ArticleCard } from "@/components/article-card"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { StreamOfThought } from "@/components/stream-of-thought"
import { LinkedInArticles } from "@/components/linkedin-articles"
import { HeroSection } from "@/components/hero-section"
import { SubscribeDialog } from '@/components/subscribe-dialog'
import connectDB from '@/lib/mongodb'
import Article from '@/models/Article'
import type { Metadata } from 'next'

interface ArticleData {
  _id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string | string[];
  slug: string;
  readTime?: string;
}

async function getArticles(): Promise<ArticleData[]> {
  try {
    await connectDB();
    
    // Fetch articles directly from database
    const articles = await Article.find()
      .select('title excerpt image date author category readTime slug _id')
      .sort({ date: -1 })
      .lean();
    
    // Convert MongoDB documents to plain objects and format dates
    return articles.map((article: any) => ({
      _id: article._id.toString(),
      title: article.title,
      excerpt: article.excerpt,
      image: article.image,
      date: article.date.toISOString(),
      author: article.author,
      category: article.category,
      slug: article.slug,
      readTime: article.readTime
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// Enhanced SEO metadata for ranking #1 for "Akhil Handa"
export const metadata: Metadata = {
  title: "Akhil Handa | Digital Banking Leader & Former Chief Digital Officer | FirstHand",
  description: "Akhil Handa, former President & Chief Digital Officer at Bank of Baroda, shares firsthand insights on digital banking, fintech innovation, and AI in financial services. Led digital transformation for 200M+ customers and $1 trillion in annual payments.",
  keywords: [
    // Primary brand keywords
    "Akhil Handa",
    "Akhil Handa digital banking",
    "Akhil Handa Bank of Baroda",
    "Akhil Handa CDO",
    "Akhil Handa fintech",
    
    // Professional title keywords
    "Chief Digital Officer banking",
    "President Bank of Baroda",
    "Digital Banking Leader India",
    "Banking transformation expert",
    "Fintech innovation leader",
    
    // Industry expertise keywords
    "digital banking transformation",
    "AI in banking",
    "fintech innovation",
    "financial technology",
    "digital payments India",
    "banking digitization",
    "mobile banking strategy",
    "open banking APIs",
    "digital lending platforms",
    "conversational banking",
    
    // Company and institutional keywords
    "Bank of Baroda digital",
    "bob World app",
    "JPMorgan digital banking",
    "Indian banking digital transformation",
    "fintech partnerships India",
    "IIT Delhi banking",
    
    // Awards and recognition
    "Visionary Leader Financial Express",
    "Best Chief Digital Officer India",
    "Top AI Leader banking",
    "Best Fintech Innovator",
    
    // Content and thought leadership
    "FirstHand Akhil Handa",
    "banking evolution blog",
    "fintech insights",
    "digital banking trends",
    "financial services innovation"
  ].join(", "),
  authors: [{ name: "Akhil Handa" }],
  creator: "Akhil Handa",
  publisher: "FirstHand by Akhil Handa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Akhil Handa | Digital Banking Leader & Former Chief Digital Officer",
    description: "Former President & CDO at Bank of Baroda, led digital transformation for 200M+ customers. Insights on fintech, AI in banking, and financial innovation.",
    url: "https://firsthand.akhilhanda.com",
    siteName: "FirstHand by Akhil Handa",
    images: [
      {
        url: "https://firsthand.akhilhanda.com/akhil-handa-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Akhil Handa - Digital Banking Leader and Former Chief Digital Officer",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "profile",
    username: "akhilhanda",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akhil Handa | Digital Banking Leader & Former CDO",
    description: "Former President & CDO at Bank of Baroda, led digital transformation for 200M+ customers. Insights on fintech and AI in banking.",
    creator: "@akhilhanda",
    site: "@akhilhanda",
    images: ["https://firsthand.akhilhanda.com/akhil-handa-profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://firsthand.akhilhanda.com",
  },
  other: {
    "google-site-verification": "your-google-verification-code",
    "msvalidate.01": "your-bing-verification-code",
  },
}

export default async function Home() {
  // Fetch articles on the server
  const recentArticles = await getArticles();
  const featuredIndex = 0; // defaults to most recent article at index 0

  // Get the featured article based on featuredIndex
  const featuredArticle = recentArticles[featuredIndex];
  
  // Filter out the featured article from recent articles
  const filteredRecentArticles = recentArticles.filter((_, index) => index !== featuredIndex);
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Stream of Thought */}
      {/* <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Stream of Thought</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Quick takes and observations on the rapidly evolving digital banking landscape. These are my unfiltered
            thoughts as I witness the transformation happening around us.
          </p>
          <StreamOfThought />
        </div>
      </section> */}

      {/* Featured Insight - Premium Design */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        {/* Subtle Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-100/15 to-transparent rounded-full blur-3xl translate-x-48 translate-y-48"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative">
          {/* Section Header with Premium Styling */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-blue-100 mb-4">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Premium Content</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
              Featured Insight
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Deep dive into the latest trends shaping the digital banking landscape
            </p>
          </div>

          {/* Featured Article Card with Subtle Design */}
          {featuredArticle ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 p-8 md:p-10 hover:bg-white/95 transition-all duration-300">
              <FeaturedArticle
                title={featuredArticle.title}
                excerpt={featuredArticle.excerpt}
                image={featuredArticle.image}
                date={new Date(featuredArticle.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }).toUpperCase()}
                author={featuredArticle.author}
                category={featuredArticle.category}
                slug={featuredArticle.slug}
                _id={featuredArticle._id}
              />
            </div>
          ) : (
            <div className="text-center text-gray-500 bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 p-12">
              No featured article available
            </div>
          )}
        </div>
      </section>

      {/* Recent Articles Grid */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
          {filteredRecentArticles.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredRecentArticles.map((article) => (
                <ArticleCard
                  key={article._id}
                  title={article.title}
                  excerpt={article.excerpt}
                  image={article.image}
                  date={new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }).toUpperCase()}
                  author={article.author}
                  category={article.category}
                  slug={article.slug}
                  _id={article._id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">No recent articles available</div>
          )}
          <div className="mt-8 text-center">
            <Link href="/articles" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
              View all articles
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-4">Topics I'm Following</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            These are the areas I'm actively tracking and documenting as they evolve and reshape the financial
            landscape.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/topics/ai-banking"
              className="group p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <h3 className="font-medium mb-2 group-hover:text-blue-700">AI in Banking</h3>
              <p className="text-sm text-gray-600">How artificial intelligence is reshaping financial services</p>
            </Link>
            <Link
              href="/topics/digital-transformation"
              className="group p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <h3 className="font-medium mb-2 group-hover:text-purple-700">Digital Transformation</h3>
              <p className="text-sm text-gray-600">Case studies and insights on banking's digital journey</p>
            </Link>
            <Link
              href="/topics/fintech-innovation"
              className="group p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <h3 className="font-medium mb-2 group-hover:text-green-700">Fintech Innovation</h3>
              <p className="text-sm text-gray-600">Startups and technologies changing how we bank</p>
            </Link>
            <Link
              href="/topics/global-trends"
              className="group p-6 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <h3 className="font-medium mb-2 group-hover:text-amber-700">Global Trends</h3>
              <p className="text-sm text-gray-600">International perspectives on banking evolution</p>
            </Link>
          </div>
        </div>
      </section>

      {/* LinkedIn Articles */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8">LinkedIn Articles</h2>
          <LinkedInArticles />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <NewsletterSignup />
        </div>
      </section>

      {/* About Me Brief */}
      <section className="py-12 md:py-16 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <Image src="/akhil-handa-profile.jpg" alt="Akhil Handa - Former President & Chief Digital Officer Bank of Baroda" width={300} height={300} className="rounded-lg" />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">About Akhil Handa - Digital Banking Pioneer</h2>
              <p className="text-gray-600 mb-4">
                I'm <strong>Akhil Handa</strong>, a global leader in AI-powered digital banking with two decades of experience shaping
                the future of financial services. As the <strong>President & Chief Digital Officer</strong> of Bank of Baroda (a global top 10 bank by customers), I led
                digital transformation initiatives, overseeing a bank with over <strong>USD 300 billion total business</strong>, presence in 25
                international markets, and <strong>USD 1 trillion in annual digital payments</strong>.
              </p>
              <p className="text-gray-600 mb-6">
                A key contributor to <strong>national digital finance policy</strong>, I use <strong>FirstHand</strong> to chronicle the evolution of
                digital platforms in banking and adjacent markets. My expertise spans <strong>AI in banking</strong>, <strong>fintech innovation</strong>, 
                <strong>digital transformation</strong>, and <strong>mobile banking solutions</strong>.
              </p>
              <Link href="/about">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  More about Akhil Handa's Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact" className="ml-4">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Connect with Akhil Handa
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

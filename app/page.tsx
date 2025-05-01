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

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Stream of Thought */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Stream of Thought</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Quick takes and observations on the rapidly evolving digital banking landscape. These are my unfiltered
            thoughts as I witness the transformation happening around us.
          </p>
          <StreamOfThought />
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 md:py-16" id="latest-articles">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
          <FeaturedArticle
            title="The Endurance Capital Interview"
            excerpt="India is full of sound businesses around ₹10 cr revenue mark that struggle to scale as they are neither big enough to attract growth capital, nor small enough to be funded by friends and family. Endurance Capital is solving this gap."
            image="/endurance-capital-interview.jpg"
            date="11 APR 2023"
            author="Akhil Handa"
            category="Fintech"
            slug="/articles/endurance-capital-interview"
          />
        </div>
      </section>

      {/* Recent Articles Grid */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ArticleCard
              title="From 7-Day Waits to 60-Minute Delivery: The DocPharma Interview"
              excerpt="While media writes epitaphs for brick-and-mortar retail, DocPharma is building a network of micro-warehouses to deliver medicines in under an hour."
              image="/docpharma-interview.jpg"
              date="8 APR 2023"
              author="Akhil Handa"
              category="Digital Transformation"
              slug="/articles/docpharma-interview"
            />
            <ArticleCard
              title="Solving For Mid-Mile Logistics: The JustDeliveries Interview"
              excerpt="Food brands and QSRs often struggle with mid-mile logistics. JustDeliveries is solving this with their tech-enabled fleet management platform."
              image="/justdeliveries-interview.jpg"
              date="22 APR 2023"
              author="Akhil Handa"
              category="Innovation"
              slug="/articles/justdeliveries-interview"
            />
            <ArticleCard
              title="The Wrapper Theory: Building Great Products By Combining What Already Exists"
              excerpt="Building a unique product/service is hard. But what if you could create value by simply combining existing products in novel ways?"
              image="/wrapper-theory.jpg"
              date="5 APR 2023"
              author="Akhil Handa"
              category="Product Strategy"
              slug="/articles/wrapper-theory"
            />
          </div>
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
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8">My LinkedIn Articles</h2>
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
              <Image src="/akhil-handa-profile.jpg" alt="Akhil Handa" width={300} height={300} className="rounded-lg" />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">About Me</h2>
              <p className="text-gray-600 mb-4">
                I'm Akhil Handa, a global leader in AI-powered digital banking with two decades of experience shaping
                the future of financial services. As the President & CDO of a global top 10 bank (by customers), I led
                digital transformation initiatives, overseeing a bank with over 300bn USD total business, presence in 25
                international markets, and USD 1 trillion in annual digital payments.
              </p>
              <p className="text-gray-600 mb-6">
                A key contributor to national digital finance policy, I use FirstHand to chronicle the evolution of
                digital platforms in banking and adjacent markets.
              </p>
              <Link href="/about">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  More about me
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

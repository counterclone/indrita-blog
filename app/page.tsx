"use client";

import { useEffect, useState } from "react"
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

interface Article {
  _id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  slug: string;
}

export default function Home() {
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setRecentArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);
  
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
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : recentArticles[0] && (
            <FeaturedArticle
              title={recentArticles[0].title}
              excerpt={recentArticles[0].excerpt}
              image={recentArticles[0].image}
              date={new Date(recentArticles[0].date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }).toUpperCase()}
              author={recentArticles[0].author}
              category={recentArticles[0].category}
              slug={recentArticles[0].slug}
              _id={recentArticles[0]._id}
            />
          )}
        </div>
      </section>

      {/* Recent Articles Grid */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentArticles.map((article) => (
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

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import ArticleContent from '@/models/ArticleContent';
import { SocialShare } from '@/components/social-share';
import { FloatingSocialShare } from '@/components/floating-social-share';
import '@/styles/article.css';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

interface ArticleData {
  _id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string | string[]; //to take care of the array of categories
  readTime: string;
  slug: string;
  htmlContent?: string;
}

async function getArticleWithContent(id: string): Promise<ArticleData | null> {
  try {
    await connectDB();
    
    // Normalize the id by removing the prefix if it exists
    const normalizedId = id.replace('/article-content/', '');
    
    // First get the article metadata
    const article = await Article.findOne({ slug: normalizedId });
    
    if (!article) {
      console.log('Article not found for id:', normalizedId);
      return null;
    }

    console.log('Found article:', article);
    console.log('Article ID:', article._id);

    // Log all article content documents to debug
    const allArticleContents = await ArticleContent.find({});
    console.log('All article contents in database:', allArticleContents);

    // Try to find article content by both slug and articleId
    const articleContent = await ArticleContent.findOne({
      $or: [
        { slug: normalizedId },
        { articleId: article._id.toString() }
      ]
    });
    
    console.log('Query conditions:', {
      slug: normalizedId,
      articleId: article._id.toString()
    });
    console.log('Article content query result:', articleContent);

    // Combine the data
    const articleData = {
      ...article.toObject(),
      htmlContent: articleContent?.htmlContent || ''
    };

    return articleData;
  } catch (error: any) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export default async function ArticleContentPage({ params }: ArticlePageProps) {
  try {
    // Await the params before using them
    const { id } = await params;  // Make sure to await params
    
    // Remove any prefix from the id if it exists
    const cleanId = id.replace('/article-content/', '');
    const article = await getArticleWithContent(cleanId);

    if (!article) {
      notFound();
    }

    // Construct the full URL for sharing
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.akhilhanda.com';
    const articleUrl = `${baseUrl}/article-content/${cleanId}`;

    // Format category for display
    const categoryDisplay = Array.isArray(article.category) 
      ? article.category.join(", ") 
      : article.category;

    return (
      <>
        <FloatingSocialShare 
          title={article.title} 
          url={articleUrl}
          excerpt={article.excerpt}
        />
        
        <article className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/articles"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Link>

            <header className="mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                {Array.isArray(article.category) ? (
                  <div className="flex items-center gap-2">
                    {article.category.map((cat, index) => (
                      <span key={cat}>
                        <span className="font-medium text-blue-600">{cat}</span>
                        {index < article.category.length - 1 && (
                          <span className="mx-1 text-gray-400">•</span>
                        )}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="font-medium text-blue-600">{article.category}</span>
                )}
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <span>By {article.author}</span>
                <time dateTime={new Date(article.date).toISOString()}>
                  {new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>

              {/* Social Share Component */}
              <div className="border-t border-b border-gray-100 py-4 mb-6">
                <SocialShare 
                  title={article.title} 
                  url={articleUrl}
                  excerpt={article.excerpt}
                />
              </div>
            </header>

            {article.image && (
              <div className="relative aspect-[16/9] w-full mb-8 rounded-lg overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.htmlContent || '' }}
            />

            {/* Bottom Social Share */}
            <div className="border-t border-gray-100 pt-8 mt-12">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Found this article helpful?</h3>
                <p className="text-gray-600 mb-4">
                  Share it with your network and help spread insights on digital banking innovation.
                </p>
                <SocialShare 
                  title={article.title} 
                  url={articleUrl}
                  excerpt={article.excerpt}
                />
              </div>
            </div>

            {/* Related Articles or Author Bio could go here */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <Image 
                    src="/akhil-handa-avatar.jpg" 
                    alt="Akhil Handa" 
                    width={64} 
                    height={64} 
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Akhil Handa</h4>
                    <p className="text-sm text-gray-600 mb-2">Digital Banking Strategist</p>
                    <p className="text-sm text-gray-600">
                      Global leader in AI-powered digital banking and internet scale platforms, 
                      shaping the future of financial services.
                    </p>
                    <div className="mt-3">
                      <Link 
                        href="/about" 
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Learn more about Akhil →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </>
    );
  } catch (error) {
    console.error('Error in ArticleContentPage:', error);
    throw error;
  }
} 
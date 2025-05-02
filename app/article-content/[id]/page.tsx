import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import ArticleContent from '@/models/ArticleContent';

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
  category: string;
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

    return (
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
              <span className="font-medium text-blue-600">{article.category}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>By {article.author}</span>
              <time dateTime={new Date(article.date).toISOString()}>
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
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
            className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:mb-4 prose-ul:my-4 prose-li:ml-4"
            dangerouslySetInnerHTML={{ __html: article.htmlContent || '' }}
          />
        </div>
      </article>
    );
  } catch (error) {
    console.error('Error in ArticleContentPage:', error);
    throw error;
  }
} 
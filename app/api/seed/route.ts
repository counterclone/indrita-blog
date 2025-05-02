import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ArticleContent from '@/models/ArticleContent';

export async function GET() {
    try {
        await connectDB();

        const articleContent = {
            articleId: "6813b5bda18d1189c97a5217",
            slug: "endurance-capital-interview",
            htmlContent: `<article class='article-content'>
                <section class='introduction'>
                    <p>India's entrepreneurial landscape is dotted with promising businesses that find themselves in a peculiar situation. With revenues around the ₹10 crore mark, they're caught in what I call the 'scaling gap' - too big for friends and family funding, yet too small for traditional growth capital.</p>
                    <p>To understand how Endurance Capital is addressing this challenge, I sat down with their founding team.</p>
                </section>

                <section class='interview'>
                    <h2>The Growth Capital Gap</h2>
                    <p>"We consistently saw great businesses struggling to scale beyond the ₹10 crore revenue mark," explains the founding team. "These companies have proven business models, loyal customer bases, and strong unit economics. What they lack is growth capital structured to their needs."</p>
                    
                    <h2>The Endurance Approach</h2>
                    <p>Endurance Capital's approach is refreshingly straightforward. They provide growth capital without diluting equity, using a revenue-based financing model that aligns with the business's cash flows.</p>
                    
                    <h2>Key Investment Criteria</h2>
                    <ul>
                        <li>Revenue: ₹5-20 crore annual run rate</li>
                        <li>Track Record: Minimum 3 years of operations</li>
                        <li>Profitability: Demonstrated path to profitability</li>
                        <li>Growth: Clear expansion opportunities</li>
                    </ul>
                    
                    <h2>Beyond Capital</h2>
                    <p>"Capital is just one part of the equation," the team emphasizes. "We work closely with our portfolio companies on strategic initiatives, operational improvements, and building robust systems for scale."</p>
                </section>

                <section class='conclusion'>
                    <h2>Looking Ahead</h2>
                    <p>With a growing portfolio of successful investments, Endurance Capital is proving that there's a viable model for funding India's missing middle - businesses that are too big for microfinance but too small for traditional private equity.</p>
                    
                    <p>For entrepreneurs caught in the scaling gap, Endurance Capital's model offers a compelling alternative to traditional funding routes. It's an approach that could help unlock the potential of countless solid businesses across India.</p>
                </section>
            </article>`,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await ArticleContent.create(articleContent);
        console.log('Article content inserted successfully:', result);

        return NextResponse.json({ message: 'Article content seeded successfully', result });
    } catch (error: any) {
        console.error('Error seeding article content:', error);
        return NextResponse.json(
            { error: 'Failed to seed article content', details: error.message },
            { status: 500 }
        );
    }
} 
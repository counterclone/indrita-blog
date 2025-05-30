'use client';

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SubscribeDialog } from "@/components/subscribe-dialog"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6">About Me</h1>
        <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
          <div className="md:w-1/3 flex-shrink-0 flex justify-center md:justify-start">
            <Image src="/akhil-handa-profile.jpg" alt="Akhil Handa" width={240} height={240} className="rounded-lg shadow-lg" />
          </div>
          <div className="md:w-2/3 w-full">
            <div className="text-2xl font-bold text-gray-900 mb-2">Akhil Handa</div>
            <div className="text-lg font-semibold text-blue-700 mb-1">Former President & Chief Digital Officer – Global Top-10 Bank</div>
            <div className="text-base font-medium text-gray-700 mb-4">Board Advisor | Fintech & Policy Architect</div>
            <p className="text-lg text-gray-700 mb-6">
              Welcome to <span className="font-bold">FirstHand</span>. I'm Akhil Handa—an explorer at the intersection of digital banking, fintech, and public infrastructure. Over the past two decades, I've had the unique opportunity to witness and shape the evolution of financial services from the inside—across India, the UAE, Southeast Asia, and Hong Kong.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              My journey spans from a global banking perspective at <span className="font-semibold">JPMorgan</span>, where I experienced world-class capital markets and institutional banking, to the deep Indian banking evolution as <span className="font-semibold">President & Chief Digital Officer of Bank of Baroda</span>, India's second-largest public bank. I led one of the most ambitious digital transformations in Indian banking history—reimagining how over 200 million customers engage with their money.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              This wasn't just about tech—it was about unlocking real utility through innovation. From launching mobile-first experiences and digital lending to implementing performance-driven marketing funnels and real-time analytics—I've seen firsthand what it takes to scale digital banking with trust, reliability, and intelligence.
            </p>
            <div className="mb-6">
              <div className="font-semibold text-gray-900 mb-2">I was responsible for:</div>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Powering over <span className="font-bold">$1 trillion</span> in annual digital payments settlements</li>
                <li>Rolling out scalable platforms across lending, payments, and onboarding</li>
                <li>Driving initiatives across <span className="font-bold">25+ international markets</span> with a global lens</li>
                <li>Leading customer experience across digital lending, mobile banking, and embedded finance</li>
              </ul>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              What you'll find on <span className="font-bold">FirstHand</span> is my ongoing chronicle of real-world experiences: the wins, the mistakes, the experiments that worked, and the pivots that didn't. From working with startups to steering national platforms, I've had a front-row seat to financial transformation.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Professional Background</h2>
        <div className="mb-8">
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><span className="font-semibold">Architected digital operations at scale</span>—serving a customer base of over 200M users across platforms</li>
            <li><span className="font-semibold">Built bob World</span>, India's second most downloaded digital banking app</li>
            <li><span className="font-semibold">Set up digital lending from scratch</span>, enabling the bank to lend over USD 10 billion annually across personal, SME, and co-lending segments</li>
            <li><span className="font-semibold">Established conversational banking</span> from scratch, integrating natural language and AI-driven interfaces into daily banking</li>
            <li><span className="font-semibold">Led funnel optimization</span> across all digital loan journeys, boosting customer conversion and retention</li>
            <li><span className="font-semibold">Designed and launched India's first Startup Banking vertical, banking nearly 10% of eligible startups at peak</span>, supporting new-age businesses with tailored digital products</li>
            <li><span className="font-semibold">Rolled out the Innovation Centre at IIT Bombay</span>, enabling deeper fintech-bank collaborations</li>
            <li><span className="font-semibold">Championed blockchain adoption in trade finance</span>, co-leading the formation of IBBIC Ltd</li>
            <li><span className="font-semibold">Set up a Digital Analytics Bench of Excellence</span>, leveraging a cloud-based data lake for advanced analytics and machine learning</li>
            <li><span className="font-semibold">Created a full-stack digital marketing capability</span> for performance-based user acquisition and engagement</li>
            <li><span className="font-semibold">Built and scaled partnerships with 50+ fintechs</span> across credit, payments, KYC, AML, and onboarding</li>
            <li><span className="font-semibold">Upgraded and ran an ATM/CR/Cashpoint network of over 10,000 touchpoints</span></li>
            <li><span className="font-semibold">Setup state of the art Digital Payments Fraud Monitoring Unit for prevention and detection</span></li>
            <li><span className="font-semibold">Setup novel Digital banking Units - new branch concept for delivering services phygitally</span></li>
            
      
          </ul>
          <p className="text-lg text-gray-700 mb-6">
            From crafting customer journeys to managing 24x7 backend operations, this journey has been one of continuous iteration—where speed, empathy, and clarity make all the difference.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">Board Roles</h2>
        <div className="mb-8">
          <p className="text-lg text-gray-700 mb-4">I've contributed as a board member to several pioneering institutions, including:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><span className="font-semibold">IBBIC Ltd</span> – Indian Banks' Blockchain Infrastructure Company (15-bank consortium + IBM/Infosys)</li>
            <li><span className="font-semibold">Online PSB Loans Ltd</span> – India's public credit platform backed by SIDBI, NABARD, HSBC, and Experian</li>
            <li><span className="font-semibold">Baroda Global Shared Services Ltd</span> – Digital operations and enterprise platform delivery</li>
            <li><span className="font-semibold">Baroda Sun Technologies Ltd</span> – Captive tech arm of Bank of Baroda</li>
            <li><span className="font-semibold">Mitra Microfinance</span> – Entrepreneurial microfinance venture</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-4">Some Policy Contributions</h2>
        <div className="mb-8">
          <p className="text-lg text-gray-700 mb-4">India's digital public infrastructure story is deeply personal to me. I've been involved in shaping it through roles in:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><span className="font-semibold">RBI's CBDC Core Committee</span> – Designing the architecture of India's digital rupee</li>
            <li><span className="font-semibold">Ministry of Finance's JanSamarth Taskforce</span> – Building India's unified credit access platform</li>
            <li><span className="font-semibold">Ministry of Finance's JanSuraksha Taskforce</span> – Building India's unified benefits insurance access platform</li>
            <li><span className="font-semibold">Account Aggregator HLWG</span> – Creating the foundation for India's consent-based data economy</li>
            <li><span className="font-semibold">IDRBT's AI in Banking Committee</span> – Establishing responsible AI frameworks for financial institutions</li>
            <li><span className="font-semibold">Indian Bank's Association (IBA's) Digital Payments Standing Committee</span> – Driving interoperability and innovation</li>
            <li><span className="font-semibold">NITI Aayog's Women Entrepreneurship Platform</span> – Supporting inclusive fintech design</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-4">Industry Recognition</h2>
        <div className="mb-8">
          <p className="text-lg text-gray-700 mb-4">Along the way, I've been humbled to be recognized by peers and institutions:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><span className="font-semibold">Visionary Leader of the Year</span> – Financial Express (2022 & 2023)</li>
            <li><span className="font-semibold">Best Chief Digital Officer</span> – Indian Express BFSI Tech Awards, IDC</li>
            <li><span className="font-semibold">Top AI Leader in India</span> – Analytics India Magazine</li>
            <li><span className="font-semibold">Best Fintech Innovator</span> – Business Today | KPMG</li>
            <li><span className="font-semibold">Best Digital Banking Product</span> – Economic Times BFSI Innovation Awards</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-4">Why FirstHand?</h2>
        <div className="mb-8">
          <p className="text-lg text-gray-700 mb-6">
            Because the future of finance isn't unfolding in theory—it's happening in the trenches: in code, in customer conversations, in failed experiments, and in unexpected product-market fits. <span className="font-bold">FirstHand</span> is my attempt to document that future—not through press releases, but through observations, insights, and unfiltered learnings.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            The name is a nod to my personal perspective (Handa) and the spirit of staying close to the action. Through <span className="font-bold">FirstHand</span>, I hope to share what I've learned—and learn from those walking similar paths.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            As co-author of <span className="font-semibold">Transformational Leadership in Banking</span> and host of the <span className="font-semibold">FinTalk podcast</span>, I continue to engage with global fintech, AI, and regulatory thought leaders. An IIT Delhi alumnus, I'm currently building my next AI-native venture focused on intelligent capital allocation, embedded finance, and digital infrastructure for the next era of financial services.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">My Focus Areas</h2>
        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium mb-2">AI in Banking</h3>
            <p className="text-sm text-gray-600">
              Exploring how artificial intelligence is reshaping financial decision-making and customer experiences.
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium mb-2">Digital Transformation</h3>
            <p className="text-sm text-gray-600">
              Documenting how traditional banks are evolving in the digital age and the challenges they face.
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium mb-2">Fintech Innovation</h3>
            <p className="text-sm text-gray-600">
              Analyzing emerging startups and technologies that are disrupting traditional financial services.
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium mb-2">Digital Policy & Infrastructure</h3>
            <p className="text-sm text-gray-600">
              Examining the regulatory frameworks and digital infrastructure shaping the future of finance.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Connect With Me</h2>
        <p className="text-gray-600 mb-6">
          I'm always interested in connecting with fellow enthusiasts, industry professionals, and innovators in the
          digital banking space. Feel free to reach out if you have insights to share or stories that deserve to be
          told.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/contact">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
              Let's Connect
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <SubscribeDialog>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full sm:w-auto">
              Subscribe to Updates
            </Button>
          </SubscribeDialog>
        </div>
      </div>
    </div>
  )
}

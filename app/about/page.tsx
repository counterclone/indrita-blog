import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "About Akhil Handa | FirstHand",
  description: "Learn more about Akhil Handa, Digital Banking Strategist and chronicler of fintech evolution.",
  keywords: "Akhil Handa, digital banking, fintech, AI, Bank of Baroda, FirstHand",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About Me</h1>

        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          <div className="md:w-1/3">
            <Image src="/akhil-handa-profile.jpg" alt="Akhil Handa" width={300} height={300} className="rounded-lg" />
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Former Chief Digital Officer – Global Top-10 Bank</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Board Advisor</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Fintech & Policy Architect</span>
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <p className="text-gray-600 mb-6">
              I'm Akhil Handa, a global leader in AI-powered digital banking and platform transformation, with two
              decades of experience shaping the future of financial services across India, the UAE, SE-Asia and Hong
              Kong.
            </p>
            <p className="text-gray-600 mb-6">
              As the President & CDO of a global top 10 bank (by customers), I led the digital transformation of Bank of
              Baroda, overseeing a bank with over 300bn USD total business, presence in 25 international markets, and
              USD 1 trillion in annual digital payments, and launching scaled digital platforms across lending,
              payments, and mobile banking.
            </p>
            <p className="text-gray-600 mb-6">
              Through FirstHand, I chronicle my observations, insights, and conversations with innovators who are
              reshaping how we think about banking and financial services.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Professional Background</h2>
        <div className="mb-8">
          <p className="text-gray-600 mb-4">
            Under my leadership, Bank of Baroda rolled out and scaled award-winning platforms and products, including
            bob World—India's second most downloaded digital banking app—as well as an AI-first digital lending stack
            and embedded finance infrastructure. I've built strategic partnerships with over 100 fintechs and technology
            firms, across credit, payments, KYC, underwriting, and open data.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Board Roles</h3>
          <p className="text-gray-600 mb-4">
            I have held independent board roles in pioneering digital finance institutions, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
            <li>
              <span className="font-medium">IBBIC Ltd</span> – Indian Banks' Blockchain Infrastructure Company backed by
              15 Indian banks and tech firms like IBM and Infosys Finacle, focused on digitizing trade finance
            </li>
            <li>
              <span className="font-medium">Online PSB Loans Ltd</span> – India's public credit marketplace funded by
              public sector banks, SIDBI, TransUnion, Experian, NABARD, and HSBC, advancing MSME credit inclusion
            </li>
            <li>
              <span className="font-medium">Baroda Global Shared Services Ltd</span> – overseeing digital operations and
              enterprise platforms
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Policy Contributions</h3>
          <p className="text-gray-600 mb-4">
            I've been a key contributor to national digital finance policy and infrastructure, serving on:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
            <li>RBI's Central Bank Digital Currency (CBDC) Core Committee – shaping India's digital rupee</li>
            <li>Ministry of Finance's JanSamarth Taskforce – powering the national unified credit platform</li>
            <li>Account Aggregator HLWG – architecting India's consent-based financial data-sharing framework</li>
            <li>IDRBT AI in Banking Committee – advancing responsible AI in finance</li>
            <li>IBA Digital Payments Standing Committee</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Industry Recognition</h3>
          <p className="text-gray-600 mb-4">I've received top industry accolades, including:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
            <li>Visionary Leader of the Year – Financial Express (2022 & 2023)</li>
            <li>Best Chief Digital Officer – Indian Express BFSI Tech Awards & IDC</li>
            <li>Top AI Leader in India – Analytics India Magazine</li>
            <li>Best Fintech Innovator – Business Today | KPMG</li>
            <li>Best Digital Banking Product – Economic Times BFSI Innovation Awards</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-4">Why FirstHand?</h2>
        <p className="text-gray-600 mb-6">
          The name "FirstHand" reflects my approach to documenting the digital banking evolution - through direct
          observations, personal conversations with innovators, and firsthand experiences with emerging technologies.
          It's also a subtle nod to my surname, Handa, representing my personal perspective on these transformations.
        </p>
        <p className="text-gray-600 mb-6">
          As co-author of Transformational Leadership in Banking and host of the FinTalk podcast, I regularly engage
          with global fintech, AI, and regulatory thought leaders. An alumnus of IIT Delhi, I'm now building my next
          AI-native venture focused on intelligent capital allocation, embedded finance, and digital infrastructure for
          the next era of financial services.
        </p>

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
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Contact Me
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            Subscribe to Updates
          </Button>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import ContactForm from "@/components/contact-form"
import { Coffee, Heart, MessageCircle, Mail, Clock, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Get In Touch | FirstHand by Akhil Handa",
  description:
    "Connect with Akhil Handa to discuss digital banking, fintech innovation, and the future of financial services.",
}

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-blue-50"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-80 left-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-40 right-40 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="container px-4 md:px-6 py-12 md:py-24 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-lg opacity-30 animate-pulse"></div>
                <div className="relative bg-white/80 backdrop-blur-sm border border-gray-100 rounded-lg px-6 py-3 shadow-sm">
                  <p className="text-sm font-medium text-blue-600">FirstHand by Akhil Handa</p>
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Let's Connect!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              I'm always eager to connect with fellow innovators, industry professionals, and enthusiasts in the digital
              banking space. Whether you have insights to share or stories that deserve to be told, I'd love to hear
              from you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 transform group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative p-8 text-center h-full flex flex-col">
                <Coffee className="h-10 w-10 text-blue-600 mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                <div className="mt-auto">
                  <h3 className="text-lg font-semibold mb-3">Industry Insights</h3>
                  <p className="text-gray-600">Share your perspectives on digital banking transformation</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 transform group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative p-8 text-center h-full flex flex-col">
                <MessageCircle className="h-10 w-10 text-purple-600 mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                <div className="mt-auto">
                  <h3 className="text-lg font-semibold mb-3">Collaboration</h3>
                  <p className="text-gray-600">Explore partnerships in fintech innovation and digital banking</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 transform group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative p-8 text-center h-full flex flex-col">
                <Heart className="h-10 w-10 text-purple-600 mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                <div className="mt-auto">
                  <h3 className="text-lg font-semibold mb-3">Connect</h3>
                  <p className="text-gray-600">Join the conversation on the future of financial services</p>
                </div>
              </div>
            </div>

        
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-1">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 w-full rounded-t-xl"></div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Send a Message</h2>
                <ContactForm />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                  <h2 className="text-2xl font-bold mb-8 text-gray-800">Other Ways to Reach Me</h2>

                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                          <Mail className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                      </div>
                      <div className="ml-13 space-y-2">
                        <a
                          href="mailto:hello@akhilhanda.com"
                          className="text-gray-700 hover:text-blue-600 transition-colors text-lg font-medium block"
                        >
                          hello@akhilhanda.com
                        </a>
                        <p className="text-gray-500 flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4" />I typically respond within 24-48 hours
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-100"></div>

                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-50">
                          <ExternalLink className="h-5 w-5 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Social Media</h3>
                      </div>
                      <div className="ml-13 space-y-3">
                        <a
                          href="https://linkedin.com/in/akhilh"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors group py-2"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </div>
                          <span className="font-medium">LinkedIn</span>
                        </a>
                        <a
                          href="https://x.com/akhilhanda12"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors group py-2"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          </div>
                          <span className="font-medium">X (Twitter)</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-gray-800">About FirstHand</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    FirstHand is a blog dedicated to exploring the cutting edge of digital banking, fintech innovation,
                    and the evolving landscape of financial services.
                  </p>
                  <a
                    href="/about"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Learn more about my work
                    <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

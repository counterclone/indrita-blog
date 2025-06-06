"use client"

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { 
  FileText, 
  MessageSquare, 
  Image, 
  Users, 
  Zap,
  BarChart3,
  Settings,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RevalidateButton } from '@/components/revalidate-button'

export default function AdminDashboard() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!session || session.user.role !== 'admin') {
    redirect('/admin/login')
  }

  const adminSections = [
    {
      title: 'Articles',
      description: 'Manage blog articles and content',
      icon: FileText,
      href: '/admin/articles',
      color: 'text-blue-600'
    },
    {
      title: 'Quick Takes',
      description: 'Manage quick insights and observations',
      icon: Zap,
      href: '/admin/quick-takes',
      color: 'text-purple-600'
    },
    {
      title: 'Thoughts',
      description: 'Manage thought pieces and opinions',
      icon: MessageSquare,
      href: '/admin/thoughts',
      color: 'text-green-600'
    },
    {
      title: 'Gallery',
      description: 'Manage images and media content',
      icon: Image,
      href: '/admin/gallery',
      color: 'text-orange-600'
    },
    {
      title: 'Subscribers',
      description: 'View and manage newsletter subscribers',
      icon: Users,
      href: '/admin/subscribers',
      color: 'text-indigo-600'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {session.user.name}</p>
        </div>
        
        {/* Cache Management */}
        <div className="flex items-center gap-4">
          <RevalidateButton 
            path="/" 
            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Site Management
          </CardTitle>
          <CardDescription>
            Quick actions for managing your site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RevalidateButton 
              path="/" 
              className="p-4 border rounded-lg bg-gray-50"
            />
            <RevalidateButton 
              path="/articles" 
              className="p-4 border rounded-lg bg-gray-50"
            />
            <RevalidateButton 
              path="/quick-takes" 
              className="p-4 border rounded-lg bg-gray-50"
            />
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Use these buttons to refresh cached pages when you need immediate updates to appear.
          </p>
        </CardContent>
      </Card>

      {/* Admin Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section) => {
          const IconComponent = section.icon
          return (
            <Link key={section.href} href={section.href}>
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <IconComponent className={`h-6 w-6 ${section.color}`} />
                    {section.title}
                  </CardTitle>
                  <CardDescription>
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full group-hover:bg-gray-50">
                    Manage {section.title}
                  </Button>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Recent Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">-</div>
              <div className="text-sm text-gray-600">Articles</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">-</div>
              <div className="text-sm text-gray-600">Quick Takes</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">-</div>
              <div className="text-sm text-gray-600">Thoughts</div>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">-</div>
              <div className="text-sm text-gray-600">Subscribers</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"

interface QuickTake {
  _id: string
  type: "text" | "chart" | "image" | "quote"
  content: string
  chartData?: {
    title: string
    description: string
  }
  image?: string
  author?: string
  tags: string[]
  likes: number
  comments: number
  trending: boolean
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminQuickTakesPage() {
  const router = useRouter()
  const [quickTakes, setQuickTakes] = useState<QuickTake[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTake, setEditingTake] = useState<QuickTake | null>(null)
  const [formData, setFormData] = useState({
    type: "text" as QuickTake["type"],
    content: "",
    chartData: {
      title: "",
      description: "",
    },
    image: "",
    author: "",
    tags: "",
    trending: false,
    isPublished: true,
  })

  useEffect(() => {
    fetchQuickTakes()
  }, [])

  const fetchQuickTakes = async () => {
    try {
      const response = await fetch("/api/quick-takes")
      if (!response.ok) throw new Error("Failed to fetch quick takes")
      const data = await response.json()
      setQuickTakes(data)
    } catch (error) {
      toast.error("Error fetching quick takes")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        chartData:
          formData.type === "chart"
            ? {
                title: formData.chartData.title,
                description: formData.chartData.description,
              }
            : undefined,
      }

      const url = editingTake
        ? `/api/quick-takes/${editingTake._id}`
        : "/api/quick-takes"
      const method = editingTake ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error("Failed to save quick take")

      toast.success(
        `Quick take ${editingTake ? "updated" : "created"} successfully`
      )
      setIsDialogOpen(false)
      fetchQuickTakes()
      resetForm()
    } catch (error) {
      toast.error("Error saving quick take")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quick take?")) return

    try {
      const response = await fetch(`/api/quick-takes/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete quick take")

      toast.success("Quick take deleted successfully")
      fetchQuickTakes()
    } catch (error) {
      toast.error("Error deleting quick take")
    }
  }

  const handleEdit = (take: QuickTake) => {
    setEditingTake(take)
    setFormData({
      type: take.type,
      content: take.content,
      chartData: take.chartData || { title: "", description: "" },
      image: take.image || "",
      author: take.author || "",
      tags: take.tags.join(", "),
      trending: take.trending,
      isPublished: take.isPublished,
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setEditingTake(null)
    setFormData({
      type: "text",
      content: "",
      chartData: { title: "", description: "" },
      image: "",
      author: "",
      tags: "",
      trending: false,
      isPublished: true,
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quick Takes</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm()
                setIsDialogOpen(true)
              }}
            >
              Add Quick Take
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTake ? "Edit Quick Take" : "Add Quick Take"}
              </DialogTitle>
              <DialogDescription>
                Create or edit a quick take to share insights and observations.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: QuickTake["type"]) =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="chart">Chart</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="quote">Quote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    placeholder="fintech, banking, etc."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={4}
                />
              </div>

              {formData.type === "chart" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="chartTitle">Chart Title</Label>
                    <Input
                      id="chartTitle"
                      value={formData.chartData.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          chartData: {
                            ...formData.chartData,
                            title: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chartDescription">Chart Description</Label>
                    <Input
                      id="chartDescription"
                      value={formData.chartData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          chartData: {
                            ...formData.chartData,
                            description: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {formData.type === "image" && (
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
              )}

              {formData.type === "quote" && (
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                  />
                </div>
              )}

              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="trending"
                    checked={formData.trending}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, trending: checked })
                    }
                  />
                  <Label htmlFor="trending">Trending</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPublished"
                    checked={formData.isPublished}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isPublished: checked })
                    }
                  />
                  <Label htmlFor="isPublished">Published</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit">
                  {editingTake ? "Update" : "Create"} Quick Take
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quickTakes.map((take) => (
            <TableRow key={take._id}>
              <TableCell className="font-medium capitalize">{take.type}</TableCell>
              <TableCell className="max-w-md truncate">{take.content}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {take.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {take.trending && (
                    <Badge className="bg-blue-500 text-white">Trending</Badge>
                  )}
                  {take.isPublished ? (
                    <Badge className="bg-green-500 text-white">Published</Badge>
                  ) : (
                    <Badge variant="secondary">Draft</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(take.createdAt))} ago
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(take)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(take._id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 
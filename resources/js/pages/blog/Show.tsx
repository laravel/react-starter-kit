import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { BlogComment, BlogPost } from '@/types/blog'
import { Head, Link, useForm } from '@inertiajs/react'
import {
    ArrowLeft,
    Calendar,
    ChevronDown,
    Download,
    Facebook,
    File as FileIcon,
    Heart,
    Linkedin,
    MessageSquare,
    Send,
    Share2,
    Twitter,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Props {
    post: BlogPost
    comments: BlogComment[]
    isLiked: boolean
    canComment: boolean
}

export default function BlogShow({ post, comments, isLiked, canComment }: Props) {
    const [readingProgress, setReadingProgress] = useState(0)

    const { data, setData, post: postComment, processing } = useForm({
        content: '',
    })

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Implement your comment submission logic here
        // postComment(route('comments.store', post.id), { onSuccess: () => setData('content', '') });
        console.log('Submitting comment:', data.content)
    }

    useEffect(() => {
        const scrollListener = () => {
            const element = document.documentElement
            const totalHeight = element.scrollHeight - element.clientHeight
            setReadingProgress((element.scrollTop / totalHeight) * 100)
        }
        window.addEventListener('scroll', scrollListener)
        return () => window.removeEventListener('scroll', scrollListener)
    }, [])

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Blog', href: route('blog.index') },
        { title: post.title, href: route('blog.show', post.slug) },
    ]

    return (
        <>
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 z-50 h-1 w-full bg-transparent">
                <div style={{ width: `${readingProgress}%` }} className="h-full bg-blue-500 transition-all duration-150"></div>
            </div>

            <AppLayout breadcrumbs={breadcrumbs} isFullWidth>
                <Head title={post.title} description={post.excerpt} />

                <article>
                    {/* --- Immersive Header --- */}
                    <header className="relative flex min-h-[50vh] flex-col items-center justify-center bg-gray-900 text-white">
                        <img src={post.image_url} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-30" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center">
                            {post.category && (
                                <Link href="#" className="mb-4 inline-block">
                                    <Badge variant="secondary" className="text-sm">
                                        {post.category.name}
                                    </Badge>
                                </Link>
                            )}
                            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">{post.title}</h1>
                            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-gray-300">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={post.author.avatar_url} />
                                        <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-semibold text-white">{post.author.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <time dateTime={post.created_at}>
                                        {new Date(post.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </time>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* --- Main Content Area --- */}
                    <div className="bg-white dark:bg-black py-12">
                        <div className="mx-auto max-w-5xl px-4">
                            <div className="mb-8 flex justify-between items-center">
                                <Link href={route('blog.index')}>
                                    <Button variant="ghost" className="gap-2">
                                        <ArrowLeft className="h-4 w-4" />
                                        Back to All Posts
                                    </Button>
                                </Link>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" className="group">
                                        <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''} transition-all group-hover:fill-red-500/50`}/>
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="gap-2">
                                                <Share2 className="h-5 w-5" />
                                                <span>Share</span>
                                                <ChevronDown className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem><Twitter className="mr-2 h-4 w-4" /> Share on Twitter</DropdownMenuItem>
                                            <DropdownMenuItem><Facebook className="mr-2 h-4 w-4" /> Share on Facebook</DropdownMenuItem>
                                            <DropdownMenuItem><Linkedin className="mr-2 h-4 w-4" /> Share on LinkedIn</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>

                        {/* --- Article Body --- */}
                        <div
                            className="prose prose-lg max-w-3xl mx-auto dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* --- Modern Attachments Section --- */}
                        {post.attachments && post.attachments.length > 0 && (
                            <section className="max-w-3xl mx-auto mt-12">
                                <h2 className="mb-4 text-2xl font-bold">Downloads</h2>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {post.attachments.map((file, idx) => {
                                        const name = file.split('/').pop();
                                        return (
                                            <a href={file.startsWith('http') ? file : `/storage/${file}`} download key={idx}>
                                                <Card className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                    <CardContent className="flex items-center gap-4 p-4">
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                                            <FileIcon className="h-6 w-6 text-gray-500" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-semibold text-sm">{name}</p>
                                                            <p className="text-xs text-gray-500">Click to download</p>
                                                        </div>
                                                        <Download className="h-5 w-5 text-gray-400" />
                                                    </CardContent>
                                                </Card>
                                            </a>
                                        );
                                    })}
                                </ul>
                            </section>
                        )}


                        {/* --- Tags, Author Bio, and Comments --- */}
                        <div className="max-w-3xl mx-auto">
                            {post.tags && post.tags.length > 0 && (
                                <div className="my-12 flex flex-wrap items-center gap-3 border-t pt-8 dark:border-gray-800">
                                    {post.tags.map((tag) => (
                                        <Link key={tag} href={`/blog?tags[]=${tag}`} className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            <div className="my-12 flex flex-col items-center gap-6 rounded-lg bg-gray-50 p-6 text-center shadow-sm dark:bg-gray-900/50 sm:flex-row sm:text-left">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={post.author.avatar_url} />
                                    <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">About the author</p>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{post.author.name}</h4>
                                    <p className="mt-2 text-gray-600 dark:text-gray-400">{post.author.bio}</p>
                                </div>
                            </div>

                            <div className="my-12 border-t pt-8 dark:border-gray-800">
                                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                                    <MessageSquare className="inline-block h-6 w-6 mr-2 -mt-1" />
                                    Join the Discussion ({comments.length})
                                </h2>

                                {canComment && (
                                    <form onSubmit={handleCommentSubmit} className="mb-10 flex items-start gap-4">
                                        <Avatar>
                                            <AvatarImage src={usePage<PageProps>().props.auth.user.avatar_url} />
                                            <AvatarFallback>ME</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <textarea
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                                rows={3}
                                                placeholder="Write a thoughtful comment..."
                                                value={data.content}
                                                onChange={(e) => setData('content', e.target.value)}
                                            ></textarea>
                                            <Button className="mt-2" disabled={processing}>
                                                <Send className="mr-2 h-4 w-4" />
                                                Post Comment
                                            </Button>
                                        </div>
                                    </form>
                                )}

                                <div className="flex flex-col gap-8">
                                    {comments.length > 0 ? (
                                        comments.map((comment) => (
                                            <div key={comment.id} className="flex items-start gap-4">
                                                <Avatar>
                                                    <AvatarImage src={comment.avatar_url} />
                                                    <AvatarFallback>{comment.author.name.slice(0, 2)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-baseline justify-between">
                                                        <p className="font-semibold text-gray-900 dark:text-white">{comment.author.name}</p>
                                                        <time className="text-xs text-gray-500 dark:text-gray-400">
                                                            {new Date(comment.created_at).toLocaleDateString()}
                                                        </time>
                                                    </div>
                                                    <p className="mt-1 text-gray-700 dark:text-gray-300">{comment.content}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="py-8 text-center text-gray-500 dark:text-gray-400">
                                            No comments yet. Be the first to share your thoughts!
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </AppLayout>
        </>
    )
}

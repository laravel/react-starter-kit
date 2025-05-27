// resources/js/components/contact-sales.tsx
import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import InputError from '@/components/input-error';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Mail,
    Phone,
    MessageSquare,
    Building,
    User,
    Users,
    CheckCircle,
    Star,
    Zap,
    Shield,
    Headphones,
    Calendar,
    ArrowRight,
    Send,
    Globe,
    Sparkles
} from 'lucide-react';

interface ContactSalesProps {
    trigger?: React.ReactNode;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const companyTypes = [
    'Startup (1-10 employees)',
    'Small Business (11-50 employees)',
    'Medium Business (51-200 employees)',
    'Large Enterprise (201-1000 employees)',
    'Corporation (1000+ employees)',
    'Government/Public Sector',
    'Non-Profit Organization',
    'Educational Institution',
    'Other'
];

const interests = [
    'Assessment Platform Demo',
    'Enterprise Solutions',
    'Custom Assessment Development',
    'Training & Support',
    'Integration Services',
    'Volume Pricing',
    'Partnership Opportunities',
    'Other'
];

export default function ContactSales({ trigger, isOpen, onOpenChange }: ContactSalesProps) {
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(isOpen || false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        company_type: '',
        interest: '',
        message: '',
        subscribe_newsletter: true,
        subscribe_updates: true,
        subscribe_offers: false,
        estimated_users: '',
        timeline: '',
        budget_range: '',
    });

    const handleOpenChange = (open: boolean) => {
        setIsDialogOpen(open);
        if (onOpenChange) {
            onOpenChange(open);
        }
        if (!open) {
            setSubmitSuccess(false);
            reset();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('contact.sales'), {
            onSuccess: () => {
                setSubmitSuccess(true);
                // Keep dialog open to show success message
            },
            onError: (errors) => {
                console.error('Contact sales errors:', errors);
            }
        });
    };

    const features = [
        {
            icon: Shield,
            title: "Enterprise Security",
            description: "Bank-grade security and compliance"
        },
        {
            icon: Users,
            title: "Team Collaboration",
            description: "Multi-user access and permissions"
        },
        {
            icon: Headphones,
            title: "24/7 Support",
            description: "Dedicated customer success manager"
        },
        {
            icon: Zap,
            title: "Custom Integration",
            description: "API access and custom integrations"
        }
    ];

    if (submitSuccess) {
        return (
            <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
                {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="text-center">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <DialogTitle className="text-2xl">Thank You!</DialogTitle>
                        <DialogDescription className="text-base">
                            Your request has been submitted successfully. Our sales team will contact you within 24 hours.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2 text-green-800 mb-2">
                                <Mail className="w-4 h-4" />
                                <span className="font-medium">Email Confirmation Sent</span>
                            </div>
                            <p className="text-sm text-green-700">
                                Check your email for confirmation and next steps.
                            </p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2 text-blue-800 mb-2">
                                <MessageSquare className="w-4 h-4" />
                                <span className="font-medium">WhatsApp Notification</span>
                            </div>
                            <p className="text-sm text-blue-700">
                                You'll also receive updates via WhatsApp if you provided a phone number.
                            </p>
                        </div>

                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2 text-purple-800 mb-2">
                                <Calendar className="w-4 h-4" />
                                <span className="font-medium">What's Next?</span>
                            </div>
                            <ul className="text-sm text-purple-700 space-y-1">
                                <li>• Sales team review (within 2 hours)</li>
                                <li>• Personalized demo scheduling</li>
                                <li>• Custom proposal preparation</li>
                            </ul>
                        </div>

                        <Button onClick={() => handleOpenChange(false)} className="w-full">
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl">Contact Sales</DialogTitle>
                            <DialogDescription>
                                Get a personalized demo and custom pricing for your organization
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-blue-600" />
                                    Tell Us About Your Needs
                                </CardTitle>
                                <CardDescription>
                                    Fill out the form below and our sales team will get back to you within 24 hours.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Contact Information */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">
                                                Full Name *
                                            </Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Your full name"
                                                required
                                            />
                                            <InputError message={errors.name} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">
                                                Business Email *
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="your.email@company.com"
                                                required
                                            />
                                            <InputError message={errors.email} />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">
                                                Phone Number (optional)
                                            </Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                placeholder="+1 (555) 123-4567"
                                            />
                                            <InputError message={errors.phone} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="position">
                                                Job Title
                                            </Label>
                                            <Input
                                                id="position"
                                                value={data.position}
                                                onChange={(e) => setData('position', e.target.value)}
                                                placeholder="e.g., CEO, CTO, Director"
                                            />
                                            <InputError message={errors.position} />
                                        </div>
                                    </div>

                                    {/* Company Information */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="company">
                                                Company Name *
                                            </Label>
                                            <Input
                                                id="company"
                                                value={data.company}
                                                onChange={(e) => setData('company', e.target.value)}
                                                placeholder="Your company name"
                                                required
                                            />
                                            <InputError message={errors.company} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="company_type">
                                                Company Type
                                            </Label>
                                            <Select value={data.company_type} onValueChange={(value) => setData('company_type', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select company type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {companyTypes.map((type) => (
                                                        <SelectItem key={type} value={type}>
                                                            {type}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.company_type} />
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="estimated_users">
                                                Estimated Users
                                            </Label>
                                            <Select value={data.estimated_users} onValueChange={(value) => setData('estimated_users', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Number of users" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1-10">1-10 users</SelectItem>
                                                    <SelectItem value="11-50">11-50 users</SelectItem>
                                                    <SelectItem value="51-100">51-100 users</SelectItem>
                                                    <SelectItem value="101-500">101-500 users</SelectItem>
                                                    <SelectItem value="500+">500+ users</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.estimated_users} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="timeline">
                                                Implementation Timeline
                                            </Label>
                                            <Select value={data.timeline} onValueChange={(value) => setData('timeline', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="When do you need this?" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="immediate">Immediate (within 1 month)</SelectItem>
                                                    <SelectItem value="quarter">This Quarter (1-3 months)</SelectItem>
                                                    <SelectItem value="half-year">Next 6 months</SelectItem>
                                                    <SelectItem value="year">Within a year</SelectItem>
                                                    <SelectItem value="exploring">Just exploring</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.timeline} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="interest">
                                            Primary Interest
                                        </Label>
                                        <Select value={data.interest} onValueChange={(value) => setData('interest', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="What are you most interested in?" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {interests.map((interest) => (
                                                    <SelectItem key={interest} value={interest}>
                                                        {interest}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.interest} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">
                                            Additional Details
                                        </Label>
                                        <Textarea
                                            id="message"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            placeholder="Tell us more about your specific needs, challenges, or questions..."
                                            rows={4}
                                        />
                                        <InputError message={errors.message} />
                                    </div>

                                    {/* Subscription Options */}
                                    <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                        <h4 className="font-medium text-blue-900 flex items-center">
                                            <Mail className="w-4 h-4 mr-2" />
                                            Stay Updated (optional)
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="subscribe_newsletter"
                                                    checked={data.subscribe_newsletter}
                                                    onCheckedChange={(checked) => setData('subscribe_newsletter', !!checked)}
                                                />
                                                <Label htmlFor="subscribe_newsletter" className="text-sm">
                                                    Subscribe to our newsletter for industry insights and best practices
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="subscribe_updates"
                                                    checked={data.subscribe_updates}
                                                    onCheckedChange={(checked) => setData('subscribe_updates', !!checked)}
                                                />
                                                <Label htmlFor="subscribe_updates" className="text-sm">
                                                    Get product updates and new feature announcements
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="subscribe_offers"
                                                    checked={data.subscribe_offers}
                                                    onCheckedChange={(checked) => setData('subscribe_offers', !!checked)}
                                                />
                                                <Label htmlFor="subscribe_offers" className="text-sm">
                                                    Receive special offers and promotions
                                                </Label>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                        size="lg"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Sending Request...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
                                                Send Request
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Features Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Enterprise Features</CardTitle>
                                <CardDescription>
                                    What you get with our enterprise solution
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <feature.icon className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-sm">{feature.title}</h4>
                                            <p className="text-xs text-gray-600">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="text-center space-y-4">
                                    <div className="flex justify-center">
                                        <div className="flex items-center space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                    <blockquote className="text-sm italic text-gray-700">
                                        "The assessment platform transformed how we evaluate our organizational capabilities. Outstanding support!"
                                    </blockquote>
                                    <p className="text-xs text-gray-500">
                                        — Sarah Chen, CTO at TechCorp
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="font-medium text-green-900 mb-1">Need Help?</h4>
                                <p className="text-sm text-green-700 mb-3">
                                    Speak directly with our sales team
                                </p>
                                <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-100">
                                    <Phone className="w-3 h-3 mr-1" />
                                    Call Sales
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

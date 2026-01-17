"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Shield,
  Star,
  Users,
  Zap
} from "lucide-react";
import type React from "react";
import { useState } from "react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Headquarters",
    details: [
      { text: "Plot No 16, Nr Toral Hotel", clickable: false },
      { text: "Keshod - 362220, Gujarat", clickable: false },
      { text: "India", clickable: false },
    ],
    color: "from-red-500 to-yellow-500",
    actionText: "Get Directions",
    actionLink: "https://maps.google.com/?q=Plot+No+16+Toral+Hotel+Keshod",
  },
  {
    icon: Phone,
    title: "Phone",
    details: [
      { text: "+91 8799622551", link: "tel:+918799622551", clickable: true },
      { text: "+91 9426220910", link: "tel:+919426220910", clickable: true },
      { text: "24/7 Hero Support", clickable: false },
    ],
    color: "from-blue-500 to-red-500",
    actionText: "Call Now",
    actionLink: "tel:+918799622551",
  },
  {
    icon: Mail,
    title: "Email",
    details: [
      {
        text: "paramthumar2004@gmail.com",
        link: "mailto:paramthumar2004@gmail.com",
        clickable: true,
      },
      {
        text: "support@marvelinternational.com",
        link: "mailto:support@marvelinternational.com",
        clickable: true,
      },
      { text: "Response within 1 hour", clickable: false },
    ],
    color: "from-purple-500 to-blue-500",
    actionText: "Send Email",
    actionLink: "mailto:paramthumar2004@gmail.com",
  },
  {
    icon: Clock,
    title: "Hours",
    details: [
      { text: "Monday - Friday: 24/7", clickable: false },
      { text: "Weekend: 24/7", clickable: false },
      { text: "We never sleep!", clickable: false },
    ],
    color: "from-green-500 to-blue-500",
    actionText: "Book Meeting",
    actionLink: "#",
  },
];

const inquiryTypes = [
  "General Information",
  "Product Support",
  "Technical Issues",
  "Warranty Claims",
  "Partnership Opportunities",
  "Media Inquiries",
  "Hero Recruitment",
];

const departments = [
  {
    name: "Customer Support",
    icon: Users,
    description: "General questions and support",
    color: "text-blue-500",
  },
  {
    name: "Technical Team",
    icon: Zap,
    description: "Product technical issues",
    color: "text-yellow-500",
  },
  {
    name: "Hero Relations",
    icon: Shield,
    description: "Special hero requirements",
    color: "text-red-500",
  },
  {
    name: "Media & PR",
    icon: MessageSquare,
    description: "Press and media inquiries",
    color: "text-purple-500",
  },
];

const features = [
  { icon: Star, text: "24/7 Hero Support" },
  { icon: Shield, text: "Secure Communication" },
  { icon: Zap, text: "Lightning Fast Response" },
  { icon: Globe, text: "Global Reach" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    department: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setIsSubmitted(true);
    } catch (err) {
      alert("Failed to send. Please try again.");
    }

    setIsSubmitting(false);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        inquiryType: "",
        department: "",
        message: "",
      });
    }, 3000);
  };

  const isFormValid =
    formData.name && formData.email && formData.message && formData.inquiryType;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/10 via-red-500/10 to-yellow-500/10 py-12 md:py-20 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-red-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />

          <div className="container mx-auto px-2 sm:px-4 text-center relative z-10">
            <h1 className="font-playfair text-3xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 text-balance bg-gradient-to-r from-primary via-red-500 to-yellow-500 bg-clip-text text-transparent">
              Contact <span className="text-primary">Marvel Factory</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-xl sm:max-w-4xl mx-auto text-pretty mb-6 sm:mb-8">
              Need help choosing the perfect mattress? Have questions about our
              superhero technology? Our team of experts is here to help you
              sleep like a hero.
            </p>
            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
              {features.map((feature, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm"
                >
                  <feature.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  {feature.text}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-20">
            {/* Contact Form */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <Badge className="mb-4">📝 Send Message</Badge>
                <h2 className="font-playfair text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">
                  Let's Start a Conversation
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Fill out the form below and our hero support team will get
                  back to you faster than the Flash.
                </p>
              </div>

              <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-background to-muted/50 w-full">
                <CardContent className="p-4 sm:p-8">
                  {isSubmitted ? (
                    <div className="text-center py-8 sm:py-12">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-500" />
                      </div>
                      <h3 className="font-playfair text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                        Message Sent Successfully! 🎉
                      </h3>
                      <p className="text-muted-foreground text-base sm:text-lg">
                        Thank you for contacting Marvel Factory. Our hero
                        support team will respond within 1 hour.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-6 sm:space-y-8"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                            👤 Name <span className="text-red-500">*</span>
                          </label>
                          <Input
                            className="h-10 sm:h-12 border-2 focus:border-primary transition-all duration-300 text-sm"
                            placeholder="Your superhero name"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                            📧 Email <span className="text-red-500">*</span>
                          </label>
                          <Input
                            className="h-10 sm:h-12 border-2 focus:border-primary transition-all duration-300 text-sm"
                            type="email"
                            placeholder="hero@example.com"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                            📱 Phone
                          </label>
                          <Input
                            className="h-10 sm:h-12 border-2 focus:border-primary transition-all duration-300 text-sm"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                            🏢 Company
                          </label>
                          <Input
                            className="h-10 sm:h-12 border-2 focus:border-primary transition-all duration-300 text-sm"
                            placeholder="Stark Industries"
                            value={formData.company}
                            onChange={(e) =>
                              handleInputChange("company", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                            🎯 Inquiry Type{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Select
                            value={formData.inquiryType}
                            onValueChange={(value) =>
                              handleInputChange("inquiryType", value)
                            }
                          >
                            <SelectTrigger className="h-10 sm:h-12 border-2 focus:border-primary text-sm">
                              <SelectValue placeholder="What can we help with?" />
                            </SelectTrigger>
                            <SelectContent>
                              {inquiryTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                            🏷️ Department
                          </label>
                          <Select
                            value={formData.department}
                            onValueChange={(value) =>
                              handleInputChange("department", value)
                            }
                          >
                            <SelectTrigger className="h-10 sm:h-12 border-2 focus:border-primary text-sm">
                              <SelectValue placeholder="Choose department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept.name} value={dept.name}>
                                  <div className="flex items-center gap-2">
                                    <dept.icon
                                      className={`w-4 h-4 ${dept.color}`}
                                    />
                                    {dept.name}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                          💬 Message <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          className="min-h-[96px] sm:min-h-32 border-2 focus:border-primary transition-all duration-300 resize-none text-sm"
                          placeholder="Tell us how we can help you sleep like a superhero... 🦸‍♂️"
                          rows={6}
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold hero-glow bg-gradient-to-r from-primary to-red-500 hover:from-primary/90 hover:to-red-500/90 transition-all duration-300 transform hover:scale-105"
                        disabled={!isFormValid || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Send Message
                            <ArrowRight className="h-5 w-5 ml-2" />
                          </>
                        )}
                      </Button>
                      {!isFormValid && (
                        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-2 sm:p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                          Please fill in all required fields
                        </div>
                      )}
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <Badge className="mb-4">📞 Contact Info</Badge>
                <h2 className="font-playfair text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">
                  Multiple Ways to Reach Us
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Choose your preferred communication method. Our superhero
                  support team is standing by.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-background to-muted/30 w-full"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start gap-3 sm:gap-6">
                        <div
                          className={`p-3 sm:p-4 rounded-2xl bg-gradient-to-r ${info.color} text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <info.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-playfair text-lg sm:text-2xl font-bold mb-2 sm:mb-3 text-foreground">
                            {info.title}
                          </h3>
                          <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-4">
                            {info.details.map((detail, idx) => (
                              <p
                                key={idx}
                                className="text-xs sm:text-base text-muted-foreground"
                              >
                                {detail.clickable ? (
                                  <a
                                    href={detail.link}
                                    className="text-primary hover:text-primary/80 transition-colors duration-200 hover:underline font-medium flex items-center gap-2"
                                  >
                                    {detail.text}
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                ) : (
                                  detail.text
                                )}
                              </p>
                            ))}
                          </div>
                          <a
                            href={info.actionLink}
                            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                          >
                            {info.actionText}
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Departments */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="font-playfair text-xl sm:text-3xl font-bold text-center lg:text-left">
                  Our Hero Departments
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  {departments.map((dept, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-background to-muted/30 w-full"
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                          <div className="p-1 sm:p-2 rounded-lg bg-muted/50">
                            <dept.icon
                              className={`h-5 w-5 sm:h-6 sm:w-6 ${dept.color}`}
                            />
                          </div>
                          <h4 className="font-semibold text-base sm:text-lg">
                            {dept.name}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {dept.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-10 sm:mt-20">
            <div className="text-center mb-8 sm:mb-12">
              <Badge className="mb-2 sm:mb-4">🗺️ Find Us</Badge>
              <h2 className="font-playfair text-xl sm:text-4xl font-bold mb-4 sm:mb-6">
                Visit Our Headquarters
              </h2>
              <p className="text-xs sm:text-lg text-muted-foreground max-w-md sm:max-w-2xl mx-auto">
                Located in Gokul Udhyog Nagar, Keshod. Tours available by
                appointment. See where the Marvel magic happens!
              </p>
            </div>
            <Card className="overflow-hidden shadow-2xl border-0">
              <div className="relative h-[240px] sm:h-[500px] bg-muted">
                {/* Google Maps Embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3688.234!2d70.2534!3d21.3012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c8248c77c099%3A0x2e65c6b8e4a3f2d4!2sKeshod%2C%20Gujarat%20362220!5e0!3m2!1sen!2sin!4v1726417200000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "240px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Marvel Factory Headquarters - Keshod"
                />
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

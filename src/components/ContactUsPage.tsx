// src/components/ContactUsPage.tsx
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "./ui/button"; // Assuming you're using shadcn/ui

export default function ContactUsPage() {
  return (
    <div className="bg-gradient-to-b from-muted/20 to-muted/50 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl lg:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you! Reach out to us through any of these channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Get in Touch</h2>
              <p className="text-muted-foreground">
                Have questions about our products or services? Our team is here to help.
              </p>
            </div>

            <div className="space-y-6">
              {/* Contact Method Cards */}
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Email Us</h3>
                  <p className="text-muted-foreground">support@ajio.com</p>
                  <p className="text-sm text-muted-foreground mt-1">Typically replies within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Call Us</h3>
                  <p className="text-muted-foreground">+1 (800) 123-4567</p>
                  <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 9am-6pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Visit Us</h3>
                  <p className="text-muted-foreground">123 Fashion Avenue</p>
                  <p className="text-muted-foreground">Mumbai, Maharashtra 400001</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Business Hours</h3>
                  <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-muted-foreground">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-background p-6 sm:p-8 rounded-xl shadow-sm border border-muted/50">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-muted/50 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg border border-muted/50 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 rounded-lg border border-muted/50 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-muted/50 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 rounded-xl overflow-hidden shadow-md border border-muted/50">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.75583735548!2d72.8282143153849!3d19.03355825822795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cee1a5f9e02d%3A0x3a3b6e3b4e3b4e3b!2s123%20Fashion%20Avenue%2C%20Mumbai%2C%20Maharashtra%20400001!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="bg-muted"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
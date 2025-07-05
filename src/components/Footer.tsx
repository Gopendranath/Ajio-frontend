// src/components/AjioFooter.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "./mode-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Landmark,
  IndianRupee,
  Wallet,
  HandCoins,
} from "lucide-react";
import { FeaturesSection } from "./Features";

const footerLinks = [
  {
    title: "Ajio",
    links: [
      { name: "Who We Are", href: "#" },
      { name: "Join Our Team", href: "#" },
      { name: "Terms & Conditions", href: "#" },
      { name: "We Respect Your Privacy", href: "#" },
      { name: "Fees & Payments", href: "#" },
      { name: "Returns & Refunds Policy", href: "#" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "Track Your Order", href: "#" },
      { name: "Frequently Asked Questions", href: "#" },
      { name: "Returns", href: "#" },
      { name: "Cancellations", href: "#" },
      { name: "Payments", href: "#" },
      { name: "Customer Care", href: "contact-us" },
    ],
  },
  {
    title: "Shop by",
    links: [
      { name: "Men", href: "#" },
      { name: "Women", href: "#" },
      { name: "Kids", href: "#" },
      { name: "Indie", href: "#" },
      { name: "Stores", href: "#" },
      { name: "New Arrivals", href: "#" },
      { name: "Brand Directory", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "#", name: "Facebook" },
  { icon: Instagram, href: "#", name: "Instagram" },
  { icon: Twitter, href: "#", name: "Twitter" },
  { icon: Youtube, href: "#", name: "YouTube" },
];

const paymentMethods = [
  { icon: Landmark, label: "Net Banking" },
  { icon: CreditCard, label: "Visa" },
  { icon: CreditCard, label: "MasterCard" },
  { icon: IndianRupee, label: "UPI" },
  { icon: Wallet, label: "Jio Money" },
  { icon: HandCoins, label: "Cash on Delivery" },
];

export function AjioFooter() {
  return (
    <footer className="bg-background text-foreground">
      <FeaturesSection />
      <hr className="border-border" />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Link Columns - Desktop */}
          <div className="hidden lg:col-span-7 lg:grid lg:grid-cols-3 lg:gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-foreground hover:underline text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Link Accordion - Mobile */}
          <div className="lg:hidden">
            <Accordion type="single" collapsible className="w-full">
              {footerLinks.map((section) => (
                <AccordionItem
                  value={section.title}
                  key={section.title}
                  className="border-b border-border"
                >
                  <AccordionTrigger className="py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:no-underline">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <ul className="space-y-2">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            to={link.href}
                            className="text-muted-foreground hover:text-foreground text-sm"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Newsletter and Social Section */}
          <div className="lg:col-span-5">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Join The AJIO Life
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Get inspiration, latest trends, and exclusive offers delivered
                  to your inbox.
                </p>
                <form className="mt-4 flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow bg-card border-border text-foreground placeholder-muted-foreground focus:ring-ring focus:border-ring"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    className="bg-transparent border-border text-foreground hover:bg-foreground hover:text-background"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Connect with us
                </h3>
                <div className="mt-4 flex space-x-5  ">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-muted-foreground hover:text-foreground"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">{social.name}</span>
                      <social.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-border" />

        {/* Payment and Copyright Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Payment Methods
            </h3>
            <div className="mt-4 flex flex-wrap gap-4 items-center">
              {paymentMethods.map((method) => (
                <div
                  key={method.label}
                  className="bg-card rounded p-1 h-7 flex items-center justify-center border border-border min-w-[90px] px-2"
                >
                  <method.icon
                    className="h-5 w-5 text-muted-foreground mr-2"
                    aria-label={method.label}
                  />
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {method.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <ModeToggle />
          <div className="text-center md:text-right text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} Reliance Retail Ltd. All rights
              reserved.
            </p>
            <Link to="#" className="hover:underline hover:text-foreground">
              Terms of Use
            </Link>
            <span className="mx-2">|</span>
            <Link to="#" className="hover:underline hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

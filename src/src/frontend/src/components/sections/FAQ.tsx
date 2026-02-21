import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I get Canva Pro after payment?",
    answer:
      "After successful payment, you'll receive your Canva Pro account details via WhatsApp within 5-10 minutes. Your account will be instantly activated and ready to use.",
  },
  {
    question: "Is this safe and legal?",
    answer:
      "Yes, absolutely! We provide legitimate Canva Pro team subscriptions. Your account is completely safe, secure, and follows Canva's terms of service.",
  },
  {
    question: "What if I face any issues?",
    answer:
      "Our 24/7 support team is always available on WhatsApp (96226 55116). We'll resolve any issues you face immediately and ensure you have a smooth experience.",
  },
  {
    question: "Can I use it on multiple devices?",
    answer:
      "Yes! You can use your Canva Pro account on multiple devices including desktop, mobile, and tablet. Simply log in with your credentials on any device.",
  },
  {
    question: "What happens after 1 year?",
    answer:
      "After 1 year, you can easily renew your subscription with us at the same affordable price. We'll notify you before your subscription expires so you don't lose access.",
  },
];

export default function FAQ() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about Canva Pro
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border-2 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Limited Offer Badge */}
          <div className="text-center pt-4">
            <div className="inline-block bg-muted px-4 py-2 rounded-full text-sm font-semibold text-muted-foreground">
              LIMITED OFFER • Canva Pro ₹299 /Year
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

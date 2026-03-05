"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is EcomDev suitable for absolute beginners?",
    answer: "Yes! We have a dedicated 'Starter' path that takes you from the basics of HTML/CSS to building complex ecommerce logic. No prior experience is required."
  },
  {
    question: "Can I use the project plans for commercial work?",
    answer: "Absolutely. The project plans and JSON exports you create are yours to use for any personal or commercial project."
  },
  {
    question: "How do the mentorship sessions work?",
    answer: "Once you book a session, you'll receive a calendar invite with a video link. You can share your screen, review code, and get direct feedback from industry experts."
  },
  {
    question: "What happens after I complete a module?",
    answer: "You'll receive a verified digital certificate that you can add to your LinkedIn profile or resume. You'll also unlock advanced modules and community badges."
  }
];

const FAQ = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Everything you need to know about the platform.</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-white border-none rounded-2xl px-6 shadow-sm">
              <AccordionTrigger className="text-left font-bold text-gray-900 hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
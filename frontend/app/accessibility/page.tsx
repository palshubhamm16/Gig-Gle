import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Accessibility | Gig-gle",
  description: "Learn about our commitment to accessibility and how to use Gig-gle with assistive technologies",
}

export default function AccessibilityPage() {
  return (
    <div className="container px-4 md:px-6 py-6 md:py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Accessibility at Gig-gle</h1>
          <p className="text-muted-foreground">Our commitment to creating an inclusive platform for everyone</p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2>Our Commitment</h2>
          <p>
            At Gig-gle, accessibility isn't an afterthought—it's a core principle that guides everything we do. We're
            committed to ensuring that all users, regardless of ability, can access and use our platform effectively.
          </p>
          <p>
            We follow the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA and are continuously working to
            improve our platform's accessibility features.
          </p>

          <h2>Accessibility Features</h2>
          <p>Our platform includes the following accessibility features:</p>
          <ul>
            <li>
              <strong>Keyboard Navigation:</strong> All features can be accessed using a keyboard
            </li>
            <li>
              <strong>Screen Reader Compatibility:</strong> Our site works with popular screen readers
            </li>
            <li>
              <strong>Text Alternatives:</strong> All images have descriptive alt text
            </li>
            <li>
              <strong>Color Contrast:</strong> We maintain appropriate contrast ratios for readability
            </li>
            <li>
              <strong>Resizable Text:</strong> Text can be resized without loss of functionality
            </li>
            <li>
              <strong>Clear Navigation:</strong> Consistent, predictable navigation throughout the site
            </li>
            <li>
              <strong>Form Labels:</strong> All form fields have clear, associated labels
            </li>
            <li>
              <strong>Error Identification:</strong> Form errors are clearly identified and described
            </li>
            <li>
              <strong>Dark Mode:</strong> Reduced eye strain with our dark mode option
            </li>
          </ul>

          <h2>Using Assistive Technologies with Gig-gle</h2>
          <h3>Screen Readers</h3>
          <p>
            Gig-gle is compatible with popular screen readers including JAWS, NVDA, VoiceOver, and TalkBack. We use
            semantic HTML and ARIA attributes where appropriate to enhance the screen reader experience.
          </p>

          <h3>Keyboard Navigation</h3>
          <p>
            All interactive elements on Gig-gle can be accessed using a keyboard. Use Tab to navigate between elements,
            Enter to activate buttons and links, and Space to toggle checkboxes and other controls.
          </p>

          <h3>Browser Zoom</h3>
          <p>
            Gig-gle supports browser zoom up to 200% without loss of content or functionality. You can use Ctrl/Cmd +
            Plus (+) to zoom in and Ctrl/Cmd + Minus (-) to zoom out.
          </p>

          <h2>Accommodation Requests in Job Applications</h2>
          <p>
            When applying for jobs on Gig-gle, you'll find a dedicated section to request any accommodations you might
            need during the application process or on the job. Employers on our platform are committed to providing
            reasonable accommodations.
          </p>

          <h2>Feedback and Support</h2>
          <p>
            We're constantly working to improve our accessibility. If you encounter any accessibility barriers or have
            suggestions for improvement, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> accessibility@gig-gle.com
            <br />
            <strong>Phone:</strong> (555) 123-4567
          </p>

          <h2>Accessibility Statement</h2>
          <p>
            This accessibility statement was last updated on April 11, 2025. We review and update this statement
            regularly as we improve our website's accessibility.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

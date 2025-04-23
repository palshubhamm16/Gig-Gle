import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Terms of Service | Gig-gle",
  description: "Terms and conditions for using the Gig-gle platform",
}

export default function TermsPage() {
  return (
    <div className="container px-4 md:px-6 py-6 md:py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: April 23, 2025</p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Gig-gle ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of
            the Gig-gle website, mobile applications, and services (collectively, the "Platform").
          </p>
          <p>
            By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree to these
            Terms, you may not access or use the Platform.
          </p>

          <h2>2. Eligibility and Accounts</h2>
          <p>
            To use the Platform, you must be at least 12 years old. If you are under 18, you must have permission from a
            parent or legal guardian, who agrees to be bound by these Terms on your behalf.
          </p>
          <p>
            When you create an account, you must provide accurate and complete information. You are responsible for
            maintaining the confidentiality of your account credentials and for all activities that occur under your
            account.
          </p>

          <h2>3. Platform Rules and User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on the rights of others</li>
            <li>Post false, misleading, or fraudulent content</li>
            <li>Harass, bully, or discriminate against other users</li>
            <li>Use the Platform to send spam or unsolicited messages</li>
            <li>Attempt to access, tamper with, or use non-public areas of the Platform</li>
            <li>Interfere with or disrupt the Platform or servers connected to the Platform</li>
            <li>Create multiple accounts for deceptive or fraudulent purposes</li>
            <li>
              Use the Platform in any manner that could disable, overburden, damage, or impair the site or interfere
              with any other party's use of the Platform
            </li>
          </ul>

          <h2>4. Gig Posting and Applications</h2>
          <h3>For Employers:</h3>
          <p>
            When posting gigs, you must provide accurate and complete information about the opportunity, including
            compensation, responsibilities, and available accommodations. You agree to comply with all applicable labor
            laws and regulations, including those related to minimum wage, working hours, and non-discrimination.
          </p>
          <p>
            You agree to review applications fairly and without discrimination based on disability, race, color, gender,
            sexual orientation, religion, or any other protected characteristic.
          </p>

          <h3>For Applicants:</h3>
          <p>
            When applying for gigs, you must provide accurate information about your qualifications and experience. You
            understand that submitting an application does not guarantee that you will be selected for the gig.
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            The Platform and its original content, features, and functionality are owned by Gig-gle and are protected by
            international copyright, trademark, patent, trade secret, and other intellectual property or proprietary
            rights laws.
          </p>
          <p>
            By posting content on the Platform, you grant us a non-exclusive, transferable, sub-licensable,
            royalty-free, worldwide license to use, modify, publicly perform, publicly display, reproduce, and
            distribute such content on and through the Platform.
          </p>

          <h2>6. Privacy and Data</h2>
          <p>
            Our Privacy Policy, available at{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
              gig-gle.com/privacy
            </Link>
            , describes how we collect, use, and share information about you when you use our Platform. By using the
            Platform, you agree to our collection, use, and sharing of your information as described in the Privacy
            Policy.
          </p>

          <h2>7. Disclaimers and Limitations of Liability</h2>
          <p>
            THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
            IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
            IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p>
            WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR
            THAT THE PLATFORM OR THE SERVERS THAT MAKE IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL GIG-GLE, ITS AFFILIATES, OR THEIR RESPECTIVE
            OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
            PUNITIVE DAMAGES, INCLUDING LOST PROFITS, ARISING OUT OF OR RELATING TO YOUR USE OF THE PLATFORM.
          </p>

          <h2>8. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the Platform immediately, without prior notice or
            liability, for any reason, including if you breach these Terms.
          </p>
          <p>
            Upon termination, your right to use the Platform will immediately cease. All provisions of these Terms which
            by their nature should survive termination shall survive termination, including, without limitation,
            ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
          </p>

          <h2>9. Dispute Resolution</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the state of [State], without
            regard to its conflict of law provisions.
          </p>
          <p>
            Any dispute arising from or relating to these Terms or your use of the Platform shall be resolved through
            binding arbitration in accordance with the American Arbitration Association's rules. The arbitration shall
            be conducted in [City, State].
          </p>

          <h2>10. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. If we make changes, we will provide notice by
            posting the updated Terms on the Platform and updating the "Last updated" date at the top of these Terms.
          </p>
          <p>
            Your continued use of the Platform after we post any modifications to the Terms will constitute your
            acknowledgment of the modifications and your consent to abide and be bound by the modified Terms.
          </p>

          <h2>11. Accessibility</h2>
          <p>
            We are committed to making our Platform accessible to all users, including those with disabilities. Our
            Accessibility Policy, available at{" "}
            <Link href="/accessibility" className="text-blue-600 hover:underline dark:text-blue-400">
              gig-gle.com/accessibility
            </Link>
            , outlines our accessibility standards and available accommodations.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a href="mailto:terms@gig-gle.com" className="text-blue-600 hover:underline dark:text-blue-400">
              terms@gig-gle.com
            </a>
            .
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

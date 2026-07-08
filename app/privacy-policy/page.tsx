"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Outfit:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div
        className="w-full min-h-screen"
        style={{
          background:
            "linear-gradient(150deg, #FDF6F0 0%, #F9ECF5 20%, #F0E8FA 40%, #EAE2F8 55%, #E8E0F5 70%, #F5EAF2 85%, #FDF5EE 100%)",
        }}
      >
        {/* Header */}
        

        {/* Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          <h1
            className="text-center mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "#4a2060",
            }}
          >
            Privacy Policy
          </h1>

          <div
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg space-y-6"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#3d3d3d", lineHeight: 1.8 }}
          >
            <p>
              This privacy policy has been compiled to better serve those who are concerned with how their
              &apos;Personally identifiable information (PII) is being used online.
            </p>
            <p>
              PII, as used in privacy law and information security, is information that can be used on its own or
              with other information to identify, contact, or locate a single person, or to identify an individual in
              context.
            </p>
            <p>
              Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or
              otherwise handle your Personally Identifiable Information in accordance with our website.
            </p>

            <h2 className="text-xl font-bold text-[#4a2060] pt-4">
              What personal information do we collect from the people that visit our website?
            </h2>
            <p>
              When ordering or registering on our site, as appropriate, you may be asked to enter your name, email
              address, phone number, location, or other details to help you with your experience.
            </p>

            <h2 className="text-xl font-bold text-[#4a2060] pt-4">When do we collect information?</h2>
            <p>
              We collect information from you when you register on our site, subscribe to a newsletter, fill out a form,
              book a consultation call, or enter information on our site.
            </p>

            <h2 className="text-xl font-bold text-[#4a2060] pt-4">How do we use your information?</h2>
            <p>
              We may use the information we collect from you when you register, make a purchase, sign up for our
              newsletter, respond to a survey or marketing communication, surf the website, or use certain other site
              features in the following ways:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                To personalize user&apos;s experience and to allow us to deliver the type of content and product
                offerings in which you are most interested.
              </li>
              <li>To improve our website in order to better serve you.</li>
              <li>To send periodic emails regarding your program or other products and services.</li>
              <li>To follow up with you after correspondence (live chat, email, or phone inquiries).</li>
            </ul>

            <h2 className="text-xl font-bold text-[#4a2060] pt-4">How do we protect visitor information?</h2>
            <p>
              Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make
              your visit to our site as safe as possible.
            </p>
            <p>We use regular Malware Scanning.</p>
            <p>
              Your personal information is contained behind secured networks and is only accessible by a limited number
              of persons who have special access rights to such systems, and are required to keep the information
              confidential.
            </p>

            <h2 className="text-xl font-bold text-[#4a2060] pt-4">Do we use &apos;cookies&apos;?</h2>
            <p>
              Yes. Cookies are small files that a site or its service provider transfers to your computer&apos;s hard
              drive through your Web browser (if you allow) that enables the site&apos;s or service provider&apos;s
              systems to recognize your browser and capture and remember certain information.
            </p>
            <p>We use cookies to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Understand and save user&apos;s preferences for future visits.</li>
              <li>Compile aggregate data about site traffic and site interactions.</li>
            </ul>
            <p>
              You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn
              off all cookies. You do this through your browser settings. Each browser is a little different, so look at
              your browser&apos;s Help menu to learn the correct way to modify your cookies.
            </p>
            <p>
              If you disable cookies, some features will be disabled. It won&apos;t affect the user&apos;s experience
              significantly, but some of our services will not function properly.
            </p>

            <h2 className="text-xl font-bold text-[#4a2060] pt-4">Third Party Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information
              unless we provide you with advance notice. This does not include website hosting partners and other parties
              who assist us in operating our website, conducting our business, or servicing you, so long as those parties
              agree to keep this information confidential. We may also release your information when we believe release
              is appropriate to comply with the law, enforce our site policies, or protect our or others&apos; rights,
              property, or safety.
            </p>

            <h2 className="text-xl font-bold text-[#4a2060] pt-4">Third party links</h2>
            <p>
              Occasionally, at our discretion, we may include or offer third-party products or services on our website.
              These third-party sites have separate and independent privacy policies. We, therefore, have no
              responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to
              protect the integrity of our site and welcome any feedback about these sites.
            </p>

            <h2 className="text-xl font-bold text-[#4a2060] pt-4">
              Children&apos;s Online Privacy Protection
            </h2>
            <p>
              We do not specifically market to children under 13 years of age.
            </p>

            <h2 className="text-xl font-bold text-[#4a2060] pt-4">Fair Information Practices</h2>
            <p>
              In order to be in line with Fair Information Practices we will take the following responsive action, should
              a data breach occur: We will notify the users via email within 7 business days.
            </p>
            <p>
              We also agree to the individual redress principle, which requires that individuals have a right to pursue
              legally enforceable rights against data collectors and processors who fail to adhere to the law.
            </p>

            <h2 className="text-xl font-bold text-[#4a2060] pt-4">Unsubscribing</h2>
            <p>
              If at any time you would like to unsubscribe from receiving future emails, you can email us at{" "}
              <a href="mailto:heal@drvrushali.com" className="text-[#c8963e] hover:underline">
                heal@drvrushali.com
              </a>{" "}
              and we will promptly remove you from ALL correspondence.
            </p>

            <h2 className="text-xl font-bold text-[#4a2060] pt-4">Contacting Us</h2>
            <p>
              If there are any questions regarding this privacy policy you may contact us using the information below.
            </p>
            <div className="bg-[#f5f0fa] rounded-xl p-4 space-y-1">
              <p className="font-semibold"> Happiness Holistic Clinic</p>
              <p>306A, Corporate Annexe, Sonawala Cross Rd No.2</p>
              <p>Goregaon East, Mumbai, Maharashtra 400063</p>
              <p>
                Email:{" "}
                <a href="mailto:heal@drvrushali.com" className="text-[#c8963e] hover:underline">
                  heal@drvrushali.com
                </a>
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#4a2060] text-white py-8 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <Link href="/privacy-policy" className="text-white/80 hover:text-[#c8963e] transition-colors text-sm font-medium">
                Privacy Policy
              </Link>
              <span className="text-white/40">|</span>
              <Link href="/terms-and-conditions" className="text-white/80 hover:text-[#c8963e] transition-colors text-sm font-medium">
                Terms & Conditions
              </Link>
              <span className="text-white/40">|</span>
              <Link href="/refund-policy" className="text-white/80 hover:text-[#c8963e] transition-colors text-sm font-medium">
                Refund Policy
              </Link>
            </div>
            <p className="text-sm opacity-80">
              © 2025 Dr. Vrushali Saraswat | Happiness Holistic Clinic. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
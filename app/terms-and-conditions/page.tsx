"use client";

import Link from "next/link";

export default function TermsAndConditionsPage() {
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
            Terms & Conditions
          </h1>

          <div
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg space-y-6"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#3d3d3d", lineHeight: 1.8 }}
          >
            <h2 className="text-xl font-bold text-[#4a2060]">Basic Terms of Use</h2>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">1. BINDING EFFECT</h3>
            <p>
              This agreement (&quot;Agreement&quot;) is a binding agreement between you (&quot;you&quot;) and Dr. Vrushali Saraswat /
              Happiness Holistic Clinic (&quot;Company,&quot; &quot;we&quot; or &quot;us&quot;). By using our website or any information, materials,
              content, or services provided in connection with the site (the &apos;Service&apos;), you agree to abide by these
              Terms of Use, as the Company may amend them from time to time in its sole discretion.
            </p>
            <p className="font-semibold">
              YOU AGREE THAT BY USING THE SERVICE YOU REPRESENT THAT YOU ARE AT LEAST 18 YEARS OLD AND THAT YOU ARE
              LEGALLY ABLE TO ENTER INTO THIS AGREEMENT.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">2. SERVICES</h3>
            <p>
              Happiness Holistic Clinic provides transformational wellness programs, coaching, consulting, and holistic
              healing services designed to help professionals overcome burnout, build emotional resilience, and create a
              balanced, fulfilling life. Our UPLIFT program and related services are delivered through online sessions,
              recordings, community access, and personalized guidance.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">3. REFUND POLICY / CANCELLATION</h3>
            <p>
              Due to the nature of our programs and the accessibility of our content immediately upon purchase, we
              maintain specific refund policies. You can cancel subscriptions at any time by contacting us via email at{" "}
              <a href="mailto:heal@drvrushali.com" className="text-[#c8963e] hover:underline">
                heal@drvrushali.com
              </a>
              . Please refer to our{" "}
              <Link href="/refund-policy" className="text-[#c8963e] hover:underline font-medium">
                Refund Policy
              </Link>{" "}
              for complete details.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">4. PRIVACY POLICY</h3>
            <p>
              We respect your privacy and permit you to control the treatment of your personal information. A complete
              statement of our current privacy policy can be found on our{" "}
              <Link href="/privacy-policy" className="text-[#c8963e] hover:underline font-medium">
                Privacy Policy
              </Link>{" "}
              page. Our Privacy Policy is expressly incorporated into this Agreement by this reference.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">5. PAYMENT & SUBSCRIPTIONS</h3>
            <p>
              If you purchase our products or services that are subscription based, you agree to pay, and authorize
              billing of the subscription fee with your credit card, or other payment methods, until subsequently
              canceled by you. You understand and agree that each billing of the subscription fee is non-refundable
              and will not be prorated as the service is deemed used when accessed. You may cancel at any time by
              contacting us at{" "}
              <a href="mailto:heal@drvrushali.com" className="text-[#c8963e] hover:underline">
                heal@drvrushali.com
              </a>
              .
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">6. LICENSE</h3>
            <p>
              We own or license all intellectual property and other rights, title, and interest in and to our website,
              content, and services. We grant you a limited revocable license to access and use our site, content, and
              services for their intended purposes, subject to your compliance with this Agreement.
            </p>
            <p>
              You acquire no ownership or other interest in any patent, copyright, trademark, trade secret or other
              intellectual property right or to the content. You may not reproduce, republish, distribute, assign,
              sublicense, retransmit, sell, or prepare derivative works of the site or content, or resell or make our
              service available to others.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">7. CONFIDENTIALITY</h3>
            <p>
              All program materials, methodologies, frameworks, worksheets, recordings, templates, and other content
              provided through our services constitute Confidential Information. You acknowledge that you are receiving
              this information in confidence, and you will not publish, copy, or disclose any Confidential Information
              without prior written consent from us.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">8. USE OF SERVICES</h3>
            <p>
              You may only use our site, content, and services for personal development and wellness purposes as
              intended. You may not cause harm to the site or service. Specifically, you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Interfere with the site or service using viruses or disruptive technology.</li>
              <li>Access content or data not intended for you.</li>
              <li>Modify, reverse engineer, or create derivative works from our content.</li>
              <li>Collect information from third parties using our site.</li>
              <li>Impersonate another person or entity.</li>
              <li>Use the site for any unlawful purpose.</li>
            </ul>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">9. USER CONTENT</h3>
            <p>
              By posting any content to our platforms (community groups, forums, etc.), you grant us a non-exclusive
              license to use, display, and distribute such content in connection with our services. You retain ownership
              of your intellectual property rights in your user content.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">10. INTELLECTUAL PROPERTY</h3>
            <p>
              When accessing our site or using our services, you agree to obey the law and to respect the intellectual
              property rights of others. All trademarks, service marks, trade names, and copyrights displayed on the
              site are proprietary to us or their respective owners.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">11. DISCLAIMER OF WARRANTIES</h3>
            <p className="uppercase font-semibold text-sm">
              THE COMPANY MAKES NO REPRESENTATIONS AND DISCLAIMS ALL WARRANTIES ARISING OUT OF OR IN CONNECTION WITH
              THE SITE, CONTENT, AND SERVICES. YOUR USE OF THE SITE, SERVICE, AND CONTENT IS AT YOUR SOLE RISK. THE
              SITE AND ALL CONTENT, SERVICES, AND PRODUCTS ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot;
            </p>
            <p className="uppercase font-semibold text-sm">
              WE MAKE NO WARRANTY OR REPRESENTATION AS TO THE LEVEL OF SUCCESS, IF ANY, INDIVIDUALS MAY ACHIEVE BY
              USING ANY OF OUR SERVICES. INDIVIDUAL RESULTS MAY VARY AND DEPEND ON MANY FACTORS INCLUDING AN
              INDIVIDUAL&apos;S SPECIFIC SITUATION, EFFORTS, AND ACTIONS.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">12. LIMITED LIABILITY</h3>
            <p className="uppercase font-semibold text-sm">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL HAVE NO LIABILITY WHATSOEVER FOR YOUR USE OF ANY
              CONTENT, THE SITE, THE SERVICE, OR INFORMATION RELATED TO THE SITE OR SERVICE. OUR MAXIMUM LIABILITY FOR
              ANY LOSS OR DAMAGE WILL NOT EXCEED THE CHARGES PAID BY YOU TO US FOR A PERIOD OF TWO MONTHS.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">13. TERMINATION</h3>
            <p>
              You agree that we may suspend or terminate your use of the site or service, in our sole discretion,
              including if we believe that you have breached any term of this Agreement. Upon termination, your license
              to use the site, content, or service shall terminate and the remainder of this Agreement shall survive
              indefinitely.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">14. INDEMNITY</h3>
            <p>
              You agree to indemnify, defend, and hold the Company, its officers, directors, employees, consultants,
              agents, and representatives harmless from and against any and all actions, claims, demands, proceedings,
              liabilities, damages, judgments, settlements, costs, and expenses, including attorney&apos;s fees.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">15. GOVERNING LAW</h3>
            <p>
              This Agreement shall be construed in accordance with and governed by the laws of India. Any disputes
              arising from or relating to this Agreement shall be subject to the exclusive jurisdiction of the courts
              at Mumbai, Maharashtra, India.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">16. SEVERABILITY</h3>
            <p>
              If any term or condition in this Agreement is found to be unenforceable, all other terms and conditions
              will remain unaffected and in full force and effect.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">17. MODIFICATIONS</h3>
            <p>
              We may, in our sole discretion and without prior notice, revise this Agreement, modify the site or
              services, or discontinue the site or services at any time for any reason. Continued use of the site
              following posting of changes constitutes acceptance of those changes.
            </p>

            <div className="bg-[#f5f0fa] rounded-xl p-4 mt-6">
              <p className="font-semibold text-[#4a2060]">
                BY USING THE SITE, YOU ACKNOWLEDGE THAT YOU HAVE READ THIS AGREEMENT, UNDERSTAND IT AND AGREE TO BE
                BOUND BY THE AGREEMENT, AS AMENDED FROM TIME TO TIME.
              </p>
            </div>

            <div className="bg-[#f5f0fa] rounded-xl p-4 space-y-1 mt-4">
              <p className="font-semibold">Services provided by:</p>
              <p>Dr. Vrushali Saraswat | Happiness Holistic Clinic</p>
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
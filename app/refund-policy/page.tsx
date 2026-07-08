"use client";

import Link from "next/link";

export default function RefundPolicyPage() {
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
            Refund Policy
          </h1>

          <div
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg space-y-6"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#3d3d3d", lineHeight: 1.8 }}
          >
            <h2 className="text-xl font-bold text-[#4a2060]">
              UPLIFT Program - Refund & Cancellation Policy
            </h2>
            <p>
              Welcome to Happiness Holistic Clinic. This Refund Policy governs the relationship between you (the
              &quot;Client&quot;) and Dr. Vrushali Saraswat / Happiness Holistic Clinic (&quot;we&quot;, &quot;us&quot;) regarding refunds and
              cancellations for our programs and services.
            </p>
            <p>
              We advise that you please carefully go through the terms of this policy. Your enrollment in any of our
              programs constitutes an acknowledgment that you have read and completely understood this refund policy.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">1. Program Overview</h3>
            <p>
              Happiness Holistic Clinic provides transformational wellness programs, coaching, and holistic healing
              services. Our UPLIFT program is designed to help high-performing individuals reconnect with themselves,
              overcome burnout, build emotional resilience, and create a life that feels as good on the inside as it
              looks on the outside.
            </p>
            <p>
              Our services include group coaching sessions, consulting,  live sessions and community access.
              The recommendations made are purely advisory and the Client must exercise
              independent judgment about the application of those recommendations.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">2. Deliverables</h3>
            <p>As a part of the program, the Client will have access to the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Coaching and consulting around emotional well-being, purpose, happiness, burnout recovery, relationship
                building, and personal transformation during the duration of the program.
              </li>
              <li>
                Weekly modules to assist you in implementing specific practices throughout the week.
              </li>
              <li>
                Live group sessions and community support for ongoing guidance and accountability.
              </li>
              <li>
                Personalized reports and progress tracking throughout the program journey.
              </li>
            </ul>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">3. Payment Terms</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Every Client who enrolls in our programs has to prepay the amount mentioned at the time of enrollment.
              </li>
              <li>
                Enrollment will be confirmed only upon successful receipt of full payment. A confirmation email will
                be sent to the registered email address within 48 hours of the transaction.
              </li>
              <li>
                The Client shall be solely responsible for any applicable taxes, charges, or levies imposed under
                prevailing laws.
              </li>
              <li>
                In the event of a failed transaction where the amount has been deducted but services were not provided,
                please contact us at{" "}
                <a href="mailto:heal@drvrushali.com" className="text-[#c8963e] hover:underline">
                  heal@drvrushali.com
                </a>{" "}
                with complete transaction details. Upon verification, the amount will either be adjusted against your
                enrollment or refunded within 7 working days.
              </li>
            </ul>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">4. Registration Process</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Visit our website or enquire on our platforms to learn about the services offered.
              </li>
              <li>
                Book a clarity call to discuss your needs and goals with our team.
              </li>
              <li>
                Enroll in the program and secure your slot. The remaining payment (if applicable) needs to be completed
                within the specified timeframe to confirm enrollment.
              </li>
              <li>
                If payment is not completed within the specified period, we reserve the right to terminate your
                registration.
              </li>
            </ul>

            <h3 className="text-lg font-bold text-[#4a2060] pt-4 text-2xl">5. Refund Policy</h3>
            <div className="bg-[#f5f0fa] border border-purple-100 rounded-xl p-6 space-y-4">
              <p>
                Happiness Holistic Clinic does not warranty or guarantee any specific level of results. Individual
                outcomes depend on many factors including personal commitment, effort, and circumstances.
              </p>
              <p className="font-bold text-[#4a2060]">
                We offer a limited refund window of 7 days from the date of enrollment. Refund requests made after this
                7-day period will not be accepted under any circumstances. By enrolling in any program or service, you
                acknowledge and agree to this policy.
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  If you quit the program after 7 days of registration/enrolling and before the program starts, there
                  will be no refund.
                </li>
                <li>
                  If you have registered but are unable to complete the payment within the specified timeframe, your
                  registration will be terminated, and no refund will be issued.
                </li>
                <li>
                  If we suspend or terminate your access due to violation of terms and conditions (sharing program
                  material, misuse, abusive conduct), you will not be entitled to any refund or compensation.
                </li>
                <li>
                  Refund decisions are made on a case-by-case basis at our sole discretion.
                </li>
                <li>
                  Refunds will only be issued if you strictly comply with all instructions and directions provided and
                  complete all assigned tasks within the specified timeframes.
                </li>
                <li>
                  If you do not follow the recommended practices as taught, delay implementation beyond 30 days, or
                  do not complete assignments as required, this shall be considered grounds for no refund.
                </li>
                <li>
                  In the event of an unavoidable situation where you need to pause the program, a written application
                  must be submitted within the validity period. A minimal reactivation fee may be applicable.
                </li>
                <li>
                  We reserve the right to revise our program fees and payment terms at any time at our sole discretion.
                  Such revisions shall not affect payments already made.
                </li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">6. Confidential Information</h3>
            <p>
              All program materials, methodologies, frameworks, worksheets, recordings, templates, session content, and
              other materials provided constitute our Confidential Information. No client will, without prior written
              consent, disclose this information to any third party or use it for any purpose other than personal
              development within the program.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">7. Termination</h3>
            <p>This Agreement may be terminated at any time as follows:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Unprofessional Conduct:</strong> Act professionally at all times during the program. Disruptive
                behavior affecting the program or community may result in immediate termination without refund.
              </li>
              <li>
                <strong>Non-cooperation:</strong> If you are not cooperating and not implementing the process as
                instructed, we may pause your sessions or terminate your membership with zero refund/compensation.
              </li>
            </ul>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">8. Limitation of Liability</h3>
            <p>
              In no event will Happiness Holistic Clinic be liable for consequential, incidental, indirect, punitive,
              or special damages arising out of or relating to this Agreement, except in the case of gross negligence.
              Our aggregate liability shall not exceed the program fee paid by the Client.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">9. Governing Law & Disputes</h3>
            <p>
              All disputes arising during the execution of this agreement shall first be attempted to be resolved
              amicably. If unresolved, disputes shall be subject to the exclusive jurisdiction of the courts at
              Mumbai, Maharashtra, India.
            </p>

            <h3 className="text-lg font-bold text-[#4a2060] pt-2">10. Contact Information</h3>
            <div className="bg-[#f5f0fa] rounded-xl p-4 space-y-1">
              <p className="font-semibold">Dr. Vrushali Saraswat | Happiness Holistic Clinic</p>
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
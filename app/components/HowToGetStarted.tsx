import { Check } from 'lucide-react';

const HowToGetStarted = () => {
  const steps = [
    'Book a call and fill out the short application in detail',
    "We'll review your application and speak with you to see if you're a good fit",
    'Limited members will be accepted',
    'The Batch will starts this Month',
    'Serious participants apply only. Application fees is non refundable',
  ];

  return (
    <section
      id="get-started"
      className="py-20 px-6"
      style={{
        background: 'linear-gradient(180deg, #fce8d5 0%, #e8dff5 100%)',
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#c8963e] mb-12">
          How To Get Started
        </h2>

        <div className="space-y-5 text-left max-w-xl mx-auto mb-12">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#c8963e] flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <p className="text-[#4a2060] font-medium text-base leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>

        <a
          href="mailto:heal@drvrushali.com"
          className="inline-block bg-[#c8963e] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-[#b5842f] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 mb-12"
        >
          BOOK CLARITY CALL
        </a>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-auto">
          <p className="text-[#4a2060] font-bold text-lg mb-2">
            Limited slots left!
          </p>
          <p className="text-[#4a2060]">
            Any Questions? Email Us To:{' '}
            <a
              href="mailto:heal@drvrushali.com"
              className="text-[#c8963e] font-semibold hover:underline"
            >
              heal@drvrushali.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowToGetStarted;
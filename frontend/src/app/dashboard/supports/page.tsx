import DashboardHeader from "@/shared/custom-components/DashboardHeader";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-blue-400">
      <DashboardHeader
        title="Help & Support"
        description="Our support team is always here to help you"
      />

      <div className="w-full p-4 sm:p-6">
        <div className="bg-blue-300 p-4 sm:p-6 rounded-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-50 mb-4 sm:mb-6">
            Help & Support
          </h2>

          {/* Support Cards - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* 24/7 Support */}
            <div className="bg-gradient-to-tl from-blue-100/20 to-blue-100/60 text-blue-50 p-4 sm:p-6 rounded-xl">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                24/7 Support
              </h3>
              <p className="text-blue-50/50 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                Our support team is always here to help you with any questions
                or issues.
              </p>
              <button className="w-full sm:w-auto bg-blue-50 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-400 hover:text-blue-50 transition-all duration-500 font-semibold text-sm sm:text-base">
                Contact Support
              </button>
            </div>

            {/* Schedule a Call */}
            <div className="bg-gradient-to-tl from-blue-100/20 to-blue-100/60 text-blue-50 p-4 sm:p-6 rounded-xl">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                Schedule a Call
              </h3>
              <p className="text-blue-50/50 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                Book a one-on-one session with your project manager to discuss
                your needs.
              </p>
              <button className="w-full sm:w-auto bg-blue-50 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-400 hover:text-blue-50 transition-all duration-500 font-semibold text-sm sm:text-base">
                Book Meeting
              </button>
            </div>
          </div>

          {/* FAQ Section - Responsive */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-blue-50">
              Frequently Asked Questions
            </h3>

            {/* FAQ Items */}
            <div className="space-y-2 sm:space-y-3">
              <div className="border border-blue-200 rounded-lg hover:border-blue-100 transition-colors">
                <details className="p-3 sm:p-4 group">
                  <summary className="font-semibold cursor-pointer text-blue-50 hover:text-blue-100 text-sm sm:text-base list-none flex items-center justify-between group-open:mb-2 sm:group-open:mb-3">
                    <span>How do milestone payments work?</span>
                    <span className="transform transition-transform group-open:rotate-180 text-lg">
                      ▼
                    </span>
                  </summary>
                  <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
                    Milestone payments are structured to align with project
                    deliverables. You only pay when specific phases are
                    completed and approved, ensuring you get value for your
                    investment.
                  </p>
                </details>
              </div>

              <div className="border border-blue-200 rounded-lg hover:border-blue-100 transition-colors">
                <details className="p-3 sm:p-4 group">
                  <summary className="font-semibold cursor-pointer text-blue-50 hover:text-blue-100 text-sm sm:text-base list-none flex items-center justify-between group-open:mb-2 sm:group-open:mb-3">
                    <span>Can I request changes during development?</span>
                    <span className="transform transition-transform group-open:rotate-180 text-lg">
                      ▼
                    </span>
                  </summary>
                  <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
                    Yes! We accommodate change requests. Minor adjustments are
                    usually included, while major scope changes will be
                    discussed and quoted separately.
                  </p>
                </details>
              </div>

              <div className="border border-blue-200 rounded-lg hover:border-blue-100 transition-colors">
                <details className="p-3 sm:p-4 group">
                  <summary className="font-semibold cursor-pointer text-blue-50 hover:text-blue-100 text-sm sm:text-base list-none flex items-center justify-between group-open:mb-2 sm:group-open:mb-3">
                    <span>How often will I receive project updates?</span>
                    <span className="transform transition-transform group-open:rotate-180 text-lg">
                      ▼
                    </span>
                  </summary>
                  <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
                    You&apos;ll receive daily progress updates through this
                    dashboard and can chat with the team anytime. Weekly review
                    calls are also scheduled for major milestone discussions.
                  </p>
                </details>
              </div>

              <div className="border border-blue-200 rounded-lg hover:border-blue-100 transition-colors">
                <details className="p-3 sm:p-4 group">
                  <summary className="font-semibold cursor-pointer text-blue-50 hover:text-blue-100 text-sm sm:text-base list-none flex items-center justify-between group-open:mb-2 sm:group-open:mb-3">
                    <span>What happens after my website is launched?</span>
                    <span className="transform transition-transform group-open:rotate-180 text-lg">
                      ▼
                    </span>
                  </summary>
                  <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
                    We provide 30 days of free support post-launch, including
                    bug fixes and minor adjustments. Ongoing maintenance
                    packages are also available.
                  </p>
                </details>
              </div>
            </div>
          </div>

          {/* Contact Info Section - Additional Responsive Element */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-blue-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="text-start">
                <h4 className="font-semibold text-blue-50 mb-1 text-sm sm:text-base">
                  Email Support
                </h4>
                <p className="text-blue-200 text-xs sm:text-sm">
                  support@company.com
                </p>
              </div>
              <div className="text-start sm:text-end lg:text-center">
                <h4 className="font-semibold text-blue-50 mb-1 text-sm sm:text-base">
                  Phone Support
                </h4>
                <p className="text-blue-200 text-xs sm:text-sm">
                  +1 (555) 123-4567
                </p>
              </div>
              <div className="text-start sm:text-start lg:text-end">
                <h4 className="font-semibold text-blue-50 mb-1 text-sm sm:text-base">
                  Response Time
                </h4>
                <p className="text-blue-200 text-xs sm:text-sm">
                  Usually within 2-4 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

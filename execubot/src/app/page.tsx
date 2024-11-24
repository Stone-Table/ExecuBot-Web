import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Execubot: The AI That Knows Who's Slacking
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Hi, I'm Ram Francis, co-founder and CEO of Execubot. Let me give you a quick rundown of what Execubot is, why you need it, and what's going on.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#"
              className="px-8 py-3 bg-[#7C3AED] text-white rounded-lg font-medium hover:opacity-90 transition"
            >
              Learn More
            </a>
            <a
              href="#"
              className="px-8 py-3 border border-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-[#111113] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#1A1A1C] rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-white">The Treadmill Life</h3>
              <p className="text-gray-400">
                I was at Facebook, living life on a treadmill, not realizing how fast I was running until I joined the Department of State for their cloud modernization project.
              </p>
            </div>
            <div className="p-6 bg-[#1A1A1C] rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-white">The Slow Realization</h3>
              <p className="text-gray-400">
                At the Department of State, I realized how slow things were moving. Non-tech industries have many non-technical TPMs and managers who don't understand tech.
              </p>
            </div>
            <div className="p-6 bg-[#1A1A1C] rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-white">The Execubot Solution</h3>
              <p className="text-gray-400">
                I created a tool that aggregates data from Jira, GitHub, AWS, and more, to identify who on the team is slacking. Execubot helps executives make tough decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Optimize Your Team?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Discover how Execubot can help you identify inefficiencies and make informed decisions about your team.
          </p>
          <a
            href="#"
            className="px-8 py-3 bg-[#7C3AED] text-white rounded-lg font-medium hover:opacity-90 transition inline-block"
          >
            Get Started with Execubot
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, SignIn, useClerk, useUser } from "@clerk/nextjs";
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const router = useRouter();
  const { isLoaded } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{
    role: string, 
    content: string,
    platform?: string
  }[]>([]);
  const [loading, setLoading] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiKeys, setApiKeys] = useState({
    openai: "",
    gitlab: "",
    github: "",
    jira: ""
  });
  const [isSubmittingKeys, setIsSubmittingKeys] = useState(false);
  const { signOut } = useClerk();
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configData, setConfigData] = useState({
    isCloud: false,
    cloudPlatform: '',
    sourceControl: '',
    taskManagement: ''
  });
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    console.log("Auth State:", {
      isLoaded,
      isSignedIn: user?.isSignedIn,
      userId: user?.id,
    });
  }, [isLoaded, user]);

  useEffect(() => {
    const savedKeys = localStorage.getItem('apiKeys');
    const savedConfig = localStorage.getItem('configData');
    
    if (savedKeys && savedConfig) {
      try {
        const parsedKeys = JSON.parse(savedKeys);
        const parsedConfig = JSON.parse(savedConfig);
        
        // Check if config has valid selections
        const hasValidConfig = parsedConfig.sourceControl || parsedConfig.taskManagement;
        // Check if corresponding API keys are present based on config
        const hasRequiredKeys = Object.entries(parsedKeys).some(([key, value]) => {
          if (key === 'openai') return Boolean(value);
          if (key === 'gitlab' && parsedConfig.sourceControl === 'gitlab') return Boolean(value);
          if (key === 'github' && parsedConfig.sourceControl === 'github') return Boolean(value);
          if (key === 'jira' && parsedConfig.taskManagement === 'jira') return Boolean(value);
          return false;
        });

        if (hasValidConfig && hasRequiredKeys) {
          setApiKeys(parsedKeys);
          setConfigData(parsedConfig);
          setShowWelcomeModal(false);
        }
      } catch (e) {
        console.error('Error parsing stored data:', e);
        localStorage.removeItem('apiKeys');
        localStorage.removeItem('configData');
      }
    }
  }, []);

  if (!isLoaded) {
    return <div className="flex min-h-screen items-center justify-center">
      <div className="animate-pulse">Loading...</div>
    </div>;
  }

  if (!userId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <SignIn 
          routing="hash"
          afterSignInUrl={`/${window.location.pathname.split('/')[1]}/chat`} 
        />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!userId) {
      console.error('No user ID available');
      return;
    }

    setLoading(true);
    setMessages(prev => [...prev, {role: "user", content: input}]);
    setInput("");

    console.log('Current user:', user);
    console.log('Current userId:', userId);

    const payload = {
      text: input,
      userId: userId,
      username: user?.username || user?.firstName || 'anonymous',
      email: user?.emailAddresses?.[0]?.emailAddress
    };
    
    console.log('Sending payload:', payload);

    try {
      const response = await fetch("http://16.170.240.165/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setMessages(prev => [...prev, {role: "assistant", content: responseData.answer}]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: "assistant", 
        content: "Sorry, there was an error processing your request."
      }]);
    }

    setLoading(false);
  };

  const handleNewConversation = () => {
    setMessages([]);
    setInput("");
  };

  const handleApiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingKeys(true);
    try {
      const response = await fetch("http://16.170.240.165/api/keys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiKeys),
      });
      
      if (response.ok) {
        localStorage.setItem('apiKeys', JSON.stringify(apiKeys));
        localStorage.setItem('configData', JSON.stringify(configData));
        setShowApiModal(false);
      } else {
        console.error("Failed to save API keys");
      }
    } catch (error) {
      console.error("Error saving API keys:", error);
    } finally {
      setIsSubmittingKeys(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('apiKeys');
    localStorage.removeItem('configData');
    signOut();
  };

  return (
    <div className="flex min-h-screen flex-col">
      {showApiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-zinc-800 p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Configure API Keys</h2>
              <button
                onClick={() => setShowApiModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleApiSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  OpenAI API Key
                  <a 
                    href="https://platform.openai.com/api-keys"
                    className="ml-2 text-blue-400 hover:text-blue-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    (How to get?)
                  </a>
                </label>
                <input
                  type="password"
                  value={apiKeys.openai}
                  onChange={(e) => setApiKeys(prev => ({ ...prev, openai: e.target.value }))}
                  className="mt-1 w-full rounded-md border border-gray-600 bg-zinc-700 p-2 text-white"
                  required
                />
              </div>

              {configData.sourceControl === 'gitlab' && (
                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    GitLab API Key
                    <a 
                      href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html"
                      className="ml-2 text-blue-400 hover:text-blue-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      (How to get?)
                    </a>
                  </label>
                  <input
                    type="password"
                    value={apiKeys.gitlab}
                    onChange={(e) => setApiKeys(prev => ({ ...prev, gitlab: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-gray-600 bg-zinc-700 p-2 text-white"
                    required
                  />
                </div>
              )}

              {configData.sourceControl === 'github' && (
                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    GitHub API Key
                    <a 
                      href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
                      className="ml-2 text-blue-400 hover:text-blue-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      (How to get?)
                    </a>
                  </label>
                  <input
                    type="password"
                    value={apiKeys.github}
                    onChange={(e) => setApiKeys(prev => ({ ...prev, github: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-gray-600 bg-zinc-700 p-2 text-white"
                    required
                  />
                </div>
              )}

              {configData.taskManagement === 'jira' && (
                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Jira API Key
                    <a 
                      href="https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/"
                      className="ml-2 text-blue-400 hover:text-blue-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      (How to get?)
                    </a>
                  </label>
                  <input
                    type="password"
                    value={apiKeys.jira}
                    onChange={(e) => setApiKeys(prev => ({ ...prev, jira: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-gray-600 bg-zinc-700 p-2 text-white"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmittingKeys}
                className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-50"
              >
                {isSubmittingKeys ? (
                  <div className="flex justify-center gap-2">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" style={{ animationDelay: '150ms' }}></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" style={{ animationDelay: '300ms' }}></div>
                  </div>
                ) : (
                  'Save API Keys'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-zinc-800 p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-white">Configuration</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200">Are you on the cloud?</label>
                <select
                  value={configData.isCloud ? "yes" : "no"}
                  onChange={(e) => setConfigData(prev => ({ ...prev, isCloud: e.target.value === "yes" }))}
                  className="mt-1 w-full rounded-md border border-gray-600 bg-zinc-700 p-2 text-white"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              {configData.isCloud && (
                <div>
                  <label className="block text-sm font-medium text-gray-200">Cloud Platform</label>
                  <select
                    value={configData.cloudPlatform}
                    onChange={(e) => setConfigData(prev => ({ ...prev, cloudPlatform: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-gray-600 bg-zinc-700 p-2 text-white"
                  >
                    <option value="">Select Platform</option>
                    <option value="aws">AWS</option>
                    <option value="azure">Azure</option>
                    <option value="gcp">Google Cloud</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-200">Source Control</label>
                <select
                  value={configData.sourceControl}
                  onChange={(e) => setConfigData(prev => ({ ...prev, sourceControl: e.target.value }))}
                  className="mt-1 w-full rounded-md border border-gray-600 bg-zinc-700 p-2 text-white"
                >
                  <option value="">Select Source Control</option>
                  <option value="gitlab">GitLab</option>
                  <option value="github">GitHub</option>
                  <option value="azure">Azure DevOps</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200">Task Management</label>
                <select
                  value={configData.taskManagement}
                  onChange={(e) => setConfigData(prev => ({ ...prev, taskManagement: e.target.value }))}
                  className="mt-1 w-full rounded-md border border-gray-600 bg-zinc-700 p-2 text-white"
                >
                  <option value="">Select Task Management</option>
                  <option value="jira">Jira</option>
                  <option value="trello">Trello</option>
                  <option value="azure">Azure Boards</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowConfigModal(false);
                  setShowApiModal(true);
                }}
                className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      )}

      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-zinc-800 p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-white">Welcome to ExecuBot</h2>
            <p className="mb-6 text-gray-300">
              Let's get started by setting up your development environment!
            </p>
            <button
              onClick={() => {
                setShowWelcomeModal(false);
                setShowConfigModal(true);
              }}
              className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <header className="border-b border-border px-8 py-6 sm:px-48 md:px-48 xl:px-48">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold dark:text-zinc-100">ExecuBot</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowApiModal(true)}
              className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Update API Keys
            </button>
            <button
              onClick={handleSignOut}
              className="rounded-lg border border-border bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
        <p className="mt-2 text-center text-sm text-zinc-500">
          Your AI executive assistant powered by GitLab and Jira analytics
        </p>
        <p className="mt-1 text-center text-xs text-zinc-500">
          Ask questions about team productivity, project progress, and development metrics
        </p>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 p-4">
        <div className="flex justify-end">
          <button
            onClick={handleNewConversation}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            New Conversation
          </button>
        </div>
        <div className="flex-1 space-y-4 overflow-auto">
          {messages.length === 0 && (
            <div className="mt-8 text-center text-zinc-500">
              <p className="text-lg font-medium">Welcome to ExecuBot</p>
              <p className="mt-2 text-sm">
                I analyze your team's GitLab commits, merge requests, and Jira tickets to help you understand project progress and team performance.
              </p>
            </div>
          )}
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`rounded-lg border border-border p-4 ${
                message.role === "user" 
                  ? "ml-auto max-w-[80%] bg-background" 
                  : "mr-auto max-w-[80%] bg-zinc-50 dark:bg-zinc-900"
              }`}
            >
              {message.platform && (
                <div className="text-xs text-gray-500">
                  Source: {message.platform}
                </div>
              )}
              {message.role === "assistant" ? (
                <ReactMarkdown 
                  className="prose dark:prose-invert max-w-none
                    prose-p:my-2 
                    prose-p:leading-relaxed 
                    prose-headings:my-3
                    prose-ul:my-2 
                    prose-li:my-1
                    prose-pre:p-0
                    prose-blockquote:my-2
                    prose-hr:my-4"
                >
                  {message.content}
                </ReactMarkdown>
              ) : (
                message.content
              )}
            </div>
          ))}
          {loading && (
            <div className="mr-auto max-w-[80%] rounded-lg border border-border bg-zinc-50 p-4 dark:bg-zinc-900">
              <div className="flex gap-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" style={{ animationDelay: '150ms' }}></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your team's activities..."
            className="flex-1 rounded-lg border border-border bg-background p-2 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
            disabled={loading}  
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg border border-border bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </main>
    </div>
  );
}

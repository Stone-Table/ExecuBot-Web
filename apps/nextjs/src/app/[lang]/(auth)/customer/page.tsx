"use client";

import { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  name: string;
  companyName: string;
  jobTitle: string;
  platforms: string;
  companySize: string;
  timeZone: string;
  phoneNumber: string;
  email: string;
}

export default function ForumForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    companyName: "",
    jobTitle: "",
    platforms: "",
    companySize: "",
    timeZone: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add form submission logic here (e.g., send to API)
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4 sm:p-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-4 rounded-lg bg-black p-6 shadow-lg"
      >
        <h2 className="text-center text-3xl font-bold text-white">Execubot</h2>

        {/* Reusable Input Component */}
        {[
          { id: "name", label: "Name", placeholder: "Your Name" },
          {
            id: "companyName",
            label: "Company Name",
            placeholder: "Company Name",
          },
          { id: "jobTitle", label: "Job Title", placeholder: "Job Title" },
          {
            id: "platforms",
            label: "Platforms",
            placeholder: "e.g., Jira, GitLab, etc.",
          },
          {
            id: "timeZone",
            label: "Time Zone/Region",
            placeholder: "e.g., GMT-5, EST",
          },
          {
            id: "phoneNumber",
            label: "Phone Number",
            placeholder: "e.g., +1 234 567 890",
          },
          {
            id: "email",
            label: "Email",
            placeholder: "e.g., you@example.com",
          },
        ].map(({ id, label, placeholder }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="block text-sm font-medium text-gray-400"
            >
              {label}
            </label>
            <input
              type={
                id === "email" ? "email" : id === "phoneNumber" ? "tel" : "text"
              }
              id={id}
              name={id}
              value={formData[id as keyof FormData]}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-400 bg-black p-3 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              placeholder={placeholder}
            />
          </div>
        ))}

        {/* Company Size Dropdown */}
        <div>
          <label
            htmlFor="companySize"
            className="block text-sm font-medium text-gray-400"
          >
            Company Size
          </label>
          <select
            id="companySize"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <option value="">Select Company Size</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="500+">500+</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

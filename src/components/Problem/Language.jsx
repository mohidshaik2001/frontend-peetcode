import React, { forwardRef, useState } from "react";

function Language({ name, label, defaultValue, className, register }, ref) {
  const [languages] = useState(["Java", "Python", "C++"]);
  return (
    <div className="relative inline-block w-full text-gray-700 h-full">
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor={name || "language"}
        >
          {label || "Language"}
        </label>
      </div>
      <select
        className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
        placeholder="Language"
        name={name || "language"}
        defaultValue={defaultValue}
        ref={ref}
        {...(register ? register(name || "language") : {})}
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Language);

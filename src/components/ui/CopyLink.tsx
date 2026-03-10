"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function InstallCommand() {
  const [copied, setCopied] = useState(false);
  const command = "curl -fsSL https://raw.githubusercontent.com/bhargavgajare1479/Unearth/master/install.sh | bash";

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(command);
      } else {
        // Fallback for non-https/older browsers
        const textArea = document.createElement("textarea");
        textArea.value = command;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }

      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex items-center justify-between w-full max-w-md bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-1.5 shadow-sm">
      <code className="px-3 text-sm font-mono text-[#374151] truncate select-all">
        {command}
      </code>
      <button
        onClick={handleCopy}
        className="flex-shrink-0 flex items-center gap-2 bg-primary hover:bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}

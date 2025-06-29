import { ClipboardCopy, Check } from "lucide-react";
import { useState } from "react";

const CopyWithIcon = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className="p-2 rounded hover:bg-orange-300 hover:text-black">
      {copied ? <Check size={20} color="green" /> : <ClipboardCopy size={20} />}
    </button>
  );
};

export default CopyWithIcon;

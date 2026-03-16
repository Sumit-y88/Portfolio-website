import React from "react";
import { Download } from "lucide-react";

const ResumeDownloadBtn = () => {
  const handleResumeDownload = async () => {
    const link = document.createElement("a");
    link.href = "Sumit Yadav SE.pdf";
    link.download = 'Sumit Yadav SE.pdf'
    link.click();
  };

  return (
    <button
      onClick={handleResumeDownload}
      className="group flex gap-2 px-5 mt-5 py-3 rounded-full
      bg-gradient-to-r from-blue-500 to-blue-800 text-white
      hover:shadow-[0_2px_25px_rgba(60,130,246,0.8)]
      transition-all duration-300"
    >
      <Download className="group-hover:animate-bounce w-5 h-5" />
      Download Resume
    </button>
  );
};

export default ResumeDownloadBtn;

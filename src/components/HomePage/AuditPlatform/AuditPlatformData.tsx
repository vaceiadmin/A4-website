import React from "react";

export interface FeatureItem {
  src: string;
  alt: string;
  Text: React.ReactNode;
  className: string;
  imgClass: string;
}

export const features: FeatureItem[] = [
  {
    src: "/sec-2/magic-wand_3672676.png",
    alt: "Auto Classification",
    Text: (
      <p className="md:text-xs text-[8px] text-center text-gray-600 font-medium">
        Auto
        <br /> Classification
      </p>
    ),
    className:
      "md:top-20 md:left-10 top-12 left-5 max-sm:top-6 max-sm:left-2 shadow-lg bg-white",
    imgClass: "scale-x-[-1] md:h-6 h-3",
  },
  {
    src: "/sec-2/bookmark_12318485 (1).png",
    alt: "Cross Referencing",
    Text: (
      <p className="md:text-xs text-[8px] text-center text-gray-600 font-medium">
        Cross <br /> Referencing
      </p>
    ),
    className:
      "md:top-28 md:right-0 top-24 right-5 max-sm:top-20 max-sm:right-1 py-1 px-2 shadow-lg bg-white",
    imgClass: "md:h-6 h-3",
  },
  {
    src: "",
    alt: "Audit",
    Text: (
      <p className="md:text-sm text-[8px] text-gray-600 font-medium">Audit</p>
    ),
    className:
      "md:bottom-3 md:-left-10 bottom-4 -left-6 max-sm:bottom-4 max-sm:left-1 px-3 shadow-lg bg-white",
    imgClass: "md:h-6 h-3",
  },
  {
    src: "/sec-2/text-editor_8099665.png",
    alt: "Document Extraction",
    Text: (
      <p className="md:text-xs text-[8px] text-center text-gray-600 font-medium">
        Document <br /> Extraction
      </p>
    ),
    className:
      "md:bottom-10 md:left-20 bottom-12 left-8 max-sm:bottom-12 max-sm:left-2 px-2 py-1 shadow-lg bg-white",
    imgClass: "md:h-6 h-3",
  },
  {
    src: "/sec-2/artificial-intelligence_3315017.png",
    alt: "Industry Expert AI",
    Text: (
      <p className="md:text-xs text-[8px] text-center text-gray-600 font-medium ">
        Industry Expert
        <br />
        <span className="text-primary font-bold">AI</span>
      </p>
    ),
    className:
      "md:-bottom-10 md:right-20 -bottom-6 right-10 px-2 py-1 shadow-lg bg-white",
    imgClass: "md:h-6 h-3",
  },
  {
    src: "/sec-2/paper-plane_1012351.png",
    alt: "Audit",
    Text: "",
    className:
      "md:-top-10 md:left-[30%] -top-10 left-[35%] p-1.5 shadow-lg bg-white",
    imgClass: "md:h-6 h-4",
  },
  {
    src: "/sec-2/pdf_4726010.png",
    alt: "PDF",
    Text: "",
    className:
      "md:-top-10 md:left-[75%] -top-6 left-[60%] max-sm:-top-6 max-sm:right-2 max-sm:left-auto",
    imgClass: "md:h-12 h-8 max-sm:h-6 shadow-lg",
  },
  {
    src: "/sec-2/word_4726038.png",
    alt: "Doc",
    Text: "",
    className:
      "left-0 top-[40%] max-sm:left-1 max-sm:top-[40%] bg-transparent shadow-none",
    imgClass: "md:h-12 h-8 max-sm:h-7 shadow-lg",
  },
  {
    src: "/sec-2/xls_4726040.png",
    alt: "XLS",
    Text: "",
    className: "right-24 top-[65%] max-sm:right-12 bg-transparent shadow-none",
    imgClass: "md:h-12 h-8 max-sm:h-7 shadow-lg",
  },
  {
    src: "/sec-2/chat_769236.png",
    alt: "Chat",
    Text: "",
    className:
      "md:-right-10 md:top-[65%] -right-10 top-[55%] max-sm:right-1 max-sm:top-[55%] p-1.5 shadow-lg bg-white",
    imgClass: "md:h-8 h-5 max-sm:h-4",
  },
];

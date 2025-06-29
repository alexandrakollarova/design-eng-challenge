// @ts-check
import preset from "./src/design-system/tailwind.preset";

const tailwindConfig = {
  ...preset,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ]
};

export default tailwindConfig; 
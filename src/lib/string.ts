export const createInitialsAvatar = (name: string) => {
  const initials = name
    .split(" ")
    .map((part) => part[0]?.toUpperCase() || "")
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  // Crear SVG programáticamente
  const svg = `
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect 
          width="24" 
          height="24" 
          rx="size / 2" 
          fill="oklch(0.61 0.211962 256.3304)"
        />
        <text 
          x="50%" 
          y="50%" 
          font-family="Arial, sans-serif" 
          font-size="0.75rem" 
          fill="#fff" 
          text-anchor="middle" 
          dy=".35em"
        >
          ${initials}
        </text>
      </svg>
    `;

  // Convertir a URL base64 para usar en <img>
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};

export const toSnakeCase = (text : string) => {
  return text
    .trim() 
    .toLowerCase() 
    .replace(/\s+/g, '_') 
    .replace(/^_+|_+$/g, ''); 
};
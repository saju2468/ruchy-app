const EmptyPlateIllustration = ({
  className = "w-44 h-44 mb-4 text-orange-500 drop-shadow-sm",
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 240 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ground shadow */}
      <ellipse cx="120" cy="165" rx="80" ry="14" fill="#f1f5f9" />

      {/* Empty Dining Plate */}
      <ellipse
        cx="120"
        cy="140"
        rx="72"
        ry="22"
        fill="#ffffff"
        stroke="#e2e8f0"
        strokeWidth="3"
      />
      <ellipse
        cx="120"
        cy="140"
        rx="52"
        ry="15"
        fill="#fafafa"
        stroke="#cbd5e1"
        strokeWidth="2"
        strokeDasharray="4 4"
      />

      {/* Food Cloche / Dome */}
      <path
        d="M72 128 C72 82, 168 82, 168 128 Z"
        fill="#fff7ed"
        stroke="#fb923c"
        strokeWidth="3"
      />
      <circle
        cx="120"
        cy="80"
        r="7"
        fill="#f97316"
        stroke="#ea580c"
        strokeWidth="2.5"
      />

      {/* Aroma / Empty wisps */}
      <path
        d="M102 66 Q96 52 103 40"
        stroke="#fdba74"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M120 62 Q125 48 119 36"
        stroke="#fdba74"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M138 66 Q144 52 137 40"
        stroke="#fdba74"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Magnifying Glass with Not Found mark */}
      <g transform="translate(138, 70)">
        <circle
          cx="28"
          cy="28"
          r="22"
          fill="#ffffff"
          stroke="#f97316"
          strokeWidth="3.5"
        />
        <line
          x1="44"
          y1="44"
          x2="62"
          y2="62"
          stroke="#ea580c"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M21 21 L35 35 M35 21 L21 35"
          stroke="#ef4444"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* Cutlery */}
      <path
        d="M46 116 L46 150 M40 116 L52 116"
        stroke="#94a3b8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M194 116 L194 150 M188 122 C188 116 200 116 200 122 Z"
        stroke="#94a3b8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default EmptyPlateIllustration;

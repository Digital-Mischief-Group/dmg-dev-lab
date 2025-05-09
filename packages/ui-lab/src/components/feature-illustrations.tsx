export function UnifiedProviderIllustration() {
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-30 group-hover:opacity-60 transition-opacity duration-300"
    >
      <path
        d="M90 40C90 40 75 65 75 90C75 115 90 140 90 140"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3"
      />
      <path d="M65 70C65 70 90 75 115 70" stroke="currentColor" strokeWidth="1" strokeDasharray="3" />
      <path d="M65 110C65 110 90 105 115 110" stroke="currentColor" strokeWidth="1" strokeDasharray="3" />

      {/* Head silhouette */}
      <path
        d="M115 60C115 60 125 75 125 90C125 105 115 120 115 120C115 120 105 130 90 130C75 130 65 120 65 120C65 120 55 105 55 90C55 75 65 60 65 60C65 60 75 50 90 50C105 50 115 60 115 60Z"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* API icons */}
      <rect
        x="130"
        y="60"
        width="15"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1"
        className="group-hover:stroke-green-400 transition-colors duration-300"
      />
      <rect
        x="140"
        y="80"
        width="15"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1"
        className="group-hover:stroke-green-400 transition-colors duration-300"
      />
      <rect
        x="130"
        y="100"
        width="15"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1"
        className="group-hover:stroke-green-400 transition-colors duration-300"
      />
      <rect
        x="35"
        y="60"
        width="15"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1"
        className="group-hover:stroke-green-400 transition-colors duration-300"
      />
      <rect
        x="25"
        y="80"
        width="15"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1"
        className="group-hover:stroke-green-400 transition-colors duration-300"
      />
      <rect
        x="35"
        y="100"
        width="15"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1"
        className="group-hover:stroke-green-400 transition-colors duration-300"
      />
    </svg>
  )
}

export function MemoryIllustration() {
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-30 group-hover:opacity-60 transition-opacity duration-300"
    >
      {/* Head silhouette */}
      <path
        d="M115 60C115 60 125 75 125 90C125 105 115 120 115 120C115 120 105 130 90 130C75 130 65 120 65 120C65 120 55 105 55 90C55 75 65 60 65 60C65 60 75 50 90 50C105 50 115 60 115 60Z"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* Memory bubbles */}
      <g className="group-hover:stroke-green-400 transition-colors duration-300">
        <rect x="130" y="70" width="40" height="20" rx="2" stroke="currentColor" strokeWidth="1" />
        <text x="135" y="83" className="text-[8px] fill-current">
          Recent trip
        </text>
      </g>

      <g className="group-hover:stroke-green-400 transition-colors duration-300">
        <rect x="140" y="100" width="35" height="20" rx="2" stroke="currentColor" strokeWidth="1" />
        <text x="145" y="113" className="text-[8px] fill-current">
          Prefer JavaScript
        </text>
      </g>

      <g className="group-hover:stroke-green-400 transition-colors duration-300">
        <rect x="120" y="130" width="40" height="20" rx="2" stroke="currentColor" strokeWidth="1" />
        <text x="125" y="143" className="text-[8px] fill-current">
          Daughter pets
        </text>
      </g>
    </svg>
  )
}

export function PromptTuningIllustration() {
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-30 group-hover:opacity-60 transition-opacity duration-300"
    >
      {/* Speech bubble with "You are a..." */}
      <g className="group-hover:stroke-green-400 transition-colors duration-300">
        <rect x="130" y="60" width="70" height="25" rx="3" stroke="currentColor" strokeWidth="1" />
        <text x="138" y="76" className="text-[10px] fill-current">
          You are a ...
        </text>
        <rect
          x="190"
          y="67"
          width="5"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1"
          fill="currentColor"
          fillOpacity="0.2"
        />

        {/* Speech bubble pointer */}
        <path d="M145 85L135 95L155 95" fill="none" stroke="currentColor" strokeWidth="1" />
      </g>

      {/* Head silhouette - simplified outline */}
      <path
        d="M90 95C90 95 100 85 110 85C120 85 125 90 125 100C125 110 120 120 110 130C100 140 90 140 80 130C70 120 70 110 70 100C70 90 80 95 90 95Z"
        stroke="currentColor"
        strokeWidth="1"
        className="group-hover:stroke-green-400 transition-colors duration-300"
      />

      {/* Neck line */}
      <path
        d="M90 130L85 150"
        stroke="currentColor"
        strokeWidth="1"
        className="group-hover:stroke-green-400 transition-colors duration-300"
      />

      {/* Sliders - more minimalist */}
      <g className="group-hover:stroke-green-400 transition-colors duration-300">
        <line x1="140" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="1" />
        <circle cx="165" cy="100" r="3" fill="none" stroke="currentColor" strokeWidth="1" />

        <line x1="140" y1="115" x2="190" y2="115" stroke="currentColor" strokeWidth="1" />
        <circle cx="175" cy="115" r="3" fill="none" stroke="currentColor" strokeWidth="1" />

        <line x1="140" y1="130" x2="190" y2="130" stroke="currentColor" strokeWidth="1" />
        <circle cx="155" cy="130" r="3" fill="none" stroke="currentColor" strokeWidth="1" />
      </g>
    </svg>
  )
}

export function ToolCallingIllustration() {
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-30 group-hover:opacity-60 transition-opacity duration-300"
    >
      {/* Head silhouette */}
      <path
        d="M115 60C115 60 125 75 125 90C125 105 115 120 115 120C115 120 105 130 90 130C75 130 65 120 65 120C65 120 55 105 55 90C55 75 65 60 65 60C65 60 75 50 90 50C105 50 115 60 115 60Z"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* Function call bubbles */}
      <g className="group-hover:stroke-green-400 transition-colors duration-300">
        <circle cx="145" cy="70" r="12" stroke="currentColor" strokeWidth="1" />
        <text x="140" y="73" className="text-[8px] fill-current">
          fn
        </text>
      </g>

      <g className="group-hover:stroke-green-400 transition-colors duration-300">
        <circle cx="160" cy="90" r="12" stroke="currentColor" strokeWidth="1" />
        <text x="155" y="93" className="text-[8px] fill-current">
          API
        </text>
      </g>

      <g className="group-hover:stroke-green-400 transition-colors duration-300">
        <circle cx="145" cy="110" r="12" stroke="currentColor" strokeWidth="1" />
        <text x="140" y="113" className="text-[8px] fill-current">
          DB
        </text>
      </g>

      <g className="group-hover:stroke-green-400 transition-colors duration-300">
        <circle cx="160" cy="130" r="12" stroke="currentColor" strokeWidth="1" />
        <text x="155" y="133" className="text-[8px] fill-current">
          searchAmazon
        </text>
      </g>
    </svg>
  )
}

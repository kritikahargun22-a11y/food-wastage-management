import { motion } from "framer-motion";

/**
 * Flat vector illustration: volunteer donating a food box to an NGO
 * volunteer, a branded delivery van, vegetables, city skyline, trees
 * and clouds. Built as inline SVG for crisp, dependency-free rendering.
 */
export default function HeroIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
      className="relative w-full"
    >
      <div className="relative rounded-card overflow-hidden shadow-lift bg-gradient-to-b from-emerald-50 to-green-100 aspect-[4/3.6]">
        <svg
          viewBox="0 0 760 700"
          className="h-full w-full"
          role="img"
          aria-label="Illustration of a volunteer donating food to an NGO worker beside a FoodShare delivery van"
        >
          {/* sky */}
          <rect width="760" height="700" fill="#EEFBF2" />

          {/* clouds */}
          <g fill="#FFFFFF" opacity="0.95">
            <ellipse cx="120" cy="90" rx="46" ry="18" />
            <ellipse cx="150" cy="80" rx="34" ry="16" />
            <ellipse cx="640" cy="130" rx="50" ry="18" />
            <ellipse cx="600" cy="120" rx="30" ry="14" />
          </g>

          {/* city skyline */}
          <g opacity="0.3" fill="#86D9A3">
            <rect x="30" y="290" width="55" height="230" rx="6" />
            <rect x="95" y="250" width="46" height="270" rx="6" />
            <rect x="150" y="300" width="34" height="220" rx="6" />
            <rect x="580" y="270" width="50" height="250" rx="6" />
            <rect x="640" y="230" width="55" height="290" rx="6" />
            <rect x="700" y="300" width="36" height="220" rx="6" />
          </g>

          {/* ground */}
          <ellipse cx="380" cy="600" rx="420" ry="60" fill="#D6F2DF" />

          {/* trees */}
          <g transform="translate(60,470)">
            <rect x="18" y="60" width="10" height="50" rx="4" fill="#8A6A46" />
            <circle cx="23" cy="45" r="34" fill="#16A34A" />
            <circle cx="0" cy="60" r="24" fill="#22C55E" />
            <circle cx="48" cy="60" r="24" fill="#22C55E" />
          </g>
          <g transform="translate(650,480)">
            <rect x="18" y="55" width="9" height="45" rx="4" fill="#8A6A46" />
            <circle cx="22" cy="42" r="30" fill="#16A34A" />
            <circle cx="2" cy="55" r="20" fill="#22C55E" />
            <circle cx="44" cy="55" r="20" fill="#22C55E" />
          </g>

          {/* delivery van */}
          <g transform="translate(430,300)">
            <rect x="0" y="110" width="270" height="130" rx="18" fill="#16A34A" />
            <rect x="18" y="86" width="150" height="34" rx="10" fill="#16A34A" />
            <rect x="24" y="94" width="60" height="20" rx="5" fill="#DCFCE7" />
            <circle cx="300" cy="86" r="48" fill="#EEFBF2" />
            <circle cx="300" cy="86" r="36" fill="#FFFFFF" />
            <path
              d="M300 60c-15 0-27 11-27 26 0 19 27 42 27 42s27-23 27-42c0-15-12-26-27-26z"
              fill="#16A34A"
            />
            <path
              d="M289 84l8 8 15-16"
              stroke="#FFFFFF"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="145"
              y="170"
              fontFamily="Poppins, sans-serif"
              fontSize="27"
              fontWeight="800"
              fill="#FFFFFF"
            >
              FoodShare
            </text>
            <text
              x="145"
              y="192"
              fontFamily="Poppins, sans-serif"
              fontSize="12.5"
              fontWeight="500"
              fill="#DCFCE7"
            >
              Reduce Waste. Feed People.
            </text>
            <circle cx="55" cy="240" r="24" fill="#0B2E22" />
            <circle cx="55" cy="240" r="10" fill="#6C8C7A" />
            <circle cx="230" cy="240" r="24" fill="#0B2E22" />
            <circle cx="230" cy="240" r="10" fill="#6C8C7A" />
          </g>

          {/* volunteer donor */}
          <g transform="translate(150,290)">
            <rect x="34" y="228" width="19" height="95" rx="8" fill="#0B2E22" />
            <rect x="70" y="228" width="19" height="95" rx="8" fill="#0B2E22" />
            <rect x="18" y="132" width="86" height="106" rx="24" fill="#22C55E" />
            <rect
              x="92"
              y="164"
              width="72"
              height="23"
              rx="11"
              fill="#F2B98C"
              transform="rotate(8 92 164)"
            />
            <rect x="6" y="160" width="30" height="74" rx="14" fill="#22C55E" />
            <circle cx="61" cy="92" r="40" fill="#F2B98C" />
            <path
              d="M19 84a42 42 0 0 1 84 0c-11-6-25-9-42-9s-31 3-42 9z"
              fill="#0F8A4A"
            />
            <ellipse cx="61" cy="78" rx="44" ry="15" fill="#0F8A4A" />
            <circle cx="48" cy="94" r="3.4" fill="#0B2E22" />
            <circle cx="75" cy="94" r="3.4" fill="#0B2E22" />
            <path
              d="M49 110q12 9 24 0"
              stroke="#0B2E22"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* NGO volunteer receiving */}
          <g transform="translate(455,285)">
            <rect x="46" y="230" width="19" height="97" rx="8" fill="#0B2E22" />
            <rect x="83" y="230" width="19" height="97" rx="8" fill="#0B2E22" />
            <rect x="28" y="132" width="94" height="110" rx="26" fill="#0F3D2A" />
            <text
              x="47"
              y="182"
              fontFamily="Poppins, sans-serif"
              fontSize="17"
              fontWeight="800"
              fill="#FFFFFF"
            >
              NGO
            </text>
            <rect
              x="-48"
              y="166"
              width="76"
              height="23"
              rx="11"
              fill="#F4C491"
              transform="rotate(-8 0 166)"
            />
            <rect x="116" y="162" width="30" height="74" rx="14" fill="#0F3D2A" />
            <path
              d="M25 66c0-42 92-42 92 0v72c0 8-8 15-16 10-5-31-58-31-62 2-8 2-14-4-14-13z"
              fill="#122A1F"
            />
            <circle cx="71" cy="94" r="40" fill="#F6C795" />
            <path
              d="M31 88a40 40 0 0 1 80 0c0-25-18-44-40-44s-40 19-40 44z"
              fill="#1A1A1A"
            />
            <circle cx="58" cy="98" r="3.4" fill="#0B2E22" />
            <circle cx="85" cy="98" r="3.4" fill="#0B2E22" />
            <path
              d="M59 112q13 10 25 0"
              stroke="#0B2E22"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* donation box with vegetables */}
          <g transform="translate(300,430)">
            <rect x="0" y="34" width="140" height="98" rx="10" fill="#C98A4B" />
            <rect x="0" y="34" width="140" height="20" fill="#B97638" />
            <path
              d="M0 34l70 22 70-22"
              fill="none"
              stroke="#8A5A2A"
              strokeWidth="3"
            />
            <text
              x="16"
              y="98"
              fontFamily="Poppins, sans-serif"
              fontSize="15"
              fontWeight="700"
              fill="#4A2E10"
            >
              DONATION
            </text>
            <ellipse
              cx="34"
              cy="8"
              rx="11"
              ry="28"
              fill="#E8622C"
              transform="rotate(-10 34 8)"
            />
            <ellipse
              cx="62"
              cy="-4"
              rx="10"
              ry="26"
              fill="#F0813A"
              transform="rotate(6 62 -4)"
            />
            <circle cx="94" cy="6" r="18" fill="#F4C430" />
            <rect
              x="104"
              y="-12"
              width="22"
              height="44"
              rx="5"
              fill="#EEF1F2"
              transform="rotate(10 104 -12)"
            />
            <g fill="#22C55E">
              <path d="M31 -20l7 22-16-4z" />
              <path d="M60 -30l9 22-18-2z" />
            </g>
          </g>
        </svg>
      </div>
    </motion.div>
  );
}

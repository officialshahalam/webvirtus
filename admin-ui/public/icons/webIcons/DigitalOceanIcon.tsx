import * as React from "react";

const DigitalOceanIcon = ({ ...props }) => {
  const uid = React.useId();
  const gradId = `${uid}-paint0`;
  const clipId = `${uid}-clip0`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 81 80"
      role="img"
      {...props}
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          fill={`url(#${gradId})`}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M37.5002 65.7168V80C61.7105 80 80.5176 56.6275 72.6012 31.2474C69.1657 20.1876 60.3285 11.3934 49.2702 7.91488C23.9301 -6.67572e-06 0.557617 18.8486 0.557617 43.0144H14.8409C14.8409 27.8519 29.8774 16.1248 45.8362 21.9046C48.7678 22.9743 51.4302 24.672 53.6367 26.8788C55.8433 29.0856 57.5407 31.7481 58.61 34.6799C64.4275 50.6243 52.6839 65.6481 37.5411 65.6752V51.4766H23.3023L23.3009 65.7168H37.5002ZM23.2994 76.6906H12.3271V65.7183H23.2994V76.6906ZM12.3271 65.7183V56.5431H3.15332V65.7183H12.3271Z"
        />
      </g>

      <defs>
        <linearGradient
          id={gradId}
          x1="37.497"
          y1="6.08301"
          x2="37.497"
          y2="89.5159"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00B4FA" />
          <stop offset="1" stopColor="#00B4FA" stopOpacity="0.08" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect
            width="80"
            height="80"
            fill="white"
            transform="translate(0.538086)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DigitalOceanIcon;

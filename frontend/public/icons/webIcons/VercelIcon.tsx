import * as React from "react";

const VercelIcon = ({ ...props }) => {
  const uid = React.useId();
  const gradId = `${uid}-paint0`;
  const clipId = `${uid}-clip0`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 71 80"
      role="img"
      {...props}
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          fill={`url(#${gradId})`}
          d="M35.5642 6.54541L70.603 67.2351H0.525391L35.5642 6.54541Z"
        />
      </g>

      <defs>
        <linearGradient
          id={gradId}
          x1="35.5642"
          y1="6.54541"
          x2="35.5642"
          y2="75.0481"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00B4FA" />
          <stop offset="1" stopColor="#00B4FA" stopOpacity="0.08" />
        </linearGradient>

        <clipPath id={clipId}>
          <rect
            width="70.0268"
            height="80"
            fill="white"
            transform="translate(0.525391)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default VercelIcon;

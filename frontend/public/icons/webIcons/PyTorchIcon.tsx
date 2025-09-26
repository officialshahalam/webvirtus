import * as React from "react";

const PyTorchIcon = ({ ...props }) => {
  const uid = React.useId();
  const gradId = `${uid}-paint0`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 171 206"
      role="img"
      {...props}
    >
      <path
        fill={`url(#${gradId})`}
        d="M145.316 59.9865C178.797 93.4673 178.797 147.176 145.316 180.889C112.533 214.37 58.5914 214.37 25.1106 180.889C-8.3702 147.409 -8.3702 93.4673 25.1106 59.9865L85.0971 0V29.9932L79.5169 35.5734L39.7585 75.3318C14.6479 99.9774 14.6479 140.433 39.7585 165.544C64.4041 190.655 104.86 190.655 129.971 165.544C155.081 140.898 155.081 100.442 129.971 75.3318L145.316 59.9865ZM115.323 56.2664C109.159 56.2664 104.163 51.2697 104.163 45.1061C104.163 38.9424 109.159 33.9458 115.323 33.9458C121.486 33.9458 126.483 38.9424 126.483 45.1061C126.483 51.2697 121.486 56.2664 115.323 56.2664Z"
      />

      <defs>
        <linearGradient
          id={gradId}
          x1="85.2133"
          y1="0"
          x2="85.2133"
          y2="206"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00B4FA" />
          <stop offset="1" stopColor="#00B4FA" stopOpacity="0.08" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PyTorchIcon;

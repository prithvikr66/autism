import { motion } from "framer-motion";
export const ConnectWalletSVG = ({ onClick }: { onClick: any }) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <svg
        width="90vw"
        height="60"
        viewBox="0 0 365 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_1473_353)">
          <rect
            width="361"
            height="56"
            rx="28"
            fill="#B280D9"
            shape-rendering="crispEdges"
          />
          <rect
            x="2"
            y="2"
            width="357"
            height="52"
            rx="26"
            stroke="black"
            stroke-width="4"
            shape-rendering="crispEdges"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M93.1758 26.1423H107.561C107.741 26.1423 107.906 26.2173 108.041 26.3523L110.321 28.6923C110.741 29.1273 110.441 29.8623 109.841 29.8623H95.4558C95.2758 29.8623 95.1108 29.7873 94.9758 29.6523L92.6958 27.3123C92.2758 26.8773 92.5758 26.1423 93.1758 26.1423ZM92.6958 23.0373L94.9758 20.6973C95.0958 20.5623 95.2758 20.4873 95.4558 20.4873H109.826C110.426 20.4873 110.726 21.2223 110.306 21.6573L108.041 23.9973C107.921 24.1323 107.741 24.2073 107.561 24.2073H93.1758C92.5758 24.2073 92.2758 23.4723 92.6958 23.0373ZM110.306 32.9523L108.026 35.2923C107.891 35.4273 107.726 35.5023 107.546 35.5023H93.1758C92.5758 35.5023 92.2758 34.7673 92.6958 34.3323L94.9758 31.9923C95.0958 31.8573 95.2758 31.7823 95.4558 31.7823H109.826C110.426 31.7823 110.726 32.5173 110.306 32.9523Z"
            fill="white"
          />
          <path
            d="M130.412 29.692H132.588C132.439 30.8867 131.905 31.8573 130.988 32.604C130.071 33.34 128.929 33.708 127.564 33.708C125.857 33.708 124.524 33.1693 123.564 32.092C122.615 31.004 122.14 29.5213 122.14 27.644C122.14 25.8093 122.631 24.3587 123.612 23.292C124.604 22.2253 125.943 21.692 127.628 21.692C128.983 21.692 130.097 22.0493 130.972 22.764C131.857 23.4787 132.396 24.444 132.588 25.66H130.412C130.028 24.2307 129.095 23.516 127.612 23.516C126.705 23.516 125.959 23.8787 125.372 24.604C124.796 25.3293 124.508 26.3427 124.508 27.644C124.508 28.9773 124.791 30.0173 125.356 30.764C125.932 31.5107 126.657 31.884 127.532 31.884C129.1 31.884 130.06 31.1533 130.412 29.692ZM137.013 24.62C136.384 25.356 136.069 26.38 136.069 27.692C136.069 29.004 136.384 30.0333 137.013 30.78C137.642 31.516 138.432 31.884 139.381 31.884C140.33 31.884 141.12 31.516 141.749 30.78C142.378 30.0333 142.693 29.004 142.693 27.692C142.693 26.38 142.378 25.356 141.749 24.62C141.12 23.884 140.33 23.516 139.381 23.516C138.432 23.516 137.642 23.884 137.013 24.62ZM143.509 23.34C144.544 24.4387 145.061 25.8893 145.061 27.692C145.061 29.4947 144.544 30.9507 143.509 32.06C142.474 33.1587 141.098 33.708 139.381 33.708C137.664 33.708 136.288 33.1587 135.253 32.06C134.218 30.9507 133.701 29.4947 133.701 27.692C133.701 25.8893 134.218 24.4387 135.253 23.34C136.288 22.2413 137.664 21.692 139.381 21.692C141.098 21.692 142.474 22.2413 143.509 23.34ZM156.457 33.5H153.481L148.841 24.652V33.5H146.681V21.9H149.657L154.297 30.748V21.9H156.457V33.5ZM168.316 33.5H165.34L160.7 24.652V33.5H158.54V21.9H161.516L166.156 30.748V21.9H168.316V33.5ZM170.399 33.5V21.9H178.847V23.756H172.687V26.636H178.511V28.492H172.687V31.644H178.847V33.5H170.399ZM188.146 29.692H190.322C190.173 30.8867 189.64 31.8573 188.722 32.604C187.805 33.34 186.664 33.708 185.298 33.708C183.592 33.708 182.258 33.1693 181.298 32.092C180.349 31.004 179.874 29.5213 179.874 27.644C179.874 25.8093 180.365 24.3587 181.346 23.292C182.338 22.2253 183.677 21.692 185.362 21.692C186.717 21.692 187.832 22.0493 188.706 22.764C189.592 23.4787 190.13 24.444 190.322 25.66H188.146C187.762 24.2307 186.829 23.516 185.346 23.516C184.44 23.516 183.693 23.8787 183.106 24.604C182.53 25.3293 182.242 26.3427 182.242 27.644C182.242 28.9773 182.525 30.0173 183.09 30.764C183.666 31.5107 184.392 31.884 185.266 31.884C186.834 31.884 187.794 31.1533 188.146 29.692ZM194.226 33.5V23.756H190.658V21.9H200.098V23.756H196.514V33.5H194.226ZM207.429 33.5V23.756H203.861V21.9H213.301V23.756H209.717V33.5H207.429ZM216.622 24.62C215.993 25.356 215.678 26.38 215.678 27.692C215.678 29.004 215.993 30.0333 216.622 30.78C217.252 31.516 218.041 31.884 218.99 31.884C219.94 31.884 220.729 31.516 221.358 30.78C221.988 30.0333 222.302 29.004 222.302 27.692C222.302 26.38 221.988 25.356 221.358 24.62C220.729 23.884 219.94 23.516 218.99 23.516C218.041 23.516 217.252 23.884 216.622 24.62ZM223.118 23.34C224.153 24.4387 224.67 25.8893 224.67 27.692C224.67 29.4947 224.153 30.9507 223.118 32.06C222.084 33.1587 220.708 33.708 218.99 33.708C217.273 33.708 215.897 33.1587 214.862 32.06C213.828 30.9507 213.31 29.4947 213.31 27.692C213.31 25.8893 213.828 24.4387 214.862 23.34C215.897 22.2413 217.273 21.692 218.99 21.692C220.708 21.692 222.084 22.2413 223.118 23.34ZM237.771 29.692H239.947C239.798 30.8867 239.265 31.8573 238.347 32.604C237.43 33.34 236.289 33.708 234.923 33.708C233.217 33.708 231.883 33.1693 230.923 32.092C229.974 31.004 229.499 29.5213 229.499 27.644C229.499 25.8093 229.99 24.3587 230.971 23.292C231.963 22.2253 233.302 21.692 234.987 21.692C236.342 21.692 237.457 22.0493 238.331 22.764C239.217 23.4787 239.755 24.444 239.947 25.66H237.771C237.387 24.2307 236.454 23.516 234.971 23.516C234.065 23.516 233.318 23.8787 232.731 24.604C232.155 25.3293 231.867 26.3427 231.867 27.644C231.867 28.9773 232.15 30.0173 232.715 30.764C233.291 31.5107 234.017 31.884 234.891 31.884C236.459 31.884 237.419 31.1533 237.771 29.692ZM248.887 21.9H251.175V33.5H248.887V28.492H243.687V33.5H241.399V21.9H243.687V26.636H248.887V21.9ZM252.062 33.5L256.383 21.9H258.687L263.023 33.5H260.543L259.727 31.148H255.215L254.399 33.5H252.062ZM257.471 24.7L255.871 29.276H259.071L257.471 24.7ZM265.07 33.5V23.756H261.502V21.9H270.942V23.756H267.358V33.5H265.07Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_1473_353"
            x="0"
            y="0"
            width="365"
            height="60"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="4" dy="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1473_353"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1473_353"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </motion.button>
  );
};
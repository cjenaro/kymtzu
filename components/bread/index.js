import styles from "./bread.module.scss";

export default function Bread({ onClick }) {
  return (
    <button type="button" onClick={onClick} className={styles.button}>
      <svg
        width="37"
        height="37"
        viewBox="0 0 37 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.13108 23.6028C4.12471 25.6091 4.12368 28.8631 6.13108 30.87C8.13746 32.8769 11.3924 32.8769 13.3988 30.8705L30.8705 13.3978C32.8769 11.3903 32.8769 8.13692 30.8705 6.13054C28.8631 4.12314 25.6097 4.12314 23.6028 6.13003L6.13108 23.6028Z"
          fill="#F4AA41"
        />
        <path
          d="M6.13108 23.6028C4.12471 25.6091 4.12368 28.8631 6.13108 30.87C8.13746 32.8769 11.3924 32.8769 13.3988 30.8705L30.8705 13.3978C32.8769 11.3903 32.8769 8.13692 30.8705 6.13054C28.8631 4.12314 25.6097 4.12314 23.6028 6.13003L6.13108 23.6028Z"
          stroke="black"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.6028 6.13003C21.5964 8.13692 21.5964 11.3909 23.6028 13.3978"
          stroke="black"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.2347 10.4981C17.2283 12.505 17.2283 15.7589 19.2347 17.7658"
          stroke="black"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.8667 14.8661C12.8608 16.8735 12.8608 20.1275 14.8667 22.1339"
          stroke="black"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.4992 19.2347C8.49279 21.2416 8.49279 24.4955 10.4992 26.5024"
          stroke="black"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

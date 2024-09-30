export default function Button({ children, ...props }) {
  const classes =
    "px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100";

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}

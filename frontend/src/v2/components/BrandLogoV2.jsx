import "./BrandLogoV2.css";

export default function BrandLogoV2({ className = "" }) {
  return (
    <img
      className={`v2-brand-logo${className ? ` ${className}` : ""}`}
      src="/assets/white-llogo.png"
      alt="Malhar — moulding the best"
      width="500"
      height="109"
    />
  );
}

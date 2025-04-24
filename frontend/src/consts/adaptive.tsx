export const sizes = {
  xs: "576px",
  sm: "768px",
  md: "992px",
  lg: "1200px",
};

export const media = {
  xs: `@media (max-width: ${sizes.xs})`,
  sm: `@media (max-width: ${sizes.sm})`,
  md: `@media (max-width: ${sizes.md})`,
  lg: `@media (max-width: ${sizes.lg})`,
};

// import { media } from "@/consts/adaptive";
// ${media.lg} {
//     height: 600px;
//   }

//   ${media.md} {
//     height: 500px;
//   }

//   ${media.sm} {
//     height: 400px;
//   }

//   ${media.xs} {
//     height: 300px;
//   }
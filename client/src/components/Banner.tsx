import { memo } from "react";

type BannerProps = {
  text: string;
  isAlert: boolean;
};

const Banner = memo(({ text, isAlert }: BannerProps) => (
  <>
    {text && (
      <p className={`banner ${isAlert ? "banner-red" : "banner-green"}`}>
        {text}
      </p>
    )}
  </>
));

export default Banner;

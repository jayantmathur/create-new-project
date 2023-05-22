import { default as NextImage } from "next/image";

const Image = (props: {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}) => {
  const { src, alt, width = "100%", height = "100%" } = props;
  return (
    <NextImage
      src={src}
      alt={alt}
      //   fill
      width={0}
      height={0}
      style={{ width: width, height: height }}
    />
  );
};

export default Image;

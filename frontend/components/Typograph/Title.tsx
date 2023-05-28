import React from "react";

type level = "h2" | "h3" | "h4";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  level?: level;
}

// font-weight size

type styles = `font-${"normal" | "medium" | "semibold"} text-${
  | "base"
  | "xl"
  | "2xl"
  | "3xl"}`;

const titlesStyle: Record<level, styles> = {
  h2: "font-semibold text-3xl",
  h3: "font-medium text-2xl",
  h4: "font-normal text-xl",
};

export const Title: React.FC<Props> = ({
  level = "h3",
  children,
  className,
  ...props
}) => {
  const Tag = level;
  return (
    <Tag {...props} className={`${className} ${titlesStyle[level]}`}>
      {children}
    </Tag>
  );
};

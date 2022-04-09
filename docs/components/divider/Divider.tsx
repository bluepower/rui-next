import React, { CSSProperties } from "react";
import classnames from "classnames";

// DividerProps type
export type DividerProps = {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  contentAlign?: "center" | "left" | "right"; // takes effect when vertical: false
  vertical?: boolean; // vertical or horizontal
};

// Divider FC
export const Divider: React.FC<DividerProps> = (props) => {
  const {
    prefixCls,
    className,
    children,
    contentAlign,
    style,
    vertical,
  } = props;

  const wrapCls = classnames(
    prefixCls,
    className,
    `${prefixCls}-${vertical ? "vertical" : "horizontal"}`,
    `${prefixCls}-${contentAlign}`,
  );

  return (
    <div
      className={wrapCls}
      style={style}
    >
      {children && (
        <div className={`${prefixCls}-content`}>
          {children}
        </div>
      )}
    </div>
  );
};

Divider.defaultProps = {
  prefixCls: "r-divider",
  contentAlign: "center",
  vertical: false,
};

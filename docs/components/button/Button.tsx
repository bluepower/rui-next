import React, { CSSProperties, MouseEventHandler, ReactNode } from "react";
import classnames from "classnames";
import Icon from "../icon/index";
import TouchFeedback from "../_utils/TouchFeedback";
import { insertSpace } from "../_utils/index";

// ButtonPropsType interface
export interface ButtonPropsType {
  type?: "primary" | "warning" | "ghost";
  size?: "large" | "small";
  disabled?: boolean;
  loading?: boolean;
}

// ButtonProps interface
export interface ButtonProps extends ButtonPropsType {
  role?: string;
  inline?: boolean;
  icon?: ReactNode;
  activeClassName?: string;
  activeStyle?: boolean | CSSProperties;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  prefixCls?: string;
  className?: string;
}

// Button FC
const Button = (props: ButtonProps) => {
  const {
    type,
    size,
    inline,
    disabled,
    icon,
    loading,
    activeStyle,
    activeClassName,
    prefixCls,
    className,
    children,
    onClick,
    ...restProps
  } = props;

  const iconType: any = loading ? "loading" : icon;

  const wrapCls = classnames(
    prefixCls,
    className,
    {
      [`${prefixCls}-primary`]: type === "primary",
      [`${prefixCls}-ghost`]: type === "ghost",
      [`${prefixCls}-warning`]: type === "warning",
      [`${prefixCls}-small`]: size === "small",
      [`${prefixCls}-inline`]: inline,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-icon`]: !!iconType,
    }
  );

  const childrenEls = React.Children.map(children, insertSpace);

  let iconEl;
  if (typeof iconType === "string") {
    iconEl = (
      <Icon
        aria-hidden="true"
        type={iconType}
        size={size === "small" ? "xxs" : "md"}
        className={`${prefixCls}-icon`}
      />
    );
  } else if (iconType) {
    const rawCls = iconType.props && iconType.props.className;
    const iconPrefixCls = "r-icon";
    const cls = classnames(
      iconPrefixCls,
      `${prefixCls}-icon`,
      size === "small" ? `${iconPrefixCls}-xxs` : `${iconPrefixCls}-md`,
    );

    iconEl = React.cloneElement(iconType, {
      className: rawCls ? `${rawCls} ${cls}` : cls,
    });
  }

  return (
    <TouchFeedback
      activeClassName={activeClassName || (activeStyle ? `${prefixCls}-active` : undefined)}
      disabled={disabled}
      activeStyle={activeStyle}
    >
      <a
        role="button"
        className={wrapCls}
        {...restProps}
        onClick={disabled ? undefined : onClick}
        aria-disabled={disabled}
      >
        {iconEl}
        {childrenEls}
      </a>
    </TouchFeedback>
  );
};

Button.defaultProps = {
  prefixCls: "r-button",
  size: "large",
  inline: false,
  disabled: false,
  loading: false,
  activeStyle: {},
};

export default Button;
import React, { ReactNode } from "react";
import classnames from "classnames";

// CardFooterProps interface
export interface CardFooterProps {
  prefixCls?: string;
  className?: string;
  content?: ReactNode;
  extra?: ReactNode;
};

// CardFooter FC
const CardFooter = (props: CardFooterProps) => {
  const {
    prefixCls,
    content,
    className,
    extra,
    ...restProps
  } = props;

  const wrapCls = classnames(
    `${prefixCls}-footer`,
    className
  );

  return (
    <div
      className={wrapCls}
      {...restProps}
    >
      <div className={`${prefixCls}-footer-content`}>
        {content}
      </div>
      {extra && (
        <div className={`${prefixCls}-footer-extra`}>
          {extra}
        </div>
      )}
    </div>
  );

};

CardFooter.defaultProps = {
  prefixCls: 'r-card',
};

export default CardFooter;

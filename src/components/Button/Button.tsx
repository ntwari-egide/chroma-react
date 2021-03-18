import clsx from 'clsx';
import * as React from 'react';
import { makeStyles } from '../../styles';
import { GetClasses } from '../../typeUtils';
import 'focus-visible';

export const ButtonStylesKey = 'ChromaButton';

export const useStyles = makeStyles(
  (theme) => ({
    root: {
      alignItems: 'center',
      background: theme.palette.primary.main,
      border: '0',
      borderRadius: theme.pxToRem(4),
      color: theme.palette.common.white,
      cursor: 'pointer',
      display: 'inline-flex',
      whiteSpace: 'nowrap',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.button.fontSize,
      fontWeight: theme.typography.fontWeightBold,
      justifyContent: 'center',
      letterSpacing: theme.pxToRem(0.5),
      lineHeight: 1.4,
      margin: 0,
      minHeight: theme.pxToRem(32),
      minWidth: theme.pxToRem(64),
      outline: 'none',
      paddingBottom: theme.pxToRem(8),
      paddingLeft: theme.pxToRem(11),
      paddingRight: theme.pxToRem(11),
      paddingTop: theme.pxToRem(8),
      position: 'relative',
      transition:
        'background-color 0.25s ease, color 0.25s ease, opacity 0.25s ease',
      userSelect: 'none',
      '&:hover': {
        backgroundColor: theme.palette.primary[900],
        outline: 'none',
      },
      '&:focus': {
        outline: 'none',
      },
      '&:focus.focus-visible': {
        boxShadow: theme.boxShadows.focusVisible,
      },
      '&:disabled': {
        cursor: 'default',
        pointerEvents: 'none',
        backgroundColor: theme.palette.primary.main,
        opacity: 0.44,
      },
      '&::-moz-focus-inner': {
        border: 'none',
      },
    },
    containedInverse: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main,
        opacity: 0.85,
      },
      '&:focus': {
        outline: 'none',
      },
      '&:focus.focus-visible': {
        boxShadow: theme.boxShadows.focusVisibleInverse,
      },
      '&:disabled, &[disabled]': {
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        opacity: 1,
        color: theme.palette.text.secondary,
      },
    },
    outlined: {
      backgroundColor: 'transparent',
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
      transition: 'border 0.25s ease, color 0.25s ease',
      '&:hover': {
        backgroundColor: 'transparent',
        border: `1px solid ${theme.palette.primary[900]}`,
        color: theme.palette.primary[900],
      },
      '&:disabled': {
        backgroundColor: 'transparent',
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        opacity: 0.44,
      },
    },
    outlinedInverse: {
      borderColor: theme.palette.common.white,
      color: theme.palette.common.white,
      '&:hover': {
        color: theme.palette.common.white,
        opacity: 0.85,
        borderColor: 'rgba(255, 255, 255, 0.85)',
      },
      '&:focus.focus-visible': {
        boxShadow: theme.boxShadows.focusVisibleInverse,
      },
      '&:disabled, &[disabled]': {
        color: 'rgba(255, 255, 255, 0.45)',
        opacity: 1,
        borderColor: 'rgba(255, 255, 255, 0.45)',
      },
    },
    text: {
      backgroundColor: 'transparent',
      border: 'unset',
      color: theme.palette.primary.main,
      transition: 'color 0.25s ease',
      '&:hover': {
        backgroundColor: 'transparent',
        color: theme.palette.primary[900],
      },
      '&:disabled': {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
        opacity: 0.44,
      },
    },
    textInverse: {
      color: theme.palette.common.white,
      '&:hover': {
        color: theme.palette.common.white,
        opacity: 0.85,
      },
      '&:focus': {
        outline: 'none',
      },
      '&:focus.focus-visible': {
        boxShadow: theme.boxShadows.focusVisibleInverse,
      },
      '&:disabled, &[disabled]': {
        color: theme.palette.common.white,
        opacity: 0.44,
      },
    },
    fullWidth: {
      width: '100%',
    },
    icon: {
      width: theme.spacing(2),
      height: theme.spacing(2),
      marginRight: theme.spacing(1),
    },
  }),
  { name: ButtonStylesKey }
);

export type ButtonClasses = GetClasses<typeof useStyles>;

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  color?: 'default' | 'inverse';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  variant?: 'contained' | 'outlined' | 'text';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      color = 'default',
      children,
      disabled,
      fullWidth,
      icon: Icon,
      variant = 'contained',
      ...rootProps
    },
    ref
  ) => {
    const classes = useStyles({});
    return (
      <button
        ref={ref}
        className={clsx(
          classes.root,
          {
            [classes.outlined]: variant === 'outlined',
            [classes.text]: variant === 'text',
          },
          {
            [classes.containedInverse]:
              variant === 'contained' && color === 'inverse',
            [classes.outlinedInverse]:
              variant === 'outlined' && color === 'inverse',
            [classes.textInverse]: variant === 'text' && color === 'inverse',
          },
          fullWidth && classes.fullWidth,
          className
        )}
        disabled={disabled ? true : undefined}
        tabIndex={disabled ? -1 : 0}
        type="button"
        {...rootProps}
      >
        {!!Icon && <Icon role="img" aria-hidden className={classes.icon} />}
        {children}
      </button>
    );
  }
);

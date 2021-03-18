import clsx from 'clsx';
import * as React from 'react';
import { makeStyles } from '../../styles';
import { GetClasses } from '../../typeUtils';
import {
  BaseFormElement,
  buildDescribedBy,
  errorFor,
  FormErrorMessage,
  FormHelpMessage,
  helpFor,
} from '../_private/forms';
import { generateUniqueId } from '../_private/UniqueId';
import { Tooltip } from '../Tooltip';

export const TextFieldStylesKey = 'ChromaTextField';

export const useStyles = makeStyles(
  (theme) => ({
    root: {},
    label: {
      alignItems: 'center',
      color: theme.palette.black[800],
      display: 'flex',
      fontSize: theme.pxToRem(14),
      fontWeight: theme.typography.fontWeightBold,
      marginBottom: theme.spacing(1),
      '&:empty': {
        marginBottom: theme.spacing(0),
      },
    },
    labelIcon: {
      marginLeft: theme.spacing(0.75),
      color: theme.palette.primary.main,
    },
    labelIconInverse: {
      mixBlendMode: 'screen',
    },
    labelSecondary: {
      color: theme.palette.text.hint,
      fontSize: theme.pxToRem(11),
      display: 'inline-block',
      margin: theme.spacing(0, 0.75),
    },
    labelInverse: {
      color: theme.palette.common.white,
      '&$labelSecondary': {
        opacity: 0.9,
      },
    },
    input: {
      backgroundColor: 'rgba(132, 137, 166, 0.15)',
      border: `1px solid transparent`,
      borderRadius: theme.pxToRem(4),
      color: theme.palette.text.primary,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.pxToRem(14),
      minWidth: theme.pxToRem(175),
      lineHeight: 1.25,
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(1.25),
      paddingRight: theme.spacing(1.25),
      paddingTop: theme.spacing(1),
      transition: 'border 0.25s ease',
      '&:focus': {
        outline: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        border: `1px solid rgba(132, 137, 166, 0.45)`,
      },
      '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.625,
      },
      '&:read-only': {
        cursor: 'not-allowed',
        opacity: 0.9,
        '&:focus': {
          backgroundColor: 'rgba(132, 137, 166, 0.15)',
          border: `1px solid transparent`,
        }
      },
      '&::-webkit-input-placeholder': {
        color: theme.palette.black[400],
      },
      '&::-moz-placeholder': {
        color: theme.palette.black[400],
      },
      '&:-ms-input-placeholder': {
        color: theme.palette.black[400],
      },
      '&:-moz-placeholder': {
        color: theme.palette.black[400],
      },
    },
    inputInverse: {
      backgroundColor: 'rgba(230, 231, 237, 0.1)',
      color: theme.palette.common.white,
      '&:focus': {
        backgroundColor: 'rgba(230, 231, 237, 0.1)',
        border: `1px solid rgba(230, 231, 237, 0.55)`,
      },
      '&:read-only': {
        opacity: 1,
        '&:focus': {
          backgroundColor: 'rgba(230, 231, 237, 0.1)',
        }
      },
      '&::-webkit-input-placeholder': {
        color: 'rgba(255, 255, 255, 0.8)',
      },
      '&::-moz-placeholder': {
        color: 'rgba(255, 255, 255, 0.8)',
      },
      '&:-ms-input-placeholder': {
        color: 'rgba(255, 255, 255, 0.8)',
      },
      '&:-moz-placeholder': {
        color: 'rgba(255, 255, 255, 0.8)',
      },
    },
    hasTrailer: {
      marginBottom: theme.spacing(0.5),
    },
    inputError: {
      backgroundColor: 'rgba(230, 231, 237, 0.1)',
      border: `1px solid ${theme.palette.error.main}`,
      '&:focus': {
        border: `1px solid ${theme.palette.error.main}`,
      },
    },
    inputErrorInverse: {
      border: `1px solid ${theme.palette.error[700]}`,
    },
    inputFullWidth: {
      width: '100%',
    },
    trailerMessage: {
      marginTop: theme.spacing(0.875),
      marginLeft: 0,
    },
    errorMessage: {
      color: theme.palette.error.main,
      fontSize: theme.typography.caption.fontSize,
      fontWeight: theme.typography.fontWeightBold,
    },
    errorMessageInverse: {
      mixBlendMode: 'color-dodge',
    },
    helpMessage: {
      fontSize: theme.typography.caption.fontSize,
      color: theme.palette.text.hint,
    },
    helpMessageInverse: {
      color: theme.palette.common.white,
    },
    tooltipContainer: {
      display: 'flex',
      outline: 'none',
    },
  }),
  { name: TextFieldStylesKey }
);

export type TextFieldClasses = GetClasses<typeof useStyles>;

export interface TextFieldProps
  extends React.ComponentPropsWithoutRef<'input'> {
  color?: BaseFormElement['color'];
  errorMessage?: BaseFormElement['errorMessage'];
  fullWidth?: boolean;
  hasError?: BaseFormElement['hasError'];
  helpMessage?: BaseFormElement['helpMessage'];
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label?: BaseFormElement['label'];
  secondaryLabel?: string;
  tooltipMessage?: string;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      ['aria-label']: ariaLabel,
      className,
      color = 'default',
      errorMessage,
      fullWidth,
      hasError,
      helpMessage,
      icon: Icon,
      id,
      label,
      name,
      secondaryLabel,
      tooltipMessage,
      ...rootProps
    },
    ref
  ) => {
    const classes = useStyles({});

    const [uniqueId] = React.useState<string>(
      () => id || name || generateUniqueId('textField-')
    );

    if (!label && !ariaLabel && process.env.NODE_ENV === 'development') {
      throw new Error(
        'If a "label" is not provided to TextField, please provide "aria-label".'
      );
    }

    return (
      <div className={clsx(classes.root, className)}>
        {label && (
          <label
            className={clsx(
              classes.label,
              color === 'inverse' && classes.labelInverse
            )}
            htmlFor={uniqueId}
          >
            {label}
            {!!Icon && tooltipMessage && (
              <Tooltip title={tooltipMessage}>
                <span className={classes.tooltipContainer}>
                  <Icon
                    className={clsx(
                      classes.labelIcon,
                      color === 'inverse' && classes.labelIconInverse
                    )}
                    width={16}
                    height={16}
                    role="img"
                    aria-hidden
                  />
                </span>
              </Tooltip>
            )}
            {secondaryLabel && (
              <span
                className={clsx(
                  classes.labelSecondary,
                  color === 'inverse' && classes.labelInverse
                )}
              >
                {secondaryLabel}
              </span>
            )}
          </label>
        )}
        <input
          aria-describedby={buildDescribedBy({
            hasError,
            hasHelpMessage: !!helpMessage,
            uniqueId,
          })}
          aria-label={ariaLabel}
          ref={ref}
          className={clsx(
            classes.input,
            fullWidth && classes.inputFullWidth,
            hasError && classes.inputError,
            hasError && color === 'inverse' && classes.inputErrorInverse,
            {
              [classes.inputInverse]: color === 'inverse',
            }
          )}
          type="text"
          id={uniqueId}
          name={name}
          {...rootProps}
        />
        {helpMessage && (
          <FormHelpMessage
            color={color}
            className={clsx(
              classes.trailerMessage,
              classes.helpMessage,
              color === 'inverse' && classes.helpMessageInverse
            )}
            rootElementId={uniqueId}
            describedById={helpFor(uniqueId)}
          >
            {helpMessage}
          </FormHelpMessage>
        )}
        {hasError && errorMessage && (
          <FormErrorMessage
            color={color}
            className={clsx(classes.trailerMessage)}
            rootElementId={uniqueId}
            describedById={errorFor(uniqueId)}
          >
            {errorMessage}
          </FormErrorMessage>
        )}
      </div>
    );
  }
);

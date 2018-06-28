export const MAX_LENGTH_NAMES = 24;
export const MAX_LENGTH_DESCRIPTIONS = 128;

const maxLengthIs = __('Maximum length is %s characters.');
const requiredMaxLengthIs = __('Required. Maximum length is %s characters.');
const youHaveReachedMax = __(
  'You have reached the maximum length of %s characters.'
);

export const validation = {
  name: {
    help: sprintf(maxLengthIs, MAX_LENGTH_NAMES),
    requiredMessage: sprintf(requiredMaxLengthIs, MAX_LENGTH_NAMES),
    maxLength: MAX_LENGTH_NAMES,
    maxLengthWarning: sprintf(youHaveReachedMax, MAX_LENGTH_NAMES)
  },
  description: {
    help: sprintf(maxLengthIs, MAX_LENGTH_DESCRIPTIONS),
    maxLength: MAX_LENGTH_DESCRIPTIONS,
    maxLengthWarning: sprintf(youHaveReachedMax, MAX_LENGTH_DESCRIPTIONS)
  }
};

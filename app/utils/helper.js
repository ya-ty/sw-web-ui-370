/* eslint-disable import/prefer-default-export */

export const formatTime = time => {
  if (time > 12) {
    return `${time - 12} PM`;
  }
  return `${time} AM`;
};

export function Checkpassword(password) {
  if (!password.match(/^[a-zA-Z0-9@#$%^&*?()]{8,22}$/)) {
    if (
      !password.match(/^[a-zA-Z0-9@#$%^&*?()]+$/) &&
      (password.length < 8 || password.length > 22)
    ) {
      return [
        false,
        "Password must be only numbers, letters or @ # $ % ^ & * ? between 8-22 characters long",
      ];
    } else if (!password.match(/^[a-zA-Z0-9@#$%^&*?()]+$/)) {
      return [false, "Only numbers, letters or @ # $ % ^ & * ?) ( "];
    } else {
      return [false, "Password must be 8-22 characters long"];
    }
  } else {
    return [true, ""];
  }
}

export function Checkusername(username) {
  if (!username.match(/^[a-zA-Z0-9]{0,10}$/)) {
    if (!username.match(/^[a-zA-Z0-9]+$/) && username.length > 10) {
      return [
        false,
        "User name must be only letters and numbers and maximum 10 characters long!",
      ];
    } else if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return [false, "User name must be only letters and numbers!"];
    } else {
      return [false, "User name must only be maximum 10 characters long!"];
    }
  } else {
    return [true, ""];
  }
}

const API_DOMAIN = process.env.API_DOMAIN;
const API_PORT = process.env.API_PORT;

const passwordReset = async (emailId) => {
  return await fetch(
    `http://${API_DOMAIN}:${API_PORT}/api/auth/requestPasswordReset`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailId }),
    }
  );
};

const updatePassword = async (resetToken, newPassword, userId) => {
  return await fetch(
    `http://${API_DOMAIN}:${API_PORT}/api/auth/resetAccountPassword`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        passwordResetToken: resetToken,
        newPassword: newPassword,
        userId: userId,
      }),
    }
  );
};

const login = async (emailId, password) => {
  return await fetch(`http://${API_DOMAIN}:${API_PORT}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: emailId,
      password: password,
    }),
  });
};

const signUp = async (username, emailId, password) => {
  return await fetch(`http://${API_DOMAIN}:${API_PORT}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      email: emailId,
      password: password,
    }),
  });
};

const resendVerificationEmail = async (userId) => {
  return await fetch(
    `http://${API_DOMAIN}:${API_PORT}/api/auth/resendVerificationEmail`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
      }),
    }
  );
};

const verifyAccountEmail = async (token, userId) => {
  return await fetch(
    `http://${API_DOMAIN}:${API_PORT}/api/auth/verifyAccountEmail`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        verifyAccountEmailToken: token,
        userId: userId,
      }),
    }
  );
};

export {
  passwordReset,
  updatePassword,
  login,
  signUp,
  resendVerificationEmail,
  verifyAccountEmail,
};

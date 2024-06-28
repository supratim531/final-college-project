/* ===== Action Constants ===== */

export const loginConstant = "auth/login";
export const logoutConstant = "auth/logout";
export const updateStatusConstant = "auth/updateStatus";

/* ===== Action Constants ===== */

/* ===== Action Creators ===== */

export const login = (payload) => ({
  type: loginConstant,
  payload,
});

export const logout = () => ({
  type: logoutConstant,
});

export const updateStatus = (status) => ({
  type: updateStatusConstant,
  status,
});

/* ===== Action Creators ===== */

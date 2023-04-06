import cookie from "js-cookie";
import Router from "next/router";

// Set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: "/",
      sameSite: "strict",
      secure: true,
    });
  }
};

// Remove cookie
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
      path: "/",
    });
  }
};

// Get cookie
export const getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

const getCookieFromBrowser = (key) => {
  return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookies = req.headers.cookie.split(";");
  const parsedCookies = {};
  rawCookies.forEach((rawCookie) => {
    const parsedCookie = rawCookie.split("=");
    parsedCookies[parsedCookie[0].trim()] = parsedCookie[1].trim();
  });
  return parsedCookies[key];
};

// Set user info in localStorage
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Remove user info from localStorage
export const removeUser = () => {
  localStorage.removeItem("user");
};

// Authenticate user
export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setUser(data.user);
  next();
};

// Login user
export const login = async (userCredentials) => {
    try {
      const response = await apiClient.post('/auth/login', userCredentials);
      authenticate(response.data, () => {
        Router.push('/');
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
// Sign out user
export const logout = (next) => {
  removeCookie("token");
  removeUser();
  next();
  Router.push("/signin");
};

// Get user info from localStorage
export const getUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  } else {
    return undefined;
  }
};

// Check if user is authenticated
export const isAuth = () => {
  const cookieChecked = getCookie("token");
  if (cookieChecked) {
    const user = getUser();
    if (user) {
      return user;
    } else {
      return false;
    }
  }
};

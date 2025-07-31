import { useSharedStore } from "@bytebank-web/store";
import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME } from "./contants.js";

export const setToken = (token: string, name: string, email: string) => {
    const { setEmail, setName } = useSharedStore();
    
   if (token && name) {
     document.cookie = `${AUTH_COOKIE_NAME}=${token}; path=/; max-age=${AUTH_COOKIE_MAX_AGE}`;
     setEmail(email);
     setName(name);
     window.location.assign("/dashboard");
   } else {
     console.error("Token está ausente na resposta.");
   }
};

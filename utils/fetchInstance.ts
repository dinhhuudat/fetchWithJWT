import jwtDecode from "jwt-decode";

interface IToken {
  exp: number;
  iat: number;
  user_id: number;
  user_name: string;
}

const validateAndRefreshToken =async () => {
 const local = localStorage.getItem("token");
  const { token, refreshToken } = !!local && JSON.parse(local);

  let currentDate = new Date();

  const decoded = jwtDecode<IToken>(token); 

  if (decoded.exp * 1000 < currentDate.getTime()) {
    console.log("Token expired.");
    const res=await fetch("http://localhost:5000/getToken")
    const data = await res.json()
    console.log("Token expired have token ", data.token);

    return data.token
  } else {
    return token
  }
};

const getHeaderOptions =async () => {
  const newToken =await validateAndRefreshToken();
    console.log("newToken",newToken)
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${newToken}`
  };
  return headers;
};

export const fetchInstance =async (endpoint: any,  options?: any) => {
  const BASE_URL = "http://localhost:5000" + endpoint;
  const getheaderOptions =await getHeaderOptions()
  console.log("getheaderOptions",getheaderOptions)
  const res = fetch(BASE_URL, {headers:getheaderOptions,...options}).then(res=>res.json());
  return res
};

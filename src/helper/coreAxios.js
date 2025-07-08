import axios from "axios";
import { getCookie } from "cookies-next";
import { toast } from "sonner";

const base_url = process.env.NEXT_PUBLIC_API_URL;
const general_hash = process.env.NEXT_PUBLIC_GENERAl_HASH;
const token = getCookie("WEEVPN_TOKEN");
const locale = getCookie("NEXT_LOCALE");

const POST = async (url, data, errorMessage) => {
  try {
    const response = await axios.post(
      `${base_url}${url}`,
      { ...data, language: locale, hash: general_hash },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(errorMessage);
  }
};

export default {
  POST,
};

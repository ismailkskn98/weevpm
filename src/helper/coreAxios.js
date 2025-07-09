import axios from "axios";
import { getCookie } from "cookies-next";
import { toast } from "sonner";

const base_url = process.env.NEXT_PUBLIC_API_URL;
const general_hash = process.env.NEXT_PUBLIC_GENERAl_HASH;

// Logout fonksiyonunu parametre olarak al (hook'ları component dışında kullanamazsın!)
const POST = async (url, data, errorMessage, logoutFunction = null) => {
  const locale = getCookie("NEXT_LOCALE");
  const token = getCookie("WEEVPN_TOKEN");

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

    if (response.data.status == false && (response.data.message == "NO_TOKEN" || response.data.message == "INVALID_TOKEN")) {
      if (logoutFunction) {
        logoutFunction();
      }
    }

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || errorMessage || "Bir hata oluştu";
    toast.error(message);
    throw error;
  }
};

export default {
  POST,
};

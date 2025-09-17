import axios, { AxiosResponse } from "axios";

export const API_BASE_URL = "https://blockchain.info";

export interface AddressData {
  address: string;
  final_balance: number;
  total_received: number;
  total_sent: number;
  n_tx: number;
  txs: any[];
  hash160: string;
}

export const fetchAddressData = async (
  address: string,
  limit = 10,
  offset = 0
): Promise<AddressData> => {
  try {
    const res: AxiosResponse<AddressData> = await axios.get(
      `${API_BASE_URL}/rawaddr/${address}`,
      { params: { limit, offset } }
    );
    return res.data;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 429) {
        throw new Error("RATE_LIMIT_EXCEEDED");
      }
      if (err.code === "ERR_NETWORK") {
        throw new Error("NETWORK_ERROR");
      }
    }
    throw err;
  }
};

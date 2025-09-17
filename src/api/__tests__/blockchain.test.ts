import axios from "axios";
import { fetchAddressData, API_BASE_URL, AddressData } from "../blockchain";
import {
  convertSatsToBtc,
  formatNumber,
  shortenAddress,
} from "../../utils/utils";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Blockchain utilities", () => {
  const mockAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
  const mockData: AddressData = {
    address: mockAddress,
    final_balance: 100000,
    total_received: 150000,
    total_sent: 50000,
    n_tx: 2,
    txs: [],
    hash160: "dummyhash160",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchAddressData", () => {
    it("should fetch address data successfully", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const data = await fetchAddressData(mockAddress, 10, 0);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${API_BASE_URL}/rawaddr/${mockAddress}`,
        { params: { limit: 10, offset: 0 } }
      );
      expect(data).toEqual(mockData);
    });

    it("should throw RATE_LIMIT_EXCEEDED error on 429", async () => {
      mockedAxios.get.mockRejectedValueOnce({
        response: { status: 429 },
        isAxiosError: true,
      });

      await expect(fetchAddressData(mockAddress)).rejects.toThrow(
        "RATE_LIMIT_EXCEEDED"
      );
    });

    it("should throw NETWORK_ERROR on network failure", async () => {
      mockedAxios.get.mockRejectedValueOnce({
        code: "ERR_NETWORK",
        isAxiosError: true,
      });

      await expect(fetchAddressData(mockAddress)).rejects.toThrow(
        "NETWORK_ERROR"
      );
    });

    it("should throw other errors as-is", async () => {
      const customError = new Error("Some other error");
      mockedAxios.get.mockRejectedValueOnce(customError);

      await expect(fetchAddressData(mockAddress)).rejects.toThrow(customError);
    });
  });

  describe("convertSatsToBtc", () => {
    it("should convert satoshis to BTC", () => {
      expect(convertSatsToBtc(100000000)).toBe(1);
      expect(convertSatsToBtc(50000000)).toBe(0.5);
    });
  });

  describe("formatNumber", () => {
    it("should format number with commas", () => {
      expect(formatNumber(1000)).toBe("1,000");
      expect(formatNumber(123456789)).toBe("123,456,789");
    });
  });

  describe("shortenAddress", () => {
    it("should shorten address by default", () => {
      const addr = "1234567890abcdef";
      expect(shortenAddress(addr)).toBe("123456...cdef");
    });

    it("should not shorten short addresses", () => {
      const addr = "12345";
      expect(shortenAddress(addr)).toBe("12345");
    });

    it("should shorten with custom chars", () => {
      const addr = "1234567890abcdef";
      expect(shortenAddress(addr, 3)).toBe("123...def");
    });
  });
});

import axios from "axios";
import {
  fetchAddressData,
  satoshisToBtc,
  formatNumber,
  shortenAddress,
} from "../blockchain";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Blockchain API", () => {
  const mockAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
  const mockTxHash =
    "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b";
});

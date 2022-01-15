import Web3 from "web3";
import { companionAbi, companionAddress } from "../components/contract";

export const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_ENDPOINT));

export const companionContract = new web3.eth.Contract(companionAbi, companionAddress);

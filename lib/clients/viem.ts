import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import getViemNetwork from "../utils/getViemNetwork";

const providerEndpoint = process.env.NEXT_PUBLIC_PROVIDER_ENDPOINT || "";

export const getPublicClient = (chainId: number) => {
  const chain = getViemNetwork(chainId)
  const publicClient = createPublicClient({
    chain: chain,
    transport: http(),
  });
  return publicClient
}

export const publicClient = getPublicClient(1);

const transport = http(providerEndpoint);

export const rpcClient = createPublicClient({
  chain: polygon,
  transport,
});



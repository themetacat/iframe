import * as Sentry from "@sentry/nextjs";
import { getPublicClient } from "@/lib/clients/viem";
import { implementationAbi, tokenboundAbi } from "@/lib/abi";
import { implementationAddress, salt, tokenboundAddress } from "@/lib/constants";

interface GetAccountStatus {
  data?: boolean;
  error?: string;
}

export async function getAccountStatus(
  chainId: number,
  account: string
): Promise<GetAccountStatus> {
  try {
    const publicClient = getPublicClient(chainId);
    const response = (await publicClient.readContract({
      address: account as `0x${string}`,
      abi: implementationAbi,
      functionName: "isLocked",
    })) as boolean;

    return { data: response };
  } catch (error) {
    console.error(error);
    Sentry.captureMessage(`getAccountStatus error`, {
      tags: {
        reason: "isLocked",
      },
      extra: {
        prepareError: error,
        account,
      },
    });

    return {
      error: `failed getting account status for account: ${account}. It may not exist yet.`,
    };
  }
}

interface GetAccount {
  data?: string;
  error?: string;
}

export async function getAccount(
  tokenId: number,
  contractAddress: string,
  chainId: number
): Promise<GetAccount> {
  try {
    const publicClient = getPublicClient(chainId);
    const response = (await publicClient.readContract({
      address: tokenboundAddress as `0x${string}`,
      abi: tokenboundAbi,
      functionName: "account",
      args: [implementationAddress, String(chainId), contractAddress, tokenId, salt],
    })) as string;
console.log(response,98754);

    return { data: response };
  } catch (err) {
    console.error(err);
    Sentry.captureMessage(`getAccount error`, {
      tags: {
        reason: "account",
      },
      extra: {
        prepareError: err,
        tokenId,
      },
    });

    return { error: `failed getting account for token $id: {tokenId}` };
  }
}

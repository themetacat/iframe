"use client";
/* eslint-disable @next/next/no-img-element */
import React,{ useEffect, useState } from "react";
import useSWR from "swr";
import { isNil } from "lodash";
import cn from "classnames";
import style from "./index.module.css";
import { getAccount, getAccountStatus, getLensNfts, getNfts } from "@/lib/utils";
import { createWalletClient, http, custom, WalletClient, Account } from "viem";
import { polygon } from "viem/chains";
import { rpcClient } from "@/lib/clients";
import { TbLogo } from "@/components/icon";
import { useGetApprovals, useNft } from "@/lib/hooks";
import { TbaOwnedNft } from "@/lib/types";
import { getAddress } from "viem";
import { TokenDetail } from "./TokenDetail";
import { useRouter ,useParams} from 'next/navigation';
import { HAS_CUSTOM_IMPLEMENTATION } from "@/lib/constants";
import VoxFiled from '../vox'
import DclContent from '../dcl'
import { TokenboundClient } from "@tokenbound/sdk";
import Web3 from "web3";
import {
  getBagsDetail,
  getBagsNum,
  rmBabylonModel,
} from "../../../../service";

interface TokenParams {
  params: {
    tokenId: string;
    contractAddress: string;
    chainId: string;
  };
  searchParams: {
    apiEndpoint: string;
  };
}

export default function Token({ params, searchParams }: TokenParams) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [nfts, setNfts] = useState<TbaOwnedNft[]>([]);
  const [lensNfts, setLensNfts] = useState<TbaOwnedNft[]>([]);
  const { tokenId, contractAddress, chainId } = params;
  const [showTokenDetail, setShowTokenDetail] = useState(false);
  const chainIdNumber = parseInt(chainId);
  const router = useParams();
  const userouter = useRouter();


  const [tokenboundAccountNum, setTokenboundAccountNum] = useState("");
  const [title, setTitle] = useState("");
  const [wearableType, setwearableType] = useState(null as any);
  const [getCode, setGetCode] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [editNum, setEditNum] = useState("WalletConnect URI");
  const [dataInfoList, setDataInfoList] = React.useState([] || null);
  const [dataInfo, setDataInfo] = React.useState([] || null);



  const {
    data: nftImages,
    nftMetadata,
    loading: nftMetadataLoading,
  } = useNft({
    tokenId: parseInt(tokenId as string),
    contractAddress: params.contractAddress as `0x${string}`,
    hasCustomImplementation: HAS_CUSTOM_IMPLEMENTATION,
    chainId: chainIdNumber,
  });


  

  useEffect(() => {
    if (!isNil(nftImages) && nftImages.length) {
      const imagePromises = nftImages.map((src: string) => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          
          image.onload = resolve;
          image.onerror = reject;
          image.src = src;
        });
      });

      Promise.all(imagePromises)
        .then(() => {
          setImagesLoaded(true);
        })
        .catch((error) => {
          console.error("Error loading images:", error);
        });
    }
  }, [nftImages]);

  // Fetch nft's TBA
  const { data: account } = useSWR(router?.tokenId ? `/account/${tokenId}` : null, async () => {
    
    const result = await getAccount(Number(router?.tokenId), '0x2d25602551487c3f3354dd80d76d54383a243358','0',router?.contractAddress as any, chainIdNumber);
   
    console.log(getAccount(tokenId,'0x2d25602551487c3f3354dd80d76d54383a243358','0','0x7524194dfcf68820006891d5d5810065f233a0b8',137));
    console.log(router?.tokenId,router?.contractAddress,chainIdNumber);
    
    return result.data;
  });

  // Get nft's TBA account bytecode to check if account is deployed or not
  const { data: accountBytecode } = useSWR(
    account ? `/account/${account}/bytecode` : null,
    
    async () => rpcClient.getBytecode({ address: account as `0x${string}` 
  })


  );

  const accountIsDeployed = accountBytecode && accountBytecode?.length > 2;

  const { data: isLocked } = useSWR(account ? `/account/${account}/locked` : null, async () => {
    if (!accountIsDeployed) {
      return false;
    }

    const { data, error } = await getAccountStatus(chainIdNumber, account!);

    return data ?? false;
  });

  // fetch nfts inside TBA
  useEffect(() => {
    async function fetchNfts(account: string) {
      console.log(account,'有沒有!!!!!222222')
      const [data, lensData] = await Promise.all([
        getNfts(chainIdNumber, account),
        getLensNfts(account),
      ]);
      if (data) {
        setNfts(data);
      }
      if (lensData) {
        setLensNfts(lensData);
      }
    }

    if (account) {
      fetchNfts(account);
    }
  }, [account, accountBytecode, chainIdNumber]);



 
  const [tokens, setTokens] = useState<TbaOwnedNft[]>([]);
  const allNfts = [...nfts, ...lensNfts];

  const { data: approvalData } = useGetApprovals(allNfts, account, chainIdNumber);

  useEffect(() => {
    if (nfts !== undefined && nfts.length) {
      nfts.map((token) => {
        const foundApproval = approvalData?.find((item) => {
          const contract = item.contract.address;
          const tokenId = item.tokenId;
          const hasApprovals = item.hasApprovals;
          const matchedAddress = getAddress(contract) === getAddress(token.contract.address);
          const matchedTokenId = String(tokenId) && String(token.tokenId);
          if (matchedAddress && matchedTokenId && hasApprovals) {
            return true;
          }
        });
        token.hasApprovals = foundApproval?.hasApprovals || false;
      });
      setTokens(nfts);
      if (lensNfts) {
        setTokens([...nfts, ...lensNfts]);
      }
    }
  }, [nfts, approvalData, lensNfts]);


const handleMint = React.useCallback(() => {
  const getData = async () => {
    try {
      console.log(account,5568588);
    
      const response = await getBagsDetail(account); // 假设 getBagsDetail 是一个异步函数
      // let wearableType =null;
      // // console.log(tokenboundAccountNum, 333);
      setDataInfo(response.ownedNfts);
      if (response.ownedNfts.length !== 0) {
        //         }else{
        response.ownedNfts.map((item:any) => {
          // setwearableType(item.tokenUri.raw);
          if (wearableType === null) {
            
            if (item.tokenUri.raw.includes("https://www.cryptovoxels.com")) {
              // wearableType='voxels'
              setwearableType("Voxels");
            } else if (
              item.tokenUri.raw.includes("https://peer.decentraland.org")
            ) {
              setwearableType("Decentraland");
            } else {
              setwearableType("Other");
            }
            // // console.log(wearableType,222);
          } else {
            // // console.log(2333333);

            if (item.tokenUri.raw.includes("https://www.cryptovoxels.com")) {
              
              if (wearableType !== "Voxels") {
                // wearableType='Other'
                setwearableType("Other");
                
                return;
              }
              
            } else if (
              item.tokenUri.raw.includes("https://peer.decentraland.org")
            ) {
              if (wearableType !== "Decentraland") {
                setwearableType("Other");
                return;
              }

            // } else {
            //   if (wearableType !== "Other") {
            //     return;
            //   }
            }
          }
        });


      // } else {
      //   setDataInfoList(null);
      }

      
      // // console.log(dataInfo, 666);
    } catch (error) {
      // console.error(error);
    }
  };

  getData();
}, [wearableType,account]);

const handleBag = React.useCallback(() => {
  const getData = async () => {
    // // console.log(router.query.tokenId);

    try {
      const response = await getBagsNum(router?.tokenId); // 假设 getBagsDetail 是一个异步函数
      const wearableTypeEach = response.tokenUri.raw;
      // // console.log(wearableTypeEach,666);
      // const substring = wearableTypeEach.substring(0, 28);
      // setwearableType(response.tokenUri.raw);
      // // console.log(substring,3333);

      setTitle(response.title);
      // // console.log(response, 'response');
    } catch (error) {
      // console.error(error);
    }
  };

  getData();
}, []);

useEffect(() => {

  if (router?.contractAddress && router?.tokenId) {
    // 确保参数都存在并是字符串
    const contractAddress = String(router?.contractAddress);
    const tokenId = String(router?.tokenId);

    // 使用模板字符串将参数连接起来
    userouter?.replace(`/${contractAddress}/${tokenId}/${chainIdNumber}`);
  }
  if (router) {
    handleMint();
    handleBag();
  }
}, [account, handleMint,handleBag,dataInfoList, wearableType]);

// useEffect(() => {
//   if (router.query) {
//     handleMint();
//     handleBag();
//   }
// }, [router.query, tokenboundAccountNum, handleMint,handleBag,dataInfoList, wearableType]);

const jumpToOpenC = (item:any) => {
  // // console.log(item,'w22');
  const idToken = item.id.tokenId;
  // // console.log(idToken);
  const decimalValue = parseInt(idToken, 16);
  // // console.log(decimalValue,556);
  // window.open(`https://opensea.io/assets/matic/${wearableType}/${decimalValue}`)
  window.open(
    `https://opensea.io/assets/matic/${item.contract.address}/${decimalValue}`
  );
};


  return (
    <div className="">
      <div className="max-w-screen relative mx-auto aspect-square max-h-screen overflow-hidden bg-white">
        <div className="relative h-full w-full">
        {wearableType==='Voxels'? (
          <div style={{ marginTop: "20px" }}>
            <VoxFiled />
          </div>
        ) : null}
        {wearableType==='Decentraland' ? (
          <div style={{ marginTop: "20px" }}>
            <DclContent />
          </div>
        ) : null}
         {wearableType==='Other'||wearableType===null? (
          <>
        <div
                className={cn(
                  "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5",
                  style.dataSourceCard
                )}
                id="eventData"
              >
                {dataInfoList === null ? (
                  <>
                    <p className={style.nothingInfo}>
                      You don&apos;t have any wearable in this bag.
                    </p>
                  </>
                ) : (
                  <>
                    {dataInfo.map((item:any) => {
                      return (
                        <div className={style.boxContent} key={item.id}>
                          <img src={item.metadata.image} alt="" />
                          <img
                            alt="" 
                            src="/images/Nomal.png"
                            className={style.icon}
                            onClick={() => {
                              jumpToOpenC(item);
                            }}
                          ></img>
                          <div className={style.worldCon}>
                            {item.tokenUri.raw.includes(
                              "https://www.cryptovoxels.com"
                            ) ? (
                              <>Voxels</>
                            ) : null}
                            {item.tokenUri.raw.includes(
                              "https://peer.decentraland.org"
                            ) ? (
                              <>Decentraland</>
                            ) : null}
                            {item.tokenUri.raw.includes(
                              "https://contracts.sandbox.game"
                            ) ? (
                              <>The Sandbox</>
                            ) : null}
                            {!(
                              item.tokenUri.raw.includes(
                                "https://www.cryptovoxels.com"
                              ) ||
                              item.tokenUri.raw.includes(
                                "https://peer.decentraland.org"
                              ) ||
                              item.tokenUri.raw.includes(
                                "https://contracts.sandbox.game"
                              )
                            ) ? (
                              <>Other</>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className={style.textCon}>
                            <p className={style.idP1}>{item.metadata.name}</p>
                            <p className={style.idP2}>
                              {item.metadata.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
              </>   ):<></>}
          {/* {account && nftImages && nftMetadata && (
            <TokenDetail
              isOpen={showTokenDetail}
              handleOpenClose={setShowTokenDetail}
              approvalTokensCount={approvalData?.filter((item) => item.hasApprovals).length}
              account={account}
              tokens={tokens}
              title={nftMetadata.title}
              chainId={chainIdNumber}
            />
          )} */}
          {/* <div className="max-h-1080[px] relative h-full w-full max-w-[1080px]">
            {nftMetadataLoading ? (
              <div className="absolute left-[45%] top-[50%] z-10 h-20 w-20 -translate-x-[50%] -translate-y-[50%] animate-bounce">
                <TbLogo />
              </div>
            ) : (
             
              <div
                className={`grid w-full grid-cols-1 grid-rows-1 transition ${
                  imagesLoaded ? "" : "blur-xl"
                }`}
              >
                {!isNil(nftImages) ? (
                  nftImages.map((image, i) => (
                    <img
                      key={i}
                      className="col-span-1 col-start-1 row-span-1 row-start-1 translate-x-0"
                      src={image}
                      alt="Nft image"
                    />
                  ))
                ) : (
                  <></>
                )}
           
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}

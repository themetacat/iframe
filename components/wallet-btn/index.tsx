import React, { useCallback, useEffect, useState } from "react";
import cn from "classnames";
import { toast } from "react-hot-toast";
import "tailwindcss/tailwind.css";
import Status from "../status";
import { Web3AuthCore } from "@web3auth/core";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnect from "@walletconnect/client";
import NodeWalletConnect from "@walletconnect/node";
import MintConcent from "./mintContent";
import Page from "../page";
import {
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import Rekv from "rekv";
import Link from "next/link";

import { TorusWalletAdapter } from "@web3auth/torus-evm-adapter";

import Router, { useRouter } from "next/router";

import RPC from "../web3RPC";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

import { useWalletProvider } from "../web3modal";

import {
  getNonce,
  loginSignature,
  getBaseInfo,
  getCVEventList,
} from "../../service";

import { convert, getToken, removeToken, setToken } from "../../common/utils";
import { SITE_NAME, META_DESCRIPTION } from "../../common/const";
import style from "./index.module.css";
import Web3 from "web3";

type Props = {
  name?: string;
  address?: string;
  onClickHandler?: () => void;
};

interface IProfileData {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  profile: {
    nickName: string;
    address: string;
    avatar: string;
  };
}

const INITIAL_STATE: IProfileData = {
  accessToken: null,
  idToken: null,
  refreshToken: null,
  profile: {
    nickName: null,
    address: null,
    avatar: null,
  },
};
const MENU = [
  // {
  //   label: "Setting",
  //   icon: "/images/v5/Settings.png",
  //   value: "/profile/setting",
  //   type: "operation",
  // },
  // {
  //   label: "My Parcels",
  //   icon: "/images/v5/MyParcels.png",
  //   value: "/profile?type=parcellist",
  //   type: "operation",
  // },
  // {
  //   label: "My Wearables",
  //   icon: "/images/icon/wearables.png",
  //   value: "/profile?type=wearablelist",
  //   type: "operation",
  // },
  // {
  //   label: "My Buildings",
  //   icon: "/images/icon/buildingIcon.png",
  //   value: "/profile?type=building",
  //   type: "operation",
  // },
  {
    label: "Disconnect",
    icon: "/images/v5/Signout.png",
    value: "resetApp",
    type: "operation",
  },
  // {
  //   label: "Mint",
  //   icon: "/images/PicLogo.jpg",
  //   value: "mintConnevt",
  //   type: "mint",
  // },
];

const WALLET = [
  {
    label: "MetaMask",
    icon: "/images/v5/Maskgroup.png",
    value: "metamask",
    type: "walletMetaMask",
  },
  // {
  //   label: "Wallet Connect",
  //   icon: "/images/walletconnect.png",
  //   value: "walletconnect",
  //   type: "wallet",
  // },
  // {
  //   label: "Others(Meta,Twitter...)",
  //   icon: "/images/v5/login.jpg",
  //   value: "loginConnevt",
  //   type: "login",
  // },
  // {
  //   label: "Mint",
  //   icon: "/images/PicLogo.jpg",
  //   value: "mintConnevt",
  //   type: "mint",
  // },
];

export const state = new Rekv<IProfileData>(INITIAL_STATE);
const meta = {
  title: ` ${SITE_NAME}`,
  description: META_DESCRIPTION,
};
export default function WalletBtn({ name, address, onClickHandler }: Props) {
  const [showMenu, setShowMenu] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const profileData = state.useState(
    "accessToken",
    "idToken",
    "refreshToken",
    "profile"
  );
  const { accessToken, idToken, refreshToken, profile } = profileData;
  const [showModal, setShowModal] = useState(false);
  const [showWall, setShowWall] = React.useState(null);
  const [providerWeb3auth, setProviderWeb3auth] =
    useState<SafeEventEmitterProvider | null>(null);
  const [ethBalance, setEthBalance] = useState("0");
  const [ethBalanceNeed, setEthBalanceNeed] = useState(0);
  const [balanceNum, setBalanceNum] = useState(false);
  const [switcherNet, setSwitcherNet] = useState(false);
  const [web3auth, setWeb3auth] = useState<Web3AuthCore | null>(null);
  const [obj,setobj] = useState({})
  const [web3AuthAddress, setWeb3AuthAddress] = React.useState(null);
  const [idTokenWeb3, setIdTokenWeb3] = React.useState(null);
  const [loginState, setLoginState] = React.useState("web3Auth");
  const [profileConcent, setProfileConcent] = React.useState(null);
  const [mintNum, setMintNum] = React.useState(null);
  const [mintConcent, setMintConcent] = React.useState(false);
  const [w3, setw3] = React.useState(null);
  const [num, setNum] = useState(1);

  const lower = () => {
    setNum(num - 1);
  };

  const increase = () => {
    setNum(num + 1);
  };

  const provider = new WalletConnectProvider({
    infuraId: "f9d7d835ed864a299a13e841a1b654f8",
  });

  const [p1, setp1] = React.useState(provider);

  const web3 = useWalletProvider();

  const router = useRouter();

  const { pathname } = router;

  const resultHandler = React.useCallback(
    (res) => {
      const { code, msg, data } = res;
      if (code === 100000) {
        return convert(data);
      }
      toast.error(msg);

      return null;
    },
    [null]
  );

  const checkLoginStatu = React.useCallback(
    (res) => {
      const data = resultHandler(res);
      // const idToken =  web3auth.authenticateUser();
      if (data) {
        state.setState({
          accessToken: data.accessToken,
          profile: data.profile,
          refreshToken: data.refreshToken,
        });
        setToken("atk", data.accessToken);
        setToken("rtk", data.refreshToken);
        // Router.push({
        //   pathname: '/profile',
        //   query: {
        //     type: 'parcellist',
        //   },
        // });
      }
      setShowMenu(false);
      setLoading(false);
    },
    [resultHandler]
  );

  const requireNonce = React.useCallback(
    async (addr) => {
      const res = await getNonce(addr);
      return resultHandler(res);
    },
    [resultHandler]
  );

  const connect = React.useCallback(
    async (addr, providerCon) => {
      const nonceData = await requireNonce(addr);
      if (nonceData) {
        const { address: add, nonce } = nonceData;
        providerCon
          .request({ method: "personal_sign", params: [nonce, add] })
          .then(
            async (signature) => {
              const result = await loginSignature(add, signature);
              checkLoginStatu(result);
            },
            (error: any) => {
              setLoading(false);
            }
          );
      }
    },
    [requireNonce, checkLoginStatu]
  );

  const connectToChain = React.useCallback(async () => {
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },5000)
    if (
      typeof (window as any).ethereum === "undefined" ||
      !(window as any).ethereum.isMetaMask
    ) {
      setLoading(false);
      setShowMenu(false);
      window.open("https://metamask.io/");
      return;
    }
    try {
      const networkId = await window.ethereum.request({ method: 'net_version' });
console.log(networkId=== '11155111','networkId',networkId);
      // 判断当前网络是否为 Ethereum Sepolia 网络
      // await  window.ethereum.request({
      //   method: 'wallet_switchEthereumChain',
      //   params: [{ chainId: '11155111' }],
      // });
      if (networkId !== '11155111') {
        // 根据需要跳转到引导转换网络的网页或执行其他逻辑
        // window.open("https://example.com");
        // return;
        const chainId = "0x" + (11155111).toString(16);
        console.log(chainId,'chainId');
        
        await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: chainId,
        
          },
        ],
      });
      }

      web3.connect().then(
        async (res) => {
          console.log("connect==>", res);
          const { address: addr, provider } = res;

          connect(addr, provider);
          window.localStorage.setItem("metaMaskAddress", res.address);
        },
        (err) => {
          setLoading(false);
        }
      );
      window.localStorage.setItem("LoginType", "metaMask");
    } catch {
      setLoading(false);
    }
  }, [web3, connect]);

  const clipName = React.useCallback(
    (addres) => {
      if (addres?.length > 8) {
        const end = addres.length - 4;
        const all = addres.slice(4, end);
        return addres.replace(all, "***");
      }
      return addres;
    },
    [null]
  );

  const onClick = React.useCallback(
    (event) => {
      if (idTokenWeb3 === null) {
        setShowMenu(false);
      }
      event.nativeEvent.stopImmediatePropagation();
      setShowMenu(!showMenu);
      if (onClickHandler) {
        onClickHandler();
      }
    },
    [showMenu, onClickHandler, idTokenWeb3]
  );

  const subscribeProvider = React.useCallback(
    async (providerDa, newWeb3, modal) => {
      const { nonce, address: add } = await requireNonce(
        providerDa.accounts[0]
      );

      providerDa
        .request({ method: "personal_sign", params: [nonce, add] })
        .then(
          (resD) => {
            loginSignature(add, resD).then(
              (resData) => {
                checkLoginStatu(resData);
              },
              (res1) => {}
            );
          },
          (error) => {
            if (w3) {
              w3.resetApp();
            }
          }
        );

      if (!providerDa.on) {
        return;
      }

      //   //断开连接
      provider.on("close", async () => {
        removeToken("atk");
        removeToken("rtk");
        state.setState({
          accessToken: "",
          refreshToken: "",
          profile: { address: null, nickName: null, avatar: null },
        });
        if (pathname !== "/") {
          window.location.href = "/";
        } else {
          // window.location.reload();
        }
        newWeb3.resetApp();
        await provider.killSession();
        await provider.clearCachedProvider();
      });
      provider.on("accountsChanged", async (accounts) => {
        const addressData = await accounts[0];
      });
    },
    [w3, requireNonce]
  );

  const walletconnect = React.useCallback(async () => {
    setLoading(true);

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "f9d7d835ed864a299a13e841a1b654f8",
          rpc: {
            1: "https://sepolia.infura.io/v3/04e6d8eadecd41d68beb8f5e1a57dd7e",
          },
          network: 1,
        },
      },
    };

    const web3Modal = new Web3Modal({
      // network: "mainnet",
      network: "sepolia",
      cacheProvider: true,
      providerOptions,
    });
    
    // 'https://registry.walletconnect.com/api/v2/wallets'
    {
      /* <WalletConnectQRCodeModal
         size={256}
           onClose={() => setShowModal(false)}
           URI={web3Modal.cachedProvider}
         /> */
    }
    console.log(web3Modal,Web3Modal,web3Modal.cachedProvider,8888888);

    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: WalletConnectQRCodeModal,
    });
    // console.log(WalletConnect,999);

    // const uri = connector.uri
    // const clientId = connector.clientId
    //     WalletConnectQRCodeModal?.open(uri,
    //       () => {
    //     console.log("QR Code Modal closed");
    // },  )
    // await this.setState({ connector });
    // console.log(connector,8899,uri);
    // connector.createSession().then(() => {
    //   // get uri for QR Code modal
    //   const uri = connector.uri;
    //   // display QR Code modal
    //   WalletConnectQRCodeModal.open(uri, () => {
    //     console.log("QR Code Modal closed");
    //   });
    // });

    // console.log(3334,providerOptions.walletconnect.qrcodeModal, );

    const providerDataText = await web3Modal.connect();
    setShowModal(true);
    await web3Modal.toggleModal();
    const web_3 = new WalletConnectProvider(providerDataText);
    setw3(web_3);
    await subscribeProvider(providerDataText, web_3, web3Modal);

    window.localStorage.setItem("LoginType", "walletConnect");
    setLoading(false);
    // return web_3;
  }, [subscribeProvider]);
  const clientId =
    "BMZn0DvGmTwd5z8riV1hiTES5s0IUai_BXKuvhiCJxRQeVFmY6pGAFnP4ZLp8wYa69jh1oVhDxXpGm8DH4_etQs";

  useEffect(() => {

    const init = async () => {
      try {
        const coreWeb3auth = new Web3AuthCore({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0xaa36a7",
            rpcTarget:
              "https://sepolia.infura.io/v3/04e6d8eadecd41d68beb8f5e1a57dd7e", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });

        setWeb3auth(coreWeb3auth);
        const torusWalletAdapter = new TorusWalletAdapter({
          adapterSettings: {
            buttonSize: 0,
          },
          clientId,
          initParams: {
            whiteLabel: {
              theme: {
                isDark: window.localStorage.getItem("darkLight") === "false",
                colors: { primary: "#00a8ff" },
              },
              logoDark: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoLight: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
              defaultLanguage: "en",
            },
          },
          sessionTime: 3600 * 24 * 7, // 1 hour in seconds
        });

        coreWeb3auth.configureAdapter(torusWalletAdapter);

        await coreWeb3auth.init();

        if (coreWeb3auth.provider) {
          setProviderWeb3auth(coreWeb3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const logout = React.useCallback(() => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }

    window.localStorage.setItem("LoginType", null);
    window.localStorage.setItem("addressGetAccounts", null);
    web3auth.logout();
    window.localStorage.clear();
    setWeb3AuthAddress(null);

    setProviderWeb3auth(null);

    if (pathname !== "/") {
      window.location.href = "/";
      window.localStorage.setItem("LoginType", null);
      window.localStorage.setItem("addressGetAccounts", null);
      window.localStorage.clear();
    } else {
      // window.location.reload();
      window.localStorage.setItem("LoginType", null);
      window.localStorage.setItem("addressGetAccounts", null);
      window.localStorage.clear();
    }
    removeToken("atk");
    setIdTokenWeb3(null);
  }, [web3auth, idTokenWeb3, web3AuthAddress, pathname]);

  const getAccounts = React.useCallback(async () => {
    if (!providerWeb3auth) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(providerWeb3auth);

    const addressGetAccounts = await rpc.getAccounts();
    window.localStorage.setItem("addressGetAccounts", addressGetAccounts);

    setWeb3AuthAddress(addressGetAccounts);

    if (idTokenWeb3 && web3AuthAddress) {
      setToken("atk", `${idTokenWeb3}-.-${web3AuthAddress}`);
      const webGetBase = getBaseInfo(getToken("atk"));
      webGetBase.then((webGetBase1) => {
        state.setState({
          profile: {
            address: webGetBase1?.data?.profile?.address,
            nickName: webGetBase1?.data?.profile?.nick_name,
            avatar: webGetBase1?.data?.profile?.avatar,
          },
        });
      });
    }
  }, [providerWeb3auth, idTokenWeb3, web3AuthAddress]);

  const authenticateUser = React.useCallback(async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const idTokenAuthenticateUser = await web3auth.authenticateUser();
    setIdTokenWeb3(idTokenAuthenticateUser.idToken);
    window.localStorage.setItem(
      "idTokenAuthenticateUser",
      idTokenAuthenticateUser.idToken
    );

    setShowMenu(true);
  }, [
    idTokenWeb3,
    web3AuthAddress,
    showMenu,
    providerWeb3auth,
    idTokenWeb3,
    web3auth,
  ]);
  const profilConent = React.useCallback(async () => {
    const profilemetaMask = window.localStorage.getItem("metaMaskAddress");
    if (profilemetaMask !== null) {
      const metaCatAtk = window.localStorage.getItem("METACAT_atk");
      if (metaCatAtk) {
        const renConcent = getBaseInfo(metaCatAtk);
        renConcent.then((renConcent1) => {
          setProfileConcent(renConcent1.profile?.address);
          state.setState({
            profile: {
              address: renConcent1?.data?.profile?.address,
              nickName: renConcent1?.data?.profile?.nick_name,
              avatar: renConcent1?.data?.profile?.avatar,
            },
          });
        });
      }
    }
  }, [profileData]);

  useEffect(() => {
    const metaCatAtk = window.localStorage.getItem("METACAT_atk");

    if (!metaCatAtk) {
      setTimeout(() => {
        profilConent();
      }, 2000);
    } else {
      const renConcent = getBaseInfo(metaCatAtk);

      renConcent.then((renConcent1) => {
        setProfileConcent(renConcent1.profile?.address);
        state.setState({
          profile: {
            address: renConcent1?.data?.profile?.address,
            nickName: renConcent1?.data?.profile?.nick_name,
            avatar: renConcent1?.data?.profile?.avatar,
          },
        });
      });
    }

    const loginCon = window.localStorage.getItem("LoginType");
    setLoginState(loginCon);
    if (idTokenWeb3 && web3AuthAddress) {
      setToken("atk", `${idTokenWeb3}-.-${web3AuthAddress}`);
    }
  }, [loginState]);

  const login = React.useCallback(async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }

    try {
      const web3authProvider = await web3auth.connectTo(
        WALLET_ADAPTERS.TORUS_EVM
      );

      setProviderWeb3auth(web3authProvider);
      const idtoken = authenticateUser();
      idtoken.then((res) => {});
      if (idtoken !== null) {
        const address3 = getAccounts();
        address3.then((res) => {});
      }
    } catch (error) {
      if (
        error.message === "Failed to connect with wallet. Already connected"
      ) {
        getAccounts();
        const idtoken = authenticateUser();
        idtoken.then((res) => {
          console.log(res);
        });
        if (idtoken !== null) {
          const address3 = getAccounts();
          address3.then((res) => {
            console.log(res);
          });
        }
      }
    }

    window.localStorage.setItem("LoginType", "web3Auth");
  }, [providerWeb3auth, web3auth, showMenu, web3AuthAddress, idTokenWeb3]);

  const clickItem = React.useCallback(
    (item) => {
      if (!profile?.address) {
        window.localStorage.clear();
      }

      setShowWall(item.value);
      // if (item.type === "wallet") {
      if (!profile?.address && item?.value === "metamask") {
        connectToChain();
      }
      if (!profile.address && item.value === "walletconnect") {
        walletconnect();
      }
      // if (item.value === "mintConnevt") {
      //   mintConnect();
      // }
      // }
      if (item.type === "login") {
        login();
      }
      if (item.type === "loginOut") {
        logout();
      }
    },
    [profile, connectToChain, login]
  );

  const clickOperationItem = React.useCallback(
    async (item) => {
      if (window.localStorage.getItem("LoginType") === "web3Auth") {
        if (item.value === "resetApp") {
          setProviderWeb3auth(null);
          setWeb3AuthAddress(null);

          logout();

          removeToken("atk");
        }
        setShowMenu(false);
      } else if (
        window.localStorage.getItem("LoginType") === "metaMask" &&
        profile?.address
      ) {
        if (item.value === "resetApp") {
          removeToken("atk");
          removeToken("rtk");
          removeToken("address");
          // if (w3) {
          //   w3.resetApp()
          // }
          if (web3) {
            web3?.resetApp();
          }
          window.localStorage.clear();

          state.setState({
            accessToken: "",
            refreshToken: "",
            profile: { address: null, nickName: null, avatar: null },
          });

          if (pathname !== "/") {
            window.location.href = "/";
          } else {
            // window.location.reload();
          }
        }
        setShowMenu(false);
      } else if (window.localStorage.getItem("LoginType") === "walletConnect") {
        if (item.value === "resetApp") {
          removeToken("atk");
          removeToken("rtk");
          removeToken("address");
          state.setState({
            accessToken: "",
            refreshToken: "",
            profile: { address: null, nickName: null, avatar: null },
          });
          if (pathname !== "/") {
            window.location.href = "/";
          } else {
            // window.location.reload();
          }
          window.localStorage.setItem("LoginType", null);
          window.localStorage.setItem("METACAT_atk", null);
          window.localStorage.clear();
        }
      }
    },
    [logout, pathname, web3, loginState, profile]
    // w3
  );

  const render = React.useMemo(() => {
    if (profile?.address || (web3AuthAddress && idTokenWeb3)) {
      return MENU.map((item, idx) => {
        return (
          <li
            className={cn(
              "flex justify-between  items-center",
              style.menuItem,
              idx === MENU.length - 1 ? style.last : null
            )}
            key={idx}
          >
            {item.value === "resetApp" ? (
              <div
                className={style.wordCon}
                onClick={() => {
                  clickOperationItem(item);
                }}
              >
                <div className="flex items-center justify-around">
                  <img
                    src={item.icon}
                    className={cn("mr-2", style.operation)}
                  ></img>
                  <span>{item.label}</span>
                </div>
                <img
                  src="/images/v5/arrow-simple.png"
                  className={style.activeOperation}
                ></img>
              </div>
            ) : (
              <Link href={item.value}>
                <div className={style.wordCon}>
                  <div>
                    <img
                      src={item.icon}
                      className={cn("mr-2", style.operation)}
                    ></img>
                    <span>{item.label}</span>
                  </div>
                  <img
                    src="/images/v5/arrow-simple.png"
                    className={style.activeOperation}
                  ></img>
                </div>
                {/* <div className="grid">{provider ? loggedInView : unloggedInView}</div> */}
              </Link>
            )}
          </li>
        );
      });
    }
    return WALLET.map((item, idx) => {
      return (
        <li
          className={cn(
            "flex justify-around items-center text-xs",
            style.walletItem
          )}
          key={idx}
          onClick={() => {
            clickItem(item);
          }}
        >
          <div
            className={cn(
              "flex justify-between items-center w-full h-full",
              style.walletContent
            )}
          >
            <div className="flex items-center justify-around">
              <img
                src={item.icon}
                className={cn("mr-2", style.walletLogo)}
              ></img>
              <span>{item.label}</span>
            </div>
            <img
              src="/images/v5/arrow.png"
              className={style.activeWallet}
            ></img>
            {/* {showModal && (
       <QRCodeModal
         size={256}
           onClose={() => setShowModal(false)}
           URI={web3Modal.cachedProvider}
         />
         )}  */}
            {/* {loading === true ? (
              <img
                src="/images/loading.png"
                className={cn("animate-spin", style.loading)}
              />
            ) : (
              <img
                src="/images/v5/arrow.png"
                className={style.activeWallet}
              ></img>
            )} */}
          </div>
        </li>
      );
    });
  }, [
    profile,
    clickItem,
    web3AuthAddress,
    clickOperationItem,
    idTokenWeb3,
    loading,
    showWall,
  ]);

  const getText = React.useMemo(() => {
    let text = "Connect";
    if (profile?.address) {
      if (profile?.nickName && profile?.address) {
        // console.log(profile);
        // text = profile?.nickName;
        text = profile?.address;
      } else {
        text = clipName(profile?.address);
        setShowMenu(!showMenu);
      }
    } else if (!profile?.address) {
      getAccounts();
      if (web3AuthAddress && idTokenWeb3) {
        text = web3AuthAddress;
        setShowMenu(!showMenu);
      } else {
        text = "Connect";
        setShowMenu(true);
      }
    }

    return (
      <>
        <div style={{ display: "flex" }}>
          {/* {profile?.address ||
          (web3AuthAddress && providerWeb3auth !== null && idTokenWeb3) ? 
          (
            <img
              className={cn("mr-1 ", style.avatar)}
              src={profile.avatar || "/images/icon.png"}
            />
          ) 
          : 
          (
            <img
              className={cn("mr-1 ", style.avatar)}
              src="/images/v5/wallet.png"
            />
          )} */}
          <div
            title={text}
            className={cn(
              "font-semibold truncate",
              style.walletText,
              profile?.address ? "text-xs" : "text-base"
            )}
          >
            {text}
          </div>
        </div>
      </>
    );
  }, [
    profile,
    clipName,
    web3AuthAddress,
    providerWeb3auth,
    idTokenWeb3,
    logout,
  ]);

  const close = React.useCallback(() => {
    if (profile?.address) {
      setShowMenu(false);
    }
  }, [profile]);

  React.useEffect(() => {
    document.addEventListener("click", close);
    return () => {
      document.removeEventListener("click", close);
    };
  }, [close]);

  const abi = [
    {
      inputs: [
        { internalType: "address", name: "_owner", type: "address" },
        { internalType: "string", name: "newURI", type: "string" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    { inputs: [], name: "ApprovalCallerNotOwnerNorApproved", type: "error" },
    { inputs: [], name: "ApprovalQueryForNonexistentToken", type: "error" },
    { inputs: [], name: "BalanceQueryForZeroAddress", type: "error" },
    { inputs: [], name: "MintERC2309QuantityExceedsLimit", type: "error" },
    { inputs: [], name: "MintToZeroAddress", type: "error" },
    { inputs: [], name: "MintZeroQuantity", type: "error" },
    { inputs: [], name: "OwnerQueryForNonexistentToken", type: "error" },
    { inputs: [], name: "OwnershipNotInitializedForExtraData", type: "error" },
    { inputs: [], name: "TransferCallerNotOwnerNorApproved", type: "error" },
    { inputs: [], name: "TransferFromIncorrectOwner", type: "error" },
    {
      inputs: [],
      name: "TransferToNonERC721ReceiverImplementer",
      type: "error",
    },
    { inputs: [], name: "TransferToZeroAddress", type: "error" },
    { inputs: [], name: "URIQueryForNonexistentToken", type: "error" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "fromTokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "toTokenId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
      ],
      name: "ConsecutiveTransfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [],
      name: "advance",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address[]", name: "recipients", type: "address[]" },
      ],
      name: "airdrop",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "getApproved",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getBipEnglish",
      outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getInfo",
      outputs: [
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "operator", type: "address" },
      ],
      name: "isApprovedForAll",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "mint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "ownerOf",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "bytes", name: "_data", type: "bytes" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "send",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "bool", name: "approved", type: "bool" },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string[]", name: "_BipEnglish", type: "string[]" },
      ],
      name: "setBipEnglish",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "newURI", type: "string" }],
      name: "setURI",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "tokenToBip",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "tokenURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "addr", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const handleMintContent = () => {
    setMintConcent(true);
  };

  const handlePaymentConfirmation = async () => {
    setLoading(true);
    // 执行支付确认逻辑或其他异步操作
    // 确认支付完成后，可以将 setLoading(false) 设置为 false 来表示加载已完成
  };
  

  const handleMint = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        // 请求用户授权连接 MetaMask
        const networkVersion = window.ethereum.networkVersion;
        if(networkVersion!=='11155111' ){
          console.log('有没有问题');
          // setSwitcherNet(true)
          connectToChain()
        }else{
          setSwitcherNet(false)
          await window.ethereum.request({ method: "eth_requestAccounts" });

          // 创建 Web3 实例
          const web3 = new Web3(window.ethereum);
  
          // 获取当前账户地址
          const accounts = await web3.eth.getAccounts();
          const accountAddress = accounts[0];
  
          // 获取用户钱包中的 ETH 余额
          const balance = await web3.eth.getBalance(accountAddress);
  
          // 将 balance 单位由 wei 转换为以太币，并将其转换为数字类型
          const ethBalance = Number(web3.utils.fromWei(balance, "ether"));
  
          setEthBalanceNeed(ethBalance);
  
          const price = 0.006;
          const quantity = num;
  
          // 对比 ETH 余额和数量与单价的乘积
          if (ethBalance >= price * quantity) {
            // 执行 mint 操作
            // your mint logic here
            console.log("Minting...");
  
            console.log(mintNum, "mintNummintNummintNum");
  
            if (!profile?.address) {
              connectToChain();
            }
            toast.success("Successful");
            setLoading(true);
            const web3 = new Web3(Web3.givenProvider);
            const contractAddress = "0xadd22a3efa6f22dd60df65cdfe096da0366ee002";
            const contract = new web3.eth.Contract(abi as [], contractAddress);
            console.log(contract.events.Transfer);
            const mintNums = num; // 在这里定义要mint的数量
            setTimeout(()=>{
              setLoading(false)
            },5000)
            window.ethereum.on('confirmation', handlePaymentConfirmation);
            const tx = await contract.methods.mint(mintNums).send({
              from: profile.address,
              value: web3.utils.toWei(`${0.006 * mintNums}`, "ether"), // 计算价格,根据合约可知，第一阶段是0.006eth，第二阶段是0.009eth，建议做成可读取的变量
            });
            console.log(tx);
   
            // const tokenToBip = await contract.methods.tokenToBip().call({})
            // console.log(tokenToBip,'tokenToBip');
  
            // // 监听合约事件
            // // const event = contract.events.Transfer((error, event) => {
            // //   console.log(error, event);
  
            // //   if (!error) {
            // //     console.log("Event data:", event.returnValues);
            // //     // 在此处添加自定义的处理逻辑
            // //   } else {
            // //     console.error("Error:", error);
            // //   }
            // // });
            // // event();
            // const eventDataElement = document.getElementById('eventData');
            contract.events
              .Transfer(
                { filter: {}, fromBlock: tx.blockNumber, toBlock: "latest" },
                function (params) {}
              )
              .on("data", (event) => {
                console.log(event);
                setLoading(true);
                console.log(
                  tx.events.Transfer.returnValues.to.toLowerCase(),
                  11111,
                  event.returnValues.to.toLowerCase()
                );
  
                console.log(
                  tx.events.Transfer.returnValues.to.toLowerCase() ===
                    event.returnValues.to.toLowerCase()
                );
                console.log(
                  tx.transactionHash === event.transactionHash,
                  666666666
                );
                if (tx.transactionHash === event.transactionHash) {
                  toast.success("hhhhhh");
                  setLoading(false);
                  alert("仅此一次成功了");
                }
                if (
                  tx.events.Transfer.returnValues.to.toLowerCase() ===
                  event.returnValues.to.toLowerCase()
                ) {
                  const eventDataElement = document.getElementById("eventData");
                  const tokenToBip = contract.methods
                    .tokenToBip(event.returnValues.tokenId)
                    .call({});
                  const tokenURI = contract.methods
                    .tokenURI(event.returnValues.tokenId)
                    .call({});
                  const nameCon = contract.methods.name().call({});
                  Promise.all([tokenToBip, tokenURI, nameCon]).then(
                    ([tokenToBipResult, tokenURIResult, nameConResult]) => {
                      console.log(Promise.all,111,tokenToBipResult, tokenURIResult, nameConResult);
                 
                      setTimeout(() => {
                      fetch(tokenURIResult)
                        .then((response) => response.json())
                        .then((data) => {
                          console.log(data,3333333);
                          const dataArray = [];
                          dataArray.push(data);
                          // const transformedArray = dataArray.reduce((acc, curr) => {
                          //   acc[curr.id] = curr;
                          //   return acc;
                          // }, {});
                          const transformedObject = {};
      
                          dataArray.forEach(event => {
        transformedObject[event.id] = event;
      });
      
      setobj((state)=>{ 
        console.log(state,transformedObject,2222222);
      
       
        const sortedKeys = Object?.keys(state).map(Number).sort((a, b) => b - a);
        console.log(sortedKeys);
        
      const sortedData = sortedKeys?.map(key => state[key]);
      console.log(sortedData,'sortedDatasortedDatasortedData');
      
      // const gridContainer = document.createElement("div");
      
      
      // 移除旧的数据
      while (eventDataElement.firstChild) {
        eventDataElement.firstChild.remove();
      }
      
      sortedData.forEach(item => {
        const itemContainer = document.createElement("div");
        itemContainer.textContent = `${item.name}`;
        // gridContainer.appendChild(itemContainer);
        itemContainer.style.height = "200px";
      
      eventDataElement.appendChild(itemContainer);
      const tokenToBipPElement = document.createElement("span");
      tokenToBipPElement.textContent = `${tokenToBipResult}`;
      tokenToBipPElement.style.marginLeft = "20px";
      itemContainer.appendChild(tokenToBipPElement);
      
      // 处理 tokenURI 数据
      const imgTokenURIElement = document.createElement("div");
      const imgElement = document.createElement("img");
      const pElement = document.createElement("p");
                          // console.log(transformedArray,5555555);
                          imgElement.setAttribute("src", item.image);
                      
                 
                      imgTokenURIElement.appendChild(imgElement);
                      imgTokenURIElement.appendChild(pElement);
                      itemContainer.appendChild(imgTokenURIElement);
                      eventDataElement.appendChild(itemContainer);
                      imgElement.style.width = "100px";
                      imgElement.style.height = "100px";
      
      });
      return {...state,...transformedObject}
      })
      // gridContainer.innerHTML = '';
      // sortedData.forEach(item => {
      // //   console.log(item,22344444);
      // //   const itemContainer = document.createElement("div"); // 创建新的容器
      // // //   const nameConElement = document.createElement("span");
      // // //   nameConElement.textContent = `${item.name}#${item.id}`;
      // // //   itemContainer.appendChild(nameConElement); // 将 span 添加到新容器中
      // // //   gridContainer.appendChild(itemContainer); // 将新容器添加到 gridContainer 中
      // // itemContainer.textContent = item.id;
      // // eventDataElement.appendChild(itemContainer);
      
      // });
      // 对 tokenIds 数组进行从大到小的排序
      // event.returnValues.tokenId.sort((a, b) => b - a);
      return
      const gridContainer = document.createElement("div");
      gridContainer.style.height = "200px";
         // 处理 nameCon 数据
         const nameConElement = document.createElement("span");
         nameConElement.textContent =`${nameConResult.replace(/"/g, "")}#${event.returnValues.tokenId}` ;
         gridContainer.appendChild(nameConElement);
      // 处理 tokenToBip 数据
      const tokenToBipPElement = document.createElement("span");
      tokenToBipPElement.textContent = `${tokenToBipResult}`;
      gridContainer.appendChild(tokenToBipPElement);
      // nameConElement.style.marginRight = "15px";
      // 处理 tokenURI 数据
      const imgTokenURIElement = document.createElement("div");
      const imgElement = document.createElement("img");
      const pElement = document.createElement("p");
                          // console.log(transformedArray,5555555);
                          imgElement.setAttribute("src", data.image);
                      
                 
                      imgTokenURIElement.appendChild(imgElement);
                      imgTokenURIElement.appendChild(pElement);
                      gridContainer.appendChild(imgTokenURIElement);
                      eventDataElement.appendChild(gridContainer);
                      imgElement.style.width = "100px";
                      imgElement.style.height = "100px";
                  
                   
                    })
                    .catch((error) => {
                      console.error("Error fetching tokenURI:", error);
                    });
                    }, 3000); // 添加延迟，每隔1秒发送一个请求
                    }
                    
                  )
                  // Promise.all([tokenToBip, tokenURI, nameCon]).then(
                  //   ([tokenToBipResult, tokenURIResult, nameConResult]) => {
                  //     const gridContainer = document.createElement("div");
                  //     gridContainer.style.height = "200px";
                  //     console.log(nameConResult, 3333);

                  //       // 处理 nameCon 数据
                  //       const nameConElement = document.createElement("span");
                  //       nameConElement.textContent = nameConResult.replace(
                  //         /"/g,
                  //         ""
                  //       );
                  //       gridContainer.appendChild(nameConElement);
                  //     // 处理 tokenToBip 数据
                  //     const tokenToBipPElement = document.createElement("span");
                  //     tokenToBipPElement.textContent = `${tokenToBipResult}#${event.returnValues.tokenId}`;
                  //     gridContainer.appendChild(tokenToBipPElement);
                  //     tokenToBipPElement.style.marginRight = "15px";
                  //     // 处理 tokenURI 数据
                  //     const imgTokenURIElement = document.createElement("div");
                  //     const imgElement = document.createElement("img");
                  //     const pElement = document.createElement("p");
  
                  //     fetch(tokenURIResult)
                  //       .then((response) => response.json())
                  //       .then((data) => {
                  //         const imageURL = data.image;
                  //         imgElement.setAttribute("src", imageURL);
                  //       })
                  //       .catch((error) => {
                  //         console.error("Error fetching tokenURI:", error);
                  //       });
  
                  //     imgTokenURIElement.appendChild(imgElement);
                  //     imgTokenURIElement.appendChild(pElement);
  
                  //     gridContainer.appendChild(imgTokenURIElement);
  
                  //     eventDataElement.appendChild(gridContainer);
  
                  //     imgElement.style.width = "100px";
                  //     imgElement.style.height = "100px";
                  //   }
                  // );
                  // .catch(error => {
                  //   console.log(error); // 错误处理
                  // });
                }
                setLoading(false);
              })
  
              .on("error", (error) => {
                console.error(error);
              });
            //       const value = await contract.methods.getInfo()
            // console.log(value);
            if (tx) {
              toast.success("Successful");
            }
            setLoading(false)
            console.log("tx:", tx);
            // mint 成功, 进行后续操作
         
          } else {
            setBalanceNum(true);

            // alert("Your balance is insufficient");
            console.log("Insufficient ETH balance");
          }
          // } else {
          //   console.log('MetaMask is not installed');
        }
        }
       
    } catch (error) {
      toast.error("something went wrong");
    }
  };


  const connesmartContractct = useCallback(()=>{

  },[])

  useEffect(() => {
    const Addr = window.localStorage.getItem('metaMaskAddress')
    if(window.ethereum&&Addr){
   console.log(window.ethereum&&Addr);

      console.log(Addr);
      window.ethereum.enable().then(() => {
        console.log(223);
        const web3 = new Web3(window.web3.currentProvider);
        const contractAddress = "0xadd22a3efa6f22dd60df65cdfe096da0366ee002";
        const daiContract = new web3.eth.Contract(abi as [], contractAddress);
        const mintNums = 1;
        let existingTokenIds = new Set();
        daiContract.events
          .Transfer(
            { filter: {
              from:'0x0000000000000000000000000000000000000000'

            }, fromBlock:	3876408, toBlock: "latest" },
            function (params) {}
          )
          .on("data", (event) => {
                  const tokenId = event.returnValues.tokenId;
                  // if (existingTokenIds.has(tokenId)) {
                  //     // 跳过该条数据，已存在相同的 tokenId
                  //     return;
                  // }
              
                  existingTokenIds.add(tokenId);
                  // event.sort((event1, event2) => event2.returnValues.tokenId - event1.returnValues.tokenId);
                  // 处理符合过滤条件的数据，例如输出到控制台
                  console.log(event);
          
              // 将事件数据存储在一个数组中
// const dataArray = [];
// // event.forEach(events => {
//   dataArray.push(event);
// // });
// console.log(dataArray,'5555555');

            const totalSupply = daiContract.methods.totalSupply().call({});
            const name = daiContract.methods.name().call({});
            totalSupply.then((result) => {
              setMintNum(result);
            });
  
            name.then((result) => {
              console.log(result, "resultresult");
            });
            const eventDataElement = document.getElementById("eventData");
            const tokenToBip = daiContract.methods
              .tokenToBip(event.returnValues.tokenId)
              .call({});
            const tokenURI = daiContract.methods
              .tokenURI(event.returnValues.tokenId)
              .call({});
            const nameCon = daiContract.methods.name().call({});
            Promise.all([tokenToBip, tokenURI, nameCon]).then(
              ([tokenToBipResult, tokenURIResult, nameConResult]) => {
                console.log(Promise.all,111,tokenToBipResult, tokenURIResult, nameConResult);
           
                setTimeout(() => {
                fetch(tokenURIResult)
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data,3333333);
                    const dataArray = [];
                    dataArray.push(data);
                    // const transformedArray = dataArray.reduce((acc, curr) => {
                    //   acc[curr.id] = curr;
                    //   return acc;
                    // }, {});
                    const transformedObject = {};

                    dataArray.forEach(event => {
  transformedObject[event.id] = event;
});

setobj((state)=>{ 
  console.log(state,transformedObject,2222222);

 
  const sortedKeys = Object?.keys(state).map(Number).sort((a, b) => b - a);
  console.log(sortedKeys);
  
const sortedData = sortedKeys?.map(key => state[key]);
console.log(sortedData,'sortedDatasortedDatasortedData');

// const gridContainer = document.createElement("div");


// 移除旧的数据
while (eventDataElement.firstChild) {
  eventDataElement.firstChild.remove();
}

sortedData.forEach(item => {
  const itemContainer = document.createElement("div");
  itemContainer.textContent = `${item.name}`;
  // gridContainer.appendChild(itemContainer);
  itemContainer.style.height = "200px";

eventDataElement.appendChild(itemContainer);
const tokenToBipPElement = document.createElement("span");
tokenToBipPElement.textContent = `${tokenToBipResult}`;
tokenToBipPElement.style.marginLeft = "20px";
itemContainer.appendChild(tokenToBipPElement);

// 处理 tokenURI 数据
const imgTokenURIElement = document.createElement("div");
const imgElement = document.createElement("img");
const pElement = document.createElement("p");
                    // console.log(transformedArray,5555555);
                    imgElement.setAttribute("src", item.image);
                
           
                imgTokenURIElement.appendChild(imgElement);
                imgTokenURIElement.appendChild(pElement);
                itemContainer.appendChild(imgTokenURIElement);
                eventDataElement.appendChild(itemContainer);
                imgElement.style.width = "100px";
                imgElement.style.height = "100px";

});
return {...state,...transformedObject}
})
// gridContainer.innerHTML = '';
// sortedData.forEach(item => {
// //   console.log(item,22344444);
// //   const itemContainer = document.createElement("div"); // 创建新的容器
// // //   const nameConElement = document.createElement("span");
// // //   nameConElement.textContent = `${item.name}#${item.id}`;
// // //   itemContainer.appendChild(nameConElement); // 将 span 添加到新容器中
// // //   gridContainer.appendChild(itemContainer); // 将新容器添加到 gridContainer 中
// // itemContainer.textContent = item.id;
// // eventDataElement.appendChild(itemContainer);

// });
// 对 tokenIds 数组进行从大到小的排序
// event.returnValues.tokenId.sort((a, b) => b - a);
return
const gridContainer = document.createElement("div");
gridContainer.style.height = "200px";
   // 处理 nameCon 数据
   const nameConElement = document.createElement("span");
   nameConElement.textContent =`${nameConResult.replace(/"/g, "")}#${event.returnValues.tokenId}` ;
   gridContainer.appendChild(nameConElement);
// 处理 tokenToBip 数据
const tokenToBipPElement = document.createElement("span");
tokenToBipPElement.textContent = `${tokenToBipResult}`;
gridContainer.appendChild(tokenToBipPElement);
// nameConElement.style.marginRight = "15px";
// 处理 tokenURI 数据
const imgTokenURIElement = document.createElement("div");
const imgElement = document.createElement("img");
const pElement = document.createElement("p");
                    // console.log(transformedArray,5555555);
                    imgElement.setAttribute("src", data.image);
                
           
                imgTokenURIElement.appendChild(imgElement);
                imgTokenURIElement.appendChild(pElement);
                gridContainer.appendChild(imgTokenURIElement);
                eventDataElement.appendChild(gridContainer);
                imgElement.style.width = "100px";
                imgElement.style.height = "100px";
            
             
              })
              .catch((error) => {
                console.error("Error fetching tokenURI:", error);
              });
              }, 3000); // 添加延迟，每隔1秒发送一个请求
              }
              
            )
  
            .catch(error => {
              console.log(error); // 错误处理
            });
          });
        // 在页面上更新事件数据
        // eventDataElement.innerHTML += `<p>${eventDataString}</p>`;
      });
    }
  

    // });
  }, []);

  useEffect(() => {
    async function fetchBalance() {
      if (typeof window.ethereum !== "undefined") {
        // 请求用户授权连接 MetaMask
        // console.log(window.ethereum);
        // const networkVersion = window.ethereum.networkVersion;
        // console.log(networkVersion,668852);
        // if(networkVersion!=='11155111' ){
        //   console.log('有没有问题');
        //   setSwitcherNet(true)
        // }
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // 创建 Web3 实例
        const web3 = new Web3(window.ethereum);

        // 获取当前账户地址
        const accounts = await web3.eth.getAccounts();
        const accountAddress = accounts[0];

        // 获取用户钱包中的 ETH 余额
        const balance = await web3.eth.getBalance(accountAddress);

        // 将 balance 单位由 wei 转换为以太币，并设置为保留三位小数
        const ethBalance = Number(web3.utils.fromWei(balance, "ether")).toFixed(
          3
        );

        setEthBalance(ethBalance);
      } else {
        console.log("MetaMask is not installed");
      }
    }

    fetchBalance();
  }, []);

  return (
    <>
      <div
        className={cn(
          "cursor-pointer",
          loading === true ? style.btnDis : style.btn
        )}
      >
        <div
          className={cn(
            "flex justify-center items-center w-full h-full text-xs",
            style.btnDiv
          )}
          onClick={onClick}
        >
          {getText}
        </div>
        <div style={{ borderRadius: "6px", marginTop: "5px" }}>
          <ul className={cn("list-none mt-2 z-20")}>{showMenu && render}</ul>
        </div>
        {/* <button onClick={handleMintContent}>Mint</button> */}
        {/* {mintConcent === true ? ( */}
        <div className={cn(style.content)}>
          <span>{(0.006*num).toFixed(3)}</span>
          <p className={cn(style.supply)}>
            Supply:
            <span>{mintNum}</span>
            <span>/</span>
            <span>1984</span>
          </p>
          <div className={cn(style.middleContent)}>
            <div
              className={cn(style.imgCon)}
              onClick={num !== 1 ? lower : null}
            >
              <img src="/images/carousel-left.png" alt="" />
            </div>
            <span className={cn(style.num)}>{num}</span>
            <div className={cn(style.imgCon)} onClick={increase}>
              <img src="/images/carousel-right.png" alt="" />
            </div>
          </div>
          {/* <button className={cn(style.mintBtn)} onClick={handleMint}>
            Mint
          </button> */}
          {balanceNum === true ? (
            <div>
              <p>
                ETH Balance: Youneed {ethBalanceNeed.toFixed(3)} ETH + gas fee{" "}
                <br /> YouETH wallet Balance: {ethBalance} ETH
              </p>
            </div>
          ) : null}
          {switcherNet === true ? (
            <div>
              <p>
              Please switch to Ethereum Sepolia
              </p>
            </div>
          ) : null}
          <button
            className={cn(
              mintNum === "1984" ? style.mintBtnDis : style.mintBtn
            )}
            disabled={mintNum === "1984"}
            onClick={handleMint}
          >
            Mint
          </button>
        </div>
        {/* ) : null} */}
      </div>
      {loading === true ? <Status mini={true} status="loading" /> : null}
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5",
          style.dataSourceCard
        )}
        id="eventData"
      >
        {/* <div  className={cn("cursor-pointer", style.btnBox)} > */}
        {/* <div id="imgTokenURI"></div> */}
        {/* </div> */}
        {/* <div><p></p></div> */}
      </div>
    </>
  );
}
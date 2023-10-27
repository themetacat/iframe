import React from 'react';

// import { useRouter } from 'next/router';

import cn from 'classnames';

import style from './index.module.css';

interface Props {
  status: 'loading' | 'error' | 'success' | 'coming' | 'empty' | 'search' | 'emptyBuilding' | 'waitBuilder' | 'AddBuilder' | 'emptyWerable' |'loadingDetail';
  mini?: boolean;
  retry?: () => void;
  addWork?: () => void;
  addWorkWerable?: () => void;
  unloadBuilders?: () => void;
}
export default function Status({ status, retry, addWork, addWorkWerable, unloadBuilders, mini = false }: Props) {
  // const router = useRouter();

  const commonCls = cn(
    'flex w-full flex-col justify-center items-center py-10',
    mini ? style.mini : style.baseText,
   
  );
  if (status === 'loading') {
    return (
      <div className={style.overlay}>
      <div className={cn(commonCls, 'animate-spin',)}>
        <img src="/images/img/loading.png" className={cn('animate-spin  w-8 h-8' ,style.commonCls1)} />
      </div>
      </div>
    );
  }

  if (status === 'loadingDetail') {
    return (
      <div className={cn(commonCls)}>
        <img src="/images/img/default-image.png" className={style.baseImgCon} />
        <span className="mt-4 text-xl font-semibold">NO SEARCH RESULTS</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={cn(commonCls)}>
        <img src="/images/img/default-image.png" className={style.baseImg} />
        <span className="mt-4 text-xl font-semibold">DATA LOADING FAILURE</span>
        <span
          className={cn(
            'px-4 py-2 text-lg font-medium mt-5 flex justify-center items-center cursor-pointer',
            style.retry,
          )}
          onClick={retry}
        >
          Retry
        </span>
      </div>
    );
  }

  if (status === 'coming') {
    return (
      <div className={cn(commonCls)}>
        <img src="/images/img/default-image.png" className={style.baseImg} />
        <span className="mt-4 text-xl font-semibold">COMING SOON!</span>
      </div>
    );
  }

  if (status === 'success') {
    return <div>Success</div>;
  }

  if (status === 'empty') {
    return (
      <div className={cn(commonCls)}>
        <img src="/images/img/default-image.png" className={style.baseImgCon} />
        <span className="mt-4 text-xl font-semibold">NO DATA</span>
      </div>
    );
  }

  if (status === 'emptyBuilding') {
    return (
      <div className={cn(commonCls)}>
        <img src="/images/img/default-image.png" className={style.baseImgCon} />
        <span className={cn("", style.mmt)}>Join Builders to show your works</span>
        <span className={cn("mt-4 text-xl font-semibold", style.nowork)} onClick={addWork}>Add your work</span>
      </div>
    );
  }

  if (status === 'emptyWerable') {

    return (
      // <div className={cn(commonCls)}>
      //   <img src="/images/default-image.png" className={style.baseImgCon} />
      //   <span className={cn("", style.mmt)}>Join Creators to show your works</span>
      //   <span className={cn("mt-4 text-xl font-semibold", style.nowork)} onClick={addWorkWerable}>Add your work</span>
      // </div>
      <div className={style.createrCont}>
        {/* <img src="/images/default-image.png" className={style.baseImgCon} /> */}
        <span className={style.join}>Join Creators to show your works</span>
        <span className={style.apply} onClick={addWorkWerable}>Apply</span>
      </div>
    );
  }

  if (status === 'waitBuilder') {
    return (
      <div className={cn(commonCls)}>
        <img src="/images/img/default-image.png" className={style.baseImgCon} />
        <span className={cn("mt-4 text-xl font-semibold", style.waitBuilder)} >Waiting for confirmation to show as a Builder……</span>
      </div>
    );
  }
  if (status === 'AddBuilder') {
    return (
      <div className={cn(commonCls)}>
        <img src="/images/img/default-image.png" className={style.baseImgCon} />
        <span className="mt-4 text-xl font-semibold">No works</span>
        <span className={cn("mt-4 text-xl font-semibold", style.nowork)} onClick={unloadBuilders}>Add your work</span>
      </div>
    );
  }

  if (status === 'search') {
    return (
      <div className={cn(commonCls)}>
        <img src="/img/default-image.png" className={style.baseImg} />
        <span className="mt-4 text-xl font-semibold">NO SEARCH RESULTS</span>
      </div>
    );
  }
}

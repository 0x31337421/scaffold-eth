import React from 'react'
import { PageHeader } from 'antd';
import NftyWallet from "./NftyWallet.js"

export default function NftyHeader(props) {
  return (
    <div>
      <PageHeader
        title={<a href="/">🧑‍🎨  Nifty Ink </a>}
        /*subTitle={
          <NftyWallet
          address={props.address}
          readContracts={props.readContracts}
          injectedProvider={props.injectedProvider}
          mainnetProvider={props.mainnetProvider}/>
        }*/
        style={{cursor:'pointer'}}
        /*extra= {
        [
        <Account
          address={props.address}
          setAddress={props.setAddress}
          localProvider={props.localProvider}
          injectedProvider={props.injectedProvider}
          setInjectedProvider={props.setInjectedProvider}
          mainnetProvider={props.mainnetProvider}
          hideInterface={props.hideInterface}
          price={props.price}
          minimized={props.minimized}
      />]}*/
      />
    </div>
  );
}

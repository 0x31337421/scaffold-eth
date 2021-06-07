/* eslint-disable jsx-a11y/accessible-emoji */

import { Contract } from "@ethersproject/contracts";
import { formatEther, parseEther } from "@ethersproject/units";
import { Select } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { Address, AddressInput } from "../components";
import { useTokenList } from "../hooks";
import 'react-bootstrap';
import { Modal, Popover, Button, Form } from 'react-bootstrap';

export default function Client({
  address,
  readContracts,
  userProvider,
  tx
}) 
{
  //TODO: Lots of repeated code between both views. Look into how to refactor into components

  function parseProjectState(enumIndex){
    switch (enumIndex) {
      case 0:
        return "Initiated";
      case 1:
        return "Accepted";
      case 2:
        return "Closed";
    }
  }

  function parseScheduleState(enumIndex){
    switch (enumIndex) {
      case 0:
        return "Planned";
      case 1:
        return "Funded";
      case 2:
        return "Started";
      case 3:
        return "Approved";
      case 4:
        return "Released";
    }
  }

  const contractAddressInputRef = useRef(null);

  const ABI = require("../contracts/Freelancer.abi");
  const [freelancerContractAddress, setFreelancerContractAddress] = useState(""); // 0x5FbDB2315678afecb367f032d93F642f64180aa3

  const [freelancerContract, setFreelancerContract] = useState("");
  const [freelancerAddress, setFreelancerAddress] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [projectState, setProjectState] = useState();
  const [schedules, setSchedules] = useState();

  async function loadFreelanceContract(){
    console.log(freelancerContract);
    try{
      const fcontract = new Contract(contractAddressInputRef.current.value, ABI, userProvider.getSigner());
      setFreelancerContract(fcontract);
      loadContractData(fcontract);
    }catch (e) {
      console.log(e);
      alert("Invalid contract address");
    }
  }

  async function loadContractData(fcontract){
    setFreelancerAddress(await fcontract.freelancerAddress());
    setClientAddress(await fcontract.clientAddress());
    setProjectState(await fcontract.projectState());
    setFreelancerContractAddress(contractAddressInputRef.current.value);

    const scheduleCount = await fcontract.totalSchedules();

    const scheduleUpdate = [];
    
      for (let scheduleIndex = 0; scheduleIndex < scheduleCount; scheduleIndex++) {
        try {
          const scheduleItem = await fcontract.scheduleRegister(scheduleIndex);
          scheduleUpdate.push({ id:scheduleIndex, shortCode:scheduleItem.shortCode, description:scheduleItem.description, state:scheduleItem.scheduleState, ethValue:scheduleItem.value });
        } catch (e) {
          console.log(e);
        }
      }
      setSchedules(scheduleUpdate);
  }

  async function acceptProject(){
    try{
      const result = tx(freelancerContract.acceptProject(), update => {
        if (update && (update.status === "confirmed" || update.status === 1)) {
          loadContractData(freelancerContract);
        }
      });
    }catch (e) {
      console.log(e);
    }
  }

  async function fundTask(_id, _value){
    try{
      const result = tx(freelancerContract.fundTask(_id,{value:_value}), update => {
        if (update && (update.status === "confirmed" || update.status === 1)) {
          loadContractData(freelancerContract);
        }
      });
    }catch (e) {
      console.log(e);
    }
  }

  async function approveTask(_id){
    try{
      const result = tx(freelancerContract.approveTask(_id), update => {
        if (update && (update.status === "confirmed" || update.status === 1)) {
          loadContractData(freelancerContract);
        }
      });
    }catch (e) {
      console.log(e);
    }
  }

  let scheduleList = []

  for(let i in schedules){

    let btn;
    if(schedules[i].state == 1)
      btn = <Button onClick={() => {fundTask(schedules[i].id, schedules[i].ethValue);}}>Fund task</Button>
    else if(schedules[i].state == 2)
      btn = <Button onClick={() => {approveTask(schedules[i].id)}}>Approve task</Button>

    scheduleList.push(
      <tr key={schedules[i].id}>
        <td>{schedules[i].shortCode}</td>
        <td>{schedules[i].description}</td>
        <td>{"Ξ " + formatEther(schedules[i].ethValue)}</td>
        <td>{parseScheduleState(schedules[i].state)}</td>
        <td>{btn}</td>
      </tr>
    )
  }

    return (
        <div style={{paddingBottom: 128, marginBottom:128 }}>
            <div className="p-1 mb-1 bg-dark bg-gradient text-white rounded-3">
                <div className="container-fluid py-3">
                    <h1 className="display-7 fw-bold">Client Smart Contract</h1>
                    <p className="col-md-8 fs-4">This is the client's Distributed App</p>
                    <div className="row">
                    <div className="col-8">
                        <div className="input-group input-group-lg">
                            <input type="text" className="form-control" placeholder="Enter contract address" id="txt-contract-address" ref={contractAddressInputRef}  />
                        </div>
                    </div>
                    <div className="col-4">
                        <button className="btn btn-primary btn-lg" 
                        onClick={() => {
                            loadFreelanceContract();
                        }} 
                        type="button" id="btn-Deploy"
                        data-bs-toggle="popover" title="Error" 
                        data-bs-content="Smart Contract Not Found"
                        data-bs-trigger="manual">
                        Go
                        </button>
                        <div className="spinner-border spinner-border-sm d-none" role="status" id="spn-load">
                        <span className="sr-only"></span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid py-2" id="con-contract">
                <div className="row">
                    <div className="col-6">
                        <ul className="list-group">
                            <li className="list-group-item"><span className="fw-bold">Address: {freelancerContract.address}</span><span id="lbl-contract-address"></span></li>
                            <li className="list-group-item"><span className="fw-bold">Freelancer's Wallet: {freelancerAddress}</span><span id="lbl-freelancer-address"></span></li>
                            <li className="list-group-item"><span className="fw-bold">Client's Wallet: {clientAddress}</span><span id="lbl-client-address"></span></li>
                            <li className="list-group-item"><span className="fw-bold">Project State: {parseProjectState(projectState)}</span><span className="badge" id="lbl-project-status"></span></li>
                        </ul>
                    </div>
                    <div className="col-3">
                    <div className="card">
                        <div className="card-header fw-bold text-center">Total Value (ETH)</div>
                        <div className="card-body">
                        <p className="card-text text-center"><span className="fs-1" id="lbl-total-eth"></span></p>
                        </div>
                    </div>
                    </div>
                    <div className="col-3">
                    <div className="card">
                        <div className="card-header fw-bold text-center">Disbursed (ETH)</div>
                        <div className="card-body">
                        <p className="card-text text-center"><span className="fs-1" id="lbl-disbursed-eth"></span></p>
                    </div>
                    </div>
                    </div>
                </div>

                <br />
                <button className="btn btn-primary btn-lg" type="button" id="btn-Accept-Project" onClick={() => {acceptProject();}}>Accept Project</button>
                <div className="spinner-border spinner-border-sm d-none" role="status" id="spn-contract-action"></div>
            </div>


            <table className="table table-striped table-hover mb-5 pb-5" id="tbl-schedule-table">
            <thead>
                <tr>
                <th scope="col" data-field="short-code">Short Code</th>
                <th scope="col" data-field="description">Description</th>
                <th scope="col" className="text-end" data-field="value">Value (in ETH)</th>
                <th scope="col" data-field="state">State</th>
                <th scope="col" data-field="state">Action</th>
                </tr>
            </thead>
            <tbody id="schedule-table-body">
                {scheduleList}
            </tbody>
            </table>

        </div>
    )
}
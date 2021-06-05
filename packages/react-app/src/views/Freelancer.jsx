/* eslint-disable jsx-a11y/accessible-emoji */

import { Contract } from "@ethersproject/contracts";
import { formatEther, parseEther } from "@ethersproject/units";
import { Select } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { Address, AddressInput } from "../components";
import { useContractReader, useExternalContractLoader } from "../hooks";
import 'react-bootstrap';
import { Modal, Popover, Button, Form } from 'react-bootstrap';

export default function Freelancer({
  address,
  readContracts,
  userProvider,
  tx
}) 
{
  function parseProjectState(enumIndex){
    switch (enumIndex) {
      case 0:
        return "initiated";
      case 1:
        return "accepted";
      case 2:
        return "closed";
    }
  }

  function parseScheduleState(enumIndex){
    switch (enumIndex) {
      case 0:
        return "planned";
      case 1:
        return "funded";
      case 2:
        return "started";
      case 3:
        return "approved";
      case 4:
        return "released";
    }
  }

  const contractAddressInputRef = useRef(null);

  const ABI = require("../contracts/Freelancer.abi");
  const [freelancerContractAddress, setFreelancerContractAddress] = useState(""); // 0x5FbDB2315678afecb367f032d93F642f64180aa3

  const [freelancerContract, setFreelancerContract] = useState("");
  const [freelancerAddress, setFreelancerAddress] = useState("");
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
    setProjectState(await fcontract.projectState());
    setFreelancerContractAddress(contractAddressInputRef.current.value);

    const scheduleCount = await fcontract.totalSchedules();

    const scheduleUpdate = [];
    
      for (let scheduleIndex = 0; scheduleIndex < scheduleCount; scheduleIndex++) {
        try {
          const scheduleItem = await fcontract.ScheduleRegister(scheduleIndex);
          scheduleUpdate.push({ id:scheduleIndex, shortCode:scheduleItem.shortCode, description:scheduleItem.description, state:scheduleItem.scheduleState, ethValue:scheduleItem.value });
        } catch (e) {
          console.log(e);
        }
      }
      setSchedules(scheduleUpdate);
  }

  async function endProject(){
    try{
      const result = tx(freelancerContract.endProject(), update => {
        if (update && (update.status === "confirmed" || update.status === 1)) {
          loadContractData(freelancerContract);
        }
      });
    }catch (e) {
      console.log(e);
    }
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [ form, setForm ] = useState({})

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
  }

  function addSchedule(){
    try{
      const result = tx(freelancerContract.addSchedule(form["shortCode"],form["description"],parseEther((form["value"]).toString())), update => {
        if (update && (update.status === "confirmed" || update.status === 1)) {
          loadContractData(freelancerContract);
        }
      });
    }catch (e) {
      console.log(e);
    }
    handleClose();
  }

  let scheduleList = []

  for(let i in schedules){
    scheduleList.push(
      <tr>
        <td>{schedules[i].shortCode}</td>
        <td>{schedules[i].description}</td>
        <td>{"Ξ " + formatEther(schedules[i].ethValue)}</td>
        <td>{parseScheduleState(schedules[i].state)}</td>
        <td><Button>Buttons here</Button></td>
      </tr>
    )
  }

  return (
    <div style={{paddingBottom: 128, marginBottom:128 }}>
      <div className="p-1 mb-5 bg-light bg-gradient rounded-3">
        <div className="container-fluid py-3">
            <h1 className="display-7 fw-bold">Freelancer Smart Contract</h1>
            <p className="col-md-8 fs-4">This is the freelancer's Distributed App</p>
            <div className="row">
              <div className="col-8">
                  <div className="input-group input-group-lg">
                  <input type="text" className="form-control" placeholder={freelancerContractAddress} id="txt-contract-address" ref={contractAddressInputRef} />
                  </div>
              </div>
              <div className="col-4">
                  <a tabindex="0"  className="btn btn-primary btn-lg" 
                  onClick={() => {
                    loadFreelanceContract();
                  }}
                  type="button" id="btn-Deploy"
                  data-bs-toggle="popover" title="Error" 
                  data-bs-content="Smart Contract Not Found"
                  data-bs-trigger="manual">
                  Go
                  </a>
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
                  <li className="list-group-item"><span className="fw-bold">Address: </span><span id="lbl-contract-address"></span></li>
                  <li className="list-group-item"><span className="fw-bold">Freelancer's Wallet: {freelancerAddress}</span><span id="lbl-freelancer-address"></span></li>
                  <li className="list-group-item"><span className="fw-bold">Client's Wallet: </span><span id="lbl-client-address"></span></li>
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

        <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#scheduleModal" id="btn-Add-Schedule" onClick={handleShow}>Add Schedule</button>
        <button className="btn btn-primary btn-lg" type="button" id="btn-End-Project" 
        onClick={() => {
                  endProject();
                }}>End Project</button>
        <button className="btn btn-success btn-lg" type="button" id="btn-Refresh" onclick="App.btnRefresh('freelancer')">Refresh</button>
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

        {/* Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new schedule</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group >
              <Form.Label>Short Code: </Form.Label>
              <Form.Control type="text" onChange={ e => setField('shortCode', e.target.value) } placeholder="Enter short code e.g. DEV"/>           
            </Form.Group>
            <Form.Group >
              <Form.Label>Description: </Form.Label>
              <Form.Control type="text" onChange={ e => setField('description', e.target.value) } placeholder="Enter description e.g. Development Stage" />           
            </Form.Group>
            <Form.Group >
              <Form.Label>Value: </Form.Label>
              <Form.Control type="number" onChange={ e => setField('value', e.target.value) } placeholder="Enter value (in ETH) to be paid when done" required />           
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {addSchedule();}}>
              Submit Schedule
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

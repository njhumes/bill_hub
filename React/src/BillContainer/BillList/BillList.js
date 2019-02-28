import React from 'react'
import BillItem from './BillItem/BillItem'

const BillList = (props) => {
    console.log(props.bills, 'props.bills')
    // MAP OVER DATA AND MAKE BILL ITEMS
    const billList = props.bills.map((bill,i) => {
        let isTracked = false;
        let imgSrc = "/animations/unclicked.gif";
        for (let i=0; i<props.bills.length; i++){
            if (props.bills[i].id == bill.id) {
                isTracked = true;
                imgSrc = "/animations/clicked.gif";
            }
        }
        return (
            <li key={i}> 
                <BillItem 
                    imgSrc={imgSrc}
                    trackedStatus={isTracked} 
                    untrackBill={props.untrackBill.bind(this)} 
                    addBillToTracking={props.addBillToTracking.bind(this)} 
                    billInfo={bill}
                    logged={props.logged}
                /> 
            </li>
        )
    })
  
    return (
    <ul style={{"listStyleType":"none", "padding":"0"}}>
        {billList}
    </ul>
    )
}

export default BillList

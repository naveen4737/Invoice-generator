import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import InvoiceModal from "./InvoiceModal";
import { useState } from "react";
import { deleteInvoice, updateToEdit } from "../utils/invoiceSlice";

const InvoiceList = () => {

  const invoices = useSelector((store) => store.invoice.invoices);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const viewModal = (invoice) => {
    setModalVisibility(true);
    setCurrentInvoice(invoice)
  };

  return (
    <div>
      <div>
        <Button variant="primary" className="d-block w-10" onClick={(event)=>{
          event.preventDefault();
          dispatch(updateToEdit({index: null, editing: false}))
          history.push("/add");
        }}>
          Add Invoice 
        </Button>
      </div>
      <div className="invoice-list pt-md-3">
        <h3>{invoices.length==0? "No Invoices to show": "Invoices"}</h3>
        {invoices.map((invoice, index)=>{
          return (<>
            <Card key={index} className="w-100 mt-2">
              <Card.Body>
                <Card.Title>Bill to: {invoice.billTo}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Bill from: {invoice.billFrom}</Card.Subtitle>
                <Card.Text>
                Total: {invoice.currency}{invoice.total}
                </Card.Text>

                <div className="d-flex">
                  <Button variant="primary" onClick={(e)=>{
                    e.preventDefault();
                    viewModal(invoice);
                  }} className="d-block w-10 p-2 me-2">View</Button>

                  <Button variant="danger" onClick={(e)=>{
                    e.preventDefault();
                    dispatch(updateToEdit({index: index, editing: true}))
                    history.push("/edit");
                  }} className="d-block w-10 p-2 me-2">Edit</Button>
                  
                  <Button variant="danger" onClick={(e)=>{
                    e.preventDefault();
                    dispatch(deleteInvoice({index: index}));
                  }} className="d-block w-10 p-2 me-2">Delete</Button>
                  
                  <Button variant="success" onClick={(e)=>{
                    e.preventDefault();
                    dispatch(updateToEdit({index: index, editing: false}))
                    history.push("/edit");
                  }} className="d-block w-10 p-2 me-2">Make New</Button>
                </div>

              </Card.Body>
            </Card>
          </>)
        })}
        
      </div>
      {currentInvoice && <InvoiceModal showModal={modalVisibility} closeModal={()=>setModalVisibility(false)} info={currentInvoice} items={currentInvoice.items} currency={currentInvoice.currency} subTotal={currentInvoice.subTotal} taxAmmount={currentInvoice.taxAmmount} discountAmmount={currentInvoice.discountAmmount} total={currentInvoice.total}/>}
    </div>
  )

}

export default InvoiceList;
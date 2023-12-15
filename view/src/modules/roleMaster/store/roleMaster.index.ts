export default {
  tabs: [
    {
      key: 'preShipment',
      label: 'Pre Shipment',
      children: [
        { key: 'preShipment-country', label: 'Country' },
        { key: 'preShipment-po_no', label: 'PO no.' },
        { key: 'preShipment-supp_po_date', label: 'Supp PO Date' },
        { key: 'preShipment-supplier', label: 'Supplier' },
        { key: 'preShipment-our_po_date', label: 'Our PO Date' },
        { key: 'preShipment-our_po_no', label: 'Our PO no' },
        { key: 'preShipment-buyer', label: 'Buyer' },
        { key: 'preShipment-customer', label: 'Customer' },
        { key: 'preShipment-cust_po_no', label: 'Cust PO no' },
        { key: 'preShipment-payment_term', label: 'Payment Terms' },
        { key: 'preShipment-supp_po_value', label: 'Supp PO Value' },
        { key: 'preShipment-currency', label: 'Currency' },
        { key: 'preShipment-loading_port', label: 'Loading Port' },
        { key: 'preShipment-destination_port', label: 'Destination Port' },
        { key: 'preShipment-final_destination', label: 'Final Destination' },
        { key: 'preShipment-number_of_container', label: 'Number of Container' },
        { key: 'preShipment-sup_po_no', label: 'Supp PO no' },
        { key: 'preShipment-incoterm', label: 'Incoterm' },
        { key: 'preShipment-mode_of_transport', label: 'Mode of Transport' },
        { key: 'preShipment-invoicing_party', label: 'Invoicing Party' },
        { key: 'preShipment-po_details', label: 'PO Details' }
      ]
    },
    {
      key: 'finance',
      label: 'Finance',
      children: [
        { key: 'finance-adv_rec_date', label: 'Adv Rec Date' },
        { key: 'finance-adv_pay_date', label: 'Adv Pay Date' },
        { key: 'finance-purchase_invoice', label: 'Purchase Invoice' },
        { key: 'finance-sale_invoice_val', label: 'Sale Invoice Val' },
        { key: 'finance-sale_inv_no', label: 'Sale Inv no' },
        { key: 'finance-s_f_inv_no', label: 'Supplier Final Invoice no' },
        { key: 'finance-s_final_inv_value', label: 'Supplier final invoice value' },
        { key: 'finance-final_rec_date', label: 'Final Rec Date' },
        { key: 'finance-final_pay_date', label: 'Final Pay Date' },
        { key: 'finance-percentage', label: 'Percentage' },
        { key: 'finance-payment_request_lot', label: 'Payment Request Lot' },
        { key: 'finance-shipping_line', label: 'Shipping Line' }
      ]
    },
    {
      key: 'logistics',
      label: 'Logistics',
      children: [
        { key: 'logistics-dhl_no', label: 'DHL no' },
        { key: 'logistics-inspection', label: 'Inspection' },
        { key: 'logistics-cod_number', label: 'COD Number' },
        { key: 'logistics-rfi_date', label: 'RFI Date' },
        { key: 'logistics-consignee', label: 'Consignee' },
        { key: 'logistics-freight_booking_date', label: 'Freight Booking Date' },
        { key: 'logistics-estimated_dob', label: 'Estimated DOB' },
        { key: 'logistics-freight_booking_no', label: 'Freight Booking no' },
        { key: 'logistics-bl_no', label: 'BL no' },
        { key: 'logistics-revised_dob', label: 'Revised DOB' },
        { key: 'logistics-actual_dob', label: 'Actual DOB' },
        { key: 'logistics-scan_bl_date', label: 'Scan BL Date' },
        { key: 'logistics-stuf_photo', label: 'Stuf Photo' },
        { key: 'logistics-est_arriv_date', label: 'Est Arriv Date' },
        { key: 'logistics-remarks', label: 'Remarks' },
        { key: 'logistics-draft_cnca', label: 'Draft CNCA' },
        { key: 'logistics-original_cnca', label: 'Original CNCA' },
        { key: 'logistics-cnca_agent', label: 'CNCA Agent' },
        { key: 'logistics-dup', label: 'DUP' },
        { key: 'logistics-remarks', label: 'Remarks' },
        { key: 'logistics-container_details', label: 'Container Details' }
      ]
    }
  ]
};

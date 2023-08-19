export const NodeService = {
  getTreeNodesData() {
    return [
      {
        key: '1',
        label: 'Products Master',
        data: 'Products Master',
        children: [
          { key: 'child1-0', label: 'Item no', data: 'item_no', table_name: 'products', master_name: 'Products Master' },
          { key: 'child1-1', label: 'Category Name', data: 'category_name', table_name: 'products', master_name: 'Products Master' },
          { key: 'child1-2', label: 'Item Name', data: 'item_name', table_name: 'products', selected: true, master_name: 'Products Master' },
          { key: 'child1-3', label: 'Long Name', data: 'long_name', table_name: 'products', master_name: 'Products Master' },
          { key: 'child1-4', label: 'Brand', data: 'brand', table_name: 'products', master_name: 'Products Master' },
          { key: 'child1-5', label: 'Additions Details', data: 'additions_details', table_name: 'products', master_name: 'Products Master' },
          { key: 'child1-6', label: 'Container Type', data: 'container_type', table_name: 'products', master_name: 'Products Master' },
          { key: 'child1-7', label: 'pack', data: 'pack', table_name: 'products', master_name: 'Products Master' },
          { key: 'child1-8', label: 'Packsize', data: 'pack_size', table_name: 'products', master_name: 'Products Master' },
          { key: 'child1-9', label: 'UMO', data: 'umo', table_name: 'products', master_name: 'Products Master' },
          { key: 'child1-10', label: 'CBM', data: 'cbm', table_name: 'products', master_name: 'Products Master' },
          { key: 'child1-11', label: 'Loading per container', data: 'loading_per_container', table_name: 'products', master_name: 'Products Master' },
          { key: 'child1-12', label: 'Origin', data: 'origin', table_name: 'products', master_name: 'Products Master' },
          { key: 'child1-13', label: 'Loading Port', data: 'loading_port', table_name: 'products', master_name: 'Products Master' },
          { key: 'child1-14', label: 'Last FOB', data: 'last_fob', table_name: 'products', master_name: 'Products Master' },
          { key: 'child1-15', label: 'Currency', data: 'currency', table_name: 'products', master_name: 'Products Master' },
          { key: 'child1-16', label: 'Date', data: 'date', table_name: 'products', master_name: 'Products Master' },
          { key: 'child1-17', label: 'Supplier', data: 'supplier', table_name: 'products', master_name: 'Products Master' }
        ]
      },
      {
        key: '2',
        label: 'Supplier Master',
        data: 'Supplier Master',
        children: [
          { key: 'child2-0', label: 'SNo', data: 'sno', table_name: 'suppliers', master_name: 'Supplier Master' },
          { key: 'child2-1', label: 'Supplier Name', data: 'supplier_name', table_name: 'suppliers', master_name: 'Supplier Master' },
          { key: 'child2-2', label: 'Address', data: 'address', table_name: 'suppliers', master_name: 'Supplier Master' },
          { key: 'child2-3', label: 'Bank Name', data: 'bank_name', table_name: 'suppliers', master_name: 'Supplier Master' },
          { key: 'child2-4', label: 'Bank Address/Branch', data: 'bank_address_branch', table_name: 'suppliers', master_name: 'Supplier Master' },
          { key: 'child2-5', label: 'Bank A/c no', data: 'bank_a/c_no', table_name: 'suppliers', master_name: 'Supplier Master' },
          { key: 'child2-6', label: 'IBAN No', data: 'ibam_no', table_name: 'suppliers', master_name: 'Supplier Master' },
          { key: 'child2-7', label: 'Swift Code/BIC', data: 'swift_code_bic', table_name: 'suppliers', master_name: 'Supplier Master' },
          { key: 'child2-8', label: 'Country', data: 'country', table_name: 'suppliers', master_name: 'Supplier Master' },
          { key: 'child2-9', label: 'Payment Terms', data: 'payment_terms', table_name: 'suppliers', master_name: 'Supplier Master' },
          { key: 'child2-10', label: 'Contact Person', data: 'contact_person', table_name: 'suppliers', master_name: 'Supplier Master' },
          { key: 'child2-11', label: 'Email', data: 'email', table_name: 'suppliers', master_name: 'Supplier Master' },
          { key: 'child2-12', label: 'Contact No', data: 'Contact No', table_name: 'suppliers', master_name: 'Supplier Master' }
        ]
      },
      {
        key: '3',
        label: 'Customer Master',
        data: 'Customer Master',
        children: [
          { key: 'child3-0', label: 'SNo', data: 'sno', table_name: 'customers', master_name: 'Customer Master' },
          { key: 'child3-1', label: 'Group Name', data: 'group_name', table_name: 'customers', master_name: 'Customer Master' },
          { key: 'child3-2', label: 'Address', data: 'address', table_name: 'customers', master_name: 'Customer Master' },
          { key: 'child3-3', label: 'Country', data: 'country', table_name: 'customers', master_name: 'Customer Master' },
          { key: 'child3-4', label: 'Contact Person', data: 'contact_person', table_name: 'customers', master_name: 'Customer Master' },
          { key: 'child3-5', label: 'Email', data: 'email', table_name: 'customers', master_name: 'Customer Master' },
          { key: 'child3-6', label: 'Contact No', data: 'contact_no', table_name: 'customers', master_name: 'Customer Master' }
        ]
      },
      {
        key: '4',
        label: 'Shipment Master',
        data: 'Shipment Master',
        children: [
          { key: 'child4-0', label: 'PO No', data: 'po_no', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-1', label: 'Supp Po Date', data: 'supp_po_date', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-2', label: 'Supplier', data: 'supplier', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-3', label: 'Invoicing Party', data: 'invoicing_party', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-4', label: 'Our PO Date', data: 'our_po_date', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-5', label: 'Our PO No', data: 'our_po_no', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-6', label: 'Buyer', data: 'buyer', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-7', label: 'Customer', data: 'customer', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-8', label: 'Cust PO No', data: 'cust_po_no', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-9', label: 'Payment Terms', data: 'payment_terms', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-10', label: 'Supp PO Value', data: 'supp_po_value', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-11', label: 'Supp PO No', data: 'supp_po_no', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-12', label: 'Currency', data: 'currency', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-13', label: 'Loading Port', data: 'loading_port', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-14', label: 'Destination Port', data: 'destination_port', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-15', label: 'Final Destination', data: 'final_destination', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-16', label: 'Number of Container', data: 'number_of_container', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-17', label: 'Adv Rec Date', data: 'adv_rec_date', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-18', label: 'Adv Pay Date', data: 'adv_pay_date', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-19', label: 'Purchase Invoice', data: 'purchase_invoice', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-20', label: 'Sale Invoice Val', data: 'sale_invoice_val', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-21', label: 'Sale Inv No', data: 'sale_inv_no', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-22', label: 'Supplier Final Invoice number', data: 'supplier_final_invoice_number', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-23', label: 'Supplier final invoice value', data: 'suppler_final_invoice_value', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-24', label: 'Final Rec Date', data: 'final_rec_date', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-25', label: 'Final Pay Date', data: 'final_pay_date', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-26', label: 'Percentage', data: 'percentage', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-27', label: 'Commission', data: 'commission', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-28', label: 'Share', data: 'share', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-29', label: 'Payment Request Lot', data: 'payment_request_lot', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-30', label: 'DHL No', data: 'dhl_no', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-31', label: 'Inspection', data: 'inspection', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-32', label: 'COD Number', data: 'cod_number', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-33', label: 'RFI Date', data: 'rfi_date', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-34', label: 'Consignee', data: 'consignee', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-35', label: 'Freight Booking Date', data: 'freight_booking_date', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-36', label: 'Freight Booking No', data: 'freight_booking_no', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-37', label: 'Shipping Line', data: 'shipping_line', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-38', label: 'Delay in Loading', data: 'delay_in_loading', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-39', label: 'Estimated DOB', data: 'estimated_dob', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-40', label: 'Revised DOB', data: 'revised_dob', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-41', label: 'Actual DOB', data: 'actual_dob', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-42', label: 'Scan BL Date', data: 'scan_bl_date', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-43', label: 'Stuf Photo', data: 'stuf_photo', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-44', label: 'Est Arriv Date', data: 'est_arriv_date', table_name: 'shipments', master_name: 'Shipment Master' },
          { key: 'child4-45', label: 'BL NO', data: 'bl_no', table_name: 'shipments', master_name: 'Shipment Master' }
        ]
      }
    ];
  },

  getTreeTableNodesData() {
    return [
      {
        key: '0',
        data: {
          name: 'Applications',
          size: '100kb',
          type: 'Folder'
        },
        children: [
          {
            key: '0-0',
            data: {
              name: 'Vue',
              size: '25kb',
              type: 'Folder'
            },
            children: [
              {
                key: '0-0-0',
                data: {
                  name: 'vue.app',
                  size: '10kb',
                  type: 'Application'
                }
              },
              {
                key: '0-0-1',
                data: {
                  name: 'native.app',
                  size: '10kb',
                  type: 'Application'
                }
              },
              {
                key: '0-0-2',
                data: {
                  name: 'mobile.app',
                  size: '5kb',
                  type: 'Application'
                }
              }
            ]
          },
          {
            key: '0-1',
            data: {
              name: 'editor.app',
              size: '25kb',
              type: 'Application'
            }
          },
          {
            key: '0-2',
            data: {
              name: 'settings.app',
              size: '50kb',
              type: 'Application'
            }
          }
        ]
      },
      {
        key: '1',
        data: {
          name: 'Cloud',
          size: '20kb',
          type: 'Folder'
        },
        children: [
          {
            key: '1-0',
            data: {
              name: 'backup-1.zip',
              size: '10kb',
              type: 'Zip'
            }
          },
          {
            key: '1-1',
            data: {
              name: 'backup-2.zip',
              size: '10kb',
              type: 'Zip'
            }
          }
        ]
      },
      {
        key: '2',
        data: {
          name: 'Desktop',
          size: '150kb',
          type: 'Folder'
        },
        children: [
          {
            key: '2-0',
            data: {
              name: 'note-meeting.txt',
              size: '50kb',
              type: 'Text'
            }
          },
          {
            key: '2-1',
            data: {
              name: 'note-todo.txt',
              size: '100kb',
              type: 'Text'
            }
          }
        ]
      },
      {
        key: '3',
        data: {
          name: 'Documents',
          size: '75kb',
          type: 'Folder'
        },
        children: [
          {
            key: '3-0',
            data: {
              name: 'Work',
              size: '55kb',
              type: 'Folder'
            },
            children: [
              {
                key: '3-0-0',
                data: {
                  name: 'Expenses.doc',
                  size: '30kb',
                  type: 'Document'
                }
              },
              {
                key: '3-0-1',
                data: {
                  name: 'Resume.doc',
                  size: '25kb',
                  type: 'Resume'
                }
              }
            ]
          },
          {
            key: '3-1',
            data: {
              name: 'Home',
              size: '20kb',
              type: 'Folder'
            },
            children: [
              {
                key: '3-1-0',
                data: {
                  name: 'Invoices',
                  size: '20kb',
                  type: 'Text'
                }
              }
            ]
          }
        ]
      },
      {
        key: '4',
        data: {
          name: 'Downloads',
          size: '25kb',
          type: 'Folder'
        },
        children: [
          {
            key: '4-0',
            data: {
              name: 'Spanish',
              size: '10kb',
              type: 'Folder'
            },
            children: [
              {
                key: '4-0-0',
                data: {
                  name: 'tutorial-a1.txt',
                  size: '5kb',
                  type: 'Text'
                }
              },
              {
                key: '4-0-1',
                data: {
                  name: 'tutorial-a2.txt',
                  size: '5kb',
                  type: 'Text'
                }
              }
            ]
          },
          {
            key: '4-1',
            data: {
              name: 'Travel',
              size: '15kb',
              type: 'Text'
            },
            children: [
              {
                key: '4-1-0',
                data: {
                  name: 'Hotel.pdf',
                  size: '10kb',
                  type: 'PDF'
                }
              },
              {
                key: '4-1-1',
                data: {
                  name: 'Flight.pdf',
                  size: '5kb',
                  type: 'PDF'
                }
              }
            ]
          }
        ]
      },
      {
        key: '5',
        data: {
          name: 'Main',
          size: '50kb',
          type: 'Folder'
        },
        children: [
          {
            key: '5-0',
            data: {
              name: 'bin',
              size: '50kb',
              type: 'Link'
            }
          },
          {
            key: '5-1',
            data: {
              name: 'etc',
              size: '100kb',
              type: 'Link'
            }
          },
          {
            key: '5-2',
            data: {
              name: 'var',
              size: '100kb',
              type: 'Link'
            }
          }
        ]
      },
      {
        key: '6',
        data: {
          name: 'Other',
          size: '5kb',
          type: 'Folder'
        },
        children: [
          {
            key: '6-0',
            data: {
              name: 'todo.txt',
              size: '3kb',
              type: 'Text'
            }
          },
          {
            key: '6-1',
            data: {
              name: 'logo.png',
              size: '2kb',
              type: 'Picture'
            }
          }
        ]
      },
      {
        key: '7',
        data: {
          name: 'Pictures',
          size: '150kb',
          type: 'Folder'
        },
        children: [
          {
            key: '7-0',
            data: {
              name: 'barcelona.jpg',
              size: '90kb',
              type: 'Picture'
            }
          },
          {
            key: '7-1',
            data: {
              name: 'primeng.png',
              size: '30kb',
              type: 'Picture'
            }
          },
          {
            key: '7-2',
            data: {
              name: 'prime.jpg',
              size: '30kb',
              type: 'Picture'
            }
          }
        ]
      },
      {
        key: '8',
        data: {
          name: 'Videos',
          size: '1500kb',
          type: 'Folder'
        },
        children: [
          {
            key: '8-0',
            data: {
              name: 'primefaces.mkv',
              size: '1000kb',
              type: 'Video'
            }
          },
          {
            key: '8-1',
            data: {
              name: 'intro.avi',
              size: '500kb',
              type: 'Video'
            }
          }
        ]
      }
    ];
  },

  getTreeTableNodes() {
    return Promise.resolve(this.getTreeTableNodesData());
  },

  getTreeNodes() {
    return Promise.resolve(this.getTreeNodesData());
  }
};

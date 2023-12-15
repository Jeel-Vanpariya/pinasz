import axios from 'axios';

export default {
  async getRoles(_: any, data: any) {
    try {
      const response = await axios.post('get-roles', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async saveRole(_: any, data: any) {
    try {
      const response = await axios.post('save-role', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getRoleForEdit(_: any, data: any) {
    try {
      const response = await axios.post('get-role-for-edit', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async deleteRole(_: any, data: any) {
    try {
      const response = await axios.post('delete-role', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getSelectedPermissions(_: any, data: any) {
    const permission = {
      other: data.other,
      shipment: data.shipment,
      shipment_add: { preShipment: [], finance: [], logistics: [] },
      shipment_edit: { preShipment: [], finance: [], logistics: [] },
      customer: data.customer,
      supplier: data.supplier,
      product: data.product,
      report: data.report,
      user: data.user
    } as any;
    for (const key in data.shipment_add) {
      const fields = key.split('-');
      if (permission.shipment_add[fields[0]] && fields[1]) permission.shipment_add[fields[0]].push(fields[1]);
    }
    for (const key in data.shipment_edit) {
      const fields = key.split('-');
      if (permission.shipment_add[fields[0]] && fields[1]) permission.shipment_edit[fields[0]].push(fields[1]);
    }
    return { name: data.name, permissions: JSON.stringify(permission) };
  },
  async setPermissions(context: any, data: any) {
    const roles = [] as object[];
    for (const obj of data) {
      const object = { id: obj.id, name: obj.name, permissions: [] as any };
      let val: any = {},
        flag = false;
      obj.permissions = JSON.parse(obj.permissions);
      for (const key in obj.permissions) {
        if (obj.permissions[key].length > 0) {
          switch (key) {
            case 'other':
              val = { key: key, label: 'Other Master', children: [] };
              for (const str of obj.permissions[key]) {
                val.children.push({ key: str, label: str });
              }
              object.permissions.push(val);
              break;
            case 'customer':
              val = { key: key, label: 'Customer Master', children: [] };
              for (const str of obj.permissions[key]) {
                val.children.push({ key: str, label: str });
              }
              object.permissions.push(val);
              break;
            case 'supplier':
              val = { key: key, label: 'Supplier Master', children: [] };
              for (const str of obj.permissions[key]) {
                val.children.push({ key: str, label: str });
              }
              object.permissions.push(val);
              break;
            case 'product':
              val = { key: key, label: 'Product Master', children: [] };
              for (const str of obj.permissions[key]) {
                val.children.push({ key: str, label: str });
              }
              object.permissions.push(val);
              break;
            case 'report':
              val = { key: key, label: 'Report Master', children: [] };
              for (const str of obj.permissions[key]) {
                val.children.push({ key: str, label: str });
              }
              object.permissions.push(val);
              break;
            case 'user':
              val = { key: key, label: 'User Master', children: [] };
              for (const str of obj.permissions[key]) {
                val.children.push({ key: str, label: str });
              }
              object.permissions.push(val);
              break;
            case 'shipment':
              val = { key: key, label: 'Shipment Master', children: [] };
              for (const str of obj.permissions[key]) {
                val.children.push({ key: str, label: str });
              }
              object.permissions.push(val);
              break;
          }
        }
      }
      val = { key: 'shipment_add', label: 'Shipment Master (Add)', children: [] };
      for (const key in obj.permissions.shipment_add) {
        if (obj.permissions.shipment_add[key].length > 0) {
          flag = true;
          const tab = context.state.tabs.filter((item) => item.key == key)[0],
            child = [];
          for (const str of obj.permissions.shipment_add[key]) {
            child.push(tab.children.filter((item) => item.key.includes(str))[0]);
          }
          tab.children = child;
          val.children.push(tab);
        }
      }
      if (flag) {
        object.permissions.push(val);
        flag = false;
      }
      val = { key: 'shipment_edit', label: 'Shipment Master (Edit)', children: [] };
      for (const key in obj.permissions.shipment_edit) {
        if (obj.permissions.shipment_edit[key].length > 0) {
          flag = true;
          const tab = context.state.tabs.filter((item) => item.key == key)[0],
            child = [];
          for (const str of obj.permissions.shipment_edit[key]) {
            child.push(tab.children.filter((item) => item.key.includes(str))[0]);
          }
          tab.children = child;
          val.children.push(tab);
        }
      }
      if (flag) object.permissions.push(val);

      roles.push(object);
    }
    return roles;
  }
};

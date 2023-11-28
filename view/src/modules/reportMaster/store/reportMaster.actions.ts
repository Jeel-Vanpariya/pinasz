import axios from 'axios';

export default {
  async getReportBlueprints() {
    try {
      const response = await axios.post('get-report-blueprints');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async saveReportBlueprint(_: any, data: any) {
    try {
      const response = await axios.post('save-report-blueprint', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async deleteReportBlueprint(_: any, data: any) {
    try {
      const response = await axios.post('delete-report-blueprint', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getBlueprintForEdit(_: any, data: any) {
    try {
      const response = await axios.post('get-report-blueprint-for-edit', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getReportData(_: any, data: any) {
    try {
      const response = await axios.post('get-report-data', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async saveReportData(_: any, data: any) {
    try {
      const response = await axios.post('save-report-data', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getReports() {
    try {
      const response = await axios.post('get-reports');
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async deleteReport(_: any, data: any) {
    try {
      const response = await axios.post('delete-report', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async sendMail(_: any, data: any) {
    try {
      const response = await axios.post('send-mail', data);
      return response.data;
    } catch (error) {
      return { status: 'error', data: error };
    }
  },
  async getSelectedModules(context: any, data: any) {
    for (const object of context.state.masters) {
      let length = 0;
      for (const obj of object.children) {
        if (Object.keys(data.report_columns).includes(obj.key)) {
          if (data.columns[object.data] == undefined) {
            data.columns[object.data] = [];
          }
          data.columns[object.data].push(obj.data);
        }
        if (data.columns[object.data] && data.columns[object.data].includes(obj.data)) {
          length++;
          data.report_columns[obj.key] = { checked: true, partialChecked: false };
          data.report_columns[object.key] = {
            checked: length == object.children.length,
            partialChecked: length !== object.children.length
          };
        }
      }
      for (const item of data.res) {
        item.report_columns = typeof item.report_columns == 'string' ? JSON.parse(item.report_columns) : item.report_columns;
        if (!item.columns) item.columns = [];
        if (item.primary_master == object.data) item.primary_master = object.label;
        if (item.second_master == object.data) item.second_master = object.label;
        if (item.third_master == object.data) item.third_master = object.label;
        if (item.forth_master == object.data) item.forth_master = object.label;
        if (item.report_columns[object.data] && item.columns.filter((obj: any) => obj.key == object.key).length == 0) {
          const node = { key: object.key, label: object.label, children: [] as any };
          for (const obj of object.children) {
            if (item.report_columns[object.data].includes(obj.data)) {
              node.children.push({ key: obj.key, label: obj.label });
            }
          }
          item.columns.push(node);
        }
      }
    }
    return data;
  }
};

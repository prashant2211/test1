import Papa from 'papaparse';

const removeUserId = (data) => {
    return data.map(({ userId,id,mT5Id,requestId, ...rest }) => rest);
  };

export const exportData = (data, fileName) => {
    const filteredData = removeUserId(data);
    const csv = Papa.unparse(filteredData);
    const csvData = new Blob([csv], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvData);
  
    const link = document.createElement('a');
    link.href = csvUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
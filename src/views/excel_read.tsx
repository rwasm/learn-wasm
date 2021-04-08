import React, { useState, useEffect } from 'react';
import init, { read_excel_file } from '@rsw/excel-read';

export default function ExcelReadPage() {
  const [data, setData] = useState({});
  useEffect(() => {
    init();
  })

  const handleUpload = async (e: any) => {
    const file: File = e.target.files[0];

    read_excel_file(file, [1], [], "")
      .then((res: JSON) => {
        setData(res);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  }

  return (
    <div className="excel-read">
      <input type="file" onChange={handleUpload} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
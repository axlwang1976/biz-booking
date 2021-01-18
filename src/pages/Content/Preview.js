import React, { useEffect, useState } from 'react';
// import { VideoCameraOutlined } from '@ant-design/icons';

const Preview = ({ record, getPreview, id }) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const preview = async () => {
      const res = await getPreview(id);
      setUrl(res);
    };
    preview();
  }, [getPreview, id]);

  return record.MediaType === 'image' ? (
    <div style={{ width: 'auto', height: '100px' }}>
      <img src={url} alt={record.FileName} style={{ maxHeight: '100%' }} />
    </div>
  ) : (
    <div style={{ width: 'auto', height: '100px' }}>
      {/* <VideoCameraOutlined /> */}
      <video
        src={url}
        controls
        style={{ width: 'auto', height: '100px' }}
      ></video>
    </div>
  );
};

export default Preview;

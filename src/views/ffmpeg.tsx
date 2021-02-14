import React, { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

export default function FfmpegPage() {
  const [ready, setReady] = useState<boolean>(false);
  const [convertStatus, setConvertStatus] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [gif, setGif] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      await ffmpeg.load();
      setReady(true);
    })();
  }, [])

  const convertToGif = async () => {
    if (!file) return;
    const name = file?.name;
    // write the file to memory
    ffmpeg.FS('writeFile', name, await fetchFile(file));

    setConvertStatus(true);

    // run the FFMpeg command
    await ffmpeg.run('-i', name, 'test.gif');

    setConvertStatus(false);

    // read the result
    const data = ffmpeg.FS('readFile', 'test.gif');

    // Create a URL
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
    setGif(url);
  };

  return ready ? (
    <div>
      {file && (
        <video
          controls
          width={400}
          src={URL.createObjectURL(file)}
        />
      )}
      <br />
      <input type="file" onChange={(e: any) => setFile(e.target.files?.[0])} />
      <br />
      {file && <button onClick={convertToGif}>convert to gif</button>}
      <br />
      {convertStatus && <div>{file?.name} being converted</div>}
      {gif && <img width={500} src={gif} />}
    </div>
  ) : <div>loading...</div>;
}
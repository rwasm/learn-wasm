import React, { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({
  log: true,
  mainName: 'main',
  corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
});

export default function FfmpegPage() {
  const [ready, setReady] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Click Start to transcode');
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
    setMessage('Start transcoding');
    ffmpeg.FS('writeFile', name, await fetchFile(file));

    // run the FFMpeg command
    await ffmpeg.run('-i', name, 'test.gif');
    setMessage('End transcoding');

    // read the result
    const data = ffmpeg.FS('readFile', 'test.gif');

    // Create a URL
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
    setGif(url);
  };

  return ready ? (
    <div>
      <Video file={file} />
      <br />
      <input type="file" onChange={(e: any) => setFile(e.target.files?.[0])} />
      <br />
      {file && <button onClick={convertToGif}>convert to gif</button>}
      <br />
      {message}
      <br />
      {gif && <img width={500} src={gif} alt="" />}
    </div>
  ) : <div>loading...</div>;
}

const Video = React.memo(({ file }: { file: File | null }) => {
  return file && (
    <video
      controls
      width={400}
      src={URL.createObjectURL(file)}
    />
  )
})
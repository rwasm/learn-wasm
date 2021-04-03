import React, { useRef, useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

export default function FfmpegPage() {
  const [ready, setReady] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Click Start to transcode');
  const [file, setFile] = useState<File | null>(null);
  const [gif, setGif] = useState<string | null>(null);
  const [ratio, setRatio] = useState<number>(0);

  useEffect(() => {
    (async () => {
      await ffmpeg.load();
      setReady(true);
      ffmpeg.setProgress((params) => {
        setRatio(+(params.ratio * 100).toFixed(2));
      })
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
      {ratio !== 0 && ratio !== 100 && (
        <div>{ratio}%</div>
      )}
      <br />
      {gif && <img width={500} src={gif} />}
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
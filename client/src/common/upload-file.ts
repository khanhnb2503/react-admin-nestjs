import type { RcFile } from 'antd/es/upload/interface';

const typeFileUploads = ['image/png', 'image/jpeg'];

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const beforeUpload = (file: RcFile) => {
  let existFileType = typeFileUploads.includes(file.type);
  if (!existFileType) console.log('error');

  let existFileSize = file.size / 1024 / 1024 < 2;
  if (!existFileSize) console.log('error');

  return existFileType && existFileSize;
};


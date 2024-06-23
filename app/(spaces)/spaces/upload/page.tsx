
import ClientOnly from '@/app/(website)/components/ClientOnly';
import Upload from '../components/upload/Upload';

const UploadPage = () => {
 
  return (
    <ClientOnly>
      <Upload/>
    </ClientOnly>
  );
};


export default UploadPage;
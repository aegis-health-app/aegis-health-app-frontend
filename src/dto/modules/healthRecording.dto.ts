import { ImagePickerResponse } from 'react-native-image-picker';

export interface CustomHealthRecordingTemplate {
  _title?: string;
  _picture?: ImagePickerResponse;
  _defaultPictureUri: string;
  _fieldList?: { name: string | undefined; unit: string | undefined }[];
}

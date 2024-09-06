import { Platform, Alert } from 'react-native';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { COLORS } from '../constants';

// To print console logs
export function print(msg1, msg2, type) {
    if (type == 1)
        console.log(COLORS.CONSOLE_GREEN, msg1, COLORS.CONSOLE_WHITE, msg2);
    else if (type == 0)
        console.log(COLORS.CONSOLE_RED, msg1, COLORS.CONSOLE_WHITE, msg2);
    else
        console.log(msg1 + msg2);
}

//Check permission
export const checkPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        // Requesting read and write storage permissions
        console.log("Into permission Block");
        
        const writePermission = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        const readMediaAudio = await request(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO);
        const readPermission = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        
        // Check if both permissions are granted
        if (
          readPermission === RESULTS.GRANTED &&
          writePermission === RESULTS.GRANTED &&
          readMediaAudio === RESULTS.GRANTED
        ) {
          return true;
        } else {
          console.log(
            'Storage Permission Required',
            'This app needs access to your storage to download the file.'
          );
          return false;
        }
      } else {
        return true;
      }
    } catch (err) {
      console.log('Permission Error', err.toString());
      return false;
    }
  };
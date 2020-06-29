# taken from https://github.com/brainhubeu/react-native-opencv-tutorial/blob/master/downloadAndInsertOpenCV.sh

# android

wget ${base_url}/opencv-${version}-android-sdk.zip
unzip opencv-${version}-android-sdk.zip
cd android/app/src/main
mkdir jniLibs
cp -r ./../../../../OpenCV-android-sdk/sdk/native/libs/ ./jniLibs
cd ../../../../
rm -rf opencv-${version}-android-sdk.zip
rm -rf OpenCV-android-sdk/


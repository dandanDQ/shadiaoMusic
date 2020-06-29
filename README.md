shadiaoMusic

A android app to create music for fun.


### set up 
```
npm run install
npm run android
```


#### 颜色值对应

红：'#d93732'
黄：'#f2af22'
紫：'#985978'
淡黄：'#fdf2dc'
绿：'#a7b11c'


#### 项目目录结构

src
    audio //音频提取
        audio.js //音频主界面
    video //视频提取
        camera.js //相机组件
        video.js //视频主界面
    record //录音
        record.js //录音组件
    piano //钢琴
        Piano.js  //钢琴组件
        Key.js   //钢琴琴键
    genMusic
        genMusic.js  //传入数组生成音乐
    img    //存放图片资源



#### to do list 

- [x] 主界面样式修改

- [x] 根据midi值获取mp3文件
   位置：scr/genMusic/genMusic.js  getFile(midi)函数
   内容：将midi值与piano/midi文件夹下的音频文件（需要找新的文件）对应

- [x] 钢琴琴键对应

c2到e3，对应36到52
c3到e4，对应48到64
c4到e5，对应60到76
c5到e6，对应72到88
   位置：src/app.js onPlay函数，根据传入midi值播放音乐，可尝试使用genMusic.genMusic

- [ ] 钢琴记录（先外录

- [ ] 将摄像改为拍照，获取图片文件，根据某种规则生成notes数组（genMusic函数的参数），找一下处理图片的库
    位置：src/video/camera.js和src/video/video.js
    相机源代码再node_modules下的react-native-camera

- [ ] 音频的处理
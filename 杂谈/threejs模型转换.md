## Three.js 模型格式转换

### 1 OBJ 转换为 GLTF

安装 obj2gltf

`npm install obj2gltf`

使用 obj2gltf

`obj2gltf -i ./model.obj -o model.gltf`

### 2 GLTF 转换为 GLB

安装 gltf-pipeline

`npm install gltf-pipeline`

使用 gltf-pipeline

`gltf-pipeline -i model.gltf -o model.glb -d`

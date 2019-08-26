---
title: Button 按钮
---

### Button 按钮

#### 基础用法

<Button-Basis />
``` vue
<v-button>设置</v-button>
```

#### 禁用状态

<Button-Disabled />
``` vue
<v-button disabled>设置</v-button>
```

#### 按钮组

<Button-Group />
``` vue
<v-button-group>
    <v-button>上一页</v-button>
    <v-button>下一页</v-button>
</v-button-group>
<v-button-group>
    <v-button>下载</v-button>
    <v-button>上传</v-button>
    <v-button>设置</v-button>
</v-button-group>
```

#### 加载中

<Button-Loading />
``` vue
<v-button loading>加载中...</v-button>
```

#### Attributes

| 参数        | 说明         | 类型    | 可选值  | 默认值 
| ---------- |--------------| -------| -----|-----
| icon      | 图标类名       | string |-     |-
| iconPosition   | 图标位置  | string | right / left | left
| loading   | 加载状态       | boolean | - | false
| disabled      | 禁用     | boolean | - | false

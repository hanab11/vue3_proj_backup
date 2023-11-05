prettier和eslint：prettier主要针对写法错误，eslint主要针对逻辑错误，（如报错，新配置需重启）  
pnpm的优点：node_modules非常直观，只展示最外层的依赖库，内层的基础依赖库全放在.pnpm文件夹里

# 配置说明

```
package.json =依赖包
pnpm-lock.yaml =pnpm生成的依赖锁（版本）
tsconfig.json tsconfig.node.json =ts的配置
vite.config.ts =vite的配置
commitlint.config.cjs =git提交校验
.eslintrc.cjs .eslintignore =eslint配置、规则、对谁忽略
.stylelintrc.cjs .stylelintignore =stylelint配置、规则、对谁忽略
.prettierrc.json .prettierignore =prettier配置、规则、对谁忽略
.env.development .env.production .env.test =env环境变量，默认使用development

.husky/pre-commit 提交之前的配置（一般是提交格式化）
.husky/commit-msg 提交消息的配置（一般是提交校验）
<!-- src/vite-env.d.ts env环境变量的配置（不同环境不同数据） -->

《git提交校验》现在当我们填写`commit`信息的时候，前面就需要带着下面的`subject`和`: `
'add',//添加必要的功能、资源（admin项目，登录、管理等功能，及其相关图片资源）
'chore',//其他修改, 比如改变构建流程、或者增加依赖库、工具等
'feat',//新特性、新功能
'fix',//修改bug
'docs',//文档修改
'perf',//优化相关，比如提升性能、体验
'refactor',//代码重构
'style',//代码格式修改, 注意不是 css 修改
'test',//测试用例修改
'build',//编译相关的修改，例如发布版本、对项目构建或者依赖的改动
'revert',//回滚到上一个版本
```

# 配置内容
```
项目的初始化（✔，pnpm）
eslint校验代码配置（✔）
prettier格式化配置（✔）
styleLint配置（暂时不装，调整样式的顺序）
husky配置（✔，格式化暂存区得在prettier安装后）
commitLint配置（✔，最先配置上）
统一包管理器工具下载依赖（暂时不装，有点bug）
element-plus集成（✔）
src文件夹别名@配置（✔）
项目环境变量的配置（✔，默认使用development）
svg图标的封装与使用（✔）
自定义插件注册全局组件 包括svg等（✔）
集成sass（✔）
mock接口，会用到axios（✔）
axios二次封装，目的：用请求响应拦截器（✔）
API接口统一管理，有各种功能，都依赖axiosRequest（✔）
模板路由配置（✔）
```
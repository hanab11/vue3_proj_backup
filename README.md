# 项目存在的问题（时间节点：基本完成布局界面后的）

问题：

1. 登录成功后，还能访问并停留在login页面（需求是login页面自动路由跳转）
2. 刷新页面后，用户信息就没了（因为目前挂载只在home页面，需求是所有页面刷新都保持用户信息）
3. 路由跳转时，进度条业务
4. token过期后，就不应该获取用户信息，应该自动退出到login页面

...

# 配置说明

pnpm的优点：安装依赖方便，node_modules非常直观，只展示最外层的依赖库，内层的基础依赖库全放在.pnpm文件夹里  
prettier和eslint：prettier主要针对写法错误，eslint主要针对逻辑错误，（如报错，新配置需重启）

```
.husky/pre-commit = 提交之前的配置（一般放提交格式化）
.husky/commit-msg = 提交消息的配置（一般放提交校验）
src/setting.ts = 项目配置，存放开发和生产环境相同的配置（.env环境变量用于切换不同的配置）
src/vite-env.d.ts = vite-env环境变量的配置（暂没用）

.env.development .env.production .env.test = env环境变量，默认使用development
.eslintrc.cjs .eslintignore = eslint的配置、规则、对谁忽略
.prettierrc.json .prettierignore = prettier的配置、规则、对谁忽略
commitlint.config.cjs = git提交校验规则
package.json = 依赖包
pnpm-lock.yaml = pnpm生成的依赖锁（版本）
tsconfig.json tsconfig.node.json = ts的配置
vite.config.ts = vite的配置
.stylelintrc.cjs .stylelintignore = stylelint的配置、规则、对谁忽略


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

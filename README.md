# LiDaoChong.github.io
a menu Linkage studies test
# 黑夜与白昼 千里不问今 奈何成归意 置我若罔闻
<hr/>
</br>
  早先糊弄的CSS3 js 三维折叠菜单和一些交互DEMO https://lidaochong.github.io/3dmenu/
 </br>
  Svg 拓展树节点原型 https://lidaochong.github.io/svgListTree/svgListTree.html
 </br>
 小电商切图 https://lidaochong.github.io/e-businesscut/index.html
 </br>
 Canvas 倒挂彩虹 https://lidaochong.github.io/canvasrainbow/rainbow.html
 </br>
 flex移动端发言list https://lidaochong.github.io/flex-layout/flex-layout.html
</br>
<hr/>
# npm 文档翻译
## 入门指南
     01- 什么是npm?
            它便于javaScript开发者分享和重用代码，而且方便对于发布的代码进行升级。
            如果你已经用JS工作过一段时间，你可能听说过npm,它可以让js开发者容易的分享他们为解决特定问题而创建的代码，
     其他开发者也可以方便的重用这些代码到自己的项目。
            一旦你依赖一些别人开发的代码，npm可以相当方便的检查他们所做的更新并下载更新。
            那些可重用的二进制代码被称作包或者有时候称作模块，一个包(package) 就是组成包的一个活多个文件的目录，同时
包含一个关于这个包的元数据的（‘package.json’）文件。一个典型的应用，比如一个网站，将依赖许多包，这些包经常是很小
的，通常的做法是你构建一个小模块来针对一些问题并解决它，这些小构建可能共同组成比较大的，特定问题的定制方案。
       这有很多好处，你的团队可以引入专业领域以外的包，但是你可能不需要引入其他包，这种基于模块的构建方法可以
非常有助于你的团队协作，并且使跨项目的代码重用成为可能。
        通过浏览npm网站，你可以找到有助于你构建应用的包。在这里你可以找到许多不同种类的包，以便于你可以找到对你
有用的。这里也有许多在命令行中使用的包。此时，你可以找到许多可以在浏览器和前端中使用的包。
         现在你已经知道npm可以做什么，接下来让我们说说它是怎么工作的。当人们谈起npm，他们通常讨论的是三件事中的。
正如我们刚刚看到的，他们讨论网站，或者他们讨论注册（配置）表，这是人们分享的模块的一个大的数据信息表，第三件
事是人们可能讨论客户端：当开发人员决定分享他们的代码，他们用安装在他们主机的npm客户端来公开他们的代码到注册
机构，一旦他们登记这些包到注册机构，其他人就可以用npm去安装这些包。这些被发布的包的会出现在一个专门关注新包
的页面。
所以什么是npm,就是一个可以重用他人的代码，同样可以分享代码，并且可以方便管理代码版本的方法。

 02-安装Node.js和更新npm 
     安装Node.js
     如果你用的是OS X 或者Windows，最好的方法安装Node.js发布的安装程序。如果用的是Liunx，你可以用安装程序，或者
你可以检查发行的适合的最近版本。
     Test: Run node -v. The version should be higher than v0.10.32.
  升级更新npm
 Node 组件附带一个npm安装所以你可能已经安装了npm,然而，npm比Node更新频繁的多，所以你应当确保最新版本。
     npm install npm@latest -g
     Test: Run npm -v. The version should be higher than 2.1.8.
 手动安装npm
     高级用户适用。
    npm module 可以这样的方式获得
     https://registry.npmjs.org/npm/-/npm-{VERSION}.tgz.

  修复npm权限
     当你试图全局安装一个包的时候，你可能收到一个‘创建制定类型的套接字失败’的错误（EACCES error）。
   这表明当你用npm存储全局包和命令的时候没有写入权限。
    你可以用下面的三个选项修复这个问题：
    -1- 为npm的默认目录更改权限
    -2- 改变npm的默认目录为其他目录
    -3- 安装node附带的包管理器为你解决这个问题
   你应该在进行之前备份你的电脑相关地方
    -1-为npm的默认目录更改权限
     找到npm 的目录路径
        npm config get prefix 
        在一些系统，这需要 /usr/local
        警告：如果显示路径仅仅是/usr,请选择第二种方法，否则可能会打乱你的权限。
        改变npm 的目录所有者为当前用户
           sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
         这改变了npm子目录和其他工具的权限 （lib/node_modules,bin,and share）
     -2- 改变npm的默认目录为其他目录
          有些时候你不想改变npm所使用的缺省目录的所有权(例如/ usr),
                   因为这可能会导致一些问题,例如,如果你与其他用户共享系统
                     可替代的方案是，你可以配置npm去用一个不同的目录，基于这种情况，这里将在home 文件里做一个隐藏文件夹。
                            1, 创建一个全局目录安装
                                    mkdir ~/.npm-global
                            2, 设置npm用这个新路径
                                     npm config set prefix '~/.npm-global'
                            3, 打开或者创建一个 ~/.profile文件并加入下面这行 
                                     export PATH=~/.npm-global/bin:$PATH
                            4, 回到命令行，更新你的系统变量
                                     sourse ~/.profile
                        测试：用sudo(管理员权限)下载并全局安装一个包
                             npm install -g jshint
                  2~4步的替代方案是，你也可以用对应的ENV variable(环境变量) （e.g. 比如你不想修改~/profile）:
                            NPM_CONFIG_PREFIX=~/.npm-global
             -3- 安装node附带的包管理器为你解决这个问题
            如果你新安装了node到MAC OS 你可以完全避免这个问题，通过使用自定义包管理工具，它可以利益修改权限功能。
            brew install node 
            
   04 局部（项目本地）安装npm
    这里有两种方式安装npm：本地安装和全局安装。你选择哪一种决定于你想要的使用npm的方式。
    如果你想从局部模块中构建依赖包 ，就像Node.js 的require，这时你需要本地安装，这正是npm的默认安装行为。
    另一方面，你想像使用命令行工具一样使用它，比如像grunt CLI 命令，那么你需要在全局安装它。

    学习更多 安装 命令的行为，查看这个CLI doc page.
  
  安装过程
    一个包可以用这个命令下载
    > npm install <package_name> 

    这将在你的当前目录创建一个node_modules 目录（如果这个目录还不存在），并将下载这npm包到这个目录下。
    测试：
     确保npm正确安装了，检查node_modules目录存在与否并且它里面包含你安装的包的目录结构和文件，你可以在Unix类型的系统上运行 ls node_modules 命令 做这件事，例如:"OSX","Debian",或 在Windows上 dir node_modules  。
    范例：
       安装lodash工具包，查看node_modules目录下是否列出了lodash目录，确认它成功安装。
       > npm install lodash
       > ls node_modules          # use 'dir' for Windows
       #=> lodash
  安装了包的哪一个版本？ 
     如果在本地目录下没有package.json这个文件，这最新版本即已成功安装了。
     如果存在package.json，已安装的那个包（如果有一些发布版本）符合 semver rule版本号声明规范的版本号声明在了package.json文件里了。
     使用安装的包
    一旦包在node_modules里面，你可以在你的代码里用它。举例：假设你正创建一个Node.js模块，你可以require 它。
     范例：
        创建文件名为 index.js 的一个文件，包含以下代码
        //index.js
        var lodash = require('lodash');
        
        var output = loadash.without([1,2,3],1);
        console.log(output);
        
        运行 node index.js. 它应该输出[2,3]。
        如果你没有正确安装lodash，你可能收到这个错误：
           module.js:340
               throw err;
            
           Error: Cannot find module 'lodash'
     修复这个问题，在你index.js文件的同级目录下运行 npm install lodash 。 

05 使用package.json
     管理本地安装的npm包的最后方式是创建一个package.json文件。
     一个 package.json文件可以提供给你许多重要的事情：
    1.它作为关于你的项目中依赖哪些包的文档信息提供。
    2.它可以让你用semantic versioning rules版本规则为你的项目中包指定版本。
    3.使你的构建可复制再生，这是分享给其他开发者的便利方式。

    应该具备
      作为最低配置条件，一个package.json 必须有：
      ‘name’
            所有字母小写
            一个词，无空格
            允许连字符和下划线
        ‘version’
            格式为 x.x.x
            遵从semver spec规则
        实例：
        {
                      "name": "my-awesome-package",
                      "version": "1.0.0"
               ｝

        创建一个package.json
          > npm init
        这将通过运行一个命令行调查问卷，为你要创建的package.json文件获取相关相关参数。
        来自CLI Q&A的经验并不一定在任何时候适用，
        当你习惯用package.json，你将喜欢更快速的体验。
        你将获得一个默认的package.json 通过运行 npm init 连同使用 --yes 活 -y 标志命令。
        > npm init --yes
        这样将不会问你任何问题了，并且填充默认的参数值。
        
        > npm init --yes
        写入到 /home/ag_dubs/my_package/package.json:
        {
          "name":"my_package",
          "description":"",
          "version":"1.0.0"
          "main":"index.js"
          "scripts":{
            "test":"echo \"Error: no test specified\" && exit 1"
           },  
          "keywords":[],
                      "author": "",
                      "license": "ISC",
                      "repository": {
                      "type": "git",
                      "url": "https://github.com/ashleygwilliams/my_package.git"
                      },
                      "bugs": {
                        "url": "https://github.com/ashleygwilliams/my_package/issues"
                      },
                      "homepage": "https://github.com/ashleygwilliams/my_package"
                    }
      （署名）name:默认为作者名字，除非是在git目录中，这种情况下指目录
      （描述）description：空
     （版本）version: always 1.0.0
（模块入口文件） main: always index.js
（测试脚本）scripts: 默认创建空的测试脚本
 （密码）keywords: empty
 （发行签名）author: empty
  （授权协议类型）license: ISC （授权协议）
 （存储仓库位置）repository: 当填入当前目录信息，如果存在
  （调试信息）bugs: will pull in info from the current directory, if present
   （ 发行主页）homepage: will pull in info from the current directory, if present
You can also set several config options for the init command. Some useful ones:
你也可以设置一些配置选项通过初始化命令， 一些有用的：

> npm set init.author.email "wombat@npmjs.com"
> npm set init.author.name "ag_dubs"
> npm set init.license "MIT"

注解：
    如果package.json没有description 这个字段，npm 使用第一行作为自述的替代（README.md or README）。描述信息帮助人们通过npm找到你的包，所以清楚的定制描述在package.json可使你的包容易被发现。

    Customizing the init process
        定制初始化过程

     同样的，你可以完整的定制初始化的过程中的问题，通过创建一个定制脚本 .npm-init.js .
        默认的，npm将查找你的根目录 ~/.npm-init.js  
    简单的例子： .npm-init.js 可以获知类似以下这样的一些事:
        module.exports = {
            customField: 'Custom Field',
            otherCustomField: 'This field is really cool'
        }
        在你的项目根目录下运行 npm init ，将输出一个package.json 简单如下：
           {
            customField: 'Custom Field',
            otherCustomField: 'This field is really cool'
           }
        
          用promt 函数，同样可以定制问题集。
            module.exports = prompt("what's your favorite flavor of ice cream buddy?", "I LIKE THEM ALL");
            
        学习更多关于自定义的建议，查阅这个文档 init-package-json

    指定包
        要制定你的项目所依赖的包，你需要在package.json中列出你要使用的包。你需要列出的有两种类型的包：
    "dependencies":这里指定是你需要在生产环境中依赖的包。
    "devDependencies": 这里指定仅需要在开发环境中和测试环境中依赖的包。
 
   手动编辑你的package.json
     你可以手动编辑package.json 。你需要在其中创建一个叫做 dependencies 的属性,用来指向一个对象。这个对象将拥有一个被命名的属性正是你希望使用的包名，它指向一个指定版本的符合semver 表达式规范的版本号，这版本号使那些项目可以在你的项目中共存。
如果你需要本地开发中进行依赖管理，你只需要遵循上面的说明，仅有一个属性 devDependencies不同。
实例： 
     例如:下面的项目使用任何版本的包 my_dep匹配主要版本1在生产环境中,并要求任何版本的包my_test_framework匹配主要版本3,但只在生产环境中: 
{
  "name": "my_package",
  "version": "1.0.0",
  "dependencies": {
    "my_dep": "^1.0.0"
  },
  "devDependencies" : {
    "my_test_framework": "^3.1.0"
  }
}

 安装参数 --save  和 --save-dev 
     比在package.json中加入dependencies 更简单更好的管理依赖的方式是命令行。
    用save 和 --save-dev任何一个标志 这条 npm install 命令， 用哪个取决于你希望建立什么样的依赖环境。
         加入一个入口在你的package.json中的 dependencies:
            npm install <package_name> --save
         加入一个入口在你的package.json中的 devDependencies:
            npm install <package_name> --save-dev
     
管理依赖版本 
    npm使用语义化版本管理，正如SemVer规范一样， 管理包的版本和发展。
如果你的项目目录中有一个package.json文件，当你运行npm install 的时候，npm将检查其中列出的依赖文件，并下载符合semver rules   的所以文件到最新版本。

去学习更多语义化版本管理，查看  Getting Started "Semver" page.

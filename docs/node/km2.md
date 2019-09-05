## km2特性
>+ 内建负载均衡（使用Node cluster 集群模块）
>+ 后台运行
>+ 0秒停机重载，我理解大概意思是维护升级的时候不需要停机.
>+ 具有Ubuntu和CentOS 的启动脚本
>+ 停止不稳定的进程（避免无限循环）
>+ 控制台检测
>+ 提供 HTTP API
>+ 远程控制和实时的接口API ( Nodejs 模块,允许和PM2进程管理器交互 )

## 启动服务
pm2 start app.js                //启动app.js应用
pm2 start app.js --name demo    //启动应用并设置name
pm2 start app.sh                //脚本启动
## 停止服务
pm2 stop all               //停止所有应用
pm2 stop [AppName]        //根据应用名停止指定应用
pm2 stop [ID]             //根据应用id停止指定应用
## 删除应用
pm2 delete all               //关闭并删除应用
pm2 delete [AppName]        //根据应用名关闭并删除应用
pm2 delete [ID]            //根据应用ID关闭并删除应用
## 创建开机自启动
pm2 startup
## 更新PM2
pm2 updatePM2
pm2 update
## 监听模式
pm2 start app.js --watch    //当文件发生变化，自动重启
## 静态服务器
pm2 serve ./dist 9090        //将目录dist作为静态服务器根目录，端口为9090
## 启用群集模式（自动负载均衡）
//max 表示PM2将自动检测可用CPU的数量并运行尽可能多的进程
//max可以自定义，如果是4核CPU，设置为2者占用2个
pm2 start app.js -i max
## 重新启动
pm2 restart app.js        //同时杀死并重启所有进程。短时间内服务不可用。生成环境推荐使用reload
## 0秒停机重新加载
pm2 reload app.js        //重新启动所有进程，始终保持至少一个进程在运行
pm2 gracefulReload all   //优雅地以群集模式重新加载所有应用程序
## 查看启动列表
pm2 list
## 查看每个应用程序占用情况
pm2 monit
## 显示应用程序所有信息 
pm2 show [Name]      //根据name查看
pm2 show [ID]        //根据id查看
## 日志查看
pm2 logs            //查看所有应用日志
pm2 logs [Name]    //根据指定应用名查看应用日志
pm2 logs [ID]      //根据指定应用ID查看应用日志
## 保存当前应用列表
pm2 save
## 重启保存的应用列表
pm2 resurrect
## 清除保存的应用列表
pm2 cleardump
## 保存并恢复PM2进程
pm2 update
## PM2配置文件方式
生成示例配置文件
pm2 ecosystem        //生成一个示例JSON配置文件
pm2 init
配置文件示例（实际使用自行删除）
```
module.exports = {
    apps : [{
        name      : 'API',      //应用名
        script    : 'app.js',   //应用文件位置
        env: {
            PM2_SERVE_PATH: ".",    //静态服务路径
            PM2_SERVE_PORT: 8080,   //静态服务器访问端口
            NODE_ENV: 'development' //启动默认模式
        },
        env_production : {
            NODE_ENV: 'production'  //使用production模式 pm2 start ecosystem.config.js --env production
        },
        instances:"max",          //将应用程序分布在所有CPU核心上,可以是整数或负数
        watch:true,               //监听模式
        output: './out.log',      //指定日志标准输出文件及位置
        error: './error.log',     //错误输出日志文件及位置，pm2 install pm2-logrotate进行日志文件拆分
        merge_logs: true,         //集群情况下，可以合并日志
        log_type:"json",          //日志类型
        log_date_format: "DD-MM-YYYY",  //日志日期记录格式
    }],
    deploy : {
        production : {
            user : 'node',                      //ssh 用户
            host : '212.83.163.1',              //ssh 地址
            ref  : 'origin/master',             //GIT远程/分支
            repo : 'git@github.com:repo.git',   //git地址
            path : '/var/www/production',       //服务器文件路径
            post-deploy : 'npm install && pm2 reload ecosystem.config.js --env production'  //部署后的动作
        }
    }
};

```
## 查看某个文件的历史记录
```
git log --pretty=oneline 文件
git show 356f6def9d3fb7f3b9032ff5aa4b9110d4cca87e
```
```
补充：

我看到的更好的方法。
1. git log filename
可以看到fileName相关的commit记录
2. git log -p filename
可以显示每次提交的diff
3. 只看某次提交中的某个文件变化，可以直接加上fileName
git show c5e69804bbd9725b5dece57f8cbece4a96b9f80b filename
```

## master 分支开发
>+ checkout 两个分支 a1 a2
>+ 不管谁先完成  都需要先merge  master  后  在切换到maste 再merge自己分支
>+ a1 提交 后  先merge master  在切换到master  merge a1
>+ a2 提交后   先merge maste  在切换的master  merge a2
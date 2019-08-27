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
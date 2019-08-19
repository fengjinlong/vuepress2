## 同源策略
>+ 限制什么（不限制img，不限制iframe，script）
```
cookie LocalStorage IndexDB
DOM
AJAX
```
>+ 设置同源策略
```
二级域名不一样
text.xxx.com  a.html
<script>
  document.domain = 'example.com'
  document.cookie="test=hello"
</script>

text2.xxx.com  b.html
<script>
  document.cookie
</script>
```
>+ 突破
```
img iframe script(jsonp) link(background)
```

## 语义化  易于理解 便于爬虫
```
<header>
    <nav>123123</nav>
  </header>
  <div>
    <section>111</section>
    <section>222</section>
    <section>333</section>
    <aside>44444</aside>
  </div>
  <footer>5555</footer>
```
>+ 减少div,一个元素至少要表示3个元素
```
<div class="div"></div>

.div::after{
  display: block;
  content: 'qqqqq'
}
.div::before{
  display: block;
  content: 'wwww';
  float: left;
  position: relative;
  height: 111px;
}
```
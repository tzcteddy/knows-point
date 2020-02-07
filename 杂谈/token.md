## token(JWT)

token分为Header、Payload、SingAture三个部分

1、Header是一个JSON对象，使用Base64URL算法转成字符串<br>

```js
{
    "alg":"HS256",//签名的算法
    "type":"JWT"//令牌类型
}
```

2、Payloade是一个JSON对象，使用Base64URL算法转成字符串(默认不加密，禁放敏感信息)<br>
```js
//默认字段
{
    "iss":"",//签发人
    "exp":"",//过期时间
    "sub":"",//主题
    "aud":"",//受众
    "nbf":"",//生效时间
    "iat":"",//签发时间
    "jti":""//编号
}
```

3、SingAture,对前两个部分签名需要指定一个secret<br>
```js
HMACSHA256(
    base64UrlEncode(header)+'.'+base64UrlEncode(payload),
    secret
)
```



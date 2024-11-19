# 2024

## 11-19 v2.0-dev

- [*] 修复 `AccountController` 中 `插入账户` 和 `更新账户` 错误的逻辑
- [*] 优化 `ParserController` 中 `游客` 额度逻辑
- [*] 修复 `ParserController` 中 `卡密` 额度逻辑错误
- [*] 修复 `TokenController` 中 `卡密` 字段缺失问题

## 11-18 v2.0-dev

- [+] 增加 后台管理密码校验接口
- [*] 优化 `BDWPApiController` `isdir` 字段为 `is_dir`

## 11-17 v2.0-dev

- [*] 优化 `accounts` 表 中字段 `switch` 类型为 `boolean`
- [+] 增加 `AccountController` 中 `download_ticket` 类型缺少的字段
- [*] 修正 `AccountController` 中 `插入账号` 的逻辑错误
- [+] 增加 `tokens` 表中字段 `switch` `reason`
- [*] 修正 `TokenController` 中 `传入数据` 的验证逻辑错误
- [*] 优化 `BDWPApiController` 返回的 `isdir` 为 `boolean`
- [-] 去除 `ParserController` 多余字段
- [*] 替换 `accounts` `black_lists` `tokens` 表中类型为 `timestamp` 的字段类型为 `datetime`
- [*] 修正 `BlackListController` 缺少的重复判断

## 11-15 v2.0-dev

- [+] 完成管理配置接口

## 11-10 v2.0-dev

- [+] 完成除解析外的部分

## 11-09 v2.0-dev

- [+] 完成账号插入部分
- [+] 完成数据库设计
- [*] 修正 `BlackListController`
- [*] 修正 `AccountController`

## 11-05 v2.0-dev

- [+] 完成百度常用接口类
- [+] 完成本地获取ip归属地功能
- [+] 完成模型快捷操作

## 11-04 v2.0-dev

- [+] 初始化仓库

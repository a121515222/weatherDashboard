pnpm run build

# 2. 进入构建输出目录
cd dist

# 3. 创建 CNAME 文件
echo 'weatherboard.chun-chia.name' > CNAME

# 4. 初始化 git 并提交
git init
git add -A
git commit -m "deploy"

# 5. 返回项目根目录
cd ..

# 6. 推送到 gh-pages 分支
git subtree push --prefix dist origin gh-pages